import React from 'react';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function FormFieldset(props) {
  var title = props.title,
      children = props.children,
      className = props.className; // const [collapsed, setCollapsed] = useState(true);
  // const handleClick = useCallback(() => {
  //   setCollapsed(!collapsed);
  // }, [collapsed]);
  // console.log('====', title);

  return /*#__PURE__*/_jsxs("div", {
    className: classnames('smart-sidebar-fieldset', className),
    children: [title && /*#__PURE__*/_jsx("div", {
      className: "smart-sidebar-fieldset-header",
      children: /*#__PURE__*/_jsx("span", {
        className: "smart-sidebar-fieldset-header-title",
        children: title
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "smart-sidebar-fieldset-content",
      children: children
    })]
  });
}

export default /*#__PURE__*/React.memo(FormFieldset);