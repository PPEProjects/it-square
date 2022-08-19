/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertProject } from "./../../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: UpsertProjectMutation
// ====================================================

export interface UpsertProjectMutation_upsert_project {
  __typename: "Project";
  id: string;
  name: string;
}

export interface UpsertProjectMutation {
  upsert_project: UpsertProjectMutation_upsert_project | null;
}

export interface UpsertProjectMutationVariables {
  input: UpsertProject;
}
