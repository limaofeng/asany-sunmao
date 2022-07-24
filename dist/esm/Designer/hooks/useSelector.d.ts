import { IAsanyStateContext } from '../AsanyContext';
export declare type Selector<Selected> = (state: IAsanyStateContext) => Selected;
export declare type EqualityFn<Selected> = (theNew: Selected, latest: Selected) => boolean;
/**
 * 模仿 Redux 的 useSelector
 * @param selector
 * @param equalityFn
 */
export default function useSelector<Selected>(selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
