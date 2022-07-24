import { useEffect, useReducer, useRef } from 'react';

import isEqual from 'lodash/isEqual';

import { AsanyTool, IAsanyEditor, ToolClick } from '../typings';

import useEditor from './useEditor';
import useSelector, { Selector } from './useSelector';

function buildHasVisibled(item: AsanyTool) {
  return item.isVisibled || (() => true);
}

function buildHasDisabled(item: AsanyTool) {
  return item.isDisabled || (() => false);
}

function buildHasSelected(editor: IAsanyEditor, item: AsanyTool) {
  return (
    item.isSelected ||
    (() => {
      return editor.sidebar.hasSelected(item.id);
    })
  );
}

const buildClick = (editor: IAsanyEditor, item: AsanyTool): ToolClick => {
  const onClick = item.onClick;
  return (e: any) => {
    e.stopPropagation();
    if (!item.isSelected!(item.useSelector ? item.useSelector(editor.state) : undefined)) {
      item.deselect = onClick && onClick(editor);
    } else {
      item.deselect ? item.deselect(editor) : onClick && onClick(editor);
    }
  };
};

export default function useTools(selector: Selector<AsanyTool[]>) {
  const toolsRef = useRef<AsanyTool[]>([]);
  const editor = useEditor();
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const allTools = useSelector(selector, (theNew, latest = []) => {
    return isEqual(
      theNew.map((item) => item.id),
      latest.map((item) => item.id)
    );
  });

  useEffect(() => {
    toolsRef.current = allTools.map(({ ...item }) => {
      item.isVisibled = buildHasVisibled(item);
      item.isDisabled = buildHasDisabled(item);
      item.isSelected = buildHasSelected(editor, item);
      item.onClick = buildClick(editor, item);
      return item;
    });
    forceRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTools.map((item) => item.id).join(',')]);
  return toolsRef.current;
}
