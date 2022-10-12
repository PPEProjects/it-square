/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateGridPlatformInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: UpdateGridPlatform
// ====================================================

export interface UpdateGridPlatform_updateGridPlatform_children {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
  content: string | null;
}

export interface UpdateGridPlatform_updateGridPlatform {
  __typename: "Platform";
  id: string;
  content: string | null;
  name: string;
  slug: string;
  children: UpdateGridPlatform_updateGridPlatform_children[] | null;
}

export interface UpdateGridPlatform {
  updateGridPlatform: UpdateGridPlatform_updateGridPlatform[];
}

export interface UpdateGridPlatformVariables {
  input: UpdateGridPlatformInput;
}
