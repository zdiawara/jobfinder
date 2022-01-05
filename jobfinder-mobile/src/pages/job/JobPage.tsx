import {
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  bookmarks,
  closeCircle,
  expandOutline,
  fileTray,
  information,
  informationCircle,
  informationSharp,
  locateOutline,
  locateSharp,
  location,
  logoEuro,
} from "ionicons/icons";
import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import JobItem from "../../components/ListJob/JobItem";
import jobService from "../../service/jobService";
import { IJob } from "../../utils/types";

import JOB_ICON from "../../assets/images/jobIcon.png";

const JobPage: FC<RouteComponentProps> = ({ match }) => {
  const { jobId } = match.params as Record<string, string>;
  const [job, setJob] = useState<IJob | undefined>();

  useEffect(() => {
    jobService.finById(jobId).then(setJob);
  }, [jobId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton color="dark" slot="start">
              <IonBackButton defaultHref="/jobs" />
            </IonButton>
            <IonTitle>Détail</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="full">
          <IonButton fill="clear" color="dark" slot="start">
            <IonIcon slot="icon-only" icon={informationCircle} />
          </IonButton>
          <IonLabel>
            <h1>Titre</h1>
            <p>{job?.titre}</p>
          </IonLabel>
          {/* <IonBadge color="primary" slot="end">
            {job?.categorie?.nom}
          </IonBadge> */}
        </IonItem>

        <IonItem lines="full">
          <IonButton fill="clear" color="dark" slot="start">
            <IonIcon slot="icon-only" icon={location} />
          </IonButton>
          <IonLabel>
            <h1>Lieu</h1>
            <p>{job?.lieu}</p>
          </IonLabel>
        </IonItem>

        <IonItem lines="full">
          <IonButton fill="clear" color="dark" slot="start">
            <IonIcon slot="icon-only" icon={logoEuro} />
          </IonButton>
          <IonLabel>
            <h1>Salaire</h1>
            <p>1000€ - 2000€ / mois</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default JobPage;
