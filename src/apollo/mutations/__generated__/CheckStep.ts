/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckStepInput, StepStatus } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: CheckStep
// ====================================================

export interface CheckStep_checkStep {
  __typename: "Step";
  id: string;
  name: string;
  status: StepStatus;
}

export interface CheckStep {
  checkStep: CheckStep_checkStep;
}

export interface CheckStepVariables {
  input: CheckStepInput;
}
