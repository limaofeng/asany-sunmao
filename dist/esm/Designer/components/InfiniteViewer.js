function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import classnames from 'classnames';
import { drag } from '@daybrush/drag';
import { useDragDropManager, useDrop } from 'react-dnd';
import useSelector from "../hooks/useSelector";
import { calculateScaling } from "../reducers/ui.reducer/scena.reducer";
import { jsx as _jsx } from "react/jsx-runtime";

function sum(prev, current) {
  return prev + current;
}

function InfiniteViewer(props) {
  var className = props.className,
      onZoom = props.onZoom,
      onScroll = props.onScroll,
      style = props.style,
      isDrag = props.drag,
      children = props.children;
  var dustbin = useSelector(function (state) {
    return state.ui.scena.viewer.dustbin;
  });
  var ref = useRef(null);
  var state = useRef({
    scrollX: 0,
    scrollY: 0,
    zoom: 1 * 100
  });
  var store = useRef({
    xPoints: [],
    yPoints: [],
    zPoints: [],
    animationFrame: 0
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var _state$current = state.current,
      scrollX = _state$current.scrollX,
      scrollY = _state$current.scrollY;
  var zoom = state.current.zoom / 100;
  var manager = useDragDropManager();

  var _useDrop = useDrop({
    accept: 'dustbin',
    drop: function drop() {
      return {
        type: 'dustbin'
      };
    },
    canDrop: function canDrop(item, monitor) {
      return item.deleteable && monitor.isOver({
        shallow: true
      });
    },
    collect: function collect(monitor) {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({
          shallow: true
        }),
        handlerId: monitor.getHandlerId()
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      handlerId = _useDrop2[0].handlerId,
      connectDrop = _useDrop2[1];

  connectDrop(ref);
  useEffect(function () {
    if (!handlerId) {
      return;
    }

    var registry = manager.getRegistry();
    registry.types.set(handlerId, dustbin); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerId, dustbin.join(',')]);
  useEffect(function () {
    state.current.zoom = (props.zoom || 1) * 100;
    forceRender();
  }, [props.zoom]);
  useEffect(function () {
    state.current.scrollX = props.scrollX || 0;
    state.current.scrollY = props.scrollY || 0;
    forceRender();
  }, [props.scrollX, props.scrollY]);
  var handleZoom = useCallback(function (zoom) {
    var original = state.current.zoom;
    state.current.zoom = calculateScaling(state.current.zoom + zoom);
    onZoom ? onZoom(state.current.zoom / 100, original / 100) : forceRender();
  }, [onZoom]);
  var handleScroll = useCallback(function (x, y) {
    state.current.scrollX -= x;
    state.current.scrollY -= y;
    onScroll ? onScroll(state.current.scrollX, state.current.scrollY) : forceRender();
  }, [onScroll]);
  var handleGesture = useCallback(function () {
    if (store.current.zPoints.reduce(sum, 0) !== 0) {
      handleZoom(store.current.zPoints.reduce(sum, 0));
    } else {
      handleScroll(store.current.xPoints.reduce(sum, 0), store.current.yPoints.reduce(sum, 0));
    }

    store.current.xPoints = [];
    store.current.yPoints = [];
    store.current.zPoints = []; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleWheel = useCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var zoom = event.wheelDeltaX + event.wheelDeltaY;
    var deltaZ = zoom !== 0 && event.wheelDeltaX === 0 && Math.abs(event.wheelDeltaY) % 120 === 0;
    store.current.xPoints.push(event.deltaX);
    store.current.yPoints.push(event.deltaY);
    store.current.zPoints.push(deltaZ ? zoom > 0 ? 1 : -1 : 0);
    store.current.animationFrame = requestAnimationFrame(handleGesture); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (!ref.current) {
      return;
    }

    var ele = ref.current;
    ele.addEventListener('wheel', handleWheel);
    return function () {
      ele.removeEventListener('wheel', handleWheel); // eslint-disable-next-line react-hooks/exhaustive-deps

      cancelAnimationFrame(store.current.animationFrame);
    };
  }, [handleWheel]);
  useEffect(function () {
    if (!isDrag) {
      return;
    }

    var handleDrag = function handleDrag(e) {
      store.current.xPoints.push(-e.deltaX);
      store.current.yPoints.push(-e.deltaY);
      handleGesture();
    };

    var handleDragStart = function handleDragStart(e) {
      if (e.inputEvent.target.nodeName === 'A') {
        return;
      }
    };

    var dragger = drag(ref.current, {
      dragstart: handleDragStart,
      drag: handleDrag
    });
    return function () {
      dragger.unset();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrag]);
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    style: style,
    className: classnames('infinite-viewer', className),
    children: /*#__PURE__*/React.cloneElement(children, {
      scrollX: scrollX,
      scrollY: scrollY,
      zoom: zoom
    })
  });
}

InfiniteViewer.defaultProps = {
  scrollX: 0,
  scrollY: 0
};
export default /*#__PURE__*/React.memo(InfiniteViewer);