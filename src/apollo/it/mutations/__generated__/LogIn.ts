/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../__generated__/itTypes";

// ====================================================
// GraphQL query operation: LogIn
// ====================================================

export interface LogIn_log_in {
  __typename: "Auth";
  token: string | null;
}

export interface LogIn {
  log_in: LogIn_log_in | null;
}

export interface LogInVariables {
  input?: LogInInput | null;
}
