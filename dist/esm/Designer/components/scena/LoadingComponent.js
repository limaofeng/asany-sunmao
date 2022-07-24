import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import SpinKit from "../spinkit";
import { jsx as _jsx } from "react/jsx-runtime";

function LoadingComponent(props) {
  var loading = props.loading,
      className = props.className,
      style = props.style;

  var handleAddEndListener = function handleAddEndListener(node, done) {
    node.addEventListener('transitionend', done, false);
  };

  return /*#__PURE__*/_jsx(CSSTransition, {
    in: loading,
    addEndListener: handleAddEndListener,
    classNames: "asany-editor-loading",
    children: /*#__PURE__*/_jsx("div", {
      style: style,
      className: classnames('asany-editor-loading', className),
      children: /*#__PURE__*/_jsx(SpinKit, {
        name: "Wave"
      })
    })
  });
}

export default /*#__PURE__*/React.memo(LoadingComponent);