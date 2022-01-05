export type IParamValue = string | number | undefined | null;

export type ICategorie = {
  id: string;
  nom: string;
};

export type IEntreprise = {
  id: string;
  nom: string;
  description: string;
};

export type IJob = {
  id: string;
  titre: string;
  description: string;
  comptence: string;
  lieu: string;
  salaireMin: number;
  salaireMax: number;
  categorie: ICategorie;
  entreprise: IEntreprise;
};

export type IList<T> = {
  data: T[];
  page: number;
  total: number;
};

export interface IPagination<T> extends IList<T> {
  hasMoreData: boolean;
}
