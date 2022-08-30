import React from 'react';
import classnames from 'classnames';
import { AsanyToolProps } from '../../typings';

function DefaultAsanyTool(props: AsanyToolProps) {
  const { onClick, className, disabled, active, style, children } = props;
  return (
    <a
      onClick={onClick}
      className={classnames('toolbar-icon', className, {
        disabled,
        active,
      })}
      style={style}
    >
      {children}
    </a>
  );
}

export default DefaultAsanyTool;
