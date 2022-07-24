function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useCallback } from 'react';
import Icon from '@asany/icons';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import useTools from "../../hooks/useTools";
import { useEditorSelector } from "../../hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function iconRender(icon) {
  if (!icon) {
    return null;
  }

  if (typeof icon === 'string') {
    return /*#__PURE__*/_jsx(Icon, {
      name: icon
    });
  }

  return /*#__PURE__*/React.createElement(icon);
}

export function render(item, focus) {
  var disabled = item.isDisabled(focus[item.id]);
  return item.render ? /*#__PURE__*/_jsx(item.render, _objectSpread(_objectSpread({}, item), {}, {
    disabled: disabled
  }), item.id) :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  _jsxs("a", {
    className: classnames('toolbar-icon', item.className, {
      disabled: disabled
    }),
    onClick: item.onClick,
    style: item.style,
    children: [iconRender(item.icon), item.name && /*#__PURE__*/_jsx("span", {
      className: "toolbar-icon-tip",
      children: item.name
    })]
  }, item.id);
}

function Header(props) {
  var onBack = props.onBack;
  var name = useEditorSelector(function (state) {
    return state.project && state.project.name;
  });
  var content = useEditorSelector(function (state) {
    return state.ui.toolbar.content;
  });
  var tools = useTools(function (state) {
    return state.ui.toolbar.tools;
  });
  var focus = useEditorSelector(function (state) {
    return state.ui.toolbar.tools.reduce(function (data, item) {
      data[item.id] = item.useSelector && item.useSelector(state);
      return data;
    }, {});
  }, isEqual);
  var handClickBack = useCallback(function () {
    return onBack && onBack();
  }, [onBack]);
  return /*#__PURE__*/_jsx("div", {
    className: "sketch-toolbar",
    children: content ? /*#__PURE__*/React.createElement(content, {
      onBack: onBack
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: "toolbar-left",
        onClick: handClickBack,
        children: [/*#__PURE__*/_jsx(Icon, {
          name: "AsanyEditor/ToolbarBack",
          className: "back-icon toolbar-icon"
        }), /*#__PURE__*/_jsx("span", {
          className: "title",
          children: name
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "toolbar-center",
        children: tools.filter(function (item) {
          return item.position === 'left' && item.isVisibled(focus[item.id]);
        }).map(render, focus)
      }), /*#__PURE__*/_jsx("div", {
        className: "toolbar-right",
        children: tools.filter(function (item) {
          return item.position === 'right' && item.isVisibled(focus[item.id]);
        }).map(render, focus)
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(Header);