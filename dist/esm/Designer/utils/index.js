import { useCallback, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import lodashThrottle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';
export function useDebounce(fn, delay, deps) {
  return useCallback(debounce(fn, delay), deps || []);
}

function deepCompareEquals(a, b) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  var ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect, dependencies) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
export function useDeepCompareMemo(factory, dependencies) {
  return useMemo(factory, useDeepCompareMemoize(dependencies));
}
export var dispatchWindowResize = lodashThrottle(function () {
  window.dispatchEvent(new Event('resize'));
}, 500);
export var sleep = function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(0);
    }, time);
  });
};
export var visibleFilter = function visibleFilter(props) {
  return function (_ref) {
    var visible = _ref.visible;

    if (typeof visible === 'function') {
      return visible(props);
    }

    return visible !== false;
  };
};
export function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> c / 4).toString(16);
  });
}