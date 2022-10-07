/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTechnologyInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: CreateTechnology
// ====================================================

export interface CreateTechnology_createTechnology {
  __typename: "Technology";
  id: string;
  content: string | null;
  name: string;
  slug: string;
}

export interface CreateTechnology {
  createTechnology: CreateTechnology_createTechnology;
}

export interface CreateTechnologyVariables {
  input: CreateTechnologyInput;
}
