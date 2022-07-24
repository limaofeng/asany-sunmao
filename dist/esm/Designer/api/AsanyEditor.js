function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import AsideHelperImpl from "./AsideHelper";
import FeaturesHelperImpl from "./FeaturesHelper";
import SidebarHelperImpl from "./SidebarHelper";
import ToolbarHelperImpl from "./ToolbarHelper";
import ScenaHelperImpl from "./ScenaHelper";

var AsanyEditorObject = /*#__PURE__*/function () {
  function AsanyEditorObject(store) {
    _classCallCheck(this, AsanyEditorObject);

    _defineProperty(this, "_store", void 0);

    _defineProperty(this, "_features", void 0);

    _defineProperty(this, "_toolbar", void 0);

    _defineProperty(this, "_sidebar", void 0);

    _defineProperty(this, "_aside", void 0);

    _defineProperty(this, "_scena", void 0);

    this._store = store;
    this._toolbar = new ToolbarHelperImpl(this);
    this._features = new FeaturesHelperImpl(this);
    this._sidebar = new SidebarHelperImpl(this);
    this._aside = new AsideHelperImpl(this);
    this._scena = new ScenaHelperImpl(this);
  }

  _createClass(AsanyEditorObject, [{
    key: "scena",
    get: function get() {
      return this._scena;
    }
  }, {
    key: "toolbar",
    get: function get() {
      return this._toolbar;
    }
  }, {
    key: "aside",
    get: function get() {
      return this._aside;
    }
  }, {
    key: "sidebar",
    get: function get() {
      return this._sidebar;
    }
  }, {
    key: "features",
    get: function get() {
      return this._features;
    }
  }, {
    key: "store",
    get: function get() {
      return this._store;
    }
  }, {
    key: "dispatch",
    get: function get() {
      return this._store.dispatch;
    }
  }, {
    key: "state",
    get: function get() {
      return this._store.getState();
    }
  }, {
    key: "save",
    value: function save(project) {
      var save = this.state.save;

      if (!this.state.save) {
        return console.warn('组件 AsanyEditor 未绑定 save 函数');
      }

      save(project);
    }
  }]);

  return AsanyEditorObject;
}();

export { AsanyEditorObject as default };