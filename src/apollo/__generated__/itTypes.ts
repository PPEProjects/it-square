/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Status {
  done = "done",
  draff_project = "draff_project",
  in_use = "in_use",
  on_board = "on_board",
  project = "project",
  running = "running",
  stuck = "stuck",
}

export interface AttachmentInput {
  main_pictures: any;
  other_files?: any | null;
}

export interface LogInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  password_confirmation: string;
}

/**
 * A date string with format `Y-m-d`, e.g. `2011-05-23`.
 */
export interface TimeToDoInput {
  from: string;
  to: string;
}

export interface UpsertProject {
  id?: string | null;
  name: string;
  description: string;
  category?: string | null;
  status: Status;
  time_to_do?: TimeToDoInput | null;
  skill?: any | null;
  information?: string | null;
  level?: string | null;
  version?: string | null;
  budget?: string | null;
  is_privacy?: boolean | null;
  attachments?: AttachmentInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
