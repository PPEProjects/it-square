/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApproveProjectInput, ProjectActive } from "./../../__generated__/types";

// ====================================================
// GraphQL mutation operation: StudioProjectApprove
// ====================================================

export interface StudioProjectApprove_studioProjectApprove {
  __typename: "Project";
  id: string;
  active: ProjectActive;
}

export interface StudioProjectApprove {
  studioProjectApprove: StudioProjectApprove_studioProjectApprove;
}

export interface StudioProjectApproveVariables {
  input: ApproveProjectInput;
}
