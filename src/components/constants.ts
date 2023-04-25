export enum SortOptions {
  release_date_asc = "release_date.asc",
  release_date_desc = "release_date.desc",
  title_asc = "title.asc",
  title_desc = "title.desc",
  vote_average_asc = "vote_average.asc",
  vote_average_desc = "vote_average.desc",
}

export const DEFAULT_SORT_OPTION: SortOptions = SortOptions.release_date_desc;
