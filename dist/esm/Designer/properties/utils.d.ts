import { InputText, radiusArr } from './typings';
export declare const radiusSize: (arr: radiusArr) => boolean;
export declare const onlyNumber: (value: string | number) => string;
export declare const radiusFormat: {
    input: (value: InputText) => string;
    output: (value: string) => number[];
};
export declare const rotateFormat: {
    input: (value: InputText) => string;
};
export declare const inputFormat: {
    input: (value: InputText) => string;
};
export declare const numberFormat: {
    input: (value: InputText) => string;
    output: (value: string) => number;
};
