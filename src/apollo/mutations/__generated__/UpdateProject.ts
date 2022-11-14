/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProjectInput } from "./../../__generated__/types";

// ====================================================
// GraphQL mutation operation: UpdateProject
// ====================================================

export interface UpdateProject_updateProject_category {
  __typename: "Category";
  id: string;
}

export interface UpdateProject_updateProject_technologies {
  __typename: "Technology";
  id: string;
  name: string;
}

export interface UpdateProject_updateProject {
  __typename: "Project";
  id: string;
  category: UpdateProject_updateProject_category;
  logo: string | null;
  content: string | null;
  cover: string;
  estimate: number[];
  name: string;
  technologies: UpdateProject_updateProject_technologies[];
  files: string[];
}

export interface UpdateProject {
  updateProject: UpdateProject_updateProject;
}

export interface UpdateProjectVariables {
  input: UpdateProjectInput;
}
