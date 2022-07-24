import React from 'react';
import reducer from "./reducer";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default {
  id: 'demo',
  description: '',
  types: ['demo'],
  toolbar: {
    tools: [{
      id: 'left',
      name: /*#__PURE__*/_jsx("div", {
        style: {
          color: '#727d83',
          fontSize: 16
        },
        children: "\u5934\u90E8\u83DC\u5355\u680F"
      }),
      position: 'left',
      style: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
      }
    }]
  },
  reducer: reducer,
  sidebar: {
    content: function content() {
      return /*#__PURE__*/_jsx("div", {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#727d83',
          fontSize: 16
        },
        children: /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/_jsx("span", {
            children: "\u4FA7\u8FB9\u9762\u677F"
          }), /*#__PURE__*/_jsx("span", {
            style: {
              fontSize: 10,
              marginTop: 20
            },
            children: "\u53F3\u4FA7\u8FB9\u7F18\u53EF\u4EE5\u8C03\u6574\u9762\u677F\u5BBD\u5EA6"
          })]
        })
      });
    },
    tools: [{
      id: 'top',
      icon: function icon() {
        return /*#__PURE__*/_jsx("div", {
          style: {
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            width: 14,
            color: '#727d83'
          },
          children: "\u5DE6\u4FA7\u5FEB\u6377\u680F"
        });
      },
      style: {
        height: '100%'
      },
      position: 'top'
    }, {
      id: 'bottom',
      icon: 'HandTouchSolid',
      position: 'bottom',
      onClick: function onClick(editor) {
        editor.sidebar.open('bottom', '弹出面板', function () {
          return /*#__PURE__*/_jsx("div", {
            style: {
              color: '#727d83',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center'
            },
            children: "\u5F39\u51FA\u9762\u677F"
          });
        });
      }
    }]
  },
  scena: {
    workspace: function workspace() {
      return /*#__PURE__*/_jsx("div", {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          color: '#727d83',
          fontSize: 18,
          paddingTop: 20
        },
        children: /*#__PURE__*/_jsxs("div", {
          style: {
            textAlign: 'center'
          },
          children: ["\u5DE5\u4F5C\u533A", /*#__PURE__*/_jsx("div", {
            style: {
              fontSize: 12,
              paddingTop: 10
            },
            children: "\u70B9\u51FB\u5DE5\u4F5C\u533A\uFF0C\u53EF\u4EE5\u5524\u51FA\u5C5E\u6027\u914D\u7F6E\u9762\u677F"
          })]
        })
      });
    },
    toolbar: {
      tools: [{
        id: 'left',
        name: /*#__PURE__*/_jsx("div", {
          style: {
            color: '#727d83',
            fontSize: 16
          },
          children: "\u4E8C\u7EA7\u83DC\u5355\u680F"
        }),
        mutex: 'left',
        style: {
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }
      }]
    }
    /*     onClick: (editor) => {
      editor.aside.open(
        '属性面板',
        () => {
          return (
            <div
              style={{
                padding: 8,
                color: '#727d83',
                fontSize: 16,
                height: 'calc(100vh - 270px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>属性面板</span>
            </div>
          );
        },
        {
          width: 380,
        }
      );
    }, */

  },
  features: ['ruler']
};