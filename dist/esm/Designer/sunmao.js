var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { Checkbox, Radio, Switch } from 'antd'; // eslint-disable-next-line @typescript-eslint/no-unused-vars

import { component, library } from "../sunmao";
import MultipleWrapper from "./properties/combine/MultipleWrapper";
import WrapperItem from "./properties/combine/WrapperItem";
import WrapperPopover from "./properties/combine/WrapperPopover";
import { Input, InputNumber, Select, TextArea } from "./properties/data-entry";
import DsignColor from "./properties/DsignColor";
var EditorLibrary = (_dec = library({
  name: 'AsanyEditor',
  namespace: 'cn.asany.ui.editor.properties'
}), _dec2 = component({}), _dec3 = component({}), _dec4 = component({}), _dec5 = component({}), _dec6 = component({}), _dec7 = component({}), _dec8 = component({}), _dec9 = component({}), _dec10 = component({}), _dec11 = component({}), _dec12 = component({}), _dec13 = component({}), _dec(_class = (_class2 = /*#__PURE__*/_createClass(function EditorLibrary() {
  _classCallCheck(this, EditorLibrary);

  _initializerDefineProperty(this, "Input", _descriptor, this);

  _initializerDefineProperty(this, "Checkbox", _descriptor2, this);

  _initializerDefineProperty(this, "CheckboxGroup", _descriptor3, this);

  _initializerDefineProperty(this, "RadioGroup", _descriptor4, this);

  _initializerDefineProperty(this, "InputNumber", _descriptor5, this);

  _initializerDefineProperty(this, "Select", _descriptor6, this);

  _initializerDefineProperty(this, "Switch", _descriptor7, this);

  _initializerDefineProperty(this, "TextArea", _descriptor8, this);

  _initializerDefineProperty(this, "DsignColor", _descriptor9, this);

  _initializerDefineProperty(this, "MultipleWrapper", _descriptor10, this);

  _initializerDefineProperty(this, "PopoverWrapper", _descriptor11, this);

  _initializerDefineProperty(this, "DefaultMultipleWrapperItem", _descriptor12, this);
}), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Input", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Input;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Checkbox", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Checkbox;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "CheckboxGroup", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Checkbox.Group;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "RadioGroup", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Radio.Group;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "InputNumber", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return InputNumber;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "Select", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Select;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "Switch", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Switch;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "TextArea", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return TextArea;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "DsignColor", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DsignColor;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "MultipleWrapper", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return MultipleWrapper;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "PopoverWrapper", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapperPopover;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "DefaultMultipleWrapperItem", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapperItem;
  }
})), _class2)) || _class);
var editor = new EditorLibrary();
export default [editor];