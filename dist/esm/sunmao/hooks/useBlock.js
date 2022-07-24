function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import useSketch from "../hooks/useSketch";
import { buildBlockProvider, useBlockContext } from "../sketch/BlockContext";
import { ReactComponentContext, useDispatch } from "../sketch/ReactComponentProvider";

function useBlock(options) {
  var sketch = useSketch();
  var store = useContext(ReactComponentContext); // 获取 block 的 key 即原来的 parentBlockKey + key

  var _useBlockContext = useBlockContext(options.key),
      key = _useBlockContext.key;

  var cache = useRef({
    id: store.id + ':' + key,
    key: key,
    options: options,
    result: []
  });
  var latestProps = useRef(options.props); // 创建 BlockProvider，组合 useBlockContext 使用
  // eslint-disable-next-line react-hooks/exhaustive-deps

  var Provider = useMemo(function () {
    return buildBlockProvider(key, cache);
  }, []);
  var dispatch = useDispatch();

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      version = _useReducer2[0],
      forceRender = _useReducer2[1];

  var handleChange = useCallback(function (props, value) {
    var key = cache.current.key;

    if (value) {
      dispatch({
        type: 'UpdateBlockProps',
        payload: {
          key: key,
          props: _objectSpread(_objectSpread({}, latestProps.current), {}, _defineProperty({}, props, value))
        }
      });
    } else {
      dispatch({
        type: 'UpdateBlockProps',
        payload: {
          key: key,
          props: props
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var handleClick = useCallback(function (e) {
    var id = cache.current.id;
    e && e.stopPropagation();
    sketch.trigger('block-click', id); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 向 workspace 中注册当前 block

  useEffect(function () {
    var _cache$current = cache.current,
        id = _cache$current.id,
        key = _cache$current.key,
        options = _cache$current.options;
    dispatch({
      type: 'RegistrationBlock',
      payload: _objectSpread(_objectSpread({}, options), {}, {
        customizer: options.customizer || {
          fields: []
        },
        component: store.id,
        update: handleChange,
        click: handleClick,
        key: key,
        id: id
      })
    });
    return function () {
      dispatch({
        type: 'UninstallBlock',
        payload: {
          key: key
        }
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleMouseEnter = useCallback(function () {
    var id = cache.current.id;
    sketch.trigger('block-mouse-enter', id); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleMouseLeave = useCallback(function () {
    var id = cache.current.id;
    sketch.trigger('block-mouse-leave', id); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    var ele = document.getElementById(cache.current.id);

    if (!ele) {
      return console.warn('未发现' + cache.current.key + ', 对应的 HTML 元素');
    }

    ele.addEventListener('mouseenter', handleMouseEnter);
    ele.addEventListener('mouseleave', handleMouseLeave);
    return function () {
      ele.removeEventListener('mouseenter', handleMouseEnter);
      ele.removeEventListener('mouseleave', handleMouseLeave);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var checkForUpdates = useCallback(function () {
    var _store$getState$block;

    var key = cache.current.key;
    var newProps = ((_store$getState$block = store.getState().blocks.find(function (_ref) {
      var itemKey = _ref.key;
      return itemKey === key;
    })) === null || _store$getState$block === void 0 ? void 0 : _store$getState$block.props) || latestProps.current;

    if (isEqual(newProps, latestProps.current)) {
      return;
    }

    latestProps.current = newProps;
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    return store.subscribe(checkForUpdates); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  cache.current.result = useMemo(function () {
    return _objectSpread(_objectSpread({}, cache.current.options), {}, {
      id: cache.current.id,
      component: store.id,
      onClick: handleClick,
      update: handleChange,
      props: latestProps.current,
      Provider: Provider,
      version: version,
      key: key
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [latestProps.current, version]);
  return cache.current.result;
}

export default useBlock;