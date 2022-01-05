import { useCallback, useState } from "react";
import jobService from "../service/jobService";
import { IJob, IList, IPagination, IParamValue } from "../utils/types";

const updateData = (old: IPagination<IJob>, result: IList<IJob>) => {
  const data = [...(result.page !== 1 ? old.data : []), ...result.data];
  return {
    ...old,
    data,
    page: result.page,
    total: result.total,
    hasMoreData: data.length < result.total,
  };
};

const SIZE = 6;

type JobParam = {
  loading: boolean;
};

const DEFAULT_PARAM: JobParam = {
  loading: true,
};

const INITIAL: IPagination<IJob> = {
  data: [],
  page: 1,
  total: 0,
  hasMoreData: true,
};

const useJobs = (param: JobParam = DEFAULT_PARAM) => {
  const [jobs, setJobs] = useState<IPagination<IJob>>(INITIAL);

  const [loading, setLoading] = useState<boolean>(param.loading);

  const loadJobs = useCallback(
    async (page: number, filters: Record<string, IParamValue> = {}) => {
      try {
        if (page === 1) {
          setLoading(true);
        }
        const params = { size: SIZE, page, ...filters };
        const data = await jobService.findAll(params);
        setJobs((prev) => updateData(prev, data));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetJobs = useCallback(() => {
    setJobs(INITIAL);
  }, []);

  return {
    loadJobs,
    resetJobs,
    loading,
    jobs,
  };
};

export default useJobs;
