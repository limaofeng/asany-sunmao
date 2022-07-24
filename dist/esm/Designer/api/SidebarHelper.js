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

import { ActionType } from "../reducers/actions";

var SidebarHelperImpl = /*#__PURE__*/function () {
  function SidebarHelperImpl(editor) {
    _classCallCheck(this, SidebarHelperImpl);

    _defineProperty(this, "editor", void 0);

    this.editor = editor;
  }

  _createClass(SidebarHelperImpl, [{
    key: "content",
    value: function (_content) {
      function content(_x, _x2, _x3) {
        return _content.apply(this, arguments);
      }

      content.toString = function () {
        return _content.toString();
      };

      return content;
    }(function (content, width, minWidth) {
      this.editor.dispatch({
        type: ActionType.SidebarSetContent,
        payload: {
          content: content,
          width: width,
          minWidth: minWidth
        }
      });
    })
  }, {
    key: "removeContent",
    value: function removeContent() {
      this.editor.dispatch({
        type: ActionType.SidebarRemoveContent
      });
    }
  }, {
    key: "state",
    get: function get() {
      return this.editor.state.ui.sidebar;
    }
  }, {
    key: "visible",
    value: function visible(_visible) {
      this.editor.dispatch({
        type: ActionType.SidebarVisible,
        payload: _visible
      });
    }
  }, {
    key: "hasSelected",
    value: function hasSelected(key) {
      return this.editor.state.ui.sidebar.activeKeys.includes(key);
    }
  }, {
    key: "select",
    value: function select(key, toolboard) {
      var tools = this.tools();
      var item = tools.find(function (item) {
        return item.id === key;
      });
      var mutexs = item.mutex ? tools.filter(function (t) {
        return t.mutex === item.mutex && t.id !== key;
      }) : [];

      if (mutexs.length) {
        this.unselect.apply(this, _toConsumableArray(mutexs.map(function (item) {
          return item.id;
        })));
      }

      this.editor.dispatch({
        type: toolboard ? ActionType.ToolboardKey : ActionType.SidebarSelect,
        payload: key
      });
    }
  }, {
    key: "unselect",
    value: function unselect() {
      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      this.editor.store.dispatch({
        type: ActionType.SidebarUnSelect,
        payload: keys
      });
    }
  }, {
    key: "reopen",
    value: function reopen(toolKey) {
      this.editor.state.ui.sidebar.control.current.reopen(toolKey);
    }
  }, {
    key: "next",
    value: function next(index, title, content, width) {
      var toolboard = this.editor.state.ui.sidebar.control.current;

      if (typeof index === 'number') {
        var _title$prototype;

        if (typeof title === 'function' || title !== null && title !== void 0 && (_title$prototype = title.prototype) !== null && _title$prototype !== void 0 && _title$prototype.isReactComponent) {
          toolboard.next(index, undefined, title, content || 250);
        } else {
          toolboard.next(index, title, content, width || 250);
        }
      } else if (typeof index === 'function' || index.prototype && index.prototype.isReactComponent) {
        toolboard.next(-1, undefined, index, title || 250);
      } else {
        toolboard.next(-1, index, title, content || 250);
      }
    }
  }, {
    key: "open",
    value: function open(key, title, body) {
      this.select(key, true);
      this.editor.state.ui.sidebar.control.current.open(key, title, body);
      return this.close.bind(this);
    }
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.editor.state.ui.sidebar.control.current.close(typeof index === 'number' ? index : undefined);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function close(_x4) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "back",
    value: function back() {
      this.editor.state.ui.sidebar.control.current.back();
    }
  }, {
    key: "tools",
    value: function tools() {
      return this.editor.state.ui.sidebar.tools;
    }
  }]);

  return SidebarHelperImpl;
}();

export { SidebarHelperImpl as default };