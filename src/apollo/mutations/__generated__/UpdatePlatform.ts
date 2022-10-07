/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePlatformInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: UpdatePlatform
// ====================================================

export interface UpdatePlatform_updatePlatform {
  __typename: "Platform";
  id: string;
  content: string | null;
  name: string;
}

export interface UpdatePlatform {
  updatePlatform: UpdatePlatform_updatePlatform;
}

export interface UpdatePlatformVariables {
  input: UpdatePlatformInput;
}
