import React from 'react';
import Icon from '@asany/icons';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import useTools from "../../hooks/useTools";
import { useEditorSelector } from "../../hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function iconRender(icon) {
  if (!icon) {
    return;
  }

  if (typeof icon === 'string') {
    return /*#__PURE__*/_jsx(Icon, {
      name: icon
    });
  }

  return /*#__PURE__*/React.createElement(icon);
}

function Toolbar() {
  var tools = useTools(function (state) {
    return state.ui.scena.toolbar.tools;
  });
  var focus = useEditorSelector(function (state) {
    return state.ui.scena.toolbar.tools.reduce(function (data, item) {
      data[item.id] = item.useSelector && item.useSelector(state);
      return data;
    }, {});
  }, isEqual);
  return /*#__PURE__*/_jsxs("div", {
    className: "asany-editor-scena-toolbar",
    children: [/*#__PURE__*/_jsx("div", {
      className: "layout-left",
      children: tools.filter(function (item) {
        return (!item.position || item.position === 'left') && item.isVisibled(focus[item.id]);
      }).map(function (item, index) {
        return item.id === 'vertical-divider' ? /*#__PURE__*/_jsx("span", {
          className: "vertical-divider"
        }, "".concat(item.id, "-").concat(index)) :
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        _jsxs("a", {
          onClick: item.onClick,
          className: classnames('toolbar-icon', item.className, {
            disabled: item.isDisabled(focus[item.id]),
            active: item.isSelected(focus[item.id])
          }),
          style: item.style,
          children: [iconRender(item.icon), item.name && /*#__PURE__*/_jsx("span", {
            className: "toolbar-icon-tip",
            children: item.name
          })]
        }, "".concat(item.id, "-").concat(index));
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "layout-right",
      children: tools.filter(function (item) {
        return item.position === 'right' && item.isVisibled(focus[item.id]);
      }).map(function (item, index) {
        return item.id === 'vertical-divider' ? /*#__PURE__*/_jsx("span", {
          className: "vertical-divider"
        }, "".concat(item.id, "-").concat(index)) :
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        _jsxs("a", {
          onClick: item.onClick,
          className: classnames('toolbar-icon', item.className, {
            disabled: item.isDisabled(focus[item.id]),
            active: item.isSelected(focus[item.id])
          }),
          style: item.style,
          children: [iconRender(item.icon), item.name && /*#__PURE__*/_jsx("span", {
            className: "toolbar-icon-tip",
            children: item.name
          })]
        }, "".concat(item.id, "-").concat(index));
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Toolbar);