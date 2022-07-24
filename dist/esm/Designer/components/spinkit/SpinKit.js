import React from 'react';
import Bounce from "./components/Bounce";
import Chase from "./components/Chase";
import Circle from "./components/Circle";
import CircleFade from "./components/CircleFade";
import Flow from "./components/Flow";
import Fold from "./components/Fold";
import Grid from "./components/Grid";
import Plane from "./components/Plane";
import Pulse from "./components/Pulse";
import Swing from "./components/Swing";
import Wander from "./components/Wander";
import Wave from "./components/Wave";
var spinkits = {
  Bounce: Bounce,
  Chase: Chase,
  Circle: Circle,
  CircleFade: CircleFade,
  Flow: Flow,
  Fold: Fold,
  Grid: Grid,
  Plane: Plane,
  Pulse: Pulse,
  Swing: Swing,
  Wander: Wander,
  Wave: Wave
};

function SpinKit(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/React.createElement(spinkits[name]);
}

export default SpinKit;