var _excluded = ["data", "drag", "remove", "update", "dragging", "indicator", "animated", "level", "index"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import Sortable, { ISortableItem, SortableItemContentProps } from '../../sortable';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import Sortable from '@asany/sortable';
import { Icon } from '@asany/icons';
import { generateUUID } from "../../utils";
import WrapperItem from "./WrapperItem";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var buildItemRender = function buildItemRender(XItemRender, options) {
  var children = options.children,
      placeholder = options.placeholder,
      className = options.className,
      isObject = options.isObject,
      buildChange = options.buildChange,
      showPopoverImmediatelyAtCreated = options.showPopoverImmediatelyAtCreated;
  var InnerItemRender = /*#__PURE__*/React.forwardRef(function (props, ref) {
    if (!children && !XItemRender) {
      return /*#__PURE__*/_jsx(WrapperItem, _objectSpread(_objectSpread({}, props), {}, {
        placeholder: placeholder,
        editable: !isObject ? false : undefined,
        nameLink: !isObject ? false : undefined,
        ref: ref
      }));
    }

    return XItemRender ? /*#__PURE__*/_jsx(XItemRender, _objectSpread(_objectSpread({}, props), {}, {
      ref: ref
    })) : /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread({}, props), {}, {
      ref: ref
    }));
  });
  return function (_ref, ref) {
    var data = _ref.data,
        drag = _ref.drag,
        remove = _ref.remove,
        update = _ref.update,
        dragging = _ref.dragging,
        indicator = _ref.indicator,
        animated = _ref.animated,
        level = _ref.level,
        index = _ref.index,
        props = _objectWithoutProperties(_ref, _excluded);

    var itemRenderProps = {
      level: level,
      index: index,
      drag: drag,
      data: data,
      onDelete: remove,
      onChange: buildChange(data),
      showPopoverImmediatelyAtCreated: showPopoverImmediatelyAtCreated
    };
    return /*#__PURE__*/_jsx("li", _objectSpread(_objectSpread(_objectSpread({}, animated), props), {}, {
      className: className,
      ref: ref,
      children: /*#__PURE__*/_jsx(InnerItemRender, _objectSpread({}, itemRenderProps))
    }));
  };
};

function getAddItem(type) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var canSortItem = arguments.length > 2 ? arguments[2] : undefined;
  var isObject = arguments.length > 3 ? arguments[3] : undefined;
  return {
    id: generateUUID(),
    icon: '',
    type: type,
    // 展示名称
    name: defaultName || '',
    // 是否支持可以排序
    sortable: canSortItem,
    // 是否为预设项
    isPreset: false,
    // 是否可以被删除，如果为用户添加项，该值一定为 false
    isDelete: false,
    data: isObject ? {} : '',
    canEditName: true,
    component: 'notFound'
  };
}

export function MultipleWrapper(props) {
  var onChange = props.onChange,
      children = props.children,
      canAddItem = props.canAddItem,
      _props$canSortItem = props.canSortItem,
      canSortItem = _props$canSortItem === void 0 ? true : _props$canSortItem,
      _props$immediatelySho = props.immediatelyShowPopoverWhenCreated,
      immediatelyShow = _props$immediatelySho === void 0 ? true : _props$immediatelySho,
      itemName = props.itemName,
      placeholder = props.placeholder,
      pipeline = props.pipeline,
      itemClassName = props.itemClassName,
      defaultItemRender = props.itemRender,
      presetValue = props.presetValue,
      _props$isObject = props.isObject,
      isObject = _props$isObject === void 0 ? true : _props$isObject,
      initializer = props.initializer; // 当创建完成立即展示 popover 在第一次点击新增后变为 true,然后新增F的行会展示
  // 初始为 false 意义是无法辨别当前行是否新增

  var sortableType = useRef(generateUUID());

  var _useState = useState((props.value || presetValue || []).map(function (item) {
    return {
      id: item.id || generateUUID(),
      data: item,
      sortable: canSortItem,
      type: sortableType.current,
      state: 'isOld'
    };
  })),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setOldValue = _useState2[1];

  var setValue = useCallback(function (value) {
    setOldValue(value); // console.log('Items Change', value);

    onChange && onChange(value.map(function (item) {
      return item.data;
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var temp = useRef({});
  temp.current.value = value;

  var handleDelete = function handleDelete(data) {
    return function () {
      var value = temp.current.value;
      var index = value.findIndex(function (item) {
        return item.id === data.id;
      });

      var newVal = _toConsumableArray(value);

      if (!data.isPreset) {
        // 上一次绑定
        newVal.splice(index, 1);
      } else {
        var isDelete = !data.isDelete;
        newVal.splice(index, 1, Object.assign(data, {
          isDelete: isDelete
        }));
      }

      setValue(newVal);
    };
  };

  var handleItemChange = function handleItemChange(data) {
    return function (newData) {
      var value = temp.current.value; // console.log('Items Change', data, newData);

      var newValue = value.map(function (item) {
        return item.id === data.id ? _objectSpread(_objectSpread({}, data), newData) : item;
      });
      setValue(pipeline ? pipeline(newValue, newData) : newValue);
    };
  };

  var handleInsertRow = function handleInsertRow(e) {
    e.stopPropagation();

    if (!canAddItem) {
      return;
    }

    var item = getAddItem(sortableType.current, itemName, canSortItem, isObject);
    setValue([].concat(_toConsumableArray(value), [_objectSpread(_objectSpread({}, item), {}, {
      data: initializer ? initializer(item) : item.data,
      state: 'isNew'
    })]));
  };

  var handleSortChange = useCallback(function (items) {
    setValue(items);
  }, [setValue]);
  var itemRender = useMemo(function () {
    return buildItemRender(defaultItemRender, {
      buildChange: handleItemChange,
      className: itemClassName,
      isObject: isObject,
      placeholder: placeholder,
      showPopoverImmediatelyAtCreated: immediatelyShow,
      children: children
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  console.log('........', value);
  return /*#__PURE__*/_jsxs("div", {
    className: "multiple-wrapper",
    children: [/*#__PURE__*/_jsx("div", {
      className: "multiple-wrapper-header",
      children: canAddItem &&
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      _jsx("a", {
        onClick: handleInsertRow,
        children: /*#__PURE__*/_jsx(Icon, {
          name: "AsanyEditor/Plus"
        })
      })
    }), canSortItem ? /*#__PURE__*/_jsx(Sortable, {
      accept: [sortableType.current],
      className: "multiple-wrapper-list",
      tag: "ul",
      items: value,
      itemRender: itemRender // preview={{
      //   render: dragPreview(itemRender),
      //   axisLocked: true,
      // }}
      ,
      onChange: handleSortChange
    }) : /*#__PURE__*/_jsx("ul", {
      className: "multiple-wrapper-list",
      children: value.map(function (item) {
        return /*#__PURE__*/_jsx("li", {
          className: itemClassName,
          children: /*#__PURE__*/React.cloneElement(children, {
            id: item.id,
            data: item,
            popoverContentVisible: immediatelyShow,
            onDelete: handleDelete(item),
            onChange: handleItemChange(item)
          })
        }, "multiple-item-".concat(item.id));
      })
    })]
  });
}
MultipleWrapper.defaultProps = {
  canSortItem: true,
  immediatelyShowPopoverWhenCreated: true,
  canAddItem: true
};
export default /*#__PURE__*/memo(MultipleWrapper);