import React from 'react';
import { Select } from 'antd';
import { jsx as _jsx } from "react/jsx-runtime";

function EnvironmentPicker() {
  return /*#__PURE__*/_jsx(Select, {
    placeholder: "\u8BF7\u9009\u62E9\u73AF\u5883",
    defaultValue: "development",
    options: [{
      value: 'development',
      label: '开发环境'
    }, {
      value: 'production',
      label: '生产环境'
    }]
  });
}

export default EnvironmentPicker;