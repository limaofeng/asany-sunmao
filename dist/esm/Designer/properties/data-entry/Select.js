function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@asany/icons';
import { Popover } from 'antd';
import classnames from 'classnames';
import { useClickAway } from 'react-use';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function defaultRenderTitle(value) {
  return value === null || value === void 0 ? void 0 : value.label;
}

function defaultCompare(value, option) {
  return value === option.value;
}

var renderSelectOption = function renderSelectOption(compare, onChange) {
  return function (option) {
    var label = option.label;

    if (option.hasOwnProperty('value')) {
      var item = option;

      var handleClick = function handleClick() {
        onChange(item.value);
      };

      return /*#__PURE__*/_jsxs("li", {
        className: "asayneditor-select-option",
        onClick: handleClick,
        children: [/*#__PURE__*/_jsx("span", {
          className: "left-icon",
          children: compare(item) && /*#__PURE__*/_jsx(Icon, {
            name: "AsanyEditor/VectorCorrect"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "center-text",
          children: item.label
        })]
      }, item.value);
    } else {
      var _ref = option,
          options = _ref.options;
      return /*#__PURE__*/_jsxs("li", {
        className: "asayneditor-select-option-group",
        children: [/*#__PURE__*/_jsx("span", {
          className: "group-name",
          children: option.label
        }), /*#__PURE__*/_jsx("ul", {
          children: (options || []).map(renderSelectOption(compare, onChange))
        })]
      }, label.toString());
    }
  };
}; // 列表组件


var SelectModal = /*#__PURE__*/React.memo(function (props) {
  var compare = props.compare,
      onChange = props.onChange,
      options = props.options,
      close = props.close;
  var ref = useRef(null);
  useClickAway(ref, function () {
    close();
  });
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    children: /*#__PURE__*/_jsx("ul", {
      className: "dsign-list",
      children: options.map(renderSelectOption(compare, onChange))
    })
  });
});

var renderIcon = function renderIcon(icon) {
  if (typeof icon === 'string') {
    return /*#__PURE__*/_jsx(Icon, {
      className: "select-icon",
      name: icon
    });
  }

  return /*#__PURE__*/React.cloneElement(icon, {
    className: 'select-icon'
  });
};

var defaultGetOption = function defaultGetOption(options, value) {
  if (!value) {
    return;
  }

  if (typeof value !== 'string') {
    return value;
  }

  var val;

  var _iterator = _createForOfIteratorHelper(options),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _option = _step.value;

      if (_option.hasOwnProperty('options')) {
        val = defaultGetOption(_option.options, value);
      } else if (_option.value === value) {
        val = _option;
      }

      if (val) {
        return val;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return;
}; // 列表套件


var Select = function Select(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      onChange = props.onChange,
      _props$renderTitle = props.renderTitle,
      renderTitle = _props$renderTitle === void 0 ? defaultRenderTitle : _props$renderTitle,
      icon = props.icon,
      initialValue = props.value,
      _props$compare = props.compare,
      compare = _props$compare === void 0 ? defaultCompare : _props$compare,
      _props$getOption = props.getOption,
      getOption = _props$getOption === void 0 ? defaultGetOption : _props$getOption,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '请选择' : _props$placeholder,
      _props$popover = props.popover,
      SelectPopover = _props$popover === void 0 ? SelectModal : _props$popover,
      popoverClassName = props.popoverClassName,
      _props$dropdownMatchS = props.dropdownMatchSelectWidth,
      dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS,
      className = props.className;
  var ref = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(initialValue),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      width = _useState6[0],
      setWidth = _useState6[1];

  useEffect(function () {
    if (initialValue === value) {
      return;
    }

    setValue(initialValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);
  var handleClick = useCallback(function () {
    setVisible(!visible);
  }, [visible]);
  var handleChangeValue = useCallback(function (value) {
    onChange && onChange(value);
    !initialValue && setValue(value);
    setVisible(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var optionCompare = useCallback(function (option) {
    if (!value) {
      return false;
    }

    return compare(value, option);
  }, [value, compare]);
  var handleClose = useCallback(function () {
    setVisible(false);
  }, []);
  useEffect(function () {
    if (dropdownMatchSelectWidth === true) {
      var _ref$current;

      var _width = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect().width;

      _width && setWidth(_width);
    } else if (typeof dropdownMatchSelectWidth == 'number') {
      setWidth(dropdownMatchSelectWidth);
    }
  }, [dropdownMatchSelectWidth]);

  var popoverContent = /*#__PURE__*/_jsx(SelectPopover, {
    visible: visible,
    value: value,
    close: handleClose,
    compare: optionCompare,
    options: options,
    onChange: handleChangeValue
  });

  return /*#__PURE__*/_jsx(Popover, {
    placement: "bottomLeft",
    visible: visible,
    align: {
      targetOffset: [0, 0],
      offset: [0, -32]
    },
    overlayInnerStyle: {
      width: width
    },
    arrowPointAtCenter: false,
    overlayClassName: classnames('asanyeditor-dsign-popover', popoverClassName),
    content: popoverContent,
    transitionName: "",
    children: /*#__PURE__*/_jsxs("div", {
      ref: ref,
      className: classnames('dsign-popover-select', className, {
        'exist-icon': !!icon
      }),
      onClick: handleClick,
      children: [icon && renderIcon(icon), /*#__PURE__*/_jsx("div", {
        className: "select-title",
        placeholder: placeholder,
        children: renderTitle(getOption(options, value))
      }), /*#__PURE__*/_jsx("div", {
        className: "indicator",
        children: /*#__PURE__*/_jsx(Icon, {
          name: "AsanyEditor/DownArrow"
        })
      })]
    })
  });
};

export default /*#__PURE__*/memo(Select);