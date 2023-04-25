import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { renderHook, waitFor } from "@testing-library/react";

import nock from "nock";

import { getMoviesDataForCompanies } from ".";
import { ReactElement } from "react";
import { SortOptions } from "../components/constants";

const useTestQueryHook = () => {
  return useInfiniteQuery({
    queryKey: ["movies", ["140577", "103839"], SortOptions.release_date_asc],
    queryFn: () =>
      getMoviesDataForCompanies(
        1,
        ["140577", "103839"],
        SortOptions.release_date_asc
      ),
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

function generateMockedResponse(page: string) {
  return {
    results: [
      {
        adult: false,
        backdrop_path: null,
        genre_ids: [28, 10749],
        id: 525461,
        original_language: "ta",
        original_title: "Pinnokam",
        overview:
          "Pinnokam-The Flashback is Tamil language action romantic movie from Malaysia.This film were directed and starred by debuted A.Hamen Kumar.",
        popularity: 0.6,
        poster_path: "/sK0VrHsSqTkuzdUJakyoOgLlQmp.jpg",
        release_date: "2015-01-01",
        title: "Pinnokam",
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
      {
        adult: false,
        backdrop_path: null,
        genre_ids: [28, 35],
        id: 536454,
        original_language: "ta",
        original_title: "Vasantha Villas 10:45PM",
        overview:
          "Wanting to acquire wealth, four youngsters get themselves involved in various criminal activities. However, only money earned through the right path can be retained and these young people are about to learn this the hard way.",
        popularity: 0.6,
        poster_path: "/3gAM4Gjc8mJVVWeKdP1EOnjeOj2.jpg",
        release_date: "2017-10-05",
        title: "Vasantha Villas 10:45PM",
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
      {
        adult: false,
        backdrop_path: "/89D7cvdOYKdXCBNSwp2Apms3rWA.jpg",
        genre_ids: [18],
        id: 666271,
        original_language: "en",
        original_title: "Residue",
        overview:
          "A young filmmaker returns home after many years away, to write a script about his childhood, only to find his neighborhood unrecognizable and his childhood friends scattered to the wind.",
        popularity: 3.579,
        poster_path: "/2UNSTNshwvGJWryqapiLfCkgGhR.jpg",
        release_date: "2020-09-17",
        title: "Residue",
        video: false,
        vote_average: 5.1,
        vote_count: 17,
      },
      {
        adult: false,
        backdrop_path: "/8QL2yVRuK02QiO5dY1CaPrLcMWh.jpg",
        genre_ids: [35],
        id: 520918,
        original_language: "ta",
        original_title: "Kambathe Kannemma",
        overview: "Lorem",
        popularity: 0.904,
        poster_path: "/h8Cm0FbrZmxoY62W4H7XOFvoGfi.jpg",
        release_date: "2022-04-28",
        title: "Kambathe Kannemma",
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
    ],
    total_pages: 2,
    total_results: 8,
  };
}

it("should properly call API and return a page object with movie results", async () => {
  const expectation1 = nock("https://api.themoviedb.org/3")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get(
      "/discover/movie?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18&language=en-US&sort_by=release_date.asc&page=1&with_companies=140577|103839"
    )
    .reply(200, (uri: string) => {
      const url = new URL(`https://api.themoviedb.org/3${uri}`);
      const { page } = Object.fromEntries(url.searchParams);
      return generateMockedResponse(page);
    });

  const expectation2 = nock("https://api.themoviedb.org/3")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get(
      "/discover/movie?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18&language=en-US&sort_by=release_date.asc&page=2&with_companies=140577|103839"
    )
    .reply(200, (uri: string) => {
      const url = new URL(`https://api.themoviedb.org/3${uri}`);
      const { page } = Object.fromEntries(url.searchParams);
      return generateMockedResponse(page);
    });

  const { result } = renderHook(() => useTestQueryHook(), { wrapper });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  if (!result.current.data) {
    throw new Error("no data");
  }

  expect(result.current.data.pages).toStrictEqual([
    {
      next: 2,
      results: [
        {
          overview:
            "Pinnokam-The Flashback is Tamil language action romantic movie from Malaysia.This film were directed and starred by debuted A.Hamen Kumar.",
          poster_path: "/sK0VrHsSqTkuzdUJakyoOgLlQmp.jpg",
          release_date: "2015-01-01",
          title: "Pinnokam",
          vote_average: 0,
          vote_count: 0,
        },
        {
          overview:
            "Wanting to acquire wealth, four youngsters get themselves involved in various criminal activities. However, only money earned through the right path can be retained and these young people are about to learn this the hard way.",
          poster_path: "/3gAM4Gjc8mJVVWeKdP1EOnjeOj2.jpg",
          release_date: "2017-10-05",
          title: "Vasantha Villas 10:45PM",
          vote_average: 0,
          vote_count: 0,
        },
        {
          overview:
            "A young filmmaker returns home after many years away, to write a script about his childhood, only to find his neighborhood unrecognizable and his childhood friends scattered to the wind.",
          poster_path: "/2UNSTNshwvGJWryqapiLfCkgGhR.jpg",
          release_date: "2020-09-17",
          title: "Residue",
          vote_average: 5.1,
          vote_count: 17,
        },
        {
          overview: "Lorem",
          poster_path: "/h8Cm0FbrZmxoY62W4H7XOFvoGfi.jpg",
          release_date: "2022-04-28",
          title: "Kambathe Kannemma",
          vote_average: 0,
          vote_count: 0,
        },
      ],
    },
  ]);

  result.current.fetchNextPage();

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expectation1.done();
  expectation2.done();
});
