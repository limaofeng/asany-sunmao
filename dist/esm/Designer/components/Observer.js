function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EventEmitter } from 'events';
import isEqual from 'lodash/isEqual';

var BlockObserver = /*#__PURE__*/function () {
  function BlockObserver(key, values) {
    _classCallCheck(this, BlockObserver);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "values", {});

    _defineProperty(this, "eventEmitter", void 0);

    this.key = key;
    this.eventEmitter = new EventEmitter();
    this.values = _objectSpread({}, values);
  }

  _createClass(BlockObserver, [{
    key: "on",
    value: function on(name, callback) {
      this.eventEmitter.on(name, callback);
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      this.eventEmitter.off(name, callback);
    }
  }, {
    key: "observe",
    value: function observe(values) {
      for (var _i = 0, _Object$keys = Object.keys(values || {}); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (!isEqual(this.values[key], values[key])) {
          if (!this.eventEmitter.eventNames().includes(key)) {
            console.warn(this.key, 'key = ', key, '在 customizer.fields 中未声明!');
          }

          if (this.eventEmitter.emit(key, values[key], this.values[key])) {
            this.values[key] = values[key];
          }
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.eventEmitter.eventNames().forEach(this.eventEmitter.removeAllListeners.bind(this.eventEmitter));
    }
  }]);

  return BlockObserver;
}();

export default BlockObserver;