function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useEffect, useReducer, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import useEditor from "./useEditor";
import useSelector from "./useSelector";

function buildHasVisibled(item) {
  return item.isVisibled || function () {
    return true;
  };
}

function buildHasDisabled(item) {
  return item.isDisabled || function () {
    return false;
  };
}

function buildHasSelected(editor, item) {
  return item.isSelected || function () {
    return editor.sidebar.hasSelected(item.id);
  };
}

var buildClick = function buildClick(editor, item) {
  var onClick = item.onClick;
  return function (e) {
    e.stopPropagation();

    if (!item.isSelected(item.useSelector ? item.useSelector(editor.state) : undefined)) {
      item.deselect = onClick && onClick(editor);
    } else {
      item.deselect ? item.deselect(editor) : onClick && onClick(editor);
    }
  };
};

export default function useTools(selector) {
  var toolsRef = useRef([]);
  var editor = useEditor();

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var allTools = useSelector(selector, function (theNew) {
    var latest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return isEqual(theNew.map(function (item) {
      return item.id;
    }), latest.map(function (item) {
      return item.id;
    }));
  });
  useEffect(function () {
    toolsRef.current = allTools.map(function (_ref) {
      var item = Object.assign({}, _ref);
      item.isVisibled = buildHasVisibled(item);
      item.isDisabled = buildHasDisabled(item);
      item.isSelected = buildHasSelected(editor, item);
      item.onClick = buildClick(editor, item);
      return item;
    });
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTools.map(function (item) {
    return item.id;
  }).join(',')]);
  return toolsRef.current;
}