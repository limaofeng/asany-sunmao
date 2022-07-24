import React from 'react';
import { ICustomizer } from 'sunmao';
import { AsideTabPane } from '../typings';
export declare const DynaActionFormContext: React.Context<any>;
export declare function createDynaActionForm(customizer: ICustomizer, namespace?: string): ({ onChange: handleChange }: any) => JSX.Element;
export declare function buildAside(customizer: ICustomizer, namespace?: string): AsideTabPane[];
