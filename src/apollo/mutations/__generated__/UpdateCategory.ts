/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCategoryInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: UpdateCategory
// ====================================================

export interface UpdateCategory_updateCategory {
  __typename: "Category";
  id: string;
  content: string | null;
  avatar: string;
  name: string;
  primary: boolean;
}

export interface UpdateCategory {
  updateCategory: UpdateCategory_updateCategory;
}

export interface UpdateCategoryVariables {
  input: UpdateCategoryInput;
}
