/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_log_in_user {
  __typename: "User";
  /**
   * Unique primary key.
   */
  id: string;
  /**
   * Non-unique name.
   */
  name: string;
  /**
   * Unique email address.
   */
  email: string;
}

export interface SignIn_log_in {
  __typename: "Auth";
  user: SignIn_log_in_user;
  token: string;
}

export interface SignIn {
  log_in: SignIn_log_in | null;
}

export interface SignInVariables {
  input?: LogInInput | null;
}
