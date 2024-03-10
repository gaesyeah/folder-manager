/// <reference types="vite/client" />

export type Token = { refresh: string; access: string };

export type UserData = { token: string; username: string };

export type FolderType = {
  id?: number;
  user?: number;
  name: string;
  parent?: null | number;
  status?: "editing" | "creating" | "default";
};

export type FolderId = number | undefined;
