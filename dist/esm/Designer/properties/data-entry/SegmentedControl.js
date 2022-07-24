function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useState } from 'react';
import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var SegmentedControl = function SegmentedControl(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      className = props.className,
      _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      defaultValue = props.value,
      onChange = props.onChange;

  var _useState = useState(defaultValue || options.length && options[0].value),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    if (!defaultValue || defaultValue === value) {
      return;
    }

    setValue(defaultValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  var handleClick = function handleClick(value) {
    return function () {
      onChange ? onChange(value) : setValue(value);
    };
  };

  return /*#__PURE__*/_jsx("div", {
    style: style,
    className: classnames('segmented-control-container', className, {
      first: value && options.length && options[0].value === value,
      last: value && options.length && options[options.length - 1].value === value
    }),
    children: options.map(function (_ref) {
      var icon = _ref.icon,
          itemValue = _ref.value,
          label = _ref.label;
      return /*#__PURE__*/_jsx(Tooltip, {
        transitionName: "",
        mouseEnterDelay: 0.6,
        mouseLeaveDelay: 0.01,
        placement: "bottom",
        title: label,
        children: /*#__PURE__*/_jsx("div", {
          onClick: handleClick(itemValue),
          className: classnames('segmented-control', {
            active: itemValue === value
          }),
          children: /*#__PURE__*/_jsx(Icon, {
            name: icon || itemValue
          })
        })
      }, itemValue);
    })
  });
};

export default SegmentedControl;