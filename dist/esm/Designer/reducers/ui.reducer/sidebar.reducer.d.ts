import { GlobalAsanyAction, UISidebarActionType } from '../actions';
import type { AsanyAction, IUISidebarState } from '../../typings';
export default function reducer(state: IUISidebarState, action: AsanyAction<UISidebarActionType | GlobalAsanyAction>): IUISidebarState;
