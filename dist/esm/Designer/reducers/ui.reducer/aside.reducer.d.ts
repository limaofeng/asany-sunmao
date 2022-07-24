import { GlobalAsanyAction, UIAsideActionType } from '../actions';
import type { AsanyAction, IUIAsideState } from '../../typings';
export default function reducer(state: IUIAsideState, action: AsanyAction<UIAsideActionType | GlobalAsanyAction>): IUIAsideState;
