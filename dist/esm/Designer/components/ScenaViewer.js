import React, { useRef } from 'react'; // import Selecto from 'react-selecto';
// import Memory from '../utils/Memory';
// import MoveableData from '../utils/MoveableData';

import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function ScenaViewer(props) {
  var container = useRef(); // const selecto = useRef<Selecto>(null);
  // const memory = useRef(new Memory());
  // const moveableData = useRef(new MoveableData(memory.current));

  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx("div", {
      ref: container,
      className: "scena-viewer",
      children: props.children
    })
  });
}

export default /*#__PURE__*/React.memo(ScenaViewer);