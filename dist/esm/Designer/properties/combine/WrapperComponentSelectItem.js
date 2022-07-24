import React, { memo } from 'react';
import Icon from '@asany/icons';
import { useReactComponent } from 'sunmao';
import { SortableHandler } from "./WrapperItem";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function WrapperItem(props) {
  var drag = props.drag,
      data = props.data,
      onDelete = props.onDelete,
      canDelete = props.canDelete;
  return /*#__PURE__*/_jsxs("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    children: [data.sortable && /*#__PURE__*/_jsx("div", {
      ref: drag,
      className: "sortable-handler",
      children: /*#__PURE__*/_jsx(SortableHandler, {})
    }), canDelete && /*#__PURE__*/_jsx("a", {
      href: "#delete",
      onClick: onDelete,
      children: /*#__PURE__*/_jsx(Icon, {
        name: "AsanyEditor/Cross"
      })
    })]
  });
}

WrapperItem.defaultProps = {
  canDelete: true,
  sortable: true,
  displayField: 'name'
};
export default /*#__PURE__*/memo(WrapperItem);
export var AnyComponent = function AnyComponent(props) {
  var _props$componentId;

  var Renderer = useReactComponent((_props$componentId = props.componentId) !== null && _props$componentId !== void 0 ? _props$componentId : '');

  if (Renderer) {
    return /*#__PURE__*/_jsx("div", {
      style: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
      },
      children: /*#__PURE__*/_jsx(Renderer, {})
    });
  } else return null;
};