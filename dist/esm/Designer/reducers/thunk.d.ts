import type { AsanyAction, IAsanyState, IReducer } from '../typings';
export declare function combineReducers(reducers: {
    [key: string]: IReducer<any, any>;
}, defaultReducer?: IReducer<any, any> | any): (state: IAsanyState | any, action: AsanyAction<any>) => any;
