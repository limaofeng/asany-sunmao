import React from 'react';
import classnames from 'classnames';
import ScrubbableControl from "./ScrubbableControl";
import { jsx as _jsx } from "react/jsx-runtime";

function TextArea(props) {
  var value = props.value,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '请输入字符串' : _props$placeholder,
      onChange = props.onChange,
      className = props.className,
      autoSize = props.autoSize;
  return /*#__PURE__*/_jsx(ScrubbableControl, {
    placeholder: placeholder,
    className: classnames('basic-input', className),
    trigger: "change",
    autoSelect: false,
    autoSize: autoSize,
    inputType: "textarea",
    value: value,
    onChange: onChange
  });
}

export default TextArea;