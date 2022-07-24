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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useEffect, useReducer, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { sleep } from "../utils"; // 解析角度

export var parsingAngle = function parsingAngle(angle) {
  // 返回为字符串 进行判空
  if (angle === 'none' || !angle) return 0; // 根据矩阵解析对应角度

  var arr = angle.split('(')[1].split(')')[0].split(','); // 根据三角函数进行求解

  var aa = Math.round(180 * Math.asin(+arr[0]) / Math.PI);
  var bb = Math.round(180 * Math.acos(+arr[1]) / Math.PI);
  var cc = Math.round(180 * Math.asin(+arr[2]) / Math.PI);
  var dd = Math.round(180 * Math.acos(+arr[3]) / Math.PI);
  var deg = 0;

  if (aa === bb || -aa === bb) {
    deg = dd;
  } else if (-aa + bb === 180) {
    deg = 180 + cc;
  } else if (aa + bb === 180) {
    deg = 360 - cc || 360 - dd;
  }

  return deg >= 360 ? 0 : deg;
}; // 解析圆角

export var parsingRadius = function parsingRadius(radius) {
  var defaultValue = [0, 0, 0, 0];
  var arr = radius.split(',');
  if (!arr || arr.length === 0) return defaultValue;
  var currentRadius = arr.map(function (e) {
    return parseInt(e);
  });

  switch (currentRadius.length) {
    case 1:
      return new Array(4).fill(currentRadius[0]);

    case 2:
      return [currentRadius[0], currentRadius[1], currentRadius[0], currentRadius[1]];

    case 3:
      return [currentRadius[0], currentRadius[1], currentRadius[2], currentRadius[1]];

    case 4:
      return currentRadius;

    default:
      return defaultValue;
  }
};
var MAXIMUM = 10;

var loopGetElement = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element) {
    var i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(element.current === null && ++i <= MAXIMUM)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return sleep(100);

          case 4:
            _context.next = 1;
            break;

          case 6:
            return _context.abrupt("return", element.current);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loopGetElement(_x) {
    return _ref.apply(this, arguments);
  };
}();

var ResizeDataImpl = /*#__PURE__*/function () {
  function ResizeDataImpl() {
    _classCallCheck(this, ResizeDataImpl);

    _defineProperty(this, "rect", void 0);

    _defineProperty(this, "element", void 0);
  }

  _createClass(ResizeDataImpl, [{
    key: "setElement",
    value: function setElement(element) {
      this.element = element;
    }
  }, {
    key: "setRect",
    value: function setRect(rect) {
      this.rect = rect;
    }
  }, {
    key: "width",
    get: function get() {
      var _this$rect;

      return ((_this$rect = this.rect) === null || _this$rect === void 0 ? void 0 : _this$rect.width) || 0;
    }
  }, {
    key: "height",
    get: function get() {
      var _this$rect2;

      return ((_this$rect2 = this.rect) === null || _this$rect2 === void 0 ? void 0 : _this$rect2.height) || 0;
    }
  }, {
    key: "top",
    get: function get() {
      var _this$rect3;

      return ((_this$rect3 = this.rect) === null || _this$rect3 === void 0 ? void 0 : _this$rect3.top) || 0;
    }
  }, {
    key: "left",
    get: function get() {
      var _this$rect4;

      return ((_this$rect4 = this.rect) === null || _this$rect4 === void 0 ? void 0 : _this$rect4.left) || 0;
    }
  }, {
    key: "x",
    get: function get() {
      var _this$rect5;

      return ((_this$rect5 = this.rect) === null || _this$rect5 === void 0 ? void 0 : _this$rect5.x) || 0;
    }
  }, {
    key: "y",
    get: function get() {
      var _this$rect6;

      return ((_this$rect6 = this.rect) === null || _this$rect6 === void 0 ? void 0 : _this$rect6.y) || 0;
    }
  }, {
    key: "radius",
    get: function get() {
      if (!this.element) {
        return [0, 0, 0, 0];
      }

      var currentStyle = window.getComputedStyle(this.element, null);
      return parsingRadius(currentStyle.borderRadius);
    }
  }, {
    key: "rotate",
    get: function get() {
      if (!this.element) {
        return 0;
      }

      var currentStyle = window.getComputedStyle(this.element, null);
      return parsingAngle(currentStyle.transform);
    }
  }]);

  return ResizeDataImpl;
}();

function getElement(ele, self) {
  if (typeof self === 'string') {
    return self === 'self' ? ele : ele.parentElement;
  }

  return self(ele);
}

export default function useHTMLElementResize(baseline) {
  var self = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'self';
  var prev = useRef(baseline === null || baseline === void 0 ? void 0 : baseline.current);
  var value = useRef(new ResizeDataImpl());

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var ref = useRef(new ResizeObserver(function (entries) {
    var entry = entries[0];
    var rect = entry.contentRect;
    value.current.setRect(rect);
    forceRender();
  }));
  useEffect(function () {
    if (!baseline) {
      return;
    }

    loopGetElement(baseline).then(function (ele) {
      if (!ele) {
        return;
      }

      value.current.setElement(prev.current = getElement(ele, self));
      ref.current.observe(prev.current);
    });
    var resizeObserver = ref.current;
    return function () {
      if (resizeObserver && prev.current) {
        resizeObserver.unobserve(prev.current);
      }
    };
  }, [baseline, self]);
  return value.current;
}