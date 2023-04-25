import { API_KEY } from ".";

type Movie = {
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

type MoviesPage = {
  results: Movie[];
  next: number | undefined;
};

async function getMoviesDataForCompanies(
  page: number = 1,
  companiesIds: string[] | undefined,
  sortOption = "release_date.desc"
): Promise<MoviesPage> | never {
  if (!page || !companiesIds || companiesIds.length === 0) {
    throw new Error("Query arguments provisioning malformed.");
  }

  const urlEncodedCompanyIds = companiesIds.join("|");

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortOption}&page=${page}&with_companies=${urlEncodedCompanyIds}`
  );

  if (!response.ok) {
    throw new Error("There was a problem with fetching data !");
  }

  const dataFromServer = await response.json();

  const moviesPage: MoviesPage = {
    results: dataFromServer.results.map(
      //getting rid of unuseful additional data as received from API response
      ({
        title,
        release_date,
        overview,
        poster_path,
        vote_average,
        vote_count,
      }: Movie): Movie => ({
        title,
        release_date,
        overview,
        poster_path,
        vote_average,
        vote_count,
      })
    ),
    next: dataFromServer.total_pages === page ? undefined : page + 1,
  };

  return moviesPage;
}

export default getMoviesDataForCompanies;
