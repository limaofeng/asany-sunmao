function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useEffect, useReducer, useRef } from 'react';
import useSunmao from "./useSunmao";

function useLoadDataSource(dataSourceLoader, param) {
  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var latestDataState = useRef(null);
  useEffect(function () {
    if (!dataSourceLoader) {
      latestDataState.current = null;
      forceRender();
      return;
    }

    latestDataState.current = dataSourceLoader.load(param);
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSourceLoader]);
  return latestDataState.current;
}

function useDataSource(type, param) {
  var sunmao = useSunmao();

  var _useReducer3 = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      forceRender = _useReducer4[1];

  var latestDataSourceLoader = useRef(sunmao.getDataSourceLoader(type));
  useEffect(function () {
    return sunmao.subscribe(function () {
      var dataSourceLoader = sunmao.getDataSourceLoader(type);

      if (latestDataSourceLoader.current !== dataSourceLoader) {
        latestDataSourceLoader.current = dataSourceLoader;
        forceRender();
      }
    });
  }, [sunmao, type]);
  var dataSourceLoader = latestDataSourceLoader.current;
  return useLoadDataSource(dataSourceLoader, param);
}

export default useDataSource;