var _templateObject;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { memo, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import devices from "../assets/devices";
import useSelector from "../hooks/useSelector";
import useHTMLElementResize from "../hooks/useHTMLElementResize";
import ScrubbableControl from "./data-entry/ScrubbableControl";
import SegmentedControl from "./data-entry/SegmentedControl";
import Select from "./data-entry/Select";
import IconButton from "./IconButton";
import OptionButton from "./OptionButton";
import RadiusAllSetting from "./RadiusAllSetting";
import { IconsConst } from "./typings";
import { inputFormat, radiusFormat, rotateFormat } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var deviceTypes = devices.reduce(function (l, r) {
  var _r$size;

  var type = l.find(function (item) {
    return item.label === r.device[1];
  });

  if (!type) {
    l.push(type = {
      label: r.device[1],
      options: []
    });
  }

  type.options.push({
    label: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("span", {
        className: "device-name",
        children: r.name
      }), /*#__PURE__*/_jsx("span", {
        className: "device-size",
        children: r === null || r === void 0 ? void 0 : (_r$size = r.size) === null || _r$size === void 0 ? void 0 : _r$size.join('x')
      })]
    }),
    value: r.size.join('x')
  });
  return l;
}, []);
var CustomIcon = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 0 0 32px;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  color: var(--primary-disabled-color);\n  font-size: 12px;\n  line-height: 32px;\n  pointer-events: none;\n"])));

var CurrentElementInformation = function CurrentElementInformation() {
  // 用于状态的变更
  var state = useRef({});

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var screen = useSelector(function (state) {
    return state.ui.scena.screen;
  }); // TODO: useHTMLElementResize 函数入参类型应该调整为 HTMLElement

  var _useHTMLElementResize = useHTMLElementResize(document.body),
      width = _useHTMLElementResize.width,
      height = _useHTMLElementResize.height,
      x = _useHTMLElementResize.x,
      y = _useHTMLElementResize.y,
      rotate = _useHTMLElementResize.rotate,
      radius = _useHTMLElementResize.radius;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      notchActive = _useState2[0],
      setNotchActive = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      radiusDisabled = _useState4[0],
      setRadiusDisabled = _useState4[1];

  useEffect(function () {
    var _state$current;

    state.current = (_state$current = {}, _defineProperty(_state$current, IconsConst.X, x), _defineProperty(_state$current, IconsConst.Y, y), _defineProperty(_state$current, IconsConst.W, width), _defineProperty(_state$current, IconsConst.H, height), _defineProperty(_state$current, IconsConst.Rotate, "".concat(rotate, "\xB0")), _defineProperty(_state$current, IconsConst.Radius, radius), _state$current);
    forceRender();
  }, [height, radius, rotate, width, x, y]);

  var iconsHandleChange = function iconsHandleChange(type) {
    return function (state) {
      switch (type) {
        case IconsConst.Semicircle:
          setRadiusDisabled(state);
          break;

        case IconsConst.Notch:
          setNotchActive(state);
          break;

        default:
          break;
      }
    };
  };

  var handleChange = function handleChange(type) {
    return function (value) {
      state.current[type] = value;
      console.log(state.current);
      forceRender();
    };
  };

  var handleFrameSizeChange = function handleFrameSizeChange(state) {
    console.log('---------', state, {
      label: screen.name,
      value: screen.id
    }); // dispatch({
    //   type: UIActionType.ChangeScreenSize,
    //   payload: state,
    // });
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "design-current-box",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "design-rows design-colums current-box-header",
      children: [/*#__PURE__*/_jsx(Select, {
        className: "header-font design-rows-items frame-preset-dropdown",
        popoverClassName: "asanyeditor-frame-preset-popover",
        renderTitle: function renderTitle() {
          return '画框';
        },
        dropdownMatchSelectWidth: 224,
        value: {
          label: screen.name,
          value: screen.size.join('x')
        },
        options: _toConsumableArray(deviceTypes),
        onChange: handleFrameSizeChange
      }), /*#__PURE__*/_jsx(SegmentedControl, {
        options: [{
          value: 'Portrait',
          icon: 'AsanyEditor/Portrait',
          label: '竖屏'
        }, {
          value: 'Landscape',
          icon: 'AsanyEditor/Landscape',
          label: '横屏'
        }]
      }), /*#__PURE__*/_jsx(IconButton, {
        className: "resize-to-fit",
        icon: "AsanyEditor/ResizeToFit"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "current-box-content",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "design-rows design-colums content-col",
        children: [/*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange(IconsConst.X),
          value: state.current[IconsConst.X],
          icon: /*#__PURE__*/_jsx(CustomIcon, {
            children: "X"
          })
        }), /*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange(IconsConst.Y),
          value: state.current[IconsConst.Y],
          icon: /*#__PURE__*/_jsx(CustomIcon, {
            children: "Y"
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "design-rows design-colums content-col",
        children: [/*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange(IconsConst.W),
          value: state.current[IconsConst.W],
          icon: /*#__PURE__*/_jsx(CustomIcon, {
            children: "W"
          })
        }), /*#__PURE__*/_jsx(ScrubbableControl, {
          format: inputFormat,
          onChange: handleChange(IconsConst.H),
          value: state.current[IconsConst.H],
          icon: /*#__PURE__*/_jsx(CustomIcon, {
            children: "H"
          })
        }), /*#__PURE__*/_jsx(OptionButton, {
          onChange: iconsHandleChange(IconsConst.Notch),
          icon: notchActive ? 'AsanyEditor/ConstrainProportionsOn' : 'AsanyEditor/ConstrainProportionsOff'
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "design-rows design-colums content-col",
        children: [/*#__PURE__*/_jsx(ScrubbableControl, {
          format: rotateFormat,
          onChange: handleChange(IconsConst.Rotate),
          value: state.current[IconsConst.Rotate],
          icon: "AsanyEditor/VectorRotate"
        }), /*#__PURE__*/_jsx(ScrubbableControl, {
          value: state.current[IconsConst.Radius],
          format: radiusFormat,
          onChange: handleChange(IconsConst.Radius),
          disabled: radiusDisabled,
          icon: "AsanyEditor/TopLeftCornerRadius"
        }), /*#__PURE__*/_jsx(OptionButton, {
          onChange: iconsHandleChange(IconsConst.Semicircle),
          icon: "AsanyEditor/VectorSemicircle"
        })]
      }), radiusDisabled && /*#__PURE__*/_jsx(RadiusAllSetting, {
        value: state.current[IconsConst.Radius],
        onChange: handleChange(IconsConst.Radius)
      }), /*#__PURE__*/_jsx("div", {
        className: "clipping-box",
        children: /*#__PURE__*/_jsx(Checkbox, {
          onChange: handleChange(IconsConst.Clipping),
          children: "\u526A\u88C1\u5185\u5BB9"
        })
      })]
    })]
  });
};

export default /*#__PURE__*/memo(CurrentElementInformation);