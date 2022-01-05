import { FC, useMemo } from "react";
import { IonIcon, IonRippleEffect, IonText } from "@ionic/react";
import { bookmarkOutline } from "ionicons/icons";

import { IJob } from "../../utils/types";

import "./JobItem.scss";

import JOB_ICON from "../../assets/images/jobIcon.png";
import { useHistory } from "react-router";

type JobItemProps = {
  job: IJob;
};

const JobItem: FC<JobItemProps> = ({ job }) => {
  const history = useHistory();

  const salaire = useMemo(() => {
    return [job.salaireMin, job.salaireMax]
      .filter((salaire) => salaire > 0)
      .map((salaire) => `${salaire}€`)
      .join(" - ");
  }, [job]);

  return (
    <div className="job-item ion-padding">
      <div className="job-item--media">
        <div className="job-item--image">
          <img src={JOB_ICON} alt="Job Icon" />
        </div>
        <IonIcon
          color="medium"
          className="job-item--favori"
          slot="icon-only"
          icon={bookmarkOutline}
        />
      </div>
      <div
        onClick={(e) => {
          history.push(`/jobs/details/${job.id}`);
        }}
        className="ion-activatable job-item--header"
      >
        <h1 className="job-item--title text-ellipsis">{job.titre}</h1>
        <IonText color="medium" className="job-item--information text-ellipsis">
          {job.entreprise.nom} - {job.lieu}
        </IonText>
        <IonText color="medium" className="job-item--information">
          {salaire} / mois
        </IonText>
        <IonRippleEffect style={{ borderRadius: "10px" }} type="bounded" />
      </div>
    </div>
  );
};

export default JobItem;
