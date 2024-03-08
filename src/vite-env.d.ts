/// <reference types="vite/client" />

export type Token = { refresh: string; access: string };

export type UserData = { token: string; username: string };

export type FolderType = {
  id: number;
  user: number;
  name: string;
  parent: null | number;
};

export type FolderId = number | undefined;
