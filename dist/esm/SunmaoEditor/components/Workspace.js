import React, { useCallback } from 'react';
import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { useReactComponent, useSketch } from "../../sunmao";
import { useEditorDispatch, useEditor, useEditorSelector } from "../../Designer";
import { SketchActionType } from "../reducer";

function Workspace() {
  var editor = useEditor();
  var sketch = useSketch();
  var dispatch = useEditorDispatch();
  var activeKey = useEditorSelector(function (state) {
    return state.workspace.sunmao.activeKey;
  }); // const checkedKeys = useSelector((state) => {
  //   const checkedKeys: string[] = [];
  //   const stack: string[] = state.workspace.sunmao.stack;
  //   const activeKey = state.workspace.sunmao.activeKey;
  //   if (!!activeKey) {
  //     checkedKeys.push(activeKey);
  //   }
  //   if (stack.length) {
  //     checkedKeys.push(stack[stack.length - 1]);
  //   }
  //   return checkedKeys;
  // }, isEqual);

  var data = useEditorSelector(function (state) {
    return state.project.data;
  }, isEqual);
  var component = useReactComponent(data.template, data.blocks, {
    id: data.id,
    dev: true
  });
  var handleBlockClick = useCallback(function (id) {
    dispatch({
      type: SketchActionType.BLOCK_ACTIVE_KEY,
      payload: id
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleBlockMouseEnter = useCallback(function (key) {
    dispatch({
      type: SketchActionType.BLOCK_MOUSE_ENTER,
      payload: {
        key: key
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleBlockMouseLeave = useCallback(function (key) {
    dispatch({
      type: SketchActionType.BLOCK_MOUSE_LEAVE,
      payload: {
        key: key
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffect(() => {
  //   if (!checkedKeys.length) {
  //     editor.scena.setSelectedTargets([]);
  //     return;
  //   }
  //   const selectedTargets: (HTMLElement | SVGElement)[] = [];
  //   const checkedKeySet = new Set<string>(checkedKeys);
  //   for (const key of checkedKeySet) {
  //     const block = sketch.getBlock(key)!;
  //     if (!block?.id) {
  //       return;
  //     }
  //     const element = document.getElementById(block.id) as any;
  //     if (element) {
  //       selectedTargets.push(element);
  //     }
  //   }
  //   if (!selectedTargets.length) {
  //     return;
  //   }
  //   editor.scena.setSelectedTargets(selectedTargets);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkedKeys]);

  useEffect(function () {
    if (!activeKey) {
      return;
    }

    var id = activeKey;
    var component = sketch.getComponent(id);
    var block = sketch.getBlock(id); // 设置属性配置面板

    editor.scena.setSelectedTargets([document.getElementById(id)]); // 打开属性配置面板

    var store = component.store;
    editor.aside.open({
      customizer: block.customizer,
      value: store.getBlock(block.key).props,
      update: block.update,
      watchValue: function watchValue(callback) {
        var handleChange = function handleChange() {
          var _store$getBlock;

          callback((_store$getBlock = store.getBlock(block.key)) === null || _store$getBlock === void 0 ? void 0 : _store$getBlock.props);
        };

        return store.subscribe(handleChange);
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);
  useEffect(function () {
    var unbindBlockClick = sketch.on('block-click', handleBlockClick);
    var unbindBlockMouseEnter = sketch.on('block-mouse-enter', handleBlockMouseEnter);
    var unbindBlockMouseLeave = sketch.on('block-mouse-leave', handleBlockMouseLeave);
    return function () {
      unbindBlockClick();
      unbindBlockMouseEnter();
      unbindBlockMouseLeave();
    };
  }, [handleBlockClick, handleBlockMouseEnter, handleBlockMouseLeave, sketch]);
  return /*#__PURE__*/React.createElement(component);
}

export default /*#__PURE__*/React.memo(Workspace);