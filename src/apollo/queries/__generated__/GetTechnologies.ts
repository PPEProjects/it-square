/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTechnologies
// ====================================================

export interface GetTechnologies_technologies {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
}

export interface GetTechnologies {
  technologies: GetTechnologies_technologies[];
}
