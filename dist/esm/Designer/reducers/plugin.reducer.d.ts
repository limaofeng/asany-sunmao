import { AsanyAction, IPluginState } from '../typings';
import { GlobalAsanyAction, IPluginActionType } from './actions';
export default function reducer(state: IPluginState, action: AsanyAction<IPluginActionType | GlobalAsanyAction>): IPluginState;
