import * as React from "react";
import { RegisterMutationVariables } from "../../generated/apolloComponents";
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props, any>;
export {};
