var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import Icon from '@asany/icons';
import styled from 'styled-components';
import IconButton from "./IconButton";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var aligns = [{
  icon: 'AsanyEditor/AlignLeft',
  title: '左对齐'
}, {
  icon: 'AsanyEditor/AlignHorizontalCenters',
  title: '水平居中对齐'
}, {
  icon: 'AsanyEditor/AlignRight',
  title: '右对齐'
}, {
  icon: 'AsanyEditor/AlignTop',
  title: '顶部对齐'
}, {
  icon: 'AsanyEditor/AlignVerticalCenters',
  title: '垂直居中对齐'
}, {
  icon: 'AsanyEditor/AlignBottom',
  title: '底部对齐'
}];
var MoreOptions = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));

var AlignPanel = function AlignPanel() {
  return /*#__PURE__*/_jsxs("div", {
    className: "design-rows align-panel",
    children: [aligns.map(function (_ref) {
      var icon = _ref.icon,
          title = _ref.title;
      return /*#__PURE__*/_jsx(IconButton, {
        tooltip: title,
        icon: icon
      }, icon);
    }), /*#__PURE__*/_jsxs(MoreOptions, {
      className: "more-options",
      children: [/*#__PURE__*/_jsx(IconButton, {
        icon: "AsanyEditor/VectorAlign"
      }), /*#__PURE__*/_jsx(Icon, {
        className: "more-arrow",
        name: "AsanyEditor/ArrowBottom"
      })]
    })]
  });
};

export default AlignPanel;