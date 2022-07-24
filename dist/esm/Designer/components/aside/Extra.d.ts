import React, { Component } from 'react';
export interface ExtraProps {
    title: string;
    summary: string;
    content?: any;
    children?: React.ReactNode;
}
export declare class Extra extends Component<ExtraProps> {
    static defaultProps: {
        children: null;
        content: null;
    };
    render(): JSX.Element;
}
