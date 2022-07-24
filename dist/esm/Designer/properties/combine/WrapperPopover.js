function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Popover } from 'antd';
import { useClickAway } from 'react-use';
import isEqual from 'lodash/isEqual';
import WrapperPopoverContent from "./WrapperPopoverContent";
import "./style/WrapperPopover.less";
import { jsx as _jsx } from "react/jsx-runtime";
WrapperPopover.defaultProps = {
  /** 点击其他地方关闭当前 */
  closeOnClickAway: true
};

function WrapperPopover(props) {
  var data = props.data,
      children = props.children,
      showPopoverImmediatelyAtCreated = props.showPopoverImmediatelyAtCreated,
      _props$ContentRendere = props.ContentRenderer,
      ContentRenderer = _props$ContentRendere === void 0 ? WrapperPopoverContent : _props$ContentRendere,
      popoverContentWidth = props.width,
      popoverContentMaxHeight = props.maxHeight,
      fields = props.fields,
      onChange = props.onChange,
      closeOnClickAway = props.closeOnClickAway;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var contentComponentRef = useRef(null);
  var itemRef = useRef();
  var contentRef = useRef(null);
  var handlePopoverContentClose = useCallback(function () {
    contentComponentRef.current = null;
    setVisible(false);
  }, []);
  var handleContentChange = useCallback(function (value) {
    onChange(_objectSpread(_objectSpread({}, data), {}, {
      data: _objectSpread({}, value)
    }));
  }, [data, onChange]);
  var handlePopoverContentShow = useCallback(function () {
    setVisible(true);
  }, [setVisible]);
  useEffect(function () {
    if (showPopoverImmediatelyAtCreated && data.state === 'isNew') {
      handlePopoverContentShow();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [data.state]);
  useClickAway(contentRef, function () {
    // 如果该属性为 true, 则关闭 popoverContent
    if (closeOnClickAway) {
      handlePopoverContentClose();
    }
  });
  return /*#__PURE__*/_jsx(Popover, {
    visible: visible,
    content: /*#__PURE__*/_jsx(ContentRenderer, {
      contentRef: contentRef,
      fields: fields,
      width: popoverContentWidth,
      maxHeight: popoverContentMaxHeight,
      value: data.data,
      onChange: handleContentChange,
      onClose: handlePopoverContentClose
    }),
    overlayClassName: "wrapper-popover",
    placement: "leftTop",
    children: /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread({}, props), {}, {
      onEdit: handlePopoverContentShow,
      itemRef: itemRef
    }))
  });
}

export default /*#__PURE__*/memo(WrapperPopover, function (prev, next) {
  return isEqual(prev.data, next.data);
});