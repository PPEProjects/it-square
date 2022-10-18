/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateStepsInput, StepStatus } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: CreateSteps
// ====================================================

export interface CreateSteps_createSteps {
  __typename: "Step";
  id: string;
  name: string;
  status: StepStatus;
  order: number;
}

export interface CreateSteps {
  createSteps: CreateSteps_createSteps[];
}

export interface CreateStepsVariables {
  input: CreateStepsInput;
}
