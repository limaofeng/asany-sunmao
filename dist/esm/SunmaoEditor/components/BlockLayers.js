import React, { useCallback, useMemo } from 'react';
import { toBlockCoreDatas, useSketch } from "../../sunmao";
import Tree from '@asany/tree';
import { useEditorDispatch, useEditorSelector } from "../../Designer";
import { tree } from "../utils";
import { SketchActionType } from "../reducer";
import { jsx as _jsx } from "react/jsx-runtime";

var formatTreeData = function formatTreeData(items) {
  return tree(items, {
    idKey: 'key',
    pidKey: 'parentKey'
  });
};

function BlockLayers() {
  var sketch = useSketch();
  var dispatch = useEditorDispatch();
  var activeKey = useEditorSelector(function (state) {
    var activeKey = state.workspace.sunmao.activeKey;

    if (!activeKey) {
      return undefined;
    }

    return activeKey.split(':')[1];
  });
  var id = useEditorSelector(function (state) {
    return state.project.data.id;
  });
  var blocks = sketch.useSelector(id, function (state) {
    if (!state.blocks) {
      return [];
    }

    return toBlockCoreDatas(state.blocks);
  });
  var treeData = useMemo(function () {
    return formatTreeData(blocks);
  }, [blocks]);
  var handleSelect = useCallback(function (e) {
    dispatch({
      type: SketchActionType.BLOCK_ACTIVE_KEY,
      payload: e.node.component + ':' + e.node.key
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_jsx("div", {
    className: "sidebar-block-layers",
    children: /*#__PURE__*/_jsx(Tree, {
      treeData: treeData,
      expandedKeys: treeData.filter(function (item) {
        var _item$children;

        return !!((_item$children = item.children) !== null && _item$children !== void 0 && _item$children.length);
      }).map(function (item) {
        return item.key;
      }),
      onSelect: handleSelect,
      selectedKeys: activeKey ? [activeKey] : []
    })
  });
}

export default /*#__PURE__*/React.memo(BlockLayers);