export interface paramsType {
  [v: string]: any;
}

// export interface returnType extends Promise<Response> {
//   cancel?: () => void;
// }

export type apiType = (
  input: { [v: string]: unknown } | null,
  init?: AbortSignal
) => any;

export type queryParamsType = [paramsType | null, string, apiType];
