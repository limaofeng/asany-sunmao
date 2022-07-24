function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var OptionButton = function OptionButton(props) {
  var onChange = props.onChange,
      tooltip = props.tooltip,
      icon = props.icon,
      className = props.className,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$value = props.value,
      value = _props$value === void 0 ? false : _props$value;
  var ref = useRef(null);

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      internalState = _useState2[0],
      setInternalState = _useState2[1];

  useEffect(function () {
    setInternalState(value);
  }, [value]);

  var handleMouseDown = function handleMouseDown() {
    var _ref$current;

    setInternalState(!internalState);
    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
  };

  var handleMouseUp = function handleMouseUp() {
    var _ref$current2;

    (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.blur();
  };

  var onClick = function onClick() {
    onChange && onChange(internalState);
  };

  return /*#__PURE__*/_jsx(Tooltip, {
    transitionName: "",
    mouseEnterDelay: 0.6,
    mouseLeaveDelay: 0.01,
    placement: "bottom",
    title: tooltip,
    children: /*#__PURE__*/_jsx("div", {
      ref: ref,
      style: style,
      className: classnames('option-button', {
        active: internalState
      }, className),
      tabIndex: 0,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onClick: onClick,
      children: icon && /*#__PURE__*/_jsx("div", {
        className: "icons-pane",
        children: /*#__PURE__*/_jsx(Icon, {
          name: icon
        })
      })
    })
  });
};

export default /*#__PURE__*/React.memo(OptionButton);