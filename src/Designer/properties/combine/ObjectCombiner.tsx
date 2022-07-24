import React, { useEffect } from 'react';

import { Form } from 'antd';
import isEqual from 'lodash/isEqual';
import { ComponentPropertyRendererSetting, IField, useSunmao } from '../../../sunmao';
import { FormLayout } from 'antd/lib/form/Form';

import { getRenderer } from '../renderers';
import { FormItemWrapper, visibleFilter } from '../DynaActionForm';

interface ObjectCombinerProps {
  value?: any;
  layout?: FormLayout;
  onChange?: (value: any) => void;
  className?: string;
  fields: IField[];
}

function ObjectCombiner(props: ObjectCombinerProps) {
  const { className, value, onChange } = props;

  const sunmao = useSunmao();

  const fields = props.fields.map((item) => ({
    ...item,
    renderer: getRenderer(sunmao, 'cn.asany.ui.editor.properties', item),
  }));
  const [form] = Form.useForm();
  const handleValuesChange = (_: any, allValues: any) => {
    console.log('handleValuesChange', _, allValues);
    onChange && onChange(allValues);
  };
  useEffect(() => {
    if (value && !isEqual(form.getFieldsValue(), value)) {
      form.setFieldsValue({ ...value });
    }
  }, [form, value]);
  return (
    <Form
      form={form}
      className={className}
      layout={props.layout || 'inline'}
      component={'div'}
      onValuesChange={handleValuesChange}
    >
      {fields.filter(visibleFilter(props.value)).map((item) => {
        const { component, props = {} } = item.renderer as ComponentPropertyRendererSetting;
        const ComponentForm = component as React.ComponentType<any>;
        const lable = item.hiddenLabel ? '' : !item.multiple && item.label;
        const valuePropName = item.type === 'Boolean' ? 'checked' : undefined;
        return (
          <Form.Item
            className={`object-combiner-field-${item.name}`}
            key={item.name}
            label={lable}
            name={item.name}
            valuePropName={valuePropName}
          >
            <FormItemWrapper {...props} field={item} component={ComponentForm} />
          </Form.Item>
        );
      })}
    </Form>
  );
}

export default React.memo(ObjectCombiner);
