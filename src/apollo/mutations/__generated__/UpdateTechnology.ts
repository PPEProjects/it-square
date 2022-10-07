/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTechnologyInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: UpdateTechnology
// ====================================================

export interface UpdateTechnology_updateTechnology {
  __typename: "Technology";
  id: string;
  name: string;
  content: string | null;
  slug: string;
}

export interface UpdateTechnology {
  updateTechnology: UpdateTechnology_updateTechnology;
}

export interface UpdateTechnologyVariables {
  input: UpdateTechnologyInput;
}
