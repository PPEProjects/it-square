/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./../../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_sign_up_user {
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

export interface SignUp_sign_up {
  __typename: "Auth";
  token: string;
  user: SignUp_sign_up_user;
}

export interface SignUp {
  sign_up: SignUp_sign_up | null;
}

export interface SignUpVariables {
  input?: SignUpInput | null;
}
