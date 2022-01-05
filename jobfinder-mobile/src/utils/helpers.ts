import { IParamValue } from "./types";

export const buildParams = (params?: Record<string, IParamValue>) => {
  const _params = Object.entries(params || {})
    .filter((entry) => entry[1] !== null && entry[1] !== undefined)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join("&");
  return _params ? `?${_params}` : "";
};
