/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Technologies
// ====================================================

export interface Technologies_technologies {
  __typename: "Technology";
  id: string;
  content: string | null;
  name: string;
  slug: string;
}

export interface Technologies {
  technologies: Technologies_technologies[];
}
