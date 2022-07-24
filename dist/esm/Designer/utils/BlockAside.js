function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext, useRef } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import CurrentElementInformation from "../properties/CurrentElementInformation";
import DynaActionForm from "../properties/DynaActionForm";
import { DEFAULT_GROUP_ID } from "../typings";
import { jsx as _jsx } from "react/jsx-runtime";
export var DynaActionFormContext = /*#__PURE__*/React.createContext({});
export function createDynaActionForm(customizer) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cn.asany.ui.editor.properties';
  return function (_ref) {
    var handleChange = _ref.onChange;
    var container = useRef(null);
    var value = useContext(DynaActionFormContext);
    return /*#__PURE__*/_jsx("div", {
      ref: container,
      className: "sketch-configuration-body scrollbars-visible",
      children: /*#__PURE__*/_jsx(OverlayScrollbarsComponent, {
        options: {
          scrollbars: {
            autoHide: 'scroll'
          }
        },
        children: /*#__PURE__*/_jsx(DynaActionForm, {
          library: namespace,
          value: value,
          onChange: handleChange,
          customizer: customizer
        })
      })
    });
  };
}

var createTabPane = function createTabPane(item, namespace) {
  return {
    title: item.name,
    visible: item.visible,
    content: createDynaActionForm(item.customizer, namespace)
  };
};

export function buildAside(customizer, namespace) {
  var tabs = [];
  var fields = customizer.fields.map(function (item) {
    return item.group ? item : _objectSpread(_objectSpread({}, item), {}, {
      group: DEFAULT_GROUP_ID
    });
  });

  var sourceGroups = _toConsumableArray(customizer.groups || []);

  if (customizer.frame) {
    fields.unshift({
      name: 'rect',
      group: 'DEFAULT-rect',
      renderer: CurrentElementInformation,
      type: 'JSON'
    });
  }

  var groups = fields.reduce(function (groups, field) {
    if (!groups.some(function (item) {
      return item.id === field.group;
    })) {
      var group = field.group;
      var visible;

      if (typeof field.group === 'boolean') {
        group = field.name;
        visible = field.visible;
      }

      groups.push({
        id: group,
        name: group,
        visible: visible
      });
    }

    return groups;
  }, sourceGroups);
  var customTabs = customizer.tabs || [];

  if (!customTabs.length) {
    customTabs.push({
      name: '组件设置',
      groups: groups
    });
  } else {
    var _iterator = _createForOfIteratorHelper(customTabs),
        _step;

    try {
      var _loop = function _loop() {
        var tab = _step.value;
        tab.groups = groups.filter(function (_ref2) {
          var id = _ref2.id;
          return tab.groups.some(function (g) {
            return g === id || g.id === id;
          });
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  tabs.push.apply(tabs, _toConsumableArray(customTabs.map(function (item) {
    var groups = item.groups;
    var groupIds = groups.map(function (_ref3) {
      var id = _ref3.id;
      return id;
    });
    return _objectSpread(_objectSpread({}, item), {}, {
      title: item.name,
      customizer: {
        groups: groups,
        fields: fields.filter(function (field) {
          return groupIds.includes(field.group);
        })
      }
    });
  })));
  return tabs.map(function (tab) {
    return createTabPane(tab, namespace);
  });
}