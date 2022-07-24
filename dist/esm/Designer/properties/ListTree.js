function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useCallback, useEffect, useState } from 'react';
import Icon from '@asany/icons';
import classnames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";

function getSelectKeys(treeData, key, keyName) {
  var _iterator = _createForOfIteratorHelper(treeData),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _node$children;

      var node = _step.value;

      if (node[keyName] === key) {
        return [node[keyName]];
      }

      if ((_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length) {
        var childKeys = getSelectKeys(node.children, key, keyName);

        if (childKeys.length) {
          return [node[keyName]].concat(_toConsumableArray(childKeys));
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [];
}

function ListTree(props) {
  var reload = props.reload,
      treeData = props.treeData,
      _props$labelName = props.labelName,
      labelName = _props$labelName === void 0 ? 'label' : _props$labelName,
      _props$keyName = props.keyName,
      keyName = _props$keyName === void 0 ? 'id' : _props$keyName,
      ItemRender = props.itemRender,
      onChange = props.onChange,
      value = props.value;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectKeys = _useState2[0],
      setSelectKeys = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      openKeys = _useState4[0],
      setOpenKeys = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      parentNode = _useState6[0],
      setParentNode = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      list = _useState8[0],
      setList = _useState8[1];

  useEffect(function () {
    var parentNode;
    setList(openKeys.reduce(function (list, key) {
      var node = list.find(function (item) {
        return item[keyName] === key;
      });

      if (node) {
        parentNode = node;
        return node.children || [];
      }

      return list;
    }, treeData));
    setParentNode(parentNode); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData, openKeys.join(',')]);
  var handleClick = useCallback(function (selectKeys) {
    return function () {
      setOpenKeys(selectKeys);
    };
  }, []);
  var handleChange = useCallback(function (key) {
    var selectKeys = getSelectKeys(treeData, key, keyName);
    setSelectKeys(selectKeys);
    var node = selectKeys.reduce(function (list, key) {
      var _node$children2;

      if (!list.length) {
        return list;
      }

      var node = list.find(function (item) {
        return item[keyName] === key;
      });

      if (node && (_node$children2 = node.children) !== null && _node$children2 !== void 0 && _node$children2.length) {
        return node.children;
      }

      return node;
    }, treeData);
    console.log('selectKeys', selectKeys, node);
    onChange && node && onChange(node);
  }, [treeData, keyName, onChange]);
  var handleBack = useCallback(function () {
    openKeys.pop();
    setOpenKeys(_toConsumableArray(openKeys));
  }, [openKeys]);
  useEffect(function () {
    if (!value || !reload) {
      setOpenKeys([]);
      setSelectKeys([]);
      return;
    }

    var selectKeys = getSelectKeys(treeData, value, keyName);
    setSelectKeys(selectKeys);

    var openKeys = _toConsumableArray(selectKeys);

    openKeys.pop();
    setOpenKeys(openKeys);
  }, [treeData, value, reload, keyName]);
  var dirs = list.filter(function (item) {
    return !!(item.children || []).length;
  });
  console.log(dirs, list, parentNode);
  return /*#__PURE__*/_jsxs("div", {
    className: "list-tree-container",
    children: [parentNode && /*#__PURE__*/_jsxs("div", {
      onClick: handleBack,
      className: "tree-current-node tw-flex tw-items-center",
      children: [/*#__PURE__*/_jsx(Icon, {
        name: "AsanyEditor/Drillup"
      }), /*#__PURE__*/_jsx("span", {
        className: "tw-flex-1",
        children: parentNode[labelName]
      })]
    }), /*#__PURE__*/_jsxs(OverlayScrollbarsComponent, {
      className: "list-tree-scrollbar",
      options: {
        scrollbars: {
          autoHide: 'scroll'
        }
      },
      children: [!!dirs.length && /*#__PURE__*/_jsx("ul", {
        className: "ae-tree",
        children: dirs.map(function (item) {
          return /*#__PURE__*/_jsxs("li", {
            className: classnames('tw-flex tw-items-center', {
              active: selectKeys.includes(item[keyName])
            }),
            onClick: handleClick([].concat(_toConsumableArray(openKeys), [item[keyName]])),
            children: [/*#__PURE__*/_jsx(Icon, {
              name: "AsanyEditor/Folder"
            }), /*#__PURE__*/_jsx("span", {
              className: "flex-1",
              children: item[labelName]
            }), /*#__PURE__*/_jsx(Icon, {
              name: "AsanyEditor/Drilldown"
            })]
          }, item[keyName]);
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "tree-node-content",
        children: /*#__PURE__*/_jsx("ul", {
          className: "tree-node-item-list tw-flex tw-flex-row tw-flex-wrap tw-content-start",
          children: list.filter(function (item) {
            return !(item.children || []).length;
          }).map(function (item) {
            return /*#__PURE__*/_createElement(ItemRender, _objectSpread(_objectSpread({}, item), {}, {
              key: item[keyName],
              keyName: keyName,
              selected: selectKeys.includes(item[keyName]),
              onChange: handleChange
            }));
          })
        })
      })]
    })]
  });
}

export default ListTree;