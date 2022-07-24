import { MIXED } from "./typings";
export var radiusSize = function radiusSize(arr) {
  return new Set(arr).size === 1;
};
export var onlyNumber = function onlyNumber(value) {
  return (value + '').replace(/[^0-9]/gi, '');
}; // 用于圆角的过滤样式

export var radiusFormat = {
  input: function input(value) {
    if (Array.isArray(value)) {
      console.log(value);

      if (radiusSize(value)) {
        return onlyNumber(value[0]);
      } else {
        return MIXED;
      }
    }

    return onlyNumber(value);
  },
  output: function output(value) {
    var num = parseInt(value);
    return [num, num, num, num];
  }
}; // 用于角度的过滤

export var rotateFormat = {
  input: function input(value) {
    var num = onlyNumber(value) || 0;
    return "".concat(num, "\xB0");
  }
}; // 用于一般输入框的过滤

export var inputFormat = {
  input: function input(value) {
    return onlyNumber(value) || '0';
  }
};
export var numberFormat = {
  input: function input(value) {
    return onlyNumber(value) || '0';
  },
  output: function output(value) {
    return parseInt(value);
  }
};