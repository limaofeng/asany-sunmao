var _excluded = ["blockTitle"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import Navigation from "./components/Navigation";
import Workspace from "./components/Workspace";
import reducer from "./reducer";
import Sidebar from "./components/Sidebar";
import ComponentPanel from "./components/ComponentPanel";
import "./style/index.less";
import { jsx as _jsx } from "react/jsx-runtime";
export default (function (sketch, dashboard) {
  return {
    id: 'sunmao',
    description: '',
    types: ['component'],
    toolbar: {
      content: Navigation,
      tools: [{
        id: 'save',
        name: '保存',
        position: 'left',
        onClick: function onClick(editor) {
          var project = editor.state.project;
          var blocks = sketch.getComponentData(project.data.id);
          var data = blocks.map(function (_ref) {
            var key = _ref.key,
                props = _ref.props;
            return {
              key: key,
              props: props
            };
          });

          var newProject = _objectSpread(_objectSpread({}, project), {}, {
            data: _objectSpread(_objectSpread({}, project.data), {}, {
              blocks: data.map(function (_ref2) {
                var key = _ref2.key,
                    _ref2$props = _ref2.props;
                _ref2$props = _ref2$props === void 0 ? {} : _ref2$props;

                var blockTitle = _ref2$props.blockTitle,
                    props = _objectWithoutProperties(_ref2$props, _excluded);

                return {
                  key: key,
                  props: props
                };
              }).filter(function (item) {
                return Object.keys(item.props).length;
              })
            })
          });

          editor.save(newProject);
        }
      }]
    },
    reducer: reducer,
    sidebar: {
      content: function content() {
        return /*#__PURE__*/_jsx(Sidebar, {
          dashboard: dashboard
        });
      },
      tools: [{
        id: 'components',
        icon: 'AsanyEditor/LayoutGrid',
        name: '组件',
        position: 'top',
        mutex: 'left',
        onClick: function onClick(editor) {
          return editor.sidebar.open('components', '组件', ComponentPanel);
        }
      }, {
        id: 'drag',
        name: '拖拽画布',
        icon: 'AsanyEditor/HandDrag',
        position: 'top',
        useSelector: function useSelector(state) {
          return state.features.drag;
        },
        isSelected: function isSelected(drag) {
          return drag;
        },
        onClick: function onClick(editor) {
          editor.features.drag(true);
          return function () {
            editor.features.drag(false);
          };
        }
      }, {
        id: 'selecto',
        name: '选择',
        icon: 'AsanyEditor/SelectFilled',
        position: 'top',
        mutex: 'icons-actions',
        useSelector: function useSelector(state) {
          return state.features.selecto;
        },
        isSelected: function isSelected(selecto) {
          return selecto;
        },
        onClick: function onClick(editor) {
          editor.features.selecto(true);
          return function () {
            editor.features.selecto(false);
          }; //   // const active = !editor.state.workspace.icon.selecto;
          //   // editor.dispatch({ type: IconActionType.SELECTO, payload: active });
        }
      } // {
      //   id: 'move',
      //   name: '选择',
      //   icon: 'AsanyEditor/Move',
      //   position: 'top',
      //   mutex: 'icons-actions',
      //   useSelector: (state) => state.workspace.sunmao.move,
      //   isSelected: (move) => move,
      //   onClick: (editor) => {
      //     return editor.sidebar.select('move');
      //   },
      // },
      // {
      //   id: 'bottom',
      //   icon: 'AsanyEditor/Layers',
      //   position: 'bottom',
      //   onClick: (editor) => {
      //     return editor.sidebar.open('bottom', '弹出面板', BlockLayers);
      //   },
      // },
      ]
    },
    scena: {
      workspace: Workspace
    },
    features: ['ruler']
  };
});