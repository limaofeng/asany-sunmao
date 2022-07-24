import React from 'react';
import classnames from 'classnames';
import { numberFormat } from "../utils";
import ScrubbableControl from "./ScrubbableControl";
import { jsx as _jsx } from "react/jsx-runtime";

function InputNumber(props) {
  var value = props.value,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '请输入数字' : _props$placeholder,
      onChange = props.onChange,
      className = props.className;
  return /*#__PURE__*/_jsx(ScrubbableControl, {
    placeholder: placeholder,
    className: classnames('basic-input', className),
    trigger: "change",
    inputType: "number",
    format: numberFormat,
    autoSelect: false,
    value: value,
    onChange: onChange
  });
}

export default InputNumber;