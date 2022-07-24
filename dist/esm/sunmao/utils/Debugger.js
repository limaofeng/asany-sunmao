function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Debugger = /*#__PURE__*/function () {
  function Debugger(isDebug) {
    _classCallCheck(this, Debugger);

    _defineProperty(this, "isDebug", void 0);

    this.isDebug = isDebug;
  }

  _createClass(Debugger, [{
    key: "log",
    value: function log() {
      var _console;

      if (!this.isDebug) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['%c Sunmao Debugger:', 'padding: 1px; background: #4af; color: #fff;'].concat(args));
    }
  }]);

  return Debugger;
}();

export { Debugger as default };