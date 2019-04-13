
type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type Book = {
  id: Scalars['ID'],
  name: Scalars['String'],
  authors: Array<User>,
};

export type ChangePasswordInput = {
  password: Scalars['String'],
  token: Scalars['String'],
};

export type Mutation = {
  createBook: Book,
  createAuthorBook: Scalars['Boolean'],
  confirmUser?: Maybe<Scalars['Boolean']>,
  changePassword?: Maybe<User>,
  forgotPassword?: Maybe<Scalars['Boolean']>,
  logout: Scalars['Boolean'],
  createUser: User,
  login?: Maybe<User>,
  addProfilePicture: Scalars['Boolean'],
  register: User,
};


export type MutationCreateBookArgs = {
  name: Scalars['String']
};


export type MutationCreateAuthorBookArgs = {
  name: Scalars['String']
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationCreateUserArgs = {
  data: RegisterInput
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};

export type PasswordInput = {
  password: Scalars['String'],
};

export type Query = {
  books: Array<Book>,
  me?: Maybe<User>,
  helloWorld: Scalars['String'],
};

export type RegisterInput = {
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};


export type User = {
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  name: Scalars['String'],
  books: Array<Book>,
};
export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = ({ __typename?: 'Mutation' } & { register: ({ __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>) });

import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';

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

export class RegisterComponent extends React.Component<Partial<ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>>> {
  render() {
      return (
          <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...(this as any)['props'] as any} />
      );
  }
}
export type RegisterProps<TChildProps = {}> = Partial<ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>> & TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<RegisterMutation, RegisterMutationVariables>;
export function withRegister<TProps, TChildProps = {}>(operationOptions: ReactApollo.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>> | undefined) {
    return ReactApollo.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, operationOptions);
};