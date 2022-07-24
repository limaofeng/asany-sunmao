function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import ScrubbableControl from "./data-entry/ScrubbableControl";
import IconButton from "./IconButton";
import DsignIcons from "./OptionButton";
import { inputFormat } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var DsignColor = function DsignColor(_) {
  var _useState = useState({
    backgroundColor: 'rgb(0, 0, 0)',
    opacity: 0.7
  }),
      _useState2 = _slicedToArray(_useState, 1),
      colorStyle = _useState2[0];

  var handleChange = function handleChange() {
    return function () {};
  };

  var colorHandleChage = function colorHandleChage() {
    return function () {};
  };

  var iconHandleChange = function iconHandleChange() {
    return function () {};
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "design-colums design-color design-rows ",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "color-input",
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx("div", {
          onClick: colorHandleChage,
          className: "color-chit",
          style: {
            backgroundColor: colorStyle.backgroundColor
          },
          children: /*#__PURE__*/_jsx("div", {
            className: "color-chit-alpha",
            style: {
              opacity: colorStyle.opacity
            }
          })
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "color-value",
        children: /*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange,
          value: 0
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "color-percentage",
        children: /*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange,
          value: 0
        })
      })]
    }), /*#__PURE__*/_jsx(DsignIcons, {
      style: {
        gridColumn: '20/span 4'
      },
      className: "element-retract design-rows-items",
      onChange: iconHandleChange,
      icon: "AsanyEditor/VectorEyes"
    }), /*#__PURE__*/_jsx(IconButton, {
      style: {
        gridColumn: '25/span 4'
      },
      className: "element-retract design-rows-items" // onChange={iconHandleChange}
      ,
      icon: "AsanyEditor/VectorSubtraction"
    })]
  });
};

export default DsignColor;