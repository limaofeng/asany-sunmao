function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import lodashThrottle from 'lodash/throttle';
export function useDebounce(fn, delay, deps) {
  return useCallback(debounce(fn, delay), deps || []);
}
export function tree(list, _ref) {
  var _ref$idKey = _ref.idKey,
      idKey = _ref$idKey === void 0 ? 'id' : _ref$idKey,
      _ref$pidKey = _ref.pidKey,
      pidKey = _ref$pidKey === void 0 ? 'parent_id' : _ref$pidKey,
      _ref$childrenKey = _ref.childrenKey,
      childrenKey = _ref$childrenKey === void 0 ? 'children' : _ref$childrenKey,
      _ref$getParentKey = _ref.getParentKey,
      getParentKey = _ref$getParentKey === void 0 ? function (data) {
    return getFieldValue(data, pidKey);
  } : _ref$getParentKey,
      _ref$converter = _ref.converter,
      converter = _ref$converter === void 0 ? undefined : _ref$converter,
      _ref$sort = _ref.sort,
      sort = _ref$sort === void 0 ? undefined : _ref$sort;
  var start = new Date().getTime();

  try {
    var roots = list.filter(function (item) {
      if (getParentKey(item)) {
        var parent = list.find(function (parent) {
          return parent[idKey].toString() === getParentKey(item).toString();
        });

        if (!parent) {
          return true;
        }

        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }

        var children = parent[childrenKey]; // TODO 逻辑漏洞

        item['parent'] = parent;
        children.push(item);

        if (sort) {
          parent[childrenKey] = children.sort(sort);
        }

        return false;
      }

      return true;
    });

    var converterFunc = function converterFunc(item) {
      if (item[childrenKey]) {
        item[childrenKey] = item[childrenKey].map(converterFunc);
      }

      return converter ? converter(item) : item;
    };

    roots = sort ? roots.sort(sort) : roots;
    return converter ? roots.map(converterFunc) : roots;
  } finally {
    console.log('list -> tree 耗时', new Date().getTime() - start, 'ms');
  }
} // 获取元素的绝对位置坐标（像对于浏览器视区左上角）

export function getElementViewPosition(element) {
  // 计算x坐标
  var elementScrollLeft, elementScrollTop;
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent;
  }

  if (document.compatMode === 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft;
  } else {
    elementScrollLeft = document.documentElement.scrollLeft;
  }

  var left = actualLeft - elementScrollLeft; // 计算y坐标

  var actualTop = element.offsetTop;
  current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }

  if (document.compatMode === 'BackCompat') {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }

  return {
    x: left,
    y: actualTop - elementScrollTop
  };
}
export function urlToList(url) {
  var urllist = url.split('/').filter(function (i) {
    return i;
  });
  return urllist.map(function (_, index) {
    return "/".concat(urllist.slice(0, index + 1).join('/'));
  });
}
export var sleep = function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(0);
    }, time);
  });
};
export function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> c / 4).toString(16);
  });
}
export var dispatchWindowResize = lodashThrottle(function () {
  window.dispatchEvent(new Event('resize'));
}, 500);
export var throttle = function throttle(callback, options) {
  var _ref2 = options || {},
      _ref2$compare = _ref2.compare,
      compare = _ref2$compare === void 0 ? isEqual : _ref2$compare;

  var prev = null;
  return {
    apply: function apply() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (compare(prev, args)) {
        return;
      }

      callback.apply(void 0, args);
      prev = args;
    }
  };
};
export function LightenColor(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');

  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  lum = lum || 0; // convert to decimal and change luminosity

  var rgb = '#',
      c,
      i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

function deepCompareEquals(a, b) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  var ref = useRef(); // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect, dependencies) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
export function getFieldValue(root, path) {
  var value = root;

  var _iterator = _createForOfIteratorHelper(path.split('.')),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if (!value) {
        return;
      }

      value = value[key];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return value;
}
export function setFieldValue(root, path, value) {
  path.split('.').reduce(function (obj, key, currentIndex, array) {
    if (currentIndex === array.length - 1) {
      obj[key] = value;
    } else if (obj[key] === undefined || obj[key] === null) {
      return obj[key] = {};
    }

    return null;
  }, root);
  return root;
}
export function assign(target) {
  for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  sources.forEach(function (source) {
    var descriptors = Object.keys(source).reduce(function (descriptors, key) {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    Object.getOwnPropertySymbols(source).forEach(function (sym) {
      var descriptor = Object.getOwnPropertyDescriptor(source, sym);

      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}