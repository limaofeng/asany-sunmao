function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ActionType } from "../reducers/actions";

var FeaturesHelperImpl = /*#__PURE__*/function () {
  function FeaturesHelperImpl(editor) {
    _classCallCheck(this, FeaturesHelperImpl);

    _defineProperty(this, "editor", void 0);

    this.editor = editor;
  }

  _createClass(FeaturesHelperImpl, [{
    key: "has",
    value: function has(feature) {
      return this.editor.state.features[feature];
    }
  }, {
    key: "zoom",
    value: function zoom(enable) {
      this.editor.store.dispatch({
        type: ActionType.FeatureZoom,
        payload: enable
      });
    }
  }, {
    key: "drag",
    value: function drag(enable) {
      this.editor.store.dispatch({
        type: ActionType.FeatureDrag,
        payload: enable
      });
    }
  }, {
    key: "selecto",
    value: function selecto(enable) {
      this.editor.store.dispatch({
        type: ActionType.FeatureSelecto,
        payload: enable
      });
    }
  }, {
    key: "ruler",
    value: function ruler(enable) {
      this.editor.store.dispatch({
        type: ActionType.FeatureRuler,
        payload: enable
      });
    }
  }]);

  return FeaturesHelperImpl;
}();

export { FeaturesHelperImpl as default };