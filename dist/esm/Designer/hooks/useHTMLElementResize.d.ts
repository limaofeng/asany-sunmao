/// <reference types="react" />
export declare const parsingAngle: (angle: string) => number;
export declare const parsingRadius: (radius: string) => any;
interface ResizeData {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    rotate: number;
    radius: [number, number, number, number];
}
declare type GetElement = (baseline: HTMLElement) => HTMLElement;
declare type OneSelf = 'self' | 'parent' | GetElement;
export default function useHTMLElementResize(baseline?: React.RefObject<HTMLElement>, self?: OneSelf): ResizeData;
export {};
