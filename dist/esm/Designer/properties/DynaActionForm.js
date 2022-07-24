var _excluded = ["component", "field", "defaultValue"],
    _excluded2 = ["library"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDebugger, useSunmao } from "../../sunmao";
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import { DEFAULT_GROUP_ID } from "../typings";
import FormField from "./FormField";
import FormFieldset from "./FormFieldset";
import { useFormSelector, useFormState } from "./FormStateContext";
import { getRenderer } from "./renderers";
import { jsx as _jsx } from "react/jsx-runtime";
export function FormItemWrapper(_ref) {
  var Item = _ref.component,
      field = _ref.field,
      defaultValue = _ref.defaultValue,
      props = _objectWithoutProperties(_ref, _excluded);

  // console.log('FormItemWrapper', field, Item, defaultValue, props);
  var extProps = useFormSelector(function (state) {
    if (Array.isArray(field.deps)) {
      return field.deps.reduce(function (data, key) {
        if (typeof key === 'string') {
          var _key$split = key.split(':'),
              _key$split2 = _slicedToArray(_key$split, 2),
              name = _key$split2[0],
              _value = _key$split2[1];

          data[name] = state[_value];
        }

        return data;
      }, {});
    } else if (typeof field.deps === 'function') {
      return field.deps(state);
    }
  }, isEqual);

  if (!field.deps || !field.deps.length) {
    return /*#__PURE__*/_jsx(Item, _objectSpread({
      placeholder: field.placeholder
    }, props));
  }

  return /*#__PURE__*/_jsx(Item, _objectSpread(_objectSpread({
    placeholder: field.placeholder
  }, props), extProps));
}
export var visibleFilter = function visibleFilter(props) {
  return function (_ref2) {
    var visible = _ref2.visible;

    if (typeof visible === 'function') {
      return visible(props);
    }

    return visible !== false;
  };
};

var PanelBody = function PanelBody(props) {
  var group = props.group,
      layout = props.layout,
      fields = props.fields,
      value = props.value,
      Form = props.Form;
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: fields.filter(visibleFilter(value)).map(function (item) {
      var _ref3 = item.renderer,
          component = _ref3.component,
          _ref3$props = _ref3.props,
          props = _ref3$props === void 0 ? {} : _ref3$props;
      var ComponentForm = component;
      var lable = item.hiddenLabel ? '' : !item.multiple && item.label;
      var valuePropName = item.type === 'Boolean' ? 'checked' : undefined;
      return /*#__PURE__*/_jsx(Form.Item, {
        label: lable,
        name: item.name,
        valuePropName: valuePropName,
        noStyle: true,
        children: /*#__PURE__*/_jsx(FormField, {
          field: item,
          layout: item.layout || layout,
          className: classnames("form-item-".concat(group, "-").concat(item.name), getComponentClassName(item)),
          children: /*#__PURE__*/_jsx(FormItemWrapper, _objectSpread(_objectSpread({}, props), {}, {
            field: item,
            component: ComponentForm
          }))
        })
      }, "".concat(group, "-").concat(item.name));
    })
  });
};

function getComponentClassName(item) {
  var _item$renderer$compon, _item$renderer$compon2;

  if (typeof item.renderer.name === 'string') {
    return "form-component-".concat(item.renderer.name.toLowerCase());
  }

  var name = item.renderer.component.name || ((_item$renderer$compon = item.renderer.component) === null || _item$renderer$compon === void 0 ? void 0 : (_item$renderer$compon2 = _item$renderer$compon.type) === null || _item$renderer$compon2 === void 0 ? void 0 : _item$renderer$compon2.name);

  if (name) {
    return "form-component-".concat(name.toLowerCase());
  }

  return null;
}

PanelBody.defaultProps = {
  layout: 'Stacked'
};

var DynaActionForm = function DynaActionForm(_ref4) {
  var _ref4$library = _ref4.library,
      library = _ref4$library === void 0 ? 'cn.asany.ui.editor.properties' : _ref4$library,
      props = _objectWithoutProperties(_ref4, _excluded2);

  var _props$value = props.value,
      value = _props$value === void 0 ? {} : _props$value,
      onChange = props.onChange,
      customizer = props.customizer;
  var console = useDebugger();
  var sunmao = useSunmao();

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      groups = _useState2[0],
      setGroups = _useState2[1];

  var defaultValue = useRef({});

  var _useFormState = useFormState(),
      _useFormState2 = _slicedToArray(_useFormState, 2),
      form = _useFormState2[0],
      Form = _useFormState2[1];

  useEffect(function () {
    if (!customizer) {
      return;
    }

    defaultValue.current = {};
    groups.length = 0;
    setGroups(customizer.fields.reduce(function (groups, definition) {
      var id = (typeof definition.group === 'boolean' ? definition.name : definition.group) || 'DEFAULT';
      var group = groups.find(function (g) {
        return g.id === id;
      });

      if (group) {
        group.fields.push(_objectSpread(_objectSpread({}, definition), {}, {
          renderer: getRenderer(sunmao, library, definition)
        }));
      } else {
        var _group = (customizer.groups || []).find(function (g) {
          return g.id === id;
        });

        if (_group) {
          groups.push(group = _objectSpread(_objectSpread({}, _group), {}, {
            fields: []
          }));
        } else {
          groups.push(group = {
            id: id,
            fields: []
          });
        }

        group.fields.push(_objectSpread(_objectSpread({}, definition), {}, {
          renderer: getRenderer(sunmao, library, definition)
        }));
      }

      defaultValue.current[definition.name] = definition.defaultValue;
      return groups;
    }, []).map(function (group) {
      if (group.fields.length === 1 && !group.visible) {
        group.visible = group.fields[0].visible;
      }

      return group;
    }));

    var fieldsValue = _objectSpread(_objectSpread({}, defaultValue.current), value);

    form.setFieldsValue(fieldsValue);
    console.log('表单配置:', customizer);
    console.log('表单初始数据:', 'DefaultValue = ', defaultValue.current, 'FieldsValue = ', fieldsValue);
    return function () {
      form.resetFields();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizer]);
  var handleValuesChange = useCallback(function (_, allValues) {
    console.log('表单更新', allValues);
    onChange && onChange(allValues); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (value && !isEqual(form.getFieldsValue(), value)) {
      form.setFieldsValue(_objectSpread(_objectSpread({}, defaultValue.current), value));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);
  return /*#__PURE__*/_jsx(Form, {
    form: form,
    component: false,
    name: "control-hooks",
    onValuesChange: handleValuesChange,
    children: groups.filter(visibleFilter(value)).map(function (_ref5) {
      var id = _ref5.id,
          name = _ref5.name,
          layout = _ref5.layout,
          fields = _ref5.fields;
      return /*#__PURE__*/_jsx(FormFieldset, {
        title: !id.startsWith(DEFAULT_GROUP_ID) && name,
        children: /*#__PURE__*/_jsx(PanelBody, {
          group: id,
          layout: layout,
          fields: fields,
          value: value,
          Form: Form
        })
      }, id);
    })
  });
};

DynaActionForm.defaultProps = {
  layout: 'Inline'
};
export default /*#__PURE__*/React.memo(DynaActionForm);