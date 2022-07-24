import React, { useCallback, useEffect, useRef } from 'react';
import Guides from '@scena/react-guides';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Ruler(props) {
  var zoom = props.zoom,
      _props$scrollY = props.scrollY,
      scrollY = _props$scrollY === void 0 ? 0 : _props$scrollY,
      _props$scrollX = props.scrollX,
      scrollX = _props$scrollX === void 0 ? 0 : _props$scrollX,
      onResetScroll = props.onResetScroll,
      onGuides = props.onGuides,
      offsetleft = props.offsetLeft;
  var box = useRef(null);
  var horizontal = useRef(null);
  var vertical = useRef(null);
  var guides = useRef({
    horizontal: [],
    vertical: []
  });
  var unit = 50;

  if (zoom < 0.8) {
    unit = Math.floor(1 / zoom) * 50;
  }

  var handleWindowResize = useCallback(function () {
    horizontal.current.resize();
    vertical.current.resize();
  }, []);
  useEffect(function () {
    horizontal.current.scroll(-scrollX / zoom);
    horizontal.current.scrollGuides(-scrollY / zoom);
    vertical.current.scroll(-scrollY / zoom);
    vertical.current.scrollGuides(-scrollX / zoom);
  }, [scrollX, scrollY, zoom]);
  var handleChangeGuides = useCallback(function (key) {
    return function (e) {
      guides.current[key] = e.guides;
      onGuides && onGuides(guides.current);
    };
  }, [onGuides]);
  var handleRulerReset = useCallback(function (e) {
    e.stopPropagation();
    onResetScroll();
  }, [onResetScroll]);
  useEffect(function () {
    window.addEventListener('resize', handleWindowResize);
    return function () {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);
  var handleClick = useCallback(function (e) {
    e.stopPropagation();
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: "ruler horizontal",
      onClick: handleClick,
      children: /*#__PURE__*/_jsx(Guides, {
        ref: horizontal,
        type: "horizontal",
        backgroundColor: "#f2f3f5",
        textColor: "#585858",
        lineColor: "#b1b1b1",
        displayDragPos: true,
        zoom: zoom,
        unit: unit,
        rulerStyle: {
          left: '30px',
          width: 'calc(100% - 30px)',
          height: '100%'
        },
        onChangeGuides: handleChangeGuides('horizontal')
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ruler vertical",
      style: {
        left: offsetleft
      },
      onClick: handleClick,
      children: /*#__PURE__*/_jsx(Guides, {
        ref: vertical,
        type: "vertical",
        backgroundColor: "#f2f3f5",
        textColor: "#585858",
        lineColor: "#b1b1b1",
        zoom: zoom,
        unit: unit,
        rulerStyle: {
          top: '30px',
          height: 'calc(100% - 30px)',
          width: '100%'
        },
        displayDragPos: true,
        onChangeGuides: handleChangeGuides('vertical')
      })
    }), /*#__PURE__*/_jsx("div", {
      ref: box,
      className: "box",
      style: {
        left: offsetleft
      },
      onClick: handleRulerReset
    })]
  });
}

export default /*#__PURE__*/React.memo(Ruler);