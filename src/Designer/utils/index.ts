import { DependencyList, useCallback, useEffect, useMemo, useRef } from 'react';

import debounce from 'lodash/debounce';
import lodashThrottle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';

export function useDebounce<T extends (...args: any) => any>(fn: T, delay: number, deps?: DependencyList) {
  return useCallback(debounce(fn, delay), deps || []);
}

function deepCompareEquals(a: any, b: any) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: DependencyList) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareMemo<T>(factory: () => T, dependencies?: DependencyList): T {
  return useMemo(factory, useDeepCompareMemoize(dependencies));
}

export const dispatchWindowResize = lodashThrottle(() => {
  window.dispatchEvent(new Event('resize'));
}, 500);

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, time);
  });

export const visibleFilter = (props: any) => {
  return ({ visible }: any) => {
    if (typeof visible === 'function') {
      return visible(props);
    }
    return visible !== false;
  };
};

export function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
