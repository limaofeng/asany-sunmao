import { GlobalAsanyAction, ProjectActionType, UIScenaMoveableActionType } from '../../actions';
import type { AsanyAction, MoveableState } from '../../../typings';
export default function reducer(state: MoveableState, action: AsanyAction<UIScenaMoveableActionType | GlobalAsanyAction | ProjectActionType>): MoveableState;
