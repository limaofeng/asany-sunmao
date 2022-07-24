function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import { EventEmitter } from 'events';
import { defaultEqualityFn } from "../typings";
import { toBlockCoreDatas, useInternalSelector } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
export var Sketch = /*#__PURE__*/function () {
  function Sketch() {
    _classCallCheck(this, Sketch);

    _defineProperty(this, "dev", false);

    _defineProperty(this, "emitter", new EventEmitter());

    _defineProperty(this, "_components", new Map());
  }

  _createClass(Sketch, [{
    key: "add",
    value: function add(data) {
      var _this = this;

      this._components.set(data.id, data);

      this.trigger('add-component');
      return function () {
        return _this.remove(data.id);
      };
    }
  }, {
    key: "setDev",
    value: function setDev(dev) {
      this.dev = dev;
    }
  }, {
    key: "isDev",
    value: function isDev() {
      return this.dev;
    }
  }, {
    key: "remove",
    value: function remove(id) {
      this._components.delete(id);

      this.trigger('remove-component');
    }
  }, {
    key: "components",
    get: function get() {
      return Array.from(this._components.values());
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      var _this2 = this;

      this.emitter.on(eventName, callback);
      return function () {
        _this2.emitter.off(eventName, callback);
      };
    }
  }, {
    key: "trigger",
    value: function trigger(eventName) {
      var _this$emitter;

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      (_this$emitter = this.emitter).emit.apply(_this$emitter, [eventName].concat(params));
    }
  }, {
    key: "getBlock",
    value: function getBlock(key) {
      var _key$split = key.split(':'),
          _key$split2 = _slicedToArray(_key$split, 2),
          id = _key$split2[0],
          blkey = _key$split2[1];

      var component = this._components.get(id);

      console.log(component === null || component === void 0 ? void 0 : component.store.getState().blocks);
      return component === null || component === void 0 ? void 0 : component.store.getState().blocks.find(function (item) {
        return item.key === blkey;
      });
    }
  }, {
    key: "getComponent",
    value: function getComponent(key) {
      var _key$split3 = key.split(':'),
          _key$split4 = _slicedToArray(_key$split3, 1),
          id = _key$split4[0];

      return this._components.get(id);
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(id, data) {
      var component = this._components.get(id);

      if (!component) {
        return console.warn('component is null!');
      }

      var dispatch = component.store.dispatch;
      dispatch({
        type: 'UpdateAllBlockProps',
        payload: data
      });
      this.trigger('update-component');
    }
  }, {
    key: "updateBlock",
    value: function updateBlock(id, props) {
      var _id$split = id.split(':'),
          _id$split2 = _slicedToArray(_id$split, 2),
          comid = _id$split2[0],
          blkey = _id$split2[1];

      var component = this._components.get(comid);

      if (!component) {
        return console.warn('component is null!');
      }

      var dispatch = component.store.dispatch;
      dispatch({
        type: 'UpdateBlockProps',
        payload: {
          key: blkey,
          props: props
        }
      });
      this.trigger('update-component');
    }
  }, {
    key: "getComponentData",
    value: function getComponentData(id) {
      var component = this._components.get(id);

      if (!component) {
        throw new Error('component is null!');
      }

      return toBlockCoreDatas(component.store.getState().blocks);
    }
  }, {
    key: "useSelector",
    value: function useSelector(id, selector) {
      var equalityFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultEqualityFn;
      var zhis = this;
      return useInternalSelector(zhis, id, selector, equalityFn);
    }
  }]);

  return Sketch;
}();
export var SketchContext = /*#__PURE__*/React.createContext(new Sketch());
export var SketchProvider = function SketchProvider(props) {
  var children = props.children;
  var sketch = useMemo(function () {
    return new Sketch();
  }, []);
  return /*#__PURE__*/_jsx(SketchContext.Provider, {
    value: sketch,
    children: children
  });
};