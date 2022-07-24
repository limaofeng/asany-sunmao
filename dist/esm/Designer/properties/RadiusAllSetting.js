function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { memo, useCallback, useEffect, useState } from 'react';
import Icon from '@asany/icons';
import { Input } from 'antd';
import isEqual from 'lodash/isEqual';
import { onlyNumber } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var icons = ['AsanyEditor/TopLeftCornerRadius', 'AsanyEditor/TopRightCornerRadius', 'AsanyEditor/BottomRightCornerRadius', 'AsanyEditor/BottomLeftCornerRadius'];

var RadiusAllSetting = function RadiusAllSetting(props) {
  var onChange = props.onChange,
      _props$value = props.value;
  _props$value = _props$value === void 0 ? [0, 0, 0, 0] : _props$value;

  var _props$value2 = _slicedToArray(_props$value, 4),
      _props$value2$ = _props$value2[0],
      tl = _props$value2$ === void 0 ? 0 : _props$value2$,
      _props$value2$2 = _props$value2[1],
      tr = _props$value2$2 === void 0 ? 0 : _props$value2$2,
      _props$value2$3 = _props$value2[2],
      br = _props$value2$3 === void 0 ? 0 : _props$value2$3,
      _props$value2$4 = _props$value2[3],
      bl = _props$value2$4 === void 0 ? 0 : _props$value2$4; // 记录输入位置


  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1]; // 内部存储 Value, 在失去焦点时，触发 props.onChange 通知外部


  var _useState3 = useState([tl, tr, br, bl]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1]; // 如果 props.value 改变, 修改 value


  useEffect(function () {
    var _value = _slicedToArray(value, 4),
        _value$ = _value[0],
        tl = _value$ === void 0 ? 0 : _value$,
        _value$2 = _value[1],
        tr = _value$2 === void 0 ? 0 : _value$2,
        _value$3 = _value[2],
        br = _value$3 === void 0 ? 0 : _value$3,
        _value$4 = _value[3],
        bl = _value$4 === void 0 ? 0 : _value$4;

    setValue([tl, tr, br, bl]); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tl, tr, br, bl]); // 输入框失去焦点时的操作

  var handleBlur = useCallback(function () {
    // 重置图标
    setIndex(0); // 如果 value 与 props.value 一直，不触发外部

    if (!onChange || isEqual(props.value, value)) {
      return;
    }

    onChange(value); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, value]); // 更新内部数据

  var handleChange = useCallback(function (event) {
    var index = parseInt(event.target.getAttribute('data-id'));

    var newValue = _toConsumableArray(value);

    newValue[index] = onlyNumber(event.target.value);
    setValue(newValue);
  }, [value]); // 设置图标及文本选中

  var handleFocus = useCallback(function (event) {
    var index = parseInt(event.target.getAttribute('data-id'));
    setIndex(index);
    event.target.select();
  }, []);
  return /*#__PURE__*/_jsx("div", {
    className: "raidus-change-box design-colums ",
    children: /*#__PURE__*/_jsxs("div", {
      className: "change-input ",
      children: [/*#__PURE__*/_jsx("div", {
        className: "icons-pane",
        children: /*#__PURE__*/_jsx(Icon, {
          name: icons[index]
        })
      }), icons.map(function (_, i) {
        return /*#__PURE__*/_jsx("div", {
          className: "input-box",
          children: /*#__PURE__*/_jsx(Input, {
            "data-id": i,
            onFocus: handleFocus,
            value: value[i],
            onBlur: handleBlur,
            onChange: handleChange
          })
        }, i);
      })]
    })
  });
};

export default /*#__PURE__*/memo(RadiusAllSetting);