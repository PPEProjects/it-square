/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PermissionEnum {
  ACCEPT_MEMBER = "ACCEPT_MEMBER",
  CREATE_ROLE = "CREATE_ROLE",
  REMOVE_MEMBER = "REMOVE_MEMBER",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  REMOVE_ROLE = "REMOVE_ROLE",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  UPDATE_ROLE = "UPDATE_ROLE",
}

export enum ProjectActive {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  DRAFT = "DRAFT",
}

export enum ProjectStatus {
  DONE = "DONE",
  PREPARE = "PREPARE",
  RUNNING = "RUNNING",
  STUCK = "STUCK",
}

export enum UserRole {
  SP_ADMIN = "SP_ADMIN",
  USER = "USER",
}

export interface CountProjectsFilter {
  category?: string | null;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface GetProjectsFilter {
  category?: string | null;
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
