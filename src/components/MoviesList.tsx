import { Fragment, useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";

import { MovieCard, SortByDropdown, FakeMovieList } from ".";
import { DEFAULT_SORT_OPTION, SortOptions } from "./constants";

import {
  getIdsOfCompaniesForBrand,
  getMoviesDataForCompanies,
} from "../queries";

const SORT_OPTION =
  window.localStorage.getItem("sortOption") || DEFAULT_SORT_OPTION;

const MoviesList = () => {
  const { data: dcCompanies, isLoading: dcCompaniesLoading } = useQuery(
    ["companies", "DC"],
    () => getIdsOfCompaniesForBrand("DC")
  );

  const { data: marvelCompanies, isLoading: marvelCompaniesLoading } = useQuery(
    ["companies", "Marvel"],
    () => getIdsOfCompaniesForBrand("Marvel")
  );

  const [sortOption, setSortOption] = useState(SORT_OPTION);

  const companiesIds =
    dcCompanies && marvelCompanies && dcCompanies.concat(marvelCompanies);

  const {
    data: movies,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", companiesIds, sortOption],
    queryFn: ({ pageParam }) =>
      getMoviesDataForCompanies(pageParam, companiesIds, sortOption),
    enabled: !!companiesIds,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  useEffect(() => {
    function handleScroll() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= scrollableHeight - 50) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage]);

  const isLoading =
    dcCompaniesLoading || marvelCompaniesLoading || status === "loading";

  const chooseSortingAndSetToLocalStorage = (sortOption: SortOptions) => {
    setSortOption(sortOption);
    window.localStorage.setItem("sortOption", sortOption);
  };

  return (
    <section>
      <header className="flex justify-end mb-5 mr-5">
        <SortByDropdown
          onChooseItem={(sortOption: SortOptions) =>
            chooseSortingAndSetToLocalStorage(sortOption)
          }
        />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {isLoading && <FakeMovieList />}

        {movies &&
          movies.pages.map((page, i) => (
            <Fragment key={i}>
              {page.results.map(
                ({
                  title,
                  overview,
                  vote_average,
                  vote_count,
                  poster_path,
                  release_date,
                }) => (
                  <MovieCard
                    key={`${title}-${vote_count}`}
                    title={title}
                    description={overview}
                    votesAverage={vote_average}
                    votesCount={vote_count}
                    posterPath={poster_path}
                    releaseDate={release_date}
                  />
                )
              )}
            </Fragment>
          ))}
      </div>

      {isFetchingNextPage && (
        <div className="mt-10 flex items-center justify-center space-x-5 animate-pulse">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      )}
    </section>
  );
};

export default MoviesList;
