/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertProject } from "./../../../__generated__/itTypes";

// ====================================================
// GraphQL mutation operation: Upsert_project
// ====================================================

export interface Upsert_project_upsert_project {
  __typename: "Project";
  id: string;
  name: string;
}

export interface Upsert_project {
  upsert_project: Upsert_project_upsert_project | null;
}

export interface Upsert_projectVariables {
  input: UpsertProject;
}
