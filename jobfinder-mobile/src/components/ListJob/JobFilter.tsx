import { IonGrid, IonRow } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import categorieService from "../../service/categorieService";
import { ICategorie, IParamValue } from "../../utils/types";
import "./JobFilter.scss";
import JobFilterItem from "./JobFilterItem";

const ALL: ICategorie = {
  id: "0",
  nom: "Tous",
};

type JobFilterProps = {
  selected?: IParamValue;
  onChange: (categorieId: string) => void;
};

const JobFilter: FC<JobFilterProps> = ({ selected, onChange }) => {
  const [categories, setCategories] = useState<ICategorie[]>([]);

  useEffect(() => {
    categorieService
      .findAll()
      .then((data) => [ALL, ...data])
      .then(setCategories);
  }, []);

  return (
    <div className="jobfilter ion-margin-top ion-margin-bottom">
      <IonGrid>
        <IonRow className="ion-nowrap">
          {categories.map((categorie) => (
            <JobFilterItem
              key={categorie.id}
              title={categorie.nom}
              onChange={onChange.bind(this, categorie.id)}
              active={categorie.id === selected}
            />
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default JobFilter;
