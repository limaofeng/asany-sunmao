function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { EventEmitter } from 'events';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { jsx as _jsx } from "react/jsx-runtime";

var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};

var EVENT_FIELDSCHANGE = 'FieldsChange';

var FormEventManager = /*#__PURE__*/function () {
  function FormEventManager(form) {
    var _this = this;

    _classCallCheck(this, FormEventManager);

    _defineProperty(this, "emitter", new EventEmitter());

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "unsubscribe", function (callback) {
      return function () {
        _this.emitter.removeListener(EVENT_FIELDSCHANGE, callback);
      };
    });

    _defineProperty(this, "subscribe", function (callback) {
      _this.emitter.addListener(EVENT_FIELDSCHANGE, callback);

      return _this.unsubscribe(callback);
    });

    _defineProperty(this, "getState", function () {
      return _this.form.getFieldsValue();
    });

    this.form = form;
  }

  _createClass(FormEventManager, [{
    key: "dispatch",
    value: function dispatch(action) {
      this.emitter.emit(EVENT_FIELDSCHANGE, action);
    }
  }]);

  return FormEventManager;
}();

var FormStateContext = /*#__PURE__*/React.createContext(new FormEventManager());

function FormProvider(props) {
  var form = props.form,
      onValuesChange = props.onValuesChange;
  var manager = useRef(new FormEventManager(form));
  var handleValuesChange = useCallback(function (changedValues, allValues) {
    manager.current.dispatch(changedValues);
    onValuesChange && onValuesChange(changedValues, allValues);
  }, [onValuesChange]);
  useEffect(function () {
    if (!form) {
      return;
    }

    form.setFieldsValue = function (OldSetFieldsValue) {
      return function (value) {
        OldSetFieldsValue(value);
        setTimeout(function () {
          return manager.current.dispatch(value);
        }, 250);
      };
    }(form.setFieldsValue);
  }, [form]);
  return /*#__PURE__*/_jsx(FormStateContext.Provider, {
    value: manager.current,
    children: /*#__PURE__*/_jsx(Form, _objectSpread(_objectSpread({}, props), {}, {
      onValuesChange: handleValuesChange
    }))
  });
}

FormProvider.Item = Form.Item;
export var useFormState = function useFormState() {
  var _useForm = useForm(),
      _useForm2 = _slicedToArray(_useForm, 1),
      form = _useForm2[0];

  return [form, FormProvider];
};
export function useFormSelector(selector) {
  var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;
  var context = useContext(FormStateContext);
  var state = context.getState();

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var latestSelectedState = useRef();
  var selectedState = selector(state);
  var checkForUpdates = useCallback(function checkForUpdates() {
    var newSelectedState = selector(state);

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    }

    latestSelectedState.current = newSelectedState;
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    return context.subscribe(checkForUpdates); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return selectedState;
}