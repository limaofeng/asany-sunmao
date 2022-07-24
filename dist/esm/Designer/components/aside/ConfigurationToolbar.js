import React, { useCallback, useRef } from 'react';
import { Popover } from 'antd';
import { useEditorDispatch, useEditorSelector } from "../../hooks";
import FormPanel from "../../properties/DynaActionForm";
import { ActionType, UIActionType } from "../../reducers/actions";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function EditableZoom() {
  var dispatch = useEditorDispatch();
  var zoom = useEditorSelector(function (state) {
    return state.ui.scena.zoom;
  });
  var handleOut = useCallback(function () {
    dispatch({
      type: UIActionType.CanvasZoomOut
    });
  }, [dispatch]);
  var handleIn = useCallback(function () {
    dispatch({
      type: UIActionType.CanvasZoomIn
    });
  }, [dispatch]);

  var handleChange = function handleChange(e) {
    console.log(e.target.value.replace(/[%]^/i, ''));
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "editable-zoom-group-wrapper",
    children: [/*#__PURE__*/_jsx("button", {
      className: "zoom-out",
      onClick: handleOut,
      children: /*#__PURE__*/_jsx("svg", {
        id: "zoom-out",
        className: "icon-zoom-out",
        width: 16,
        height: 16,
        children: /*#__PURE__*/_jsx("svg", {
          children: /*#__PURE__*/_jsx("path", {
            d: "M8 1c0 0.5-0.5 1-1 1H1C0.5 2 0 1.5 0 1s0.5-1 1-1h6C7.5 0 8 0.5 8 1z"
          })
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "editable-zoom",
      children: /*#__PURE__*/_jsx("input", {
        type: "text",
        onChange: handleChange,
        value: "".concat(Math.floor(zoom * 100), "%")
      })
    }), /*#__PURE__*/_jsx("button", {
      className: "zoom-in",
      onClick: handleIn,
      children: /*#__PURE__*/_jsx("svg", {
        id: "zoom-in",
        className: "icon-zoom-in",
        width: 16,
        height: 16,
        children: /*#__PURE__*/_jsx("svg", {
          children: /*#__PURE__*/_jsx("path", {
            d: "M8 4c0 0.5-0.5 1-1 1H5v2c0 0.5-0.5 1-1 1S3 7.5 3 7V5H1C0.5 5 0 4.5 0 4s0.5-1 1-1h2V1c0-0.5 0.5-1 1-1s1 0.5 1 1v2h2C7.5 3 8 3.5 8 4z"
          })
        })
      })
    })]
  });
}

function Guides() {
  var ruler = useEditorSelector(function (state) {
    return state.features.ruler;
  });
  var customizer = useRef({
    fields: [{
      name: 'ruler',
      label: '标尺',
      type: 'Boolean'
    }]
  });
  var dispatch = useEditorDispatch();

  var handleChange = function handleChange(value) {
    dispatch({
      type: ActionType.FeatureRuler,
      payload: value.ruler
    });
  };

  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(FormPanel, {
      value: {
        ruler: ruler
      },
      onChange: handleChange,
      customizer: customizer.current
    })
  });
}

function ConfigurationToolbar(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsxs("div", {
    className: "settings-footer",
    children: [children, /*#__PURE__*/_jsxs("div", {
      className: "settings-footer-heading-footer",
      children: [/*#__PURE__*/_jsx(EditableZoom, {}), /*#__PURE__*/_jsx("div", {
        className: "guides",
        children: /*#__PURE__*/_jsx(Popover, {
          overlayClassName: "guides-popover",
          placement: "topLeft" // tslint:disable-next-line:jsx-no-lambda
          ,
          getPopupContainer: function getPopupContainer() {
            return document.getElementsByClassName('settings-footer')[0];
          },
          content: /*#__PURE__*/_jsx(Guides, {}),
          transitionName: "",
          trigger: "click",
          children: /*#__PURE__*/_jsxs("button", {
            children: [/*#__PURE__*/_jsx("span", {
              className: "icon-container",
              children: /*#__PURE__*/_jsx("svg", {
                id: "guides",
                width: 16,
                height: 16,
                children: /*#__PURE__*/_jsx("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 13 8",
                  children: /*#__PURE__*/_jsx("path", {
                    d: "M0 8V0h1v8zm2 0V0h1v8zm3 0V0h1v8zm2 0V0h1v8zm3 0V0h1v8zm3 0V0h-1v8z"
                  })
                })
              })
            }), "\u6307\u5357"]
          })
        })
      })]
    })]
  });
}

export default ConfigurationToolbar;