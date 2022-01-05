import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  arrowForwardCircle,
  bookmarkOutline,
  chevronBackOutline,
  locationOutline,
  logoEuro,
  time,
  timeOutline,
} from "ionicons/icons";
import { FC } from "react";

import facebook from "../../assets/images/google.png";

import "./JobPage.scss";

const JobPage: FC = () => {
  return (
    <IonPage id="jobpage">
      <IonHeader color="dark" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon color="dark" slot="icon-only" icon={bookmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="card">
          <div className="media">
            <img src={facebook} alt="" />
          </div>
          <h1 className="title">Développeur full stack</h1>
          <div className="info">
            <IonBadge>Google</IonBadge>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <div className="media">
              <IonIcon icon={locationOutline} />
            </div>
            <div className="label">Lieu</div>
            <div className="value">Burkina</div>
          </div>
          <div className="item">
            <div className="media">
              <IonIcon icon={logoEuro} />
            </div>
            <div className="label">Salaire</div>
            <div className="value">5K/mois</div>
          </div>
          <div className="item">
            <div className="media">
              <IonIcon icon={timeOutline} />
            </div>
            <div className="label">Publication</div>
            <div className="value">12 avril 2020</div>
          </div>
        </div>

        <div className="information">
          <div className="title">Description</div>
          <div className="content ion-margin-bottom">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            odit eveniet mollitia dolores,
          </div>
        </div>

        <div className="information">
          <div className="title">Competences</div>
          <div className="content">
            <ul>
              <li>Lorem, ipsum dolor </li>
              <li>Dolorem recusandae </li>
              <li>Dolorem xja,ius oujdQOIK</li>
            </ul>
          </div>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton color="primary" expand="full" shape="round">
            Postuler
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default JobPage;
