import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import classnames from 'classnames';

import { useEditorDispatch, useEditor, useEditorSelector } from '../../hooks';
import { ActionType, UIActionType } from '../../reducers/actions';
import InfiniteViewer from '../InfiniteViewer';
import Ruler, { RulerGuides } from '../Ruler';

import SelectoMananger from './SelectoMananger';
import Toolbar from './Toolbar';
import ScreenViewport from './viewport/ScreenViewport';

export interface ScenaStatus {
  dragStatus: boolean;
}
interface ScenaProps {
  offsetLeft: number;
  children: React.ReactNode;
}

type CursorStyle = 'grab' | 'grabbing' | '';

interface ScenaState {
  scrollX: number;
  scrollY: number;
  cursorStyle: CursorStyle;
  width: number;
  height: number;
  zoom: number;
  isOpenConfig: boolean;
}

function Scena(props: ScenaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useEditorDispatch();
  const editor = useEditor();
  const isVisible = useEditorSelector((state) => state.ui.scena.toolbar.visible);
  const isRuler = useEditorSelector((state) => state.features.ruler);
  const isZoom = useEditorSelector((state) => state.features.zoom);
  const disabled = useEditorSelector((state) => state.mode === 'VIEW');
  const onClick = useEditorSelector((state) => state.ui.scena.onClick);
  const drag = useEditorSelector((state) => state.features.drag);
  const [width, height] = useEditorSelector((state) => state.ui.scena.screen.size);
  const isOpenConfig = useEditorSelector((state) => state.ui.aside.visible);
  const zoom = useEditorSelector((state) => state.ui.scena.zoom);
  const selecto = useEditorSelector((state) => state.features.selecto);
  const keepOpen = useEditorSelector((state) => !!state.ui.sidebar.content);
  const leftSiderbarWidth = useEditorSelector((state) => state.ui.sidebar.width);
  const minimizable = useEditorSelector((state) => state.ui.sidebar.minimizable);
  const options = useEditorSelector((state) => state.ui.aside.options || {});

  const state = useRef<ScenaState>({
    scrollX: 0,
    scrollY: 0,
    cursorStyle: '',
    width,
    height,
    zoom,
    isOpenConfig,
  });
  const [, forceRender] = useReducer((s) => s + 1, 0);

  state.current.width = width;
  state.current.height = height;
  state.current.zoom = zoom;
  state.current.isOpenConfig = isOpenConfig;

  const setCursorStyle = useCallback((cursorStyle: CursorStyle) => {
    state.current.cursorStyle = cursorStyle;
    forceRender();
  }, []);

  const setScroll = useCallback((x: number, y: number) => {
    state.current.scrollX = x;
    state.current.scrollY = y;
    forceRender();
  }, []);

  const changeHandToGrab = useCallback(() => {
    setCursorStyle('grab');
  }, [setCursorStyle]);

  const changeHandToGrabbing = useCallback(() => {
    setCursorStyle('grabbing');
  }, [setCursorStyle]);

  const handleClick = useCallback(
    (e: any) => {
      if (e.target.classList.contains('moveable-control')) {
        return e.stopPropagation();
      }
      onClick && onClick(editor);
      if (disabled) {
        return;
      }
    },
    [disabled, onClick],
  );
  const handleScroll = (x: number, y: number) => {
    setScroll(x, y);
  };
  const handleZoom = useCallback((zoom: number) => {
    if (!editor.features.has('zoom')) {
      return;
    }
    dispatch({
      type: UIActionType.CanvasZoom,
      payload: zoom,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuides = useCallback((data: RulerGuides) => {
    const { width, height } = state.current;
    dispatch({
      type: UIActionType.ChangeSnapGuides,
      payload: {
        horizontal: [0, height, height / 2, ...data.horizontal],
        vertical: [0, width, width / 2, ...data.vertical],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetScroll = useCallback(() => {
    const { clientWidth, clientHeight } = ref.current!;
    const { width, height, zoom, isOpenConfig } = state.current;
    const lsw = keepOpen && !minimizable ? leftSiderbarWidth : 0;
    const rsw = isOpenConfig ? options?.width || 240 : 0;
    const viewportWidth = clientWidth - lsw - rsw;
    setScroll(
      Math.max((viewportWidth - width - 30) / 2 + lsw, 0),
      Math.max((clientHeight - height - 30) / 2, -(height * (1 - zoom)) / 2),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keepOpen, leftSiderbarWidth, minimizable, options?.width]);

  useEffect(() => {
    dispatch({ type: ActionType.ScenaReset, payload: handleResetScroll });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResetScroll]);

  useEffect(() => {
    isZoom && setTimeout(handleResetScroll, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoom]);

  const { cursorStyle: cursorstyle, scrollX, scrollY } = state.current;
  return (
    <div
      ref={ref}
      className={classnames('sketch-scena', 'asany-editor-scena', {
        'hidden-ruler': !isRuler,
        'hidden-selecto': !selecto,
        'mini-toolbar': isVisible,
      })}
      onMouseEnter={changeHandToGrab}
      onMouseDown={changeHandToGrabbing}
      onMouseUp={changeHandToGrab}
      onClick={handleClick}
    >
      <Toolbar />
      <InfiniteViewer
        style={{ cursor: drag ? cursorstyle : '' }}
        drag={drag}
        zoom={zoom}
        isZoom={isZoom}
        scrollX={scrollX}
        scrollY={scrollY}
        onScroll={handleScroll}
        onZoom={handleZoom}
      >
        <ScreenViewport width={width} height={height}>
          {props.children}
        </ScreenViewport>
      </InfiniteViewer>
      {selecto && <SelectoMananger />}
      <Ruler
        zoom={zoom}
        rulable={isRuler}
        scrollX={scrollX + (width * (1 - zoom)) / 2}
        scrollY={scrollY + (height * (1 - zoom)) / 2}
        offsetLeft={minimizable ? 0 : keepOpen ? leftSiderbarWidth + props.offsetLeft : 0}
        onResetScroll={handleResetScroll}
        onGuides={handleGuides}
      />
    </div>
  );
}

export default React.memo(Scena);
