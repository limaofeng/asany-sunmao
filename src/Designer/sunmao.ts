import { Radio, Checkbox, Switch } from 'antd';
import type { CheckboxProps, SwitchProps } from 'antd';
import { component, library } from '../sunmao/decorators';

import MultipleWrapper from './properties/combine/MultipleWrapper';
import WrapperItem from './properties/combine/WrapperItem';
import WrapperPopover from './properties/combine/WrapperPopover';
import { SingleLineText, InputNumber, Select, MultiLineText } from './properties/data-entry';
import DsignColor from './properties/DsignColor';

import React from 'react';

@library({ name: 'AsanyEditor', namespace: 'cn.asany.ui.editor.properties' })
class EditorLibrary {
  @component({})
  SingleLineText = SingleLineText;

  @component({})
  MultiLineText = MultiLineText;

  @component({})
  Checkbox() {
    return (props: CheckboxProps) => React.createElement(Checkbox, props);
  }

  @component({})
  CheckboxGroup = Checkbox.Group;

  @component({})
  RadioGroup = Radio.Group;

  @component({})
  Number = InputNumber;

  @component({})
  Select = Select;

  @component({})
  Switch() {
    return (props: SwitchProps) => React.createElement(Switch, props);
  }

  @component({})
  DsignColor = DsignColor as unknown as React.Component;

  @component({})
  MultipleWrapper = MultipleWrapper;

  @component({})
  PopoverWrapper = WrapperPopover as unknown as React.Component;

  @component({})
  DefaultMultipleWrapperItem = WrapperItem as unknown as React.Component;
}

export default EditorLibrary;
