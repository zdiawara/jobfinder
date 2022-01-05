import { FC, useMemo } from "react";
import "./JobFilterItem.scss";

type JobFilterItemProps = {
  active?: boolean;
  title: string;
  onChange: () => void;
};
const JobFilterItem: FC<JobFilterItemProps> = ({ active, title, onChange }) => {
  const className = useMemo(() => {
    const classes = ["jobfilter-item"];
    if (active) {
      classes.push("active");
    }
    return classes.join(" ");
  }, [active]);

  return (
    <div onClick={onChange} className={className}>
      {title}
    </div>
  );
};

JobFilterItem.defaultProps = {
  title: "Informatique",
};

export default JobFilterItem;
