import { ComponentType } from 'react';
import React from 'react';

import { TabPane } from '../components/aside/PropertiesPanel';
import { ActionType } from '../reducers/actions';
import type {
  AsideHelper,
  AsideTabPane,
  IAsanyEditor,
  IUIAsideState,
  PanelOptions,
  SunmaoCustomizer,
  UndoFunc,
} from '../typings';

export default class AsideHelperImpl implements AsideHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  get state(): IUIAsideState {
    return this.editor.state.ui.aside;
  }
  next(title: string, body: ComponentType<any>): void {
    const aside = this.editor.state.ui.aside;
    if (!aside.visible || !aside.control || !aside.control.current) {
      return;
    }
    aside.control.current.next(title, React.createElement(body));
  }
  open(data: SunmaoCustomizer, options?: PanelOptions): void;
  open(tabs: AsideTabPane[], options?: PanelOptions): void | UndoFunc;
  open(title: string, body: ComponentType<any>, options?: PanelOptions): void | UndoFunc;
  open(title: any, body?: any) {
    if (typeof title !== 'string' && !title.hasOwnProperty('length')) {
      return this.editor.store.dispatch({
        type: ActionType.OpenAside,
        payload: { block: title, options: arguments[1] },
      });
    }
    let options;
    const tabs: TabPane[] = [];
    if (typeof title === 'string') {
      tabs.push({ title, content: body });
    } else {
      tabs.push(...(title as any));
    }
    if (arguments.length === 3) {
      options = arguments[2];
    } else if (Array.isArray(title)) {
      options = arguments[1];
    }
    this.editor.store.dispatch({
      type: ActionType.OpenAside,
      payload: { tabs, options },
    });
  }
  close(): void {
    this.editor.store.dispatch({ type: ActionType.CloseAside });
  }
}
