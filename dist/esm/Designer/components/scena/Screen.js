function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useDragDropManager, useDrop } from 'react-dnd';
import { useEditorSelector } from "../../hooks";
import MoveableManager from "./viewport/MoveableManager";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Screen(_ref) {
  var children = _ref.children;
  var artboard = useRef(null);
  var screenHeader = useRef(null);
  var moveableContainer = useRef(null);
  var zoom = useEditorSelector(function (state) {
    return state.ui.scena.zoom;
  });

  var _useEditorSelector = useEditorSelector(function (state) {
    return state.ui.scena.screen.size;
  }),
      _useEditorSelector2 = _slicedToArray(_useEditorSelector, 2),
      width = _useEditorSelector2[0],
      height = _useEditorSelector2[1];

  var dustbin = useEditorSelector(function (state) {
    return state.ui.scena.viewer.dustbin;
  });
  var manager = useDragDropManager();

  var _useDrop = useDrop({
    accept: 'dustbin',
    canDrop: function canDrop() {
      return false;
    },
    collect: function collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      handlerId = _useDrop2[0].handlerId,
      connectDrop = _useDrop2[1];

  connectDrop(artboard);
  useEffect(function () {
    if (!handlerId) {
      return;
    }

    var registry = manager.getRegistry();
    registry.types.set(handlerId, dustbin); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerId, dustbin]);
  useEffect(function () {
    window.dispatchEvent(new Event('resize'));
  }, [width, height]);
  var style = {
    width: width,
    height: height
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "screen",
      style: {
        left: "".concat((100 - zoom * 100) / 2, "%"),
        top: "".concat((100 - zoom * 100) / 2, "%"),
        width: "".concat(zoom * 100, "%"),
        height: "".concat(zoom * 100, "%")
      },
      children: [/*#__PURE__*/_jsxs("div", {
        ref: screenHeader,
        className: classnames('screen-info', {
          'is-active': true
        }),
        children: [/*#__PURE__*/_jsx("span", {
          children: "\u7EC4\u4EF6\u540D"
        }), /*#__PURE__*/_jsx("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "svg-icon icon attribute-setting",
          viewBox: "0 0 14 14",
          "aria-hidden": "true",
          children: /*#__PURE__*/_jsx("path", {
            d: "M7.512.295l5.039 2.91c.316.182.511.52.511.886v5.818c0 .366-.195.704-.511.886l-5.04 2.91a1.023 1.023 0 0 1-1.023 0l-5.039-2.91a1.023 1.023 0 0 1-.511-.886V4.091c0-.366.195-.704.511-.886L6.49.295a1.023 1.023 0 0 1 1.023 0zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          })
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "canvas-bg-area"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: classnames('zoom-area'),
      ref: moveableContainer,
      style: {
        transform: "scale(".concat(zoom, ")")
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: "canvas",
        style: style,
        children: children
      }), /*#__PURE__*/_jsx(MoveableManager, {
        container: moveableContainer.current
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Screen);