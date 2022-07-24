import React, { useCallback } from 'react';
import Icon from '@asany/icons';
import isEqual from 'lodash/isEqual';
import { render, useEditorSelector, useEditorTools } from "../../Designer";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Navigation(props) {
  var onBack = props.onBack;
  var tools = useEditorTools(function (state) {
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
  return /*#__PURE__*/_jsxs("div", {
    className: "sunmao-navigation",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "navigation-left",
      children: [/*#__PURE__*/_jsx(Icon, {
        name: "AsanyEditor/ToolbarBack",
        onClick: handClickBack,
        className: "back-icon toolbar-icon"
      }), /*#__PURE__*/_jsx("span", {
        className: "title",
        children: "SUNMAO "
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "sunmao-navigation-container",
      children: [/*#__PURE__*/_jsx("div", {
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
    })]
  });
}

export default Navigation;