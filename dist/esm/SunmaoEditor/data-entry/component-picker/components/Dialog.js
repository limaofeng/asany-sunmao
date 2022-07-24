import React, { useCallback, useRef } from 'react';
import { useClickAway } from 'react-use';
import LibraryPanel from "./LibraryPanel";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Dialog(_ref) {
  var value = _ref.value,
      close = _ref.close,
      visible = _ref.visible,
      onChange = _ref.onChange,
      treeData = _ref.options;
  var ref = useRef(null);
  useClickAway(ref, function () {
    close();
  });
  var handleChange = useCallback(function (name) {
    onChange(name);
    close();
  }, [close, onChange]);
  return /*#__PURE__*/_jsxs("div", {
    ref: ref,
    className: "ae-popover component-picker",
    children: [/*#__PURE__*/_jsx("div", {
      className: "ae-popover-header tw-flex tw-items-center",
      children: /*#__PURE__*/_jsx("span", {
        className: "ae-popover-header-title tw-flex-1",
        children: "\u7EC4\u4EF6"
      })
    }), /*#__PURE__*/_jsx(LibraryPanel, {
      visible: visible,
      value: value,
      treeData: treeData,
      onChange: handleChange
    })]
  });
}

export default /*#__PURE__*/React.memo(Dialog);