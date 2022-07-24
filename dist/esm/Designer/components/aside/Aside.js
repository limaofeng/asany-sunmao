function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useEditorDispatch, useEditorSelector } from "../../hooks";
import { UIActionType } from "../../reducers/actions";
import { visibleFilter } from "../../utils";
import { DynaActionFormContext, buildAside } from "../../utils/BlockAside";
import PropertiesPanel from "./PropertiesPanel";
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * 定制面板
 * @param props
 */
function Aside(_) {
  var visible = useEditorSelector(function (state) {
    return state.ui.aside.visible;
  });
  var dispatch = useEditorDispatch();

  var _useState = useState(60),
      _useState2 = _slicedToArray(_useState, 2),
      top = _useState2[0],
      setTop = _useState2[1];

  var externalTabs = useEditorSelector(function (state) {
    return state.ui.aside.tabs;
  });
  var width = useEditorSelector(function (state) {
    var _state$ui$aside$optio;

    return ((_state$ui$aside$optio = state.ui.aside.options) === null || _state$ui$aside$optio === void 0 ? void 0 : _state$ui$aside$optio.width) || 240;
  });
  var scenaToolbarVisible = useEditorSelector(function (state) {
    return state.ui.scena.toolbar.visible;
  });
  var customizer = useEditorSelector(function (state) {
    var _state$ui$aside$block;

    return (_state$ui$aside$block = state.ui.aside.block) === null || _state$ui$aside$block === void 0 ? void 0 : _state$ui$aside$block.customizer;
  });
  var initialValue = useEditorSelector(function (state) {
    var _state$ui$aside$block2;

    return (_state$ui$aside$block2 = state.ui.aside.block) === null || _state$ui$aside$block2 === void 0 ? void 0 : _state$ui$aside$block2.value;
  });
  var handleChange = useEditorSelector(function (state) {
    var _state$ui$aside$block3;

    return (_state$ui$aside$block3 = state.ui.aside.block) === null || _state$ui$aside$block3 === void 0 ? void 0 : _state$ui$aside$block3.update;
  });
  var watchValue = useEditorSelector(function (state) {
    var _state$ui$aside$block4;

    return (_state$ui$aside$block4 = state.ui.aside.block) === null || _state$ui$aside$block4 === void 0 ? void 0 : _state$ui$aside$block4.watchValue;
  }, isEqual);
  var cache = useRef({
    value: initialValue
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  useEffect(function () {
    if (!watchValue) {
      return;
    }

    return watchValue(function (value) {
      cache.current.value = value;
      forceRender();
    });
  }, [watchValue]); // eslint-disable-next-line react-hooks/exhaustive-deps

  var handleClose = useCallback(function () {
    return dispatch({
      type: UIActionType.CloseAside
    });
  }, []);
  var configuration = useRef(null);
  useEffect(function () {
    dispatch({
      type: UIActionType.AsideRef,
      payload: configuration
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var tabs = useMemo(function () {
    cache.current.value = initialValue;

    if (customizer) {
      return buildAside(customizer).map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          content: /*#__PURE__*/_jsx(item.content, {
            value: cache.current.value,
            onChange: handleChange
          })
        });
      });
    }

    if (externalTabs) {
      return externalTabs.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          content: /*#__PURE__*/_jsx(item.content, {
            value: cache.current.value,
            onChange: handleChange
          })
        });
      });
    }

    return []; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTabs, customizer]);
  useEffect(function () {
    var _ref = configuration.current,
        container = _ref.container;
    var navHeight = parseInt(getComputedStyle(container).getPropertyValue('--editor-navigation-height'));
    var top = navHeight + (scenaToolbarVisible ? 40 : 0);
    setTop(top);
  }, [scenaToolbarVisible]);
  return /*#__PURE__*/_jsx(DynaActionFormContext.Provider, {
    value: cache.current.value,
    children: /*#__PURE__*/_jsx(PropertiesPanel, {
      className: "sketch-configuration",
      ref: configuration,
      style: _objectSpread({
        top: top,
        width: width
      }, visible ? {} : {
        transform: "translate3d(".concat(width, "px, 0, 0)")
      }),
      tabs: tabs.filter(visibleFilter(cache.current.value)),
      onClose: handleClose
    })
  });
}

export default /*#__PURE__*/React.memo(Aside);