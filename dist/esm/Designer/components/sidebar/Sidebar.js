function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useEditorDispatch, useEditor, useEditorSelector } from "../../hooks";
import { ActionType } from "../../reducers/actions";
import Toolbar from "./Toolbar";
import Toolboard, { ToolPanel } from "./Toolboard";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SiderBar(props) {
  var control = useRef(null);
  var dispatch = useEditorDispatch();

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var visible = useEditorSelector(function (state) {
    return state.ui.sidebar.visible;
  });
  var scenaToolbarVisible = useEditorSelector(function (state) {
    return state.ui.scena.toolbar.visible;
  });
  var Content = useEditorSelector(function (state) {
    return state.ui.sidebar.content;
  });
  var editor = useEditor();
  useEffect(function () {
    dispatch({
      type: ActionType.ToolboardRef,
      payload: control
    });
  }, [dispatch]);
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('sketch-sidebar', 'asany-editor-sidebar', {
      collapsed: visible && collapsed,
      'sidebar-out': !visible,
      falling: scenaToolbarVisible
    }),
    children: [/*#__PURE__*/_jsx(Toolbar, {}), /*#__PURE__*/_jsx(Toolboard, {
      onResize: props.onResize,
      editor: editor,
      ref: control,
      setCollapsed: setCollapsed,
      children: Content && /*#__PURE__*/_jsx(ToolPanel, {
        className: "tool-panel-content",
        children: /*#__PURE__*/_jsx(Content, {})
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SiderBar);