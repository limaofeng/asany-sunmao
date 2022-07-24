import { GlobalAsanyAction, UIScenaGlobalActionType } from '../../actions';
import type { AsanyAction, UIScenaGlobalState } from '../../../typings';
export declare const defaultDeviceScreen: {
    id: string;
    name: string;
    size: number[];
    device: string[];
} | undefined;
export declare function calculateScaling(zoom: number, type?: 'out' | 'in' | 'change'): number;
export declare function reducer(state: UIScenaGlobalState, action: AsanyAction<UIScenaGlobalActionType | GlobalAsanyAction>): UIScenaGlobalState;
declare const _default: (state: any, action: AsanyAction<any>) => any;
export default _default;
