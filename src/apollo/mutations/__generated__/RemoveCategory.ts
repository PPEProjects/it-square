/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCategoryInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: RemoveCategory
// ====================================================

export interface RemoveCategory_removeCategory {
  __typename: "Category";
  id: string;
  slug: string;
}

export interface RemoveCategory {
  removeCategory: RemoveCategory_removeCategory;
}

export interface RemoveCategoryVariables {
  input: DeleteCategoryInput;
}
