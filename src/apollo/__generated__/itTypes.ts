/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PermissionEnum {
  DOING = "DOING",
  DONE = "DONE",
  WAITING = "WAITING",
}

export enum StepStatus {
  DONE = "DONE",
  WAITING = "WAITING",
}

export interface CheckStepInput {
  id: string;
}

export interface CreateCategoryInput {
  avatar?: string | null;
  content?: string | null;
  name: string;
  primary?: boolean | null;
}

export interface CreatePlatformInput {
  content: string;
  name: string;
}

export interface CreateProjectInput {
  category: string;
  content: string;
  covers: string[];
  estimate: number[];
  files?: string[] | null;
  name: string;
  technologies: string[];
}

export interface CreateStepsInput {
  project: string;
  steps: StepDocInput[];
}

export interface CreateTechnologyInput {
  content: string;
  name: string;
  platform: string;
}

export interface DeleteCategoryInput {
  id: string;
}

export interface DeleteStepInput {
  id: string;
}

export interface RemoveTechnologyInput {
  id: string;
}

export interface SortStepsInput {
  project: string;
  steps: string[];
}

export interface StepDocInput {
  content?: string | null;
  name: string;
  status?: StepStatus | null;
}

export interface UpdateCategoryInput {
  avatar?: string | null;
  content?: string | null;
  id: string;
  name?: string | null;
  primary?: boolean | null;
}

export interface UpdateGridPlatformInput {
  map: UpdateGridPlatformInputItem[];
}

export interface UpdateGridPlatformInputItem {
  children: string[];
  id: string;
}

export interface UpdatePlatformInput {
  content?: string | null;
  id: string;
  name?: string | null;
}

export interface UpdateTechnologyInput {
  content: string;
  id: string;
  name: string;
  platform: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
