import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import ListJob from "../../components/ListJob";
import JobFilter from "../../components/ListJob/JobFilter";
import { useJobs } from "../../hooks";
import { IParamValue } from "../../utils/types";

const HomePage: React.FC = () => {
  const { jobs, loadJobs, loading } = useJobs();
  const [filter, setFilter] = useState<Record<string, IParamValue>>({
    categorie: "0",
    search: "",
  });

  useEffect(() => {
    loadJobs(1, filter);
  }, [loadJobs, filter]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none" className="header">
            <IonLabel>
              <IonText style={{ fontSize: "1.5rem" }} color="primary">
                <strong>Job Finder</strong>
              </IonText>
            </IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem className="ion-margin-top">
          <IonIcon icon={searchOutline} slot="start" />
          <IonInput
            value={filter.search}
            placeholder="Rechercher un emploi"
            debounce={500}
            onIonChange={({ detail: { value } }) => {
              setFilter((prev) => ({ ...prev, search: value }));
            }}
            clearInput
          />
        </IonItem>

        <JobFilter
          selected={filter.categorie}
          onChange={(categorie) =>
            setFilter((prev) => ({ ...prev, categorie }))
          }
        />
        <ListJob
          pagination={jobs}
          loading={loading}
          loadJobs={(page) => loadJobs(page, filter)}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
