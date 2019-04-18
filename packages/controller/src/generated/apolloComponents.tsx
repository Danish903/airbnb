type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  id: Scalars["ID"];
  name: Scalars["String"];
  authors: Array<User>;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type Listing = {
  id: Scalars["ID"];
  name: Scalars["String"];
  category: Scalars["String"];
  pictureURL: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  guests: Scalars["Int"];
  beds: Scalars["Int"];
  amenities: Array<Scalars["String"]>;
  owner: User;
};

export type ListingInput = {
  name: Scalars["String"];
  category: Scalars["String"];
  pictureURL?: Maybe<Scalars["String"]>;
  description: Scalars["String"];
  price: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  guests: Scalars["Int"];
  beds: Scalars["Int"];
  amenities: Array<Scalars["String"]>;
};

export type Mutation = {
  createListingResolver: Scalars["Boolean"];
  deleteListing: Scalars["Boolean"];
  confirmUser?: Maybe<Scalars["Boolean"]>;
  changePassword?: Maybe<User>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  logout: Scalars["Boolean"];
  login?: Maybe<User>;
  addProfilePicture: Scalars["Boolean"];
  register: User;
};

export type MutationCreateListingResolverArgs = {
  data: ListingInput;
};

export type MutationDeleteListingArgs = {
  listingId: Scalars["String"];
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationAddProfilePictureArgs = {
  picture: Scalars["Upload"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Query = {
  helloWorld: Scalars["String"];
  findListings: Array<Listing>;
  me?: Maybe<User>;
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};

export type User = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  userListings: Array<Listing>;
  books: Array<Book>;
};
export type ChangePassowrdMutationVariables = {
  data: ChangePasswordInput;
};

export type ChangePassowrdMutation = { __typename?: "Mutation" } & {
  changePassword: Maybe<{ __typename?: "User" } & Pick<User, "email" | "name">>;
};

export type ForgotPassowrdMutationVariables = {
  email: Scalars["String"];
};

export type ForgotPassowrdMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "name" | "firstName" | "lastName"
    >
  >;
};

export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<
    User,
    "id" | "firstName" | "lastName" | "email" | "name"
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<User, "name" | "email">>;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

export const ChangePassowrdDocument = gql`
  mutation ChangePassowrd($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      email
      name
    }
  }
`;

export class ChangePassowrdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ChangePassowrdMutation,
      ChangePassowrdMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ChangePassowrdMutation,
        ChangePassowrdMutationVariables
      >
        mutation={ChangePassowrdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ChangePassowrdProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangePassowrdMutation,
    ChangePassowrdMutationVariables
  >
> &
  TChildProps;
export type ChangePassowrdMutationFn = ReactApollo.MutationFn<
  ChangePassowrdMutation,
  ChangePassowrdMutationVariables
>;
export function withChangePassowrd<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChangePassowrdMutation,
        ChangePassowrdMutationVariables,
        ChangePassowrdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    ChangePassowrdMutation,
    ChangePassowrdMutationVariables,
    ChangePassowrdProps<TChildProps>
  >(ChangePassowrdDocument, operationOptions);
}
export const ForgotPassowrdDocument = gql`
  mutation ForgotPassowrd($email: String!) {
    forgotPassword(email: $email)
  }
`;

export class ForgotPassowrdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ForgotPassowrdMutation,
      ForgotPassowrdMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ForgotPassowrdMutation,
        ForgotPassowrdMutationVariables
      >
        mutation={ForgotPassowrdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ForgotPassowrdProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ForgotPassowrdMutation,
    ForgotPassowrdMutationVariables
  >
> &
  TChildProps;
export type ForgotPassowrdMutationFn = ReactApollo.MutationFn<
  ForgotPassowrdMutation,
  ForgotPassowrdMutationVariables
>;
export function withForgotPassowrd<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ForgotPassowrdMutation,
        ForgotPassowrdMutationVariables,
        ForgotPassowrdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    ForgotPassowrdMutation,
    ForgotPassowrdMutationVariables,
    ForgotPassowrdProps<TChildProps>
  >(ForgotPassowrdDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      firstName
      lastName
    }
  }
`;

export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginMutationVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

export class RegisterComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterMutationVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      name
      email
    }
  }
`;

export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeQueryVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeQueryVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
