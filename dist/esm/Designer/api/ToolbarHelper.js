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

var ToolbarHelperImpl = /*#__PURE__*/function () {
  function ToolbarHelperImpl(editor) {
    _classCallCheck(this, ToolbarHelperImpl);

    _defineProperty(this, "editor", void 0);

    this.editor = editor;
  }

  _createClass(ToolbarHelperImpl, [{
    key: "state",
    get: function get() {
      return this.editor.state.ui.toolbar;
    }
  }, {
    key: "hasSelected",
    value: function hasSelected(key) {
      return this.editor.state.ui.toolbar.activeKeys.includes(key);
    }
  }, {
    key: "select",
    value: function select(key) {
      var tools = this.tools();
      var item = tools.find(function (item) {
        return item.id === key;
      });
      var mutexs = item.mutex ? tools.filter(function (t) {
        return t.mutex === item.mutex;
      }) : [];

      if (mutexs.length) {
        this.unselect.apply(this, _toConsumableArray(mutexs.map(function (item) {
          return item.id;
        })));
      }

      this.editor.dispatch({
        type: ActionType.ToolbarSelect,
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
        type: ActionType.ToolbarUnSelect,
        payload: keys
      });
    }
  }, {
    key: "tools",
    value: function tools() {
      return this.editor.state.ui.toolbar.tools;
    }
  }]);

  return ToolbarHelperImpl;
}();

export { ToolbarHelperImpl as default };