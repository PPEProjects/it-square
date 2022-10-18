/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortStepsInput } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: SortSteps
// ====================================================

export interface SortSteps_sortSteps {
  __typename: "Step";
  id: string;
  name: string;
  content: string;
  order: number;
}

export interface SortSteps {
  sortSteps: SortSteps_sortSteps[];
}

export interface SortStepsVariables {
  input: SortStepsInput;
}
