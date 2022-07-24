var _excluded = ["children"],
    _excluded2 = ["children"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import { InputNumber, Popover } from 'antd';
import devices from "../../../assets/devices";
import { useEditorDispatch, useEditorSelector } from "../../../hooks";
import { UIActionType } from "../../../reducers/actions";
import Screen from "../Screen";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

/**
 * 设备列表
 * @param props
 */
export function DeviceList(props) {
  var value = props.value,
      onChange = props.onChange;

  var handleClick = function handleClick(device) {
    return function () {
      onChange(device);
    };
  };

  var types = devices.reduce(function (l, r) {
    var type = l.find(function (item) {
      return item.name === r.device[1];
    });

    if (!type) {
      l.push(type = {
        name: r.device[1],
        children: []
      });
    }

    type.children.push(r);
    return l;
  }, []);
  return types.map(function (item) {
    return /*#__PURE__*/_jsxs("div", {
      className: "screen-picker-device-type",
      children: [/*#__PURE__*/_jsx("span", {
        className: "screen-picker-device-header",
        children: item.name.toUpperCase()
      }), /*#__PURE__*/_jsx("ul", {
        children: item.children.map(function (device) {
          return /*#__PURE__*/_jsxs("li", {
            onClick: handleClick(device),
            children: [value.id === device.id && 'CheckOutlined', /*#__PURE__*/_jsx("span", {
              className: "device-name",
              children: device.name
            }), /*#__PURE__*/_jsx("span", {
              className: "device-size",
              children: device.size.join('x')
            })]
          }, device.id);
        })
      })]
    }, item.name);
  });
}

/**
 * 屏幕尺寸调整组件
 * @param props
 */
function ScreenSize(props) {
  var label = props.label,
      value = props.value;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var handleFocus = function handleFocus() {
    setFocused(true);
  };

  var handleBlur = function handleBlur() {
    setFocused(false);
  };

  return /*#__PURE__*/_jsxs("label", {
    className: classnames({
      'is-active': focused
    }),
    children: [/*#__PURE__*/_jsx("span", {
      className: "title",
      children: label
    }), /*#__PURE__*/_jsx(InputNumber, {
      value: value,
      onFocus: handleFocus,
      onBlur: handleBlur
    })]
  });
}
/**
 * 屏幕选择组件
 * @param props
 */


function DeviceScreenPicker() {
  var dispatch = useEditorDispatch();

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var screen = useEditorSelector(function (state) {
    return state.ui.scena.screen;
  });

  var _screen$size = _slicedToArray(screen.size, 2),
      width = _screen$size[0],
      height = _screen$size[1];

  var handleClick = useCallback(function () {
    setVisible(!visible);
  }, [visible]);
  var handleChangeValue = useCallback(function (value) {
    dispatch({
      type: UIActionType.ChangeScreenSize,
      payload: value
    });
    setVisible(false);
  }, [dispatch]);
  return /*#__PURE__*/_jsxs("div", {
    className: "screen-picker",
    children: [/*#__PURE__*/_jsx(Popover, {
      placement: "bottom",
      visible: visible,
      overlayClassName: "screen-picker-popover-devices",
      content: /*#__PURE__*/_jsx(DeviceList, {
        value: screen,
        onChange: handleChangeValue
      }),
      transitionName: "",
      children: /*#__PURE__*/_jsxs("div", {
        className: "screen-picker-current",
        onClick: handleClick,
        children: [/*#__PURE__*/_jsx("div", {
          className: "screen-picker-item",
          children: screen && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("div", {
              className: "screen-picker-icon"
            }), /*#__PURE__*/_jsxs("div", {
              className: "screen-picker-device",
              children: [/*#__PURE__*/_jsx("div", {
                className: "screen-picker-device-name",
                children: screen.name
              }), /*#__PURE__*/_jsx("div", {
                className: "screen-picker-device-size",
                children: screen.size.join('x')
              })]
            })]
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "screen-picker-more",
          children: "DownOutlined"
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "screen-size",
      children: [/*#__PURE__*/_jsx(ScreenSize, {
        label: "W",
        value: width
      }), /*#__PURE__*/_jsx(ScreenSize, {
        label: "H",
        value: height
      })]
    })]
  });
}

export var ScreenPicker = /*#__PURE__*/React.memo(DeviceScreenPicker);

function ScreenViewport(props) {
  var children = props.children,
      _props$scrollX = props.scrollX,
      scrollX = _props$scrollX === void 0 ? 0 : _props$scrollX,
      _props$scrollY = props.scrollY,
      scrollY = _props$scrollY === void 0 ? 0 : _props$scrollY,
      width = props.width,
      height = props.height;
  var sidebarWidth = useEditorSelector(function (state) {
    return state.ui.sidebar.width;
  });
  var sidebarMinWidth = useEditorSelector(function (state) {
    return state.ui.sidebar.minWidth;
  });
  var sidebarMinimizable = useEditorSelector(function (state) {
    return state.ui.sidebar.minimizable;
  });
  var screenId = useEditorSelector(function (state) {
    return state.ui.scena.screen.id;
  });
  var style = useMemo(function () {
    if (screenId !== 'fullscreen') {
      return {
        width: width,
        height: height,
        transform: "matrix(1, 0, 0, 1, ".concat(scrollX, ", ").concat(scrollY, ")")
      };
    }

    var _sidebarWidth = sidebarWidth;

    if (sidebarMinimizable) {
      _sidebarWidth = 0;
    } else {
      _sidebarWidth = Math.max(sidebarMinWidth, _sidebarWidth);
    }

    return {
      marginLeft: _sidebarWidth,
      display: 'flex',
      width: "calc(100% - ".concat(_sidebarWidth, "px)"),
      minHeight: "100%"
    };
  }, [screenId, width, height, scrollX, scrollY, sidebarWidth, sidebarMinimizable, sidebarMinWidth]);
  return /*#__PURE__*/_jsx("div", {
    className: "screen-viewport",
    style: style,
    children: /*#__PURE__*/_jsx(Screen, {
      children: children
    })
  });
}

export default /*#__PURE__*/React.memo(ScreenViewport, function (_ref, _ref2) {
  var prevChildren = _ref.children,
      prevProps = _objectWithoutProperties(_ref, _excluded);

  var nextChildren = _ref2.children,
      nextProps = _objectWithoutProperties(_ref2, _excluded2);

  return prevChildren === nextChildren && isEqual(prevProps, nextProps);
});