function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { useDrag } from 'react-dnd';
import { useSymbols } from "../../sunmao";
import { useEditorSelector, generateUUID } from "../../Designer";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Panel = Collapse.Panel;

function ComponentItem(props) {
  var name = props.name,
      title = props.title,
      cover = props.cover,
      createDragObject = props.createDragObject;

  var _item = createDragObject(props);

  var _useDrag = useDrag({
    item: function item() {
      return _objectSpread(_objectSpread({}, _item), {}, {
        id: generateUUID()
      });
    },
    type: _item.type,
    collect: function collect(monitor) {
      return {
        opacity: monitor.isDragging() ? 0.4 : 1
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      drag = _useDrag2[1];

  return /*#__PURE__*/_jsxs("li", {
    children: [/*#__PURE__*/_jsx("div", {
      className: "component-icon",
      ref: drag,
      children: /*#__PURE__*/_jsx("img", {
        src: cover,
        alt: title
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "component-info",
      children: title || name
    })]
  });
}

function ComponentPanel() {
  var template = useEditorSelector(function (state) {
    return state.project.data.template;
  });
  var groups = useSymbols(template);

  var _useState = useState(groups.map(function (item) {
    return item.title;
  })),
      _useState2 = _slicedToArray(_useState, 2),
      activeKey = _useState2[0],
      setActiveKey = _useState2[1];

  var handleCollapse = useCallback(function (keys) {
    setActiveKey(typeof keys === 'string' ? [keys] : keys);
  }, []);
  useEffect(function () {
    setActiveKey(groups.map(function (item) {
      return item.title;
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.map(function (item) {
    return item.title;
  }).join(',')]);
  return /*#__PURE__*/_jsx("div", {
    className: "componet-list-wrap",
    children: /*#__PURE__*/_jsx(Collapse, {
      bordered: false,
      activeKey: activeKey // tslint:disable-next-line:jsx-no-lambda
      ,
      expandIcon: function expandIcon(_ref) {
        var isActive = _ref.isActive;
        return /*#__PURE__*/_jsx(CaretRightOutlined, {
          rotate: isActive ? 90 : 0
        });
      },
      className: "site-collapse-compactness-collapse",
      onChange: handleCollapse,
      children: groups.map(function (group) {
        return /*#__PURE__*/_jsx(Panel, {
          header: group.title,
          children: /*#__PURE__*/_jsx("ul", {
            className: "component-content show-list",
            children: group.components.map(function (item) {
              return /*#__PURE__*/_jsx(ComponentItem, _objectSpread(_objectSpread({}, item), {}, {
                createDragObject: group.createDragObject,
                type: group.type
              }), item.name);
            })
          })
        }, group.title);
      })
    })
  });
}

export default /*#__PURE__*/React.memo(ComponentPanel);