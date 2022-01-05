import { ICategorie } from "../utils/types";

const findAll = async () => {
  const response = await fetch("/api/categories");
  const data = await response.json();
  return data as ICategorie[];
};

const categorieService = {
  findAll,
};

export default categorieService;
