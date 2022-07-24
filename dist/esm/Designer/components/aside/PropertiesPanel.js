function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { forwardRef, useCallback, useImperativeHandle, useReducer, useRef, useState } from 'react';
import Icon from '@asany/icons';
import { Tabs } from 'antd';
import classnames from 'classnames';
import { sleep, useDeepCompareEffect } from "../../utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function PropertiesPanel(props, ref) {
  var container = useRef(null);
  var onClose = props.onClose,
      title = props.title,
      children = props.children,
      _props$extras = props.extras,
      extras = _props$extras === void 0 ? [] : _props$extras,
      content = props.content,
      style = props.style,
      className = props.className,
      _props$tabs = props.tabs,
      tabs = _props$tabs === void 0 ? [] : _props$tabs,
      footer = props.footer;
  var state = useRef({
    next: false,
    nextIndex: -1,
    panels: extras
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var _useState = useState(tabs.length ? tabs[0].id || tabs[0].title : undefined),
      _useState2 = _slicedToArray(_useState, 2),
      activeKey = _useState2[0],
      setActiveKey = _useState2[1];

  var handleOpenNextPanel = useCallback(function (index) {
    return function () {
      state.current.nextIndex = index;
      forceRender();
    };
  }, []);
  useDeepCompareEffect(function () {
    if (!tabs.length) {
      return;
    }

    if (!tabs.some(function (item) {
      return item.title === activeKey;
    })) {
      setActiveKey(tabs[0].id || tabs[0].title);
    }

    state.current.nextIndex = -1;
    state.current.panels = [];
  }, [tabs.map(function (item) {
    return item.id || item.title;
  })]);

  var handleChange = function handleChange(activeKey) {
    setActiveKey(activeKey);
  };

  var handleCloseNextPanel = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.current.nextIndex === -1)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              state.current.nextIndex--;
              forceRender();
              _context.next = 6;
              return sleep(250);

            case 6:
              state.current.panels.pop();
              forceRender();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleCloseNextPanel() {
      return _ref.apply(this, arguments);
    };
  }();

  useImperativeHandle(ref, function () {
    return {
      container: container.current,
      switch: function _switch(activeKey) {
        setActiveKey(activeKey);
      },
      back: function () {
        var _back = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return handleCloseNextPanel();

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function back() {
          return _back.apply(this, arguments);
        }

        return back;
      }(),
      next: function () {
        var _next2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(title, content) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  state.current.panels.push({
                    title: title,
                    content: content
                  });
                  forceRender(); // 为了让动画更流畅, 延时 50ms 让元素先渲染到页面

                  _context3.next = 4;
                  return sleep(50);

                case 4:
                  state.current.nextIndex++;
                  forceRender();

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function next(_x, _x2) {
          return _next2.apply(this, arguments);
        }

        return next;
      }(),

      get width() {
        var _container$current;

        return ((_container$current = container.current) === null || _container$current === void 0 ? void 0 : _container$current.getBoundingClientRect().width) || 0;
      }

    };
  }, []);
  var _state$current = state.current,
      nextIndex = _state$current.nextIndex,
      panels = _state$current.panels;
  var hasNextPanel = nextIndex !== -1;
  return /*#__PURE__*/_jsxs("div", {
    ref: container,
    className: classnames('properties-panel-container', className),
    style: style,
    children: [/*#__PURE__*/_jsxs("div", {
      id: "entry-controls",
      children: [/*#__PURE__*/_jsx("div", {
        className: classnames('settings-menu settings-menu-pane', {
          'settings-menu-pane-in': !hasNextPanel,
          'settings-menu-pane-out-left': hasNextPanel
        }),
        children: !!tabs.length ? /*#__PURE__*/_jsx(Tabs, {
          className: "settings-menu-tabs",
          activeKey: activeKey,
          onChange: handleChange,
          tabBarExtraContent: /*#__PURE__*/_jsx("a", {
            href: "#close",
            className: "close",
            onClick: onClose,
            children: /*#__PURE__*/_jsx(Icon, {
              name: "AsanyEditor/Cross"
            })
          }),
          children: tabs.map(function (item) {
            return /*#__PURE__*/_jsx(Tabs.TabPane, {
              animated: false,
              tab: item.title,
              children: item.content
            }, item.id || item.title);
          })
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "settings-menu-header",
            children: [/*#__PURE__*/_jsx("h4", {
              children: title
            }), /*#__PURE__*/_jsx("a", {
              href: "#close",
              className: "close",
              onClick: onClose,
              children: /*#__PURE__*/_jsx(Icon, {
                name: "AsanyEditor/Cross"
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "settings-menu-content",
            children: [content || children, !!extras.length && /*#__PURE__*/_jsx("ul", {
              className: "nav-list-block",
              children: extras.map(function (_ref2, i) {
                var extTitle = _ref2.title,
                    summary = _ref2.summary;
                var lis = [/*#__PURE__*/_jsx("li", {
                  className: "nav-list-item",
                  onClick: handleOpenNextPanel(i),
                  role: "none",
                  children: /*#__PURE__*/_jsxs("button", {
                    type: "button",
                    children: [/*#__PURE__*/_jsx("b", {
                      children: extTitle
                    }), /*#__PURE__*/_jsx("span", {
                      children: summary
                    })]
                  })
                }, String("".concat(i, "-").concat(title)))];

                if (i !== extras.length - 1) {
                  lis.push( /*#__PURE__*/_jsx("li", {
                    className: "divider"
                  }, String("".concat(i, "-").concat(title, "-divider"))));
                }

                return lis;
              })
            })]
          })]
        })
      }), panels.map(function (_ref3, index) {
        var title = _ref3.title,
            content = _ref3.content;
        return /*#__PURE__*/_jsx("div", {
          className: classnames('settings-menu settings-menu-pane', {
            'settings-menu-pane-in': index === nextIndex,
            'settings-menu-pane-out-right': index > nextIndex,
            'settings-menu-pane-out-left': index < nextIndex
          }),
          children: /*#__PURE__*/_jsxs("div", {
            className: "ember-view active",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "settings-menu-header subview",
              children: [/*#__PURE__*/_jsx("button", {
                className: "back settings-menu-header-action",
                onClick: handleCloseNextPanel
              }), /*#__PURE__*/_jsx("h4", {
                children: title
              }), /*#__PURE__*/_jsx("div", {})]
            }), /*#__PURE__*/_jsx("div", {
              className: "settings-menu-content",
              children: content
            })]
          })
        }, title);
      })]
    }), footer]
  });
}

export default /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef(PropertiesPanel));