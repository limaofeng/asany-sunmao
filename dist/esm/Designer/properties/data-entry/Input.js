import React from 'react';
import classnames from 'classnames';
import ScrubbableControl from "./ScrubbableControl";
import { jsx as _jsx } from "react/jsx-runtime";

function Input(props) {
  var value = props.value,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '请输入字符' : _props$placeholder,
      onChange = props.onChange,
      width = props.width,
      className = props.className;
  return /*#__PURE__*/_jsx(ScrubbableControl, {
    placeholder: placeholder,
    className: classnames('basic-input', className),
    width: width,
    trigger: "change",
    autoSelect: false,
    value: value,
    onChange: onChange
  });
}

export default Input;