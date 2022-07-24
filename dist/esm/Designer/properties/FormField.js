var _excluded = ["field", "className", "children", "layout"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classnames from 'classnames';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function FormField(_ref) {
  var field = _ref.field,
      className = _ref.className,
      children = _ref.children,
      _ref$layout = _ref.layout,
      layout = _ref$layout === void 0 ? 'Inline' : _ref$layout,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsxs("div", {
    className: classnames('smart-form-field', "smart-form-field-layout-".concat(layout.toLocaleLowerCase()), className, {
      'inline-show-label': layout === 'Inline' && field.label && !field.hiddenLabel
    }),
    children: [field.label && !field.hiddenLabel && /*#__PURE__*/_jsxs("label", {
      className: "smart-form-field-label",
      children: [field.label, layout === 'Inline' && ':']
    }), /*#__PURE__*/_jsx("div", {
      className: classnames('smart-form-field-value tw-flex tw-items-center', {
        'tw-justify-start': layout === 'Stacked'
      }),
      children: /*#__PURE__*/React.cloneElement(React.Children.only(children), props)
    })]
  });
}

export default FormField;