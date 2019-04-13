import * as React from "react";
import { RegisterMutationVariables } from "../../generated/apolloComponents";
export declare const REGISTER_MUTATION: any;
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<void>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props, any>;
export {};
