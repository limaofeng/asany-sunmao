import { ComponentMetadata } from '../typings';
export default function component(metadata?: ComponentMetadata): (target: any, propertyKey: string, descriptor?: PropertyDescriptor | undefined) => void;
