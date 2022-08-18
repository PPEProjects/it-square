/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me {
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
  /**
   * When the email was verified.
   */
  email_verified_at: any | null;
}

export interface GetMe {
  me: GetMe_me | null;
}
