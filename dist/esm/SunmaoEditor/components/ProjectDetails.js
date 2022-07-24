import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEditorSelector } from "../../Designer";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ProjectDetails() {
  var project = useEditorSelector(function (state) {
    return state.project;
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "sidebar-subpanel",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "sidebar-subpanel-header",
      children: [/*#__PURE__*/_jsx("div", {
        className: "header-left",
        children: "\u9879\u76EE\u8BE6\u60C5"
      }), /*#__PURE__*/_jsx("div", {
        className: "header-right"
      })]
    }), /*#__PURE__*/_jsx(OverlayScrollbarsComponent, {
      options: {
        scrollbars: {
          autoHide: 'scroll'
        }
      },
      style: {
        height: '100%'
      },
      children: /*#__PURE__*/_jsx("div", {
        style: {
          padding: '8px 8px 0 16px'
        },
        children: project.name
      })
    })]
  });
}

export default ProjectDetails;