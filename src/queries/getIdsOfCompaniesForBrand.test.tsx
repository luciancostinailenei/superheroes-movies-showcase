import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";

import nock from "nock";

import { getIdsOfCompaniesForBrand } from ".";
import { ReactElement } from "react";

const useTestQueryHook = () => {
  return useQuery(["companies", "DC"], () => getIdsOfCompaniesForBrand("DC"));
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

it("should properly call API and return an array of company IDs", async () => {
  nock("https://api.themoviedb.org/3")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/search/company?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18&query=DC")
    .reply(200, {
      page: 1,
      results: [
        {
          id: 140577,
          logo_path: null,
          name: "Residue DC",
          origin_country: "",
        },
        {
          id: 103839,
          logo_path: null,
          name: "DCinema Sdn Bhd",
          origin_country: "MY",
        },
      ],
      total_pages: 1,
      total_results: 2,
    });

  const { result } = renderHook(() => useTestQueryHook(), { wrapper });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data).toEqual([140577, 103839]);
});
