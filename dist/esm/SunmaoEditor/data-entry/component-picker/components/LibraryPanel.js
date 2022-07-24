var _excluded = ["selected"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import classnames from 'classnames';
import { ListTree, ScrubbableControl } from "../../../../Designer";
import { Icon } from '@asany/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function ComponentPreview(props) {
  var data = props.data;
  var cover = data.cover ? /*#__PURE__*/React.isValidElement(data.cover) ? data.cover : /*#__PURE__*/_jsx("img", {
    src: data.cover,
    alt: data.title
  }) : /*#__PURE__*/_jsx(Icon, {
    name: data.icon || 'SunmaoEditor/ListItemBack'
  });
  return /*#__PURE__*/_jsx("div", {
    className: "component-preview",
    children: cover
  });
}

var ComponentRender = function ComponentRender(props) {
  var selected = props.selected,
      item = _objectWithoutProperties(props, _excluded);

  var onChange = props.onChange;
  var value = props.value;
  var handleClick = useCallback(function () {
    onChange && onChange(value);
  }, [onChange, value]);
  return /*#__PURE__*/_jsx("li", {
    onClick: handleClick,
    className: classnames('tree-node-item tw-flex tw-flex-col tw-justify-end tw-items-center', {
      active: selected
    }),
    children: /*#__PURE__*/_jsxs("div", {
      className: "component-item-container",
      children: [/*#__PURE__*/_jsx(ComponentPreview, {
        data: item
      }), /*#__PURE__*/_jsx("span", {
        className: "tree-node-item-title",
        children: /*#__PURE__*/_jsx("span", {
          children: item.title
        })
      })]
    })
  });
};

function LibraryPanel(props) {
  var value = props.value,
      visible = props.visible,
      onChange = props.onChange,
      treeData = props.treeData;
  var handleChange = useCallback(function (data) {
    onChange(data.value);
  }, [onChange]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: "ae-popover-search tw-flex tw-items-center",
      children: /*#__PURE__*/_jsx(ScrubbableControl, {
        icon: "SunmaoEditor/Search",
        className: "basic-input",
        trigger: "change",
        autoSelect: false,
        value: ""
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ae-popover-content",
      children: /*#__PURE__*/_jsx(ListTree, {
        reload: visible,
        value: value,
        onChange: handleChange,
        treeData: treeData,
        keyName: "value",
        labelName: "label",
        itemRender: ComponentRender
      })
    })]
  });
}

export default LibraryPanel;