function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Resizer(props) {
  var className = props.className,
      handleClassName = props.handleClassName,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'x' : _props$direction,
      children = props.children,
      style = props.style;
  var onResizeStart = props.onResizeStart,
      onResize = props.onResize,
      onResizeEnd = props.onResizeEnd;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var state = useRef({
    x: 0,
    y: 0
  });
  var handleMouseMove = useCallback(function (e) {
    e.preventDefault();
    var position = state.current;
    var diff = 0;

    if (direction === 'x') {
      diff = position.x - e.clientX;
      diff && onResize(-diff);
    }

    if (direction === 'y') {
      diff = position.y - e.clientY;
      diff && onResize(diff);
    }

    updateStartPosition(e); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleMouseUp = useCallback(function (e) {
    onResizeEnd && onResizeEnd(e);
    setActive(false);
    removeListeners(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleMouseDown = useCallback(function (e) {
    e.preventDefault();
    onResizeStart && onResizeStart(e);
    updateStartPosition(e);
    setActive(true);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var updateStartPosition = useCallback(function (e) {
    state.current.x = e.clientX;
    state.current.y = e.clientY;
  }, []);
  var removeListeners = useCallback(function () {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(function () {
    return removeListeners;
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('resizer', className, 'direction-' + direction, {
      active: active
    }),
    style: style,
    children: [/*#__PURE__*/_jsx("div", {
      className: classnames('handle', handleClassName),
      onMouseDown: handleMouseDown
    }), children]
  });
}

export default /*#__PURE__*/React.memo(Resizer);