import { buildParams } from "../utils/helpers";
import { IJob, IList, IParamValue } from "../utils/types";

const BASE = "/api/jobs";

const findAll = async (params: Record<string, IParamValue>) => {
  const _params = { ...params };
  if (params.categorie === "0") {
    _params.categorie = undefined;
  }
  const response = await fetch(BASE + buildParams(_params));
  const data = await response.json();
  return data as IList<IJob>;
};

const finById = async (jobId: string) => {
  const response = await fetch(`${BASE}/${jobId}`);
  const data = await response.json();
  return data as IJob;
};

const jobService = {
  findAll,
  finById,
};

export default jobService;
