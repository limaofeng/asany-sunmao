import React from 'react';
import { EqualityFn, IReactComponentStoreContext, ReactComponentProviderProps, Selector } from '../typings';
export declare const ReactComponentContext: React.Context<IReactComponentStoreContext>;
export declare function useDispatch(): import("../typings").DispatchWithoutAction;
export declare function useSelector<Selected>(selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
export default function ReactComponentProvider(props: ReactComponentProviderProps): JSX.Element;
