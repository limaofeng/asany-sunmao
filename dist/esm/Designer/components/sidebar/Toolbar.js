import React from 'react';
import Icon from '@asany/icons';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import useTools from "../../hooks/useTools";
import { useEditorSelector } from "../../hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function iconRender(icon) {
  if (typeof icon === 'string') {
    return /*#__PURE__*/_jsx(Icon, {
      name: icon
    });
  }

  return /*#__PURE__*/React.createElement(icon);
}

function Toolbar() {
  var toolboardKey = useEditorSelector(function (state) {
    return state.ui.sidebar.toolboardKey;
  });
  var tools = useTools(function (state) {
    return state.ui.sidebar.tools;
  });
  var focus = useEditorSelector(function (state) {
    return state.ui.sidebar.tools.reduce(function (data, item) {
      data[item.id] = item.useSelector && item.useSelector(state);
      return data;
    }, {});
  }, isEqual);

  var buildClick = function buildClick(item) {
    return function (e) {
      return item.onClick(e);
    };
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "panel-switcher",
    children: [/*#__PURE__*/_jsx("ul", {
      className: "panel-switcher-list tool-panel-list",
      children: tools.filter(function (item) {
        return item.position === 'top' && item.isVisibled(focus[item.id]);
      }).map(function (item, index) {
        return /*#__PURE__*/_jsx("li", {
          className: classnames('panel-switcher-list-item', item.className, {
            'tools-extra': toolboardKey !== item.id,
            selected: item.isSelected(focus[item.id])
          }),
          style: item.style,
          onClick: buildClick(item),
          children: iconRender(item.icon)
        }, "".concat(item.id, "-").concat(index));
      })
    }), /*#__PURE__*/_jsx("ul", {
      className: "panel-switcher-list",
      children: tools.filter(function (item) {
        return item.position === 'bottom' && item.isVisibled(focus[item.id]);
      }).map(function (item) {
        return /*#__PURE__*/_jsx("li", {
          className: classnames('panel-switcher-list-item', item.className, {
            selected: item.isSelected(focus[item.id])
          }),
          onClick: buildClick(item),
          style: item.style,
          children: iconRender(item.icon)
        }, "".concat(item.id));
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Toolbar);