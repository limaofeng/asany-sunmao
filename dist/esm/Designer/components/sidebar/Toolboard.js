function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useReducer, useRef, useState } from 'react';
import Icon from '@asany/icons';
import classnames from 'classnames';
import { useEditorDispatch, useEditorSelector } from "../../hooks";
import { ActionType, UISidebarActionType } from "../../reducers/actions";
import { sleep } from "../../utils";
import Resizer from "../resizer";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Toolboard(props, ref) {
  var editor = props.editor,
      setCollapsed = props.setCollapsed,
      children = props.children,
      onResize = props.onResize;
  var state = useRef({
    index: -1,
    width: 0,
    offset: 0,
    minimizable: false,
    panels: {}
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var dispatch = useEditorDispatch();
  var visible = useEditorSelector(function (state) {
    return state.ui.sidebar.visible;
  });
  var minimizable = useEditorSelector(function (state) {
    return state.ui.sidebar.minimizable;
  });
  var keepOpen = useEditorSelector(function (state) {
    return !!state.ui.sidebar.content;
  });
  var width = useEditorSelector(function (state) {
    return state.ui.sidebar.width;
  });
  var minWidth = useEditorSelector(function (state) {
    return state.ui.sidebar.minWidth;
  });
  var handleReopen = useCallback(function (key) {
    var _state$current = state.current,
        allPanels = _state$current.panels,
        activeKey = _state$current.activeKey;

    if (!allPanels[key]) {
      return;
    }

    var _panels = activeKey ? allPanels[activeKey] : [];

    if (!_panels || !_panels.length) {
      return;
    }

    state.current.activeKey = key;
    editor.sidebar.select(key, true);
    forceRender();
    return;
  }, [editor.sidebar]);
  var _state$current2 = state.current,
      all = _state$current2.panels,
      activeKey = _state$current2.activeKey;
  var handleClose = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var index,
        _state$current3,
        allPanels,
        activeKey,
        _panels,
        panels,
        toolboardKey,
        _panels2,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
            _state$current3 = state.current, allPanels = _state$current3.panels, activeKey = _state$current3.activeKey;
            _panels = activeKey ? allPanels[activeKey] : [];

            if (_panels.length) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            state.current.index = index - 1;

            if (!(index === 0)) {
              _context.next = 20;
              break;
            }

            panels = _panels.slice(index);
            panels.forEach(function (item) {
              return item.collapsed = true;
            });
            forceRender();
            setCollapsed(true);
            toolboardKey = editor.state.ui.sidebar.toolboardKey;
            dispatch({
              type: ActionType.SidebarUnSelect,
              payload: toolboardKey
            });
            _context.next = 15;
            return sleep(400);

          case 15:
            _panels.length = 1;
            state.current.activeKey = undefined;
            forceRender();
            _context.next = 27;
            break;

          case 20:
            _panels2 = _panels.slice(index);

            _panels2.forEach(function (item) {
              return item.collapsed = true;
            });

            forceRender();
            _context.next = 25;
            return sleep(400);

          case 25:
            _panels.splice(index);

            forceRender();

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  var handleOpen = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index, title, content, width, key) {
      var originalIndex, panels, currentIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              originalIndex = state.current.index;
              key = state.current.activeKey = key || state.current.activeKey;
              panels = state.current.panels[key] ? state.current.panels[key] : state.current.panels[key] = [];
              currentIndex = index === -1 ? originalIndex + 1 : Math.min(index, originalIndex + 1);

              if (originalIndex > currentIndex) {
                handleClose(currentIndex + 1);
              }

              if (index === 0) {
                panels.length = 0;
              }

              if (originalIndex >= currentIndex) {
                panels[currentIndex] = {
                  title: title,
                  content: content,
                  width: width,
                  collapsed: false
                };
              } else {
                panels.push({
                  title: title,
                  content: content,
                  width: width,
                  collapsed: true
                });
              }

              state.current.index = currentIndex;
              forceRender();

              if (!(originalIndex >= currentIndex)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return");

            case 11:
              _context2.next = 13;
              return sleep(50);

            case 13:
              if (panels.length === 1) {
                setCollapsed(false);
              } else if (originalIndex < state.current.index) {
                panels[panels.length - 1].collapsed = false;
              }

              forceRender();

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(), [handleClose, setCollapsed]);
  var handleCloseNext = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return handleClose(state.current.index);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), [handleClose]);
  useImperativeHandle(ref, function () {
    return {
      open: function open(key, title, content) {
        handleOpen(0, title, content, 250, key);
      },
      next: function next(index, title, content, width) {
        handleOpen(index, title, content, width);
      },
      reopen: function reopen(key) {
        handleReopen(key);
      },
      back: handleCloseNext,
      close: handleClose
    };
  }, [handleClose, handleCloseNext, handleOpen, handleReopen]);

  var getCollapseLocation = function getCollapseLocation(panels, index) {
    if (index === 0 || panels.length === state.current.index + 1) {
      return 0;
    }

    var collapsedStartIndex = state.current.index + 1;
    return -panels.slice(collapsedStartIndex, index).reduce(function (location, item) {
      return location + item.width;
    }, 0);
  };

  var getLeft = function getLeft(panels, index) {
    if (index === 0) {
      return 0;
    }

    return getLeft(panels, index - 1) + (index === 1 ? 0 : panels[index - 1].width) + panels[index - 1].width - panels[index].width;
  };

  state.current.width = width;
  state.current.minimizable = minimizable;
  var handleResize = useCallback(function (x) {
    state.current.offset += x;
    forceRender();
    onResize(calculateOffsetLeft(state.current.offset)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleResizeEnd = useCallback(function () {
    var newWidth = state.current.width + state.current.offset;
    state.current.offset = 0;
    state.current.width = newWidth;
    dispatch({
      type: UISidebarActionType.SidebarContentWidth,
      payload: newWidth
    });
    onResize(calculateOffsetLeft(state.current.offset));
    console.log('resizing', state.current.offset); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var calculateOffsetLeft = useCallback(function (offsetLeft) {
    var width = state.current.width;

    if (width + offsetLeft < minWidth) {
      return minWidth - width;
    }

    return offsetLeft;
  }, [minWidth]);
  var calculateWidth = useCallback(function (width, offsetLeft) {
    return Math.max(minWidth, width + offsetLeft);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [minWidth, minimizable]);
  var vw = calculateWidth(width, state.current.offset);
  useEffect(function () {
    if (!visible) {
      return;
    }

    var newMinimizable = false;
    var newWidth = state.current.width + state.current.offset;

    if (minWidth - newWidth > minWidth / 2 || newWidth <= 30) {
      newMinimizable = true;
    }

    if (state.current.minimizable !== newMinimizable) {
      dispatch({
        type: UISidebarActionType.SidebarContentMinimize,
        payload: newMinimizable
      });
    }
  }, [visible, minWidth, state.current.offset, dispatch]);
  return /*#__PURE__*/_jsxs(Resizer, {
    className: classnames('sidebar-resizer', {
      disabled: !keepOpen,
      minimizable: minimizable
    }),
    style: {
      width: !children ? 0 : minimizable ? 3 : vw
    },
    onResize: handleResize,
    onResizeEnd: handleResizeEnd,
    children: [children, Object.keys(all).map(function (key) {
      return all[key].map(function (item, index) {
        return /*#__PURE__*/_jsx(ToolPanel, {
          collapsed: activeKey === key ? !!item.collapsed : true,
          visible: activeKey === key,
          index: index,
          left: getLeft(all[key], index),
          collapseLocation: getCollapseLocation(all[key], index),
          width: item.width,
          closable: true,
          title: item.title,
          onClose: handleClose,
          children: /*#__PURE__*/_jsx(item.content, {
            visible: activeKey === key
          })
        }, "tool_panel_".concat(key, "_").concat(index));
      });
    })]
  });
}

export function ToolPanel(props) {
  var title = props.title,
      className = props.className,
      onClose = props.onClose,
      children = props.children,
      left = props.left,
      _props$index = props.index,
      index = _props$index === void 0 ? 0 : _props$index,
      _props$visible = props.visible,
      visible = _props$visible === void 0 ? true : _props$visible,
      closable = props.closable,
      collapsed = props.collapsed,
      width = props.width,
      collapseLocation = props.collapseLocation;

  var _useState = useState({
    zIndex: 10 - index,
    width: width
  }),
      _useState2 = _slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var handleClose = useCallback(function () {
    onClose && onClose(index);
  }, [index, onClose]);
  useEffect(function () {
    if (!index) {
      return;
    }

    if (collapsed) {
      setStyle(_objectSpread(_objectSpread({}, style), {}, {
        left: left,
        width: width,
        transform: "translate3d(".concat(collapseLocation, "px, 0, 0)")
      }));
      return;
    }

    setStyle(_objectSpread(_objectSpread({}, style), {}, {
      left: left,
      width: width,
      transform: "translate3d(".concat(width, "px, 0, 0)")
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed, width, left, collapseLocation]);
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('panel-container', className, {
      'panel-container-hidden': !visible
    }),
    style: style,
    children: [title && /*#__PURE__*/_jsxs("div", {
      className: "panel-header",
      children: [/*#__PURE__*/_jsx("span", {
        className: "panel-header-title",
        children: title
      }), closable && /*#__PURE__*/_jsx("a", {
        href: "#close",
        className: "panel-header-info",
        onClick: handleClose,
        children: /*#__PURE__*/_jsx(Icon, {
          name: "AsanyEditor/Cross"
        })
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "panel-view",
      children: children
    })]
  });
}
export default /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef(Toolboard));