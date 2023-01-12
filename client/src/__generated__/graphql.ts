/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateEntryInput = {
  date: Scalars['DateTime'];
  image_url: Scalars['String'];
  userId: Scalars['Int'];
};

export type CreateNoteInput = {
  content: Scalars['String'];
  entryId: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  image_url: Scalars['String'];
  notes: Array<Note>;
  userId: Scalars['Int'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEntry: Entry;
  createNote: Note;
  createUser: User;
  login: LoginResult;
  removeEntry?: Maybe<Entry>;
  removeNote?: Maybe<Note>;
  removeUser?: Maybe<User>;
  updateEntry: Entry;
  updateNote: Note;
  updateUser: User;
};


export type MutationCreateEntryArgs = {
  createEntryInput: CreateEntryInput;
};


export type MutationCreateNoteArgs = {
  createNoteInput: CreateNoteInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginUserInput;
};


export type MutationRemoveEntryArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveNoteArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateEntryArgs = {
  updateEntryInput: UpdateEntryInput;
};


export type MutationUpdateNoteArgs = {
  updateNoteInput: UpdateNoteInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  entryId: Scalars['Int'];
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  entry: Entry;
  note: Note;
  user: User;
  users: Array<User>;
};


export type QueryEntryArgs = {
  id: Scalars['Float'];
};


export type QueryNoteArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type UpdateEntryInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  image_url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateNoteInput = {
  content?: InputMaybe<Scalars['String']>;
  entryId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  entries: Array<Entry>;
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type EntryQueryVariables = Exact<{
  entryId: Scalars['Float'];
}>;


export type EntryQuery = { __typename?: 'Query', entry: { __typename?: 'Entry', id: number, date: any, image_url: string, userId: number, notes: Array<{ __typename?: 'Note', id: number, entryId: number, content: string }> } };

export type CreateEntryMutationVariables = Exact<{
  createEntryInput: CreateEntryInput;
}>;


export type CreateEntryMutation = { __typename?: 'Mutation', createEntry: { __typename?: 'Entry', id: number, date: any, image_url: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', token: string } };

export type UpdateNoteMutationVariables = Exact<{
  updateNoteInput: UpdateNoteInput;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote: { __typename?: 'Note', id: number, entryId: number, content: string } };

export type RemoveNoteMutationVariables = Exact<{
  removeNoteId: Scalars['Float'];
}>;


export type RemoveNoteMutation = { __typename?: 'Mutation', removeNote?: { __typename?: 'Note', id: number } | null };

export type CreateNoteMutationVariables = Exact<{
  createNoteInput: CreateNoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: number, entryId: number, content: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, name: string, email: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, name: string, email: string, password: string, entries: Array<{ __typename?: 'Entry', id: number, date: any, image_url: string, userId: number, notes: Array<{ __typename?: 'Note', id: number, content: string, entryId: number }> }> } };


export const EntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Entry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entryId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<EntryQuery, EntryQueryVariables>;
export const CreateEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createEntryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createEntryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createEntryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]} as unknown as DocumentNode<CreateEntryMutation, CreateEntryMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdateNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateNoteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateNoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateNoteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateNoteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entryId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const RemoveNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeNoteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeNoteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveNoteMutation, RemoveNoteMutationVariables>;
export const CreateNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createNoteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createNoteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createNoteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entryId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<CreateNoteMutation, CreateNoteMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"entryId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;