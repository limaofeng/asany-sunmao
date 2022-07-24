import { AsanyAction, IUIScenaToolbarState } from '../../../typings';
import { GlobalAsanyAction, UIScenaToolbarActionType } from '../../actions';
export default function reducer(state: IUIScenaToolbarState, action: AsanyAction<UIScenaToolbarActionType | GlobalAsanyAction>): IUIScenaToolbarState;
