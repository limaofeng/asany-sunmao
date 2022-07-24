import { GlobalAsanyAction, UIToolbarActionType } from '../actions';
import type { AsanyAction, IUIToolbarState } from '../../typings';
export default function reducer(state: IUIToolbarState, action: AsanyAction<UIToolbarActionType | GlobalAsanyAction>): IUIToolbarState;
