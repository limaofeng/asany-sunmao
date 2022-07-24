import { EqualityFn, IComponentDefinition } from '../typings';
declare const useComponent: (name: string, equalityFn?: EqualityFn<any>) => IComponentDefinition<any> | undefined;
export default useComponent;
