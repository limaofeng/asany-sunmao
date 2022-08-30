import React from 'react';

import Icon from '@asany/icons';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import useTools from '../../hooks/useTools';
import { useEditorSelector } from '../../hooks';
import DefaultAsanyTool from '../toolbar/DefaultAsanyTool';

function iconRender(icon: any) {
  if (!icon) {
    return;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} />;
  }
  return React.createElement(icon);
}

function Toolbar() {
  const tools = useTools((state) => state.ui.scena.toolbar.tools);
  const focus = useEditorSelector(
    (state) =>
      state.ui.scena.toolbar.tools.reduce((data, item) => {
        data[item.id] = item.useSelector && item.useSelector(state);
        return data;
      }, {} as any),
    isEqual,
  );

  {
    /* <a
                key={`${item.id}-${index}`}
                onClick={item.onClick as any}
                className={classnames('toolbar-icon', item.className, {
                  disabled: item.isDisabled!(focus[item.id]),
                  active: item.isSelected!(focus[item.id]),
                })}
                style={item.style}
              >
                {iconRender(item.icon)}
                {item.name && <span className="toolbar-icon-tip">{item.name}</span>}
              </a> */
  }

  return (
    <div className="asany-editor-scena-toolbar">
      <div className="layout-left">
        {tools
          .filter(
            (item) =>
              (!item.position || item.position === 'left') && item.isVisibled!(focus[item.id]),
          )
          .map((item, index) =>
            item.id === 'vertical-divider' ? (
              <span key={`${item.id}-${index}`} className="vertical-divider" />
            ) : item.render ? (
              item.render(item, {
                key: `${item.id}-${index}`,
                style: item.style,
                disabled: item.isDisabled!(focus[item.id]),
                active: item.isSelected!(focus[item.id]),
                onClick: item.onClick as any,
                children: (
                  <>
                    {iconRender(item.icon)}
                    {item.name && <span className="toolbar-icon-tip">{item.name}</span>}
                  </>
                ),
              })
            ) : (
              <DefaultAsanyTool
                key={`${item.id}-${index}`}
                style={item.style}
                disabled={item.isDisabled!(focus[item.id])}
                active={item.isSelected!(focus[item.id])}
                onClick={item.onClick as any}
                children={
                  <>
                    {iconRender(item.icon)}
                    {item.name && <span className="toolbar-icon-tip">{item.name}</span>}
                  </>
                }
              />
            ),
          )}
      </div>
      <div className="layout-right">
        {tools
          .filter((item) => item.position === 'right' && item.isVisibled!(focus[item.id]))
          .map((item, index) =>
            item.id === 'vertical-divider' ? (
              <span key={`${item.id}-${index}`} className="vertical-divider" />
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={`${item.id}-${index}`}
                onClick={item.onClick as any}
                className={classnames('toolbar-icon', item.className, {
                  disabled: item.isDisabled!(focus[item.id]),
                  active: item.isSelected!(focus[item.id]),
                })}
                style={item.style}
              >
                {iconRender(item.icon)}
                {item.name && <span className="toolbar-icon-tip">{item.name}</span>}
              </a>
            ),
          )}
      </div>
    </div>
  );
}

export default React.memo(Toolbar);
