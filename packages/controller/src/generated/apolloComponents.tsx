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
  pictureURL?: Maybe<Scalars["String"]>;
  description: Scalars["String"];
  price: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  guests: Scalars["Int"];
  beds: Scalars["Int"];
  amenities: Array<Scalars["String"]>;
  owner: User;
  imageURL: Scalars["String"];
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

export type Message = {
  id: Scalars["ID"];
  text: Scalars["String"];
  listingId: Scalars["String"];
  sender: User;
  mutation?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  createListing: Scalars["Boolean"];
  deleteListing: Scalars["Boolean"];
  createMessage: Scalars["Boolean"];
  confirmUser?: Maybe<Scalars["Boolean"]>;
  changePassword?: Maybe<User>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  logout: Scalars["Boolean"];
  login?: Maybe<User>;
  addProfilePicture: Scalars["Boolean"];
  register: User;
};

export type MutationCreateListingArgs = {
  file?: Maybe<Scalars["Upload"]>;
  data: ListingInput;
};

export type MutationDeleteListingArgs = {
  listingId: Scalars["String"];
};

export type MutationCreateMessageArgs = {
  text: Scalars["String"];
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
  getListing?: Maybe<Listing>;
  helloWorld: Scalars["String"];
  findListings: Array<Listing>;
  findMessages: Array<Message>;
  me?: Maybe<User>;
};

export type QueryGetListingArgs = {
  listingId: Scalars["String"];
};

export type QueryFindMessagesArgs = {
  listingId: Scalars["String"];
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};

export type Subscription = {
  newMessage: Message;
};

export type SubscriptionNewMessageArgs = {
  listingId: Scalars["ID"];
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
export type CreateListingMutationVariables = {
  data: ListingInput;
  file?: Maybe<Scalars["Upload"]>;
};

export type CreateListingMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createListing"
>;

export type FindListingsQueryVariables = {};

export type FindListingsQuery = { __typename?: "Query" } & {
  findListings: Array<
    { __typename?: "Listing" } & Pick<
      Listing,
      | "id"
      | "name"
      | "category"
      | "imageURL"
      | "description"
      | "price"
      | "latitude"
      | "longitude"
      | "guests"
      | "beds"
      | "amenities"
    > & { owner: { __typename?: "User" } & Pick<User, "id" | "email"> }
  >;
};

export type GetListingQueryVariables = {
  listingId: Scalars["String"];
};

export type GetListingQuery = { __typename?: "Query" } & {
  getListing: Maybe<
    { __typename?: "Listing" } & Pick<
      Listing,
      | "id"
      | "name"
      | "category"
      | "imageURL"
      | "description"
      | "price"
      | "latitude"
      | "longitude"
      | "guests"
      | "beds"
      | "amenities"
    > & { owner: { __typename?: "User" } & Pick<User, "id" | "email"> }
  >;
};

export type CreateMessageMutationMutationVariables = {
  text: Scalars["String"];
  listingId: Scalars["String"];
};

export type CreateMessageMutationMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createMessage"
>;

export type FindMessagesQueryQueryVariables = {
  listingId: Scalars["String"];
};

export type FindMessagesQueryQuery = { __typename?: "Query" } & {
  findMessages: Array<
    { __typename?: "Message" } & Pick<Message, "id" | "listingId" | "text"> & {
        sender: { __typename?: "User" } & Pick<User, "id" | "email">;
      }
  >;
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

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

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

export const CreateListingDocument = gql`
  mutation CreateListing($data: ListingInput!, $file: Upload) {
    createListing(data: $data, file: $file)
  }
`;

export class CreateListingComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateListingMutation,
      CreateListingMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateListingMutation,
        CreateListingMutationVariables
      >
        mutation={CreateListingDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateListingProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateListingMutation, CreateListingMutationVariables>
> &
  TChildProps;
export type CreateListingMutationFn = ReactApollo.MutationFn<
  CreateListingMutation,
  CreateListingMutationVariables
>;
export function withCreateListing<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateListingMutation,
        CreateListingMutationVariables,
        CreateListingProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateListingMutation,
    CreateListingMutationVariables,
    CreateListingProps<TChildProps>
  >(CreateListingDocument, operationOptions);
}
export const FindListingsDocument = gql`
  query FindListings {
    findListings {
      id
      name
      category
      imageURL
      description
      price
      latitude
      longitude
      guests
      beds
      amenities
      owner {
        id
        email
      }
    }
  }
`;

export class FindListingsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindListingsQuery, FindListingsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindListingsQuery, FindListingsQueryVariables>
        query={FindListingsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindListingsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<FindListingsQuery, FindListingsQueryVariables>
> &
  TChildProps;
export function withFindListings<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindListingsQuery,
        FindListingsQueryVariables,
        FindListingsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    FindListingsQuery,
    FindListingsQueryVariables,
    FindListingsProps<TChildProps>
  >(FindListingsDocument, operationOptions);
}
export const GetListingDocument = gql`
  query GetListing($listingId: String!) {
    getListing(listingId: $listingId) {
      id
      name
      category
      imageURL
      description
      price
      latitude
      longitude
      guests
      beds
      amenities
      owner {
        id
        email
      }
    }
  }
`;

export class GetListingComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetListingQuery, GetListingQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetListingQuery, GetListingQueryVariables>
        query={GetListingDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetListingProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetListingQuery, GetListingQueryVariables>
> &
  TChildProps;
export function withGetListing<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetListingQuery,
        GetListingQueryVariables,
        GetListingProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetListingQuery,
    GetListingQueryVariables,
    GetListingProps<TChildProps>
  >(GetListingDocument, operationOptions);
}
export const CreateMessageMutationDocument = gql`
  mutation CreateMessageMutation($text: String!, $listingId: String!) {
    createMessage(text: $text, listingId: $listingId)
  }
`;

export class CreateMessageMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateMessageMutationMutation,
      CreateMessageMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateMessageMutationMutation,
        CreateMessageMutationMutationVariables
      >
        mutation={CreateMessageMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateMessageMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateMessageMutationMutation,
    CreateMessageMutationMutationVariables
  >
> &
  TChildProps;
export type CreateMessageMutationMutationFn = ReactApollo.MutationFn<
  CreateMessageMutationMutation,
  CreateMessageMutationMutationVariables
>;
export function withCreateMessageMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateMessageMutationMutation,
        CreateMessageMutationMutationVariables,
        CreateMessageMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateMessageMutationMutation,
    CreateMessageMutationMutationVariables,
    CreateMessageMutationProps<TChildProps>
  >(CreateMessageMutationDocument, operationOptions);
}
export const FindMessagesQueryDocument = gql`
  query FindMessagesQuery($listingId: String!) {
    findMessages(listingId: $listingId) {
      id
      listingId
      text
      sender {
        id
        email
      }
    }
  }
`;

export class FindMessagesQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      FindMessagesQueryQuery,
      FindMessagesQueryQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        FindMessagesQueryQuery,
        FindMessagesQueryQueryVariables
      >
        query={FindMessagesQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindMessagesQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<FindMessagesQueryQuery, FindMessagesQueryQueryVariables>
> &
  TChildProps;
export function withFindMessagesQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindMessagesQueryQuery,
        FindMessagesQueryQueryVariables,
        FindMessagesQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    FindMessagesQueryQuery,
    FindMessagesQueryQueryVariables,
    FindMessagesQueryProps<TChildProps>
  >(FindMessagesQueryDocument, operationOptions);
}
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
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutMutationVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
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
