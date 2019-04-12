import * as React from "react";
interface Props {
    children: (data: {
        submit: (values: any) => Promise<void>;
    }) => JSX.Element | null;
}
export declare class RegisterController extends React.Component<Props> {
    submit: (values: any) => Promise<void>;
    render(): JSX.Element | null;
}
export {};
