import React, { forwardRef, useRef } from 'react';
import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var IconButton = function IconButton(props, externalRef) {
  var tooltip = props.tooltip,
      onClick = props.onClick,
      style = props.style,
      icon = props.icon,
      className = props.className,
      checked = props.checked;
  var ref = useRef(null);

  var handleClick = function handleClick() {
    onClick && onClick();
  };

  var handleMouseDown = function handleMouseDown() {
    var _current;

    (_current = (externalRef || ref).current) === null || _current === void 0 ? void 0 : _current.focus();
  };

  var handleMouseUp = function handleMouseUp() {
    var _current2;

    (_current2 = (externalRef || ref).current) === null || _current2 === void 0 ? void 0 : _current2.blur();
  };

  return /*#__PURE__*/_jsx(Tooltip, {
    transitionName: "",
    mouseEnterDelay: 0.6,
    mouseLeaveDelay: 0.01,
    placement: "bottom",
    title: tooltip,
    children: /*#__PURE__*/_jsx("span", {
      ref: externalRef || ref,
      tabIndex: 0,
      style: style,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      className: classnames('icon-button', className, {
        checked: checked
      }),
      onClick: handleClick,
      children: /*#__PURE__*/_jsx(Icon, {
        name: icon
      })
    })
  });
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef(IconButton));