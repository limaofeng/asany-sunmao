function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { memo, useCallback, useRef, useState } from 'react';
import Icon from '@asany/icons';
import { Input, InputNumber, Tooltip } from 'antd';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { useDeepCompareEffect } from "../../utils";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var TextArea = Input.TextArea;

var ScrubbableControl = function ScrubbableControl(props) {
  var inputType = props.inputType,
      onChange = props.onChange,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'blur' : _props$trigger,
      label = props.label,
      _props$autoSelect = props.autoSelect,
      autoSelect = _props$autoSelect === void 0 ? true : _props$autoSelect,
      icon = props.icon,
      disabled = props.disabled,
      className = props.className,
      value = props.value,
      format = props.format,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
  var input = useRef(null);

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      internalValue = _useState2[0],
      setInternalValue = _useState2[1];

  var handleInputFormat = useCallback(function (value) {
    return format && format.input && format.input(value) || String(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useDeepCompareEffect(function () {
    if (value === null || value === undefined) {
      return;
    }

    setInternalValue(handleInputFormat(value));
  }, [value]);
  var handleBlur = useCallback(function () {
    if (isEqual(internalValue, handleInputFormat(value))) return;

    if (trigger === 'change' || !onChange) {
      return;
    }

    var foramtValue = format && format.output && format.output(internalValue) || internalValue;
    internalValue && onChange(foramtValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue, onChange]);
  var handleChange = useCallback(function (event) {
    var _ref = inputType === 'number' ? {
      value: event
    } : event.target,
        value = _ref.value;

    var internalValue = handleInputFormat(value);
    setInternalValue(internalValue);

    if (trigger === 'change' && onChange) {
      var foramtValue = format && format.output && format.output(internalValue) || internalValue;
      onChange(foramtValue);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var handleFocus = useCallback(function () {
    var _input$current;

    autoSelect && ((_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.select()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_jsx(Tooltip, {
    transitionName: "",
    mouseEnterDelay: 0.6,
    mouseLeaveDelay: 0.01,
    placement: "bottom",
    title: label,
    children: /*#__PURE__*/_jsxs("div", {
      style: style,
      onClick: handleFocus,
      className: classnames('scrubbable-control left-col design-input design-rows-items', className, {
        disabled: disabled,
        is_textarea: inputType === 'textarea'
      }),
      children: [renderIcon(icon), renderInput(props, input, internalValue, handleFocus, handleBlur, handleChange)]
    })
  });
};

function renderIcon(icon) {
  if (!icon) {
    return undefined;
  }

  if (typeof icon === 'string') {
    return /*#__PURE__*/_jsx("div", {
      className: "icons-pane",
      children: /*#__PURE__*/_jsx(Icon, {
        name: icon
      })
    });
  }

  return icon;
}

function renderInput(props, input, internalValue, handleFocus, handleBlur, handleChange) {
  var _props$inputType = props.inputType,
      inputType = _props$inputType === void 0 ? 'input' : _props$inputType,
      placeholder = props.placeholder,
      disabled = props.disabled,
      width = props.width,
      autoSize = props.autoSize;

  if (inputType === 'textarea') {
    return /*#__PURE__*/_jsx(TextArea, {
      ref: input,
      autoSize: autoSize,
      placeholder: placeholder,
      onFocus: handleFocus,
      disabled: disabled,
      value: internalValue,
      onBlur: handleBlur,
      onChange: handleChange
    });
  }

  if (inputType === 'number') {
    return /*#__PURE__*/_jsx(InputNumber, {
      ref: input,
      placeholder: placeholder,
      onFocus: handleFocus,
      disabled: disabled,
      value: internalValue,
      onBlur: handleBlur,
      onChange: handleChange
    });
  }

  if (inputType === 'input') {
    if (width === 'adaptive') {
      return /*#__PURE__*/_jsx("div", {
        ref: input,
        contentEditable: true,
        suppressContentEditableWarning: true,
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        className: classnames('ant-input', {
          disabled: disabled,
          placeholder: placeholder
        }),
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        children: internalValue || placeholder
      });
    }

    return /*#__PURE__*/_jsx(Input, {
      ref: input,
      placeholder: placeholder,
      onFocus: handleFocus,
      disabled: disabled,
      value: internalValue,
      onBlur: handleBlur,
      onChange: handleChange
    });
  }

  return /*#__PURE__*/_jsx(_Fragment, {});
}

export default /*#__PURE__*/memo(ScrubbableControl);