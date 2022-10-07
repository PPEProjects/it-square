/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePlatformInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: CreatePlatform
// ====================================================

export interface CreatePlatform_createPlatform_children {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
  content: string | null;
}

export interface CreatePlatform_createPlatform {
  __typename: "Platform";
  id: string;
  content: string | null;
  name: string;
  slug: string;
  children: CreatePlatform_createPlatform_children[] | null;
}

export interface CreatePlatform {
  createPlatform: CreatePlatform_createPlatform;
}

export interface CreatePlatformVariables {
  input: CreatePlatformInput;
}
