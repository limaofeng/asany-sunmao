import type { AsanyAction, IFeatureState } from '../typings';
import { GlobalAsanyAction, IFeatureActionType } from './actions';
export default function reducer(state: IFeatureState, action: AsanyAction<IFeatureActionType | GlobalAsanyAction>): IFeatureState;
