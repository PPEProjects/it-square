/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCategoryInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: CreateCategory
// ====================================================

export interface CreateCategory_createCategory {
  __typename: "Category";
  id: string;
  content: string | null;
  avatar: string;
  name: string;
  primary: boolean;
}

export interface CreateCategory {
  createCategory: CreateCategory_createCategory;
}

export interface CreateCategoryVariables {
  input: CreateCategoryInput;
}
