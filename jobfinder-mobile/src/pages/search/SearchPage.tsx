import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import ListJob from "../../components/ListJob";
import { useJobs } from "../../hooks";
import { IParamValue } from "../../utils/types";

const SearchJobPage: React.FC = () => {
  const { jobs, loadJobs, resetJobs, loading } = useJobs();
  const [search, setSearch] = useState<IParamValue>(undefined);

  useEffect(() => {
    if (search) {
      loadJobs(1, { search });
    } else {
      resetJobs();
    }
  }, [loadJobs, resetJobs, search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/jobs" />
            </IonButtons>
            <IonInput
              value={search}
              placeholder="Rechercher un emploi"
              debounce={500}
              onIonChange={({ detail: { value } }) => {
                setSearch(value);
              }}
              clearInput
            />
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {search && (
          <ListJob
            pagination={jobs}
            loading={loading}
            loadJobs={(page) => loadJobs(page, { search })}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchJobPage;
