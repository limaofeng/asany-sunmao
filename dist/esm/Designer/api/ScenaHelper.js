function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { sleep } from "../utils";
import { getScena } from "../utils/plugin";
import devices from "../assets/devices";
import { ActionType } from "../reducers/actions";

var ScenaHelperImpl = /*#__PURE__*/function () {
  function ScenaHelperImpl(editor) {
    var _this = this;

    _classCallCheck(this, ScenaHelperImpl);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "_toolbar", void 0);

    this.editor = editor;
    this._toolbar = {
      has: function has(key) {
        if (key === ':visible') {
          return _this.editor.scena.state.toolbar.visible;
        }

        return false;
      },

      /**
       *
       * @param key
       */
      select: function select(key) {
        var tools = _this.editor.state.ui.scena.toolbar.tools;
        var item = tools.find(function (item) {
          return item.id === key;
        });
        var mutexs = item.mutex ? tools.filter(function (t) {
          return t.mutex === item.mutex;
        }) : [];

        if (mutexs.length) {
          var _this$_toolbar;

          (_this$_toolbar = _this._toolbar).unselect.apply(_this$_toolbar, _toConsumableArray(mutexs.map(function (item) {
            return item.id;
          })));
        }

        _this.editor.dispatch({
          type: ActionType.ScenaToolbarSelect,
          payload: key
        });
      },
      unselect: function unselect() {
        for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        _this.editor.store.dispatch({
          type: ActionType.ScenaToolbarUnSelect,
          payload: keys
        });
      },

      /**
       * 设置工具栏是否可见
       * @param enable
       */
      visible: function visible(enable) {
        _this.editor.dispatch({
          type: ActionType.ScenaToggleVisible,
          payload: enable
        });
      },

      /**
       * 重设工具栏
       * @param tools
       */
      tools: function tools(_tools) {
        _this.editor.dispatch({
          type: ActionType.ScenaSetToolbar,
          payload: _tools
        });
      },

      /**
       * 重设工具栏
       * @param tools
       */
      reset: function reset() {
        var scena = getScena(_this.editor.state, _this.editor.state.project.type);

        _this.editor.dispatch({
          type: ActionType.ScenaSetToolbar,
          payload: scena.toolbar.tools
        });

        _this.editor.dispatch({
          type: ActionType.ScenaToggleVisible,
          payload: scena.toolbar.visible
        });
      }
    };
  }

  _createClass(ScenaHelperImpl, [{
    key: "toolbar",
    get: function get() {
      return this._toolbar;
    }
  }, {
    key: "state",
    get: function get() {
      return this.editor.state.ui.scena;
    }
  }, {
    key: "mask",
    value: function () {
      var _mask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.editor.dispatch({
                  type: ActionType.Loading,
                  payload: true
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mask() {
        return _mask.apply(this, arguments);
      }

      return mask;
    }()
  }, {
    key: "unmask",
    value: function () {
      var _unmask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(delay) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!delay) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return sleep(delay);

              case 3:
                this.editor.dispatch({
                  type: ActionType.Loading,
                  payload: false
                });
                _context2.next = 7;
                break;

              case 6:
                this.editor.dispatch({
                  type: ActionType.Loading,
                  payload: false
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unmask(_x) {
        return _unmask.apply(this, arguments);
      }

      return unmask;
    }()
  }, {
    key: "viewport",
    value: function viewport(width, height) {
      if (arguments.length === 1) {
        var device = devices.find(function (item) {
          return item.id === width;
        });
        device && this.editor.dispatch({
          type: ActionType.ChangeScreenSize,
          payload: device
        });
      } else {
        this.editor.dispatch({
          type: ActionType.ChangeScreenSize,
          payload: {
            id: 'custom',
            name: 'Custom',
            size: [width, height]
          }
        });
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var reset = this.editor.scena.state.reset;
      reset && reset();
    }
  }, {
    key: "setSelectedTargets",
    value: function setSelectedTargets(targets) {
      this.editor.dispatch({
        type: ActionType.MoveableSelectedTargets,
        payload: targets
      });
    }
  }, {
    key: "moveable",
    value: function moveable() {
      var _this$editor$state$ui;

      return (_this$editor$state$ui = this.editor.state.ui.scena.moveable.ref) === null || _this$editor$state$ui === void 0 ? void 0 : _this$editor$state$ui.current;
    }
  }]);

  return ScenaHelperImpl;
}();

export default ScenaHelperImpl;