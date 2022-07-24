import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
export declare type Selector<Selected> = (state: any) => Selected;
export declare type EqualityFn<Selected> = (a: Selected, b: Selected) => boolean;
export declare const useFormState: () => [FormInstance, typeof Form];
export declare function useFormSelector<Selected>(selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
