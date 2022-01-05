import { FC } from "react";
import { IonSkeletonText } from "@ionic/react";

import "./JobItem.scss";

const JobItemPlaceholder: FC = () => {
  return (
    <div className="job-item ion-padding">
      <div className="job-item--media">
        <div className="job-item--image"></div>
      </div>
      <h1 className="job-item--title">
        <IonSkeletonText animated style={{ width: "100%" }} />
      </h1>
      <IonSkeletonText animated style={{ width: "100%" }} />
      <IonSkeletonText animated style={{ width: "100%" }} />
    </div>
  );
};

export default JobItemPlaceholder;
