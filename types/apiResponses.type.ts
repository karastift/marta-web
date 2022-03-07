import { Client } from "./client.type";

export interface InitShellResponse {
  data: boolean;
  error: ApiError | undefined
}

export interface ShellCommandResponse {
  data: string;
  error: ApiError | undefined
}

export interface UseClientListResponse {
  data: Client[];
  error: ApiError | undefined;
}

interface ApiError {
  message: string;
}