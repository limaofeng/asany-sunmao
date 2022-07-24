import React, { useMemo } from 'react';
import Sunmao from "./Sunmao";
import { jsx as _jsx } from "react/jsx-runtime";
var defaultSunmao = new Sunmao();
export var SunmaoContext = /*#__PURE__*/React.createContext({
  sunmao: defaultSunmao,
  debug: true
});

function SunmaoProvider(_ref) {
  var sunmao = _ref.sunmao,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? true : _ref$debug,
      children = _ref.children;
  return useMemo(function () {
    return /*#__PURE__*/_jsx(SunmaoContext.Provider, {
      value: {
        sunmao: sunmao || defaultSunmao,
        debug: debug
      },
      children: children
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default SunmaoProvider;