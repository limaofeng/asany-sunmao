import { GlobalAsanyAction, UIToolbarActionType } from '../actions';
import type { AsanyAction, IUIToolbarState } from '../../typings';

const defaultState: IUIToolbarState = {
  tools: [],
  activeKeys: [],
};

export default function reducer(
  state: IUIToolbarState,
  action: AsanyAction<UIToolbarActionType | GlobalAsanyAction>
): IUIToolbarState {
  if (action.type === UIToolbarActionType.ToolbarSelect) {
    return { ...state, activeKeys: [...state.activeKeys, action.payload] };
  }
  if (action.type === UIToolbarActionType.ToolbarUnSelect) {
    return {
      ...state,
      activeKeys: state.activeKeys.filter((item) => !action.payload.includes(item)),
    };
  }
  if (action.type === UIToolbarActionType.SetToolbar) {
    return { ...state, content: action.payload.content, tools: action.payload.tools };
  }
  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
