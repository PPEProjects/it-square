/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StepStatus, PermissionEnum } from "./../../__generated__/itTypes";

// ====================================================
// GraphQL query operation: GetProjectAdvance
// ====================================================

export interface GetProjectAdvance_project_steps {
  __typename: "Step";
  id: string;
  name: string;
  status: StepStatus;
  order: number;
}

export interface GetProjectAdvance_project_roles {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
}

export interface GetProjectAdvance_project {
  __typename: "Project";
  id: string;
  name: string;
  steps: GetProjectAdvance_project_steps[];
  roles: GetProjectAdvance_project_roles[];
}

export interface GetProjectAdvance {
  project: GetProjectAdvance_project;
}

export interface GetProjectAdvanceVariables {
  project: string;
}
