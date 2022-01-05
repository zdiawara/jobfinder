import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonText,
} from "@ionic/react";
import { FC } from "react";

import { IJob, IPagination } from "../../utils/types";

import JobItem from "./JobItem";
import JobItemPlaceholder from "./JobItemPlaceholder";

type ListJobProps = {
  pagination: IPagination<IJob>;
  loading: boolean;
  loadJobs: (page: number) => Promise<void>;
};

const ListJob: FC<ListJobProps> = ({ pagination, loading, loadJobs }) => {
  const { data, hasMoreData, page } = pagination;

  const onScrollEnd = (e: CustomEvent<void>) => {
    loadJobs(page + 1).then(
      (e.target as HTMLIonInfiniteScrollElement).complete
    );
  };

  const renderContent = () => {
    if (loading) {
      return new Array(10).fill(1).map((_, i) => (
        <IonCol key={i} size="6">
          <JobItemPlaceholder />
        </IonCol>
      ));
    }

    if (!data.length) {
      return (
        <IonCol>
          <IonText className="ion-text-center">Aucun emploi trouvé</IonText>
        </IonCol>
      );
    }

    return (
      <>
        {data.map((job) => (
          <IonCol key={job.id} size="6">
            <JobItem job={job} />
          </IonCol>
        ))}
      </>
    );
  };

  return (
    <>
      <IonGrid>
        <IonRow>{renderContent()}</IonRow>
      </IonGrid>
      <IonInfiniteScroll
        threshold="50px"
        disabled={!hasMoreData}
        onIonInfinite={onScrollEnd}
      >
        <IonInfiniteScrollContent loadingText="Chargement ..." />
      </IonInfiniteScroll>
    </>
  );
};

export default ListJob;
