function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useMemo } from 'react';
import { Select } from "../../../Designer";
import { useSunmao } from "../../../sunmao";
import Dialog from "./components/Dialog";
import { jsx as _jsx } from "react/jsx-runtime";

function handleGetComponent(nodes, key) {
  var _iterator = _createForOfIteratorHelper(nodes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _node$children;

      var node = _step.value;

      if (node.value === key) {
        return node;
      }

      var _node = (_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length ? handleGetComponent(node.children, key) : undefined;

      if (_node) {
        return _node;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return undefined;
}

function ComponentPicker(props) {
  var _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '未选择组件' : _props$placeholder,
      value = props.value,
      tags = props.tags,
      onChange = props.onChange;
  var sunmao = useSunmao();
  var treeDate = useMemo(function () {
    if (props.treeDate) {
      return props.treeDate;
    }

    return sunmao.getTreeDate(tags);
  }, [props.treeDate, sunmao, tags]);
  return /*#__PURE__*/_jsx("div", {
    className: "asanyeditor-config-component",
    children: /*#__PURE__*/_jsx(Select, {
      value: value,
      placeholder: placeholder,
      popover: Dialog,
      onChange: onChange,
      options: treeDate,
      getOption: handleGetComponent,
      popoverClassName: 'asanyeditor-config-component-popover asanyeditor-dsign-light-popover',
      icon: "SunmaoEditor/ComponentInstance"
    })
  });
}

export default ComponentPicker;