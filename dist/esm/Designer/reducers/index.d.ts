import type { AsanyAction, AsanyProviderMode, EditorPlugin, IAsanyState } from '../typings';
import { GlobalAsanyAction } from './actions';
export declare const defaultReducer: (state: IAsanyState, action: AsanyAction<GlobalAsanyAction>) => any;
export declare const defaultValue: (mode: AsanyProviderMode, plugins: EditorPlugin[]) => IAsanyState;
declare const _default: (state: IAsanyState, action: AsanyAction<any>) => any;
export default _default;
