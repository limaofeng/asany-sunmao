import { GlobalAsanyAction, UIAsideActionType } from '../actions';
import type { AsanyAction, IUIAsideState } from '../../typings';

const defaultState: IUIAsideState = {
  visible: false,
};

export default function reducer(
  state: IUIAsideState,
  action: AsanyAction<UIAsideActionType | GlobalAsanyAction>
): IUIAsideState {
  if (action.type === UIAsideActionType.CloseAside) {
    return { ...state, visible: false };
  }
  if (action.type === UIAsideActionType.OpenAside) {
    return { ...state, visible: true, ...action.payload };
  }
  if (action.type === UIAsideActionType.AsideRef) {
    return { ...state, control: action.payload };
  }
  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
