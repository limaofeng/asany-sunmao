function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import merge from 'lodash/merge';
import { combineReducers } from "../reducers/thunk";
export var getPlugins = function getPlugins(state, projectType) {
  var allPlugins = Object.keys(state.plugins).map(function (key) {
    return state.plugins[key];
  });
  return allPlugins.filter(function (plugin) {
    return plugin.types.includes(projectType);
  });
};
export var getReducers = function getReducers(state, projectType) {
  var plugins = getPlugins(state, projectType);
  var reducers = plugins.filter(function (p) {
    return !!p.reducer;
  }).reduce(function (reducers, p) {
    reducers[p.id] = p.reducer;
    return reducers;
  }, {});

  if (!Object.keys(reducers).length) {
    return undefined;
  }

  return combineReducers(reducers);
};
export var getScena = function getScena(state, projectType) {
  var _getPlugins = getPlugins(state, projectType),
      _getPlugins2 = _toArray(_getPlugins),
      plugin = _getPlugins2[0],
      plugins = _getPlugins2.slice(1);

  if (!plugin) {
    return {};
  }

  var scena = merge.apply(void 0, [plugin.scena].concat(_toConsumableArray(plugins.map(function (item) {
    return item.scena;
  }))));

  if (scena.toolbar) {
    scena.toolbar.visible = !!(scena.toolbar.visible || typeof scena.toolbar.visible != 'boolean' && scena.toolbar.tools.length);
  }

  return scena;
};
export function getFeatures(state, projectType) {
  var plugins = getPlugins(state, projectType);
  var features = plugins.reduce(function (previous, current) {
    var _iterator = _createForOfIteratorHelper(current.features || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var feature = _step.value;
        previous.add(feature);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return previous;
  }, new Set());
  return Array.from(features.values());
}
export function getToolbar(state, projectType) {
  var plugins = getPlugins(state, projectType);

  if (!plugins.length) {
    return {
      tools: []
    };
  }

  return merge.apply(void 0, [{
    tools: []
  }].concat(_toConsumableArray(plugins.map(function (item) {
    return item.toolbar;
  }))));
}
export function getSidebar(state, projectType) {
  var plugins = getPlugins(state, projectType);

  if (!plugins.length) {
    return {
      tools: []
    };
  }

  return merge.apply(void 0, [{
    tools: []
  }].concat(_toConsumableArray(plugins.map(function (item) {
    return item.sidebar;
  }))));
} // TODO 获取工具栏
// export function getTools(state: IAsanyState, projectType: AsanyProjectType) {
//   const plugins = getPlugins(state, projectType);
//   const tools = plugins.reduce((previous, current) => {
//     for (const tool of current.tools) {
//       previous.set(tool.id, tool);
//     }
//     return previous;
//   }, new Map<string, AsanyTool>());
//   return Array.from<AsanyTool>(tools.values());
// }