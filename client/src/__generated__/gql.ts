/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query Entry($entryId: Float!) {\n    entry(id: $entryId) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n": types.EntryDocument,
    "\n  mutation RemoveEntry($removeEntryId: Float!) {\n    removeEntry(id: $removeEntryId) {\n      id\n    }\n  }\n": types.RemoveEntryDocument,
    "\n  mutation UpdateEntry($updateEntryInput: UpdateEntryInput!) {\n    updateEntry(updateEntryInput: $updateEntryInput) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n": types.UpdateEntryDocument,
    "\n  mutation CreateEntry($createEntryInput: CreateEntryInput!) {\n    createEntry(createEntryInput: $createEntryInput) {\n      id\n      date\n      image_url\n    }\n  }\n": types.CreateEntryDocument,
    "\n  mutation Login($loginInput: LoginUserInput!) {\n    login(loginInput: $loginInput) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {\n  updateNote(updateNoteInput: $updateNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n": types.UpdateNoteDocument,
    "\n  mutation RemoveNote($removeNoteId: Float!) {\n  removeNote(id: $removeNoteId) {\n    id\n  }\n}\n": types.RemoveNoteDocument,
    "\n  mutation CreateNote($createNoteInput: CreateNoteInput!) {\n  createNote(createNoteInput: $createNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n": types.CreateNoteDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      name\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      password\n      entries {\n        id\n        date\n        image_url\n        userId\n        notes {\n          id\n          content\n          entryId\n        }\n      }\n    }\n  }\n": types.CurrentUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Entry($entryId: Float!) {\n    entry(id: $entryId) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query Entry($entryId: Float!) {\n    entry(id: $entryId) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveEntry($removeEntryId: Float!) {\n    removeEntry(id: $removeEntryId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveEntry($removeEntryId: Float!) {\n    removeEntry(id: $removeEntryId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateEntry($updateEntryInput: UpdateEntryInput!) {\n    updateEntry(updateEntryInput: $updateEntryInput) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEntry($updateEntryInput: UpdateEntryInput!) {\n    updateEntry(updateEntryInput: $updateEntryInput) {\n      id\n      date\n      image_url\n      userId\n      notes {\n        id\n        entryId\n        content\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateEntry($createEntryInput: CreateEntryInput!) {\n    createEntry(createEntryInput: $createEntryInput) {\n      id\n      date\n      image_url\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEntry($createEntryInput: CreateEntryInput!) {\n    createEntry(createEntryInput: $createEntryInput) {\n      id\n      date\n      image_url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($loginInput: LoginUserInput!) {\n    login(loginInput: $loginInput) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginUserInput!) {\n    login(loginInput: $loginInput) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {\n  updateNote(updateNoteInput: $updateNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n"): (typeof documents)["\n  mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {\n  updateNote(updateNoteInput: $updateNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveNote($removeNoteId: Float!) {\n  removeNote(id: $removeNoteId) {\n    id\n  }\n}\n"): (typeof documents)["\n  mutation RemoveNote($removeNoteId: Float!) {\n  removeNote(id: $removeNoteId) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNote($createNoteInput: CreateNoteInput!) {\n  createNote(createNoteInput: $createNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n"): (typeof documents)["\n  mutation CreateNote($createNoteInput: CreateNoteInput!) {\n  createNote(createNoteInput: $createNoteInput) {\n    id\n    entryId\n    content\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      password\n      entries {\n        id\n        date\n        image_url\n        userId\n        notes {\n          id\n          content\n          entryId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      password\n      entries {\n        id\n        date\n        image_url\n        userId\n        notes {\n          id\n          content\n          entryId\n        }\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;