/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveTechnologyInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: RemoveTechnology
// ====================================================

export interface RemoveTechnology_removeTechnology_platform {
  __typename: "Platform";
  id: string;
}

export interface RemoveTechnology_removeTechnology {
  __typename: "Technology";
  id: string;
  slug: string;
  platform: RemoveTechnology_removeTechnology_platform;
}

export interface RemoveTechnology {
  removeTechnology: RemoveTechnology_removeTechnology;
}

export interface RemoveTechnologyVariables {
  input: RemoveTechnologyInput;
}
