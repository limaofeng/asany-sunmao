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

import React from 'react';
import { ActionType } from "../reducers/actions";

var AsideHelperImpl = /*#__PURE__*/function () {
  function AsideHelperImpl(editor) {
    _classCallCheck(this, AsideHelperImpl);

    _defineProperty(this, "editor", void 0);

    this.editor = editor;
  }

  _createClass(AsideHelperImpl, [{
    key: "state",
    get: function get() {
      return this.editor.state.ui.aside;
    }
  }, {
    key: "next",
    value: function next(title, body) {
      var aside = this.editor.state.ui.aside;

      if (!aside.visible || !aside.control || !aside.control.current) {
        return;
      }

      aside.control.current.next(title, /*#__PURE__*/React.createElement(body));
    }
  }, {
    key: "open",
    value: function open(title, body) {
      if (typeof title !== 'string' && !title.hasOwnProperty('length')) {
        return this.editor.store.dispatch({
          type: ActionType.OpenAside,
          payload: {
            block: title,
            options: arguments[1]
          }
        });
      }

      var options;
      var tabs = [];

      if (typeof title === 'string') {
        tabs.push({
          title: title,
          content: body
        });
      } else {
        tabs.push.apply(tabs, _toConsumableArray(title));
      }

      if (arguments.length === 3) {
        options = arguments[2];
      } else if (Array.isArray(title)) {
        options = arguments[1];
      }

      this.editor.store.dispatch({
        type: ActionType.OpenAside,
        payload: {
          tabs: tabs,
          options: options
        }
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.editor.store.dispatch({
        type: ActionType.CloseAside
      });
    }
  }]);

  return AsideHelperImpl;
}();

export { AsideHelperImpl as default };