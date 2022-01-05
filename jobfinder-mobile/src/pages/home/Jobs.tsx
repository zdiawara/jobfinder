import { useEffect, useState } from "react";
import ListJob from "../../components/ListJob";
import JobFilter from "../../components/ListJob/JobFilter";
import { useJobs } from "../../hooks";

const Jobs: React.FC = () => {
  const { jobs, loadJobs, loading } = useJobs();
  const [categorie, setCategorie] = useState<string>("0");

  useEffect(() => {
    loadJobs(1, { categorie });
  }, [loadJobs, categorie]);

  return (
    <ListJob
      pagination={jobs}
      loading={loading}
      loadJobs={(page) => loadJobs(page, { categorie })}
    >
      <JobFilter selected={categorie} onChange={setCategorie} />
    </ListJob>
  );
};

export default Jobs;
