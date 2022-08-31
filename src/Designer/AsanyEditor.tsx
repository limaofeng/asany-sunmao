import { useImperativeHandle, useLayoutEffect, useState } from 'react';
import React, { ComponentType, useCallback, useEffect, useReducer } from 'react';

import { isElement, isValidElementType } from 'react-is';
import classnames from 'classnames';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import Aside from './components/aside';
import Scena from './components/scena';
import Sidebar from './components/sidebar';
import { AsanyProvider } from './AsanyContext';
import { ActionType } from './reducers/actions';
import RuntimeContainer from './RuntimeContainer';
import Toolbar from './components/toolbar/Toolbar';
import { useEditorDispatch, useEditor, useEditorSelector } from './hooks';
import DefaultLoadingComponent, {
  LoadingComponentProps,
} from './components/scena/LoadingComponent';
import { AsanyProject, EditorPlugin, IAsanyEditor, WorkspaceProps } from './typings';
import './icons';

import './style/tailwind.css';
import './style/index.less';
import styled from 'styled-components';

interface AsanyProps {
  className?: string;
  onSave?: (data: AsanyProject) => void;
  onBack?: () => void;
  loading?: boolean;
  loadingComponent?: React.ComponentType<LoadingComponentProps>;
  children?: React.ReactNode;
}

type EditorLayoutProps = {
  sidebarWidth: number;
};

const EditorLayout = styled.div<EditorLayoutProps>`
  --ae-sidebar-width: ${(props) => `${props.sidebarWidth}px`};
`;

const Editor = React.forwardRef(function Editor(
  {
    className,
    onSave,
    loading: externalLoading,
    loadingComponent: LoadingComponent = DefaultLoadingComponent,
    children,
    ...props
  }: AsanyProps,
  ref?: React.ForwardedRef<IAsanyEditor>,
) {
  const dispatch = useEditorDispatch();

  const [offsetLeft, setOffsetLeft] = useState(0);
  const workspace = useEditorSelector((state) => state.ui.scena.workspace);

  const WorkComponent = useCallback(
    (props: WorkspaceProps) => {
      if (isElement(workspace)) {
        return React.cloneElement(workspace as any, props);
      }
      if (isValidElementType(workspace)) {
        const { children, ...otherProps } = props;
        return React.createElement(workspace as any, otherProps, children);
      }
      return <div>插件未配置 Workspace 组件</div>;
    },
    [workspace],
  );

  const minimizable = useEditorSelector((state) => state.ui.sidebar.minimizable);
  const sidebarWidth = useEditorSelector((state) => state.ui.sidebar.width);
  const visible = useEditorSelector((state) => state.ui.aside.visible);
  const loading = useEditorSelector((state) => state.ui.scena.loading);
  const control = useEditorSelector((state) => state.ui.aside.control);

  useEffect(() => {
    if (typeof externalLoading !== 'boolean') {
      return;
    }
    dispatch({
      type: ActionType.Loading,
      payload: externalLoading,
    });
  }, [externalLoading]);

  useEffect(() => {
    if (!onSave) {
      return;
    }
    dispatch({ type: ActionType.BindSave, payload: onSave });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSave]);

  const handleResize = useCallback((x: React.SetStateAction<number>) => {
    setOffsetLeft(x);
  }, []);

  const api = useEditor();

  useImperativeHandle(ref, () => api);

  return (
    <EditorLayout
      className={classnames('asany-editor sketch-container', className, {
        'asany-editor-root-loading': loading || externalLoading,
      })}
      sidebarWidth={minimizable ? 0 : sidebarWidth}
    >
      <Toolbar {...props} />
      <div className="asany-editor-body-container">
        <div
          className={classnames('sketch-body', {
            'settings-menu-expanded': visible,
          })}
        >
          <Sidebar onResize={handleResize} />
          <Scena offsetLeft={offsetLeft}>
            <WorkComponent />
          </Scena>
          <Aside />
        </div>
        <LoadingComponent
          loading={loading || externalLoading}
          style={{
            paddingRight: visible ? control?.current?.width : 0,
          }}
        />
      </div>
    </EditorLayout>
  );
});

interface AsanyWarpperProps {
  className?: string;
  loading?: boolean;
  loadingComponent?: React.ComponentType<LoadingComponentProps>;
  project: AsanyProject;
  wrapper?: ComponentType<any>;
  container?: React.ComponentType;
  plugins?: EditorPlugin[];
  onSave?: (data: AsanyProject) => void;
  onBack?: () => void;
  children?: React.ReactNode;
}

function AsanyEditor(props: AsanyWarpperProps, ref?: React.ForwardedRef<IAsanyEditor>) {
  const {
    children,
    project,
    onSave,
    onBack,
    container: Container = RuntimeContainer,
    plugins = [],
    loading,
    loadingComponent,
    className,
  } = props;
  const [version, forceRender] = useReducer((s) => s + 1, 0);
  useEffect(() => {
    if (!project) {
      return;
    }
    forceRender();
  }, [project]);

  useLayoutEffect(() => {
    forceRender();
  }, [loading]);

  return (
    <AsanyProvider version={version} plugins={[...plugins]} value={project}>
      <Container>
        <Editor
          ref={ref}
          className={className}
          onSave={onSave}
          loading={loading}
          loadingComponent={loadingComponent}
          onBack={onBack}
        >
          {children}
        </Editor>
      </Container>
    </AsanyProvider>
  );
}

export default React.forwardRef(AsanyEditor);
