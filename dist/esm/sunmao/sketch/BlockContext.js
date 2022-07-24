var _excluded = ["getId", "onBlockClick", "onClick", "deps", "as", "blockKey", "children"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useContext, useMemo, useState } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
export var BlockContext = /*#__PURE__*/React.createContext({});
export function BlockRootProvider(props) {
  return /*#__PURE__*/_jsx(BlockContext.Provider, {
    value: {},
    children: props.children
  });
}
var BlockProvider = /*#__PURE__*/React.forwardRef(function BlockProvider(props, ref) {
  var getId = props.getId,
      onBlockClick = props.onBlockClick,
      onClick = props.onClick,
      deps = props.deps,
      as = props.as,
      blockKey = props.blockKey,
      children = props.children,
      otherProps = _objectWithoutProperties(props, _excluded);

  var handleClick = useCallback(function (e) {
    onBlockClick(e);
    onClick && onClick(e);
  }, [onBlockClick, onClick]);
  var element = useMemo(function () {
    if (!as) {
      return 'div';
    }

    if ( /*#__PURE__*/React.isValidElement(as)) {
      return /*#__PURE__*/React.forwardRef(function (_props, _ref) {
        var multiRef = useMergedRef(_ref, as.ref);
        return /*#__PURE__*/React.cloneElement(as, _objectSpread(_objectSpread({}, _props), {}, {
          className: classnames(as.props.className, _props.className),
          ref: multiRef
        }));
      });
    }

    return as;
  }, [as]);
  return useMemo(function () {
    return /*#__PURE__*/_jsx(BlockContext.Provider, {
      value: {
        parentBlockKey: blockKey
      },
      children: /*#__PURE__*/React.createElement(element, _objectSpread(_objectSpread({}, otherProps), {}, {
        onClick: handleClick,
        className: classnames("block-provider", props.className),
        ref: ref,
        id: getId()
      }), children)
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}); // TODO 会导致不能刷新 / 或者频繁刷新

export function buildBlockProvider(blockKey, cache) {
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    var handleGetId = useCallback(function () {
      return cache.current.id;
    }, []);
    var handleClick = useCallback(function (e) {
      var _ref2 = cache.current,
          onClick = _ref2.result.onClick;
      onClick(e);
    }, []);
    return /*#__PURE__*/_jsx(BlockProvider, _objectSpread(_objectSpread({
      getId: handleGetId
    }, props), {}, {
      blockKey: blockKey,
      onBlockClick: handleClick,
      ref: ref
    }));
  });
}
export function useBlockContext(key) {
  var context = useContext(BlockContext);

  var _useState = useState(function () {
    return {
      parentBlockKey: context.parentBlockKey,
      key: context.parentBlockKey ? context.parentBlockKey + '/' + key : key
    };
  }),
      _useState2 = _slicedToArray(_useState, 1),
      state = _useState2[0];

  return state;
}