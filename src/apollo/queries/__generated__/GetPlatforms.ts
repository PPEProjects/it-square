/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlatforms
// ====================================================

export interface GetPlatforms_platforms_children {
  __typename: "Technology";
  id: string;
  name: string;
  slug: string;
  content: string | null;
}

export interface GetPlatforms_platforms {
  __typename: "Platform";
  id: string;
  content: string | null;
  name: string;
  slug: string;
  children: GetPlatforms_platforms_children[] | null;
}

export interface GetPlatforms {
  platforms: GetPlatforms_platforms[];
}
