function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Memory = /*#__PURE__*/function () {
  function Memory() {
    _classCallCheck(this, Memory);

    _defineProperty(this, "map", new Map());
  }

  _createClass(Memory, [{
    key: "get",
    value: function get(key) {
      return this.map.get(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return this.map.set(key, value);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.map.clear();
    }
  }]);

  return Memory;
}();

export { Memory as default };