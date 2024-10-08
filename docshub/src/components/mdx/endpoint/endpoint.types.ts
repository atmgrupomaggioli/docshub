export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Label = "DEPRECATED" | "BETA" | "ALPHA" | "STABLE";

export interface iEndpoint {
  method: Method;
  title: string;
  description: string;
  path: string;
  label: Label;
  spaceTop?: boolean;
  spaceBottom?: boolean;
}

export interface iMethodClasses {
  GET: string;
  POST: string;
  PUT: string;
  PATCH: string;
  DELETE: string;
}

export interface iLabelClasses {
  ALPHA: string;
  BETA: string;
  STABLE: string;
  DEPRECATED: string;
}
