function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React from 'react';
import { Radio, Select } from 'antd';
import MultipleWrapper from "../combine/MultipleWrapper";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var EmptyRenderer = function EmptyRenderer() {
  return /*#__PURE__*/_jsx(_Fragment, {});
};

function lgc(sunmao, name) {
  var _sunmao$getComponent;

  return (_sunmao$getComponent = sunmao.getComponent(name)) === null || _sunmao$getComponent === void 0 ? void 0 : _sunmao$getComponent.component;
}

function cr(sunmao, name) {
  return {
    name: name.split('.').reverse()[0],
    component: lgc(sunmao, name) || EmptyRenderer,
    props: {}
  };
}

function cre() {
  return {
    component: EmptyRenderer,
    props: {}
  };
}

function crbc(component) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var name = arguments.length > 2 ? arguments[2] : undefined;
  return {
    name: name,
    component: component || EmptyRenderer,
    props: props
  };
}

export function getDefaultRenderer(sunmao, library, item) {
  switch (item.type) {
    case 'Integer':
      return cr(sunmao, "".concat(library, ".InputNumber"));

    case 'String':
      return cr(sunmao, "".concat(library, ".Input"));

    case 'Boolean':
      var comTemp = cr(sunmao, "".concat(library, ".Checkbox"));
      return crbc(comTemp.component, {
        children: item.label
      }, comTemp.name);

    case 'Enum':
      var props = {
        style: {
          width: '100%'
        }
      };

      if (item.enumeration) {
        props.children = item.enumeration.values.map(function (v) {
          return /*#__PURE__*/_jsx(Select.Option, {
            value: v.value,
            children: v.name
          }, v.value);
        });
      }

      return {
        component: Select,
        props: props
      };

    default:
      return cre();
  }
}

function getBasisRenderer(sunmao, library, item) {
  if (!item.renderer) {
    return getDefaultRenderer(sunmao, library, item);
  }

  if (typeof item.renderer === 'string') {
    switch (item.type) {
      case 'Enum':
        // 枚举类型
        var props = {
          style: {
            width: '100%'
          }
        };

        if (item.enumeration) {
          props.children = item.enumeration.values.map(function (v) {
            return /*#__PURE__*/_jsx(Radio.Button, {
              value: v.value,
              children: v.name
            }, v.value);
          });
        }

        return {
          component: Radio.Group,
          props: props
        };

      default:
        return cr(sunmao, "".concat(library, ".").concat(item.renderer));
    }
  } // item.renderer


  if (!item.renderer.hasOwnProperty('component')) {
    return crbc(item.renderer, {});
  }

  if (typeof item.renderer['component'] === 'string') {
    if (item.renderer['props']) {
      var _cr = cr(sunmao, "".concat(library, ".").concat(item.renderer['component'])),
          component = _cr.component,
          name = _cr.name;

      return crbc(component, item.renderer['props'], name);
    }

    return cr(sunmao, "".concat(library, ".").concat(item.renderer['component']));
  }

  return crbc(item.renderer['component'], item.renderer['props']);
}

export function getRenderer(sunmao, library, item) {
  var render = getBasisRenderer(sunmao, library, item);

  if (item.wrappers) {
    if (item.wrapperRender) {
      return item.wrapperRender;
    }

    var root = render;

    var _iterator = _createForOfIteratorHelper(_toConsumableArray(item.wrappers).reverse()),
        _step;

    try {
      var _loop = function _loop() {
        var wrap = _step.value;
        var wrapper = getBasisRenderer(sunmao, library, {
          renderer: wrap
        });
        var _root = root,
            ChildrenRender = _root.component,
            childProps = _root.props;

        wrapper.component = function (Wrapper) {
          return function (props) {
            return /*#__PURE__*/_jsx(Wrapper, _objectSpread(_objectSpread({}, props), {}, {
              children: /*#__PURE__*/_jsx(ChildrenRender, _objectSpread({}, childProps))
            }));
          };
        }(wrapper.component);

        root = wrapper;
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return item.wrapperRender = root;
  }

  if (item.multiple) {
    return {
      component: MultipleWrapper,
      props: {
        title: item.label,
        isObject: item.type === 'JSON'
      }
    };
  }

  return render;
}