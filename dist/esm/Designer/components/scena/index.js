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

import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import classnames from 'classnames';
import { useEditorDispatch, useEditor, useEditorSelector } from "../../hooks";
import { ActionType, UIActionType } from "../../reducers/actions";
import InfiniteViewer from "../InfiniteViewer";
import Ruler from "../Ruler";
import SelectoMananger from "./SelectoMananger";
import Toolbar from "./Toolbar";
import ScreenViewport from "./viewport/ScreenViewport";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Scena(props) {
  var ref = useRef(null);
  var dispatch = useEditorDispatch();
  var editor = useEditor();
  var isVisible = useEditorSelector(function (state) {
    return state.ui.scena.toolbar.visible;
  });
  var isRuler = useEditorSelector(function (state) {
    return state.features.ruler;
  });
  var isZoom = useEditorSelector(function (state) {
    return state.features.zoom;
  });
  var disabled = useEditorSelector(function (state) {
    return state.mode === 'VIEW';
  });
  var onClick = useEditorSelector(function (state) {
    return state.ui.scena.onClick;
  });
  var drag = useEditorSelector(function (state) {
    return state.features.drag;
  });

  var _useEditorSelector = useEditorSelector(function (state) {
    return state.ui.scena.screen.size;
  }),
      _useEditorSelector2 = _slicedToArray(_useEditorSelector, 2),
      width = _useEditorSelector2[0],
      height = _useEditorSelector2[1];

  var isOpenConfig = useEditorSelector(function (state) {
    return state.ui.aside.visible;
  });
  var zoom = useEditorSelector(function (state) {
    return state.ui.scena.zoom;
  });
  var selecto = useEditorSelector(function (state) {
    return state.features.selecto;
  });
  var keepOpen = useEditorSelector(function (state) {
    return !!state.ui.sidebar.content;
  });
  var leftSiderbarWidth = useEditorSelector(function (state) {
    return state.ui.sidebar.width;
  });
  var minimizable = useEditorSelector(function (state) {
    return state.ui.sidebar.minimizable;
  });
  var options = useEditorSelector(function (state) {
    return state.ui.aside.options || {};
  });
  var state = useRef({
    scrollX: 0,
    scrollY: 0,
    cursorStyle: '',
    width: width,
    height: height,
    zoom: zoom,
    isOpenConfig: isOpenConfig
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  state.current.width = width;
  state.current.height = height;
  state.current.zoom = zoom;
  state.current.isOpenConfig = isOpenConfig;
  var setCursorStyle = useCallback(function (cursorStyle) {
    state.current.cursorStyle = cursorStyle;
    forceRender();
  }, []);
  var setScroll = useCallback(function (x, y) {
    state.current.scrollX = x;
    state.current.scrollY = y;
    forceRender();
  }, []);
  var changeHandToGrab = useCallback(function () {
    setCursorStyle('grab'); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var changeHandToGrabbing = useCallback(function () {
    setCursorStyle('grabbing'); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleClick = useCallback(function (e) {
    if (e.target.classList.contains('moveable-control')) {
      return e.stopPropagation();
    }

    onClick && onClick(editor);

    if (disabled) {
      return;
    } // TODO: 取消 Block 的选中效果


    console.warn('取消 Block 的选中效果');
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [disabled, onClick]);

  var handleScroll = function handleScroll(x, y) {
    setScroll(x, y);
  };

  var handleZoom = useCallback(function (zoom) {
    if (!editor.features.has('zoom')) {
      return;
    }

    dispatch({
      type: UIActionType.CanvasZoom,
      payload: zoom
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleGuides = useCallback(function (data) {
    var _state$current = state.current,
        width = _state$current.width,
        height = _state$current.height;
    dispatch({
      type: UIActionType.ChangeSnapGuides,
      payload: {
        horizontal: [0, height, height / 2].concat(_toConsumableArray(data.horizontal)),
        vertical: [0, width, width / 2].concat(_toConsumableArray(data.vertical))
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleResetScroll = useCallback(function () {
    var _ref = ref.current,
        clientWidth = _ref.clientWidth,
        clientHeight = _ref.clientHeight;
    var _state$current2 = state.current,
        width = _state$current2.width,
        height = _state$current2.height,
        zoom = _state$current2.zoom,
        isOpenConfig = _state$current2.isOpenConfig;
    var lsw = keepOpen && !minimizable ? leftSiderbarWidth : 0;
    var rsw = isOpenConfig ? (options === null || options === void 0 ? void 0 : options.width) || 240 : 0;
    var viewportWidth = clientWidth - lsw - rsw;
    setScroll(Math.max((viewportWidth - width - 30) / 2 + lsw, 0), Math.max((clientHeight - height - 30) / 2, -(height * (1 - zoom)) / 2)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keepOpen, leftSiderbarWidth, minimizable, options === null || options === void 0 ? void 0 : options.width]);
  useEffect(function () {
    dispatch({
      type: ActionType.ScenaReset,
      payload: handleResetScroll
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResetScroll]);
  useEffect(function () {
    isZoom && setTimeout(handleResetScroll, 100); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoom]);
  var _state$current3 = state.current,
      cursorstyle = _state$current3.cursorStyle,
      scrollX = _state$current3.scrollX,
      scrollY = _state$current3.scrollY;
  return /*#__PURE__*/_jsxs("div", {
    ref: ref,
    className: classnames('sketch-scena', 'asany-editor-scena', {
      'hidden-ruler': !isRuler,
      'hidden-selecto': !selecto,
      'mini-toolbar': isVisible
    }),
    onMouseEnter: changeHandToGrab,
    onMouseDown: changeHandToGrabbing,
    onMouseUp: changeHandToGrab,
    onClick: handleClick,
    children: [/*#__PURE__*/_jsx(Toolbar, {}), /*#__PURE__*/_jsx(InfiniteViewer, {
      style: {
        cursor: drag ? cursorstyle : ''
      },
      drag: drag,
      zoom: zoom,
      isZoom: isZoom,
      scrollX: scrollX,
      scrollY: scrollY,
      onScroll: handleScroll,
      onZoom: handleZoom,
      children: /*#__PURE__*/_jsx(ScreenViewport, {
        width: width,
        height: height,
        children: props.children
      })
    }), selecto && /*#__PURE__*/_jsx(SelectoMananger, {}), /*#__PURE__*/_jsx(Ruler, {
      zoom: zoom,
      rulable: isRuler,
      scrollX: scrollX + width * (1 - zoom) / 2,
      scrollY: scrollY + height * (1 - zoom) / 2,
      offsetLeft: minimizable ? 0 : keepOpen ? leftSiderbarWidth + props.offsetLeft : 0,
      onResetScroll: handleResetScroll,
      onGuides: handleGuides
    })]
  });
}

export default /*#__PURE__*/React.memo(Scena);