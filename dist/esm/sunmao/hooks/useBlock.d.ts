import { DivProvider, IBlockDataProps, IBlockOptions, IUseBlock } from '../typings';
declare function useBlock<T extends IBlockDataProps = any, P = DivProvider>(options: IBlockOptions<T>): IUseBlock<T, P>;
export default useBlock;
