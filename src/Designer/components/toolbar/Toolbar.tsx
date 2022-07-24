import React, { useCallback } from 'react';

import Icon from '@asany/icons';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import useTools from '../../hooks/useTools';
import { useEditorSelector } from '../../hooks';
import { AsanyTool } from '../..';

interface HeaderProps {
  onBack?: () => void;
}

function iconRender(icon: any) {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} />;
  }
  return React.createElement(icon);
}

export function render(item: AsanyTool, focus: any) {
  const disabled = item.isDisabled!(focus[item.id]);
  return item.render ? (
    <item.render key={item.id} {...(item as any)} disabled={disabled} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      key={item.id}
      className={classnames('toolbar-icon', item.className, { disabled })}
      onClick={item.onClick as any}
      style={item.style}
    >
      {iconRender(item.icon)}
      {item.name && <span className="toolbar-icon-tip">{item.name}</span>}
    </a>
  );
}

function Header(props: HeaderProps) {
  const { onBack } = props;

  const name = useEditorSelector((state) => state.project && state.project.name);
  const content = useEditorSelector((state) => state.ui.toolbar.content);

  const tools = useTools((state) => state.ui.toolbar.tools);

  const focus = useEditorSelector(
    (state) =>
      state.ui.toolbar.tools.reduce((data, item) => {
        data[item.id] = item.useSelector && item.useSelector(state);
        return data;
      }, {} as any),
    isEqual
  );

  const handClickBack = useCallback(() => onBack && onBack(), [onBack]);

  return (
    <div className="sketch-toolbar">
      {content ? (
        React.createElement(content, { onBack })
      ) : (
        <>
          <div className="toolbar-left" onClick={handClickBack}>
            <Icon name="AsanyEditor/ToolbarBack" className="back-icon toolbar-icon" />
            <span className="title">{name}</span>
          </div>
          <div className="toolbar-center">
            {tools.filter((item) => item.position === 'left' && item.isVisibled!(focus[item.id])).map(render, focus)}
          </div>
          <div className="toolbar-right">
            {tools.filter((item) => item.position === 'right' && item.isVisibled!(focus[item.id])).map(render, focus)}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Header);
