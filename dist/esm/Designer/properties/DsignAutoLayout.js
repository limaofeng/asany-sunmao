function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import classnames from 'classnames';
import IconButton from "./IconButton";
import ScrubbableControl from "./data-entry/ScrubbableControl";
import SegmentedControl from "./data-entry/SegmentedControl";
import { inputFormat } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var DsignAutoLayout = function DsignAutoLayout() {
  var ref = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  useClickAway(ref, function () {
    setVisible(false);
  });

  var handleAlignmentAndPaddingClick = function handleAlignmentAndPaddingClick() {
    setVisible(!visible);
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "design-rows design-colums content-col asanyeditor-auto-layout",
    children: [/*#__PURE__*/_jsx(SegmentedControl, {
      options: [{
        value: 'VerticalDirection',
        icon: 'AsanyEditor/VectorArrowButtom',
        label: '垂直方向'
      }, {
        value: 'HorizontalDirection',
        icon: 'AsanyEditor/VectorArrowRight',
        label: '水平方向'
      }]
    }), /*#__PURE__*/_jsx(ScrubbableControl, {
      className: "spacing-between-items",
      format: inputFormat,
      value: 0,
      icon: "AsanyEditor/VectorSpacing"
    }), /*#__PURE__*/_jsx(ScrubbableControl, {
      className: "padding-around-items",
      format: inputFormat,
      value: 0,
      icon: "AsanyEditor/VectorPadding"
    }), /*#__PURE__*/_jsx(IconButton, {
      ref: ref,
      className: classnames('alignment-and-padding', {
        active: visible
      }),
      icon: "AsanyEditor/AlignmentAndPadding",
      onClick: handleAlignmentAndPaddingClick
    })]
  });
};

export default DsignAutoLayout;