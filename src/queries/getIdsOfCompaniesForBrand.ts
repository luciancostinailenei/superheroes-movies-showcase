import { API_KEY } from ".";

type Company = {
  id: number;
  name: string;
};

async function getIdsOfCompaniesForBrand(
  brand: string
): Promise<string[]> | never {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=${brand}`
  );

  if (!response.ok) {
    throw new Error("There was a problem with fetching data !");
  }

  const dataFromServer = await response.json();
  const companies = dataFromServer.results;

  return companies.map((c: Company) => c.id);
}

export default getIdsOfCompaniesForBrand;
