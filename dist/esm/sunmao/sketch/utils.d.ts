import { EqualityFn, IBlockCoreData, IBlockData, IReactComponentStoreContext, Selector } from '../typings';
import type { Sketch } from './SketchContext';
export declare function useInternalStoreSelector<Selected>(store: IReactComponentStoreContext, selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
export declare function useInternalSelector<Selected>(sketch: Sketch, id: string, selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
export declare function toBlockCoreDatas(blocks: IBlockData[]): IBlockCoreData[];
