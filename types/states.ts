import { Article } from "./types";

export type HeaderStates = {
  open: boolean;
  isSearching: boolean;
  mounted: boolean;
  q: string;
};
export type ProgressiveArticlesStates = {
  articles: Article[];
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  isErrored: boolean;
};
