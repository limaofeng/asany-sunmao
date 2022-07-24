import { GlobalAsanyAction, UIScenaViewerActionType } from '../../actions';
import type { AsanyAction, ViewerState } from '../../../typings';
export default function reducer(state: ViewerState, action: AsanyAction<UIScenaViewerActionType | GlobalAsanyAction>): ViewerState;
