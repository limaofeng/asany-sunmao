import { Checkbox, Radio, Switch } from 'antd';
import { component, library } from '../sunmao/decorators';

import MultipleWrapper from './properties/combine/MultipleWrapper';
import WrapperItem from './properties/combine/WrapperItem';
import WrapperPopover from './properties/combine/WrapperPopover';
import { Input, InputNumber, Select, TextArea } from './properties/data-entry';
import DsignColor from './properties/DsignColor';

@library({ name: 'AsanyEditor', namespace: 'cn.asany.ui.editor.properties' })
class EditorLibrary {
  @component({})
  Input = Input;

  @component({})
  Checkbox = Checkbox as unknown as React.Component;

  @component({})
  CheckboxGroup = Checkbox.Group;

  @component({})
  RadioGroup = Radio.Group;

  @component({})
  InputNumber = InputNumber;

  @component({})
  Select = Select;

  @component({})
  Switch = Switch as unknown as React.Component;

  @component({})
  TextArea = TextArea;

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
