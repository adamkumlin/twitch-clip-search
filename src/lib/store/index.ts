import { oneMonthPriorToToday, today } from "../constants";
import { SearchQuery } from "../src/lib/types";
import { create } from "zustand";

interface SearchQueryState {
  query: SearchQuery;
  setTitle: (title: SearchQuery["title"]) => void;
  setBroadcasterName: (broadcasterName: SearchQuery["broadcasterName"]) => void;
  setTimespan: (timespan: SearchQuery["timespan"]) => void;
  reset: () => void;
}

export const useSearchQueryStore = create<SearchQueryState>((set) => ({
  query: {
    title: "",
    broadcasterName: "forsen",
    timespan: [oneMonthPriorToToday, today],
  },
  setTitle: (newTitle) =>
    set((state) => ({
      query: { ...state.query, title: newTitle },
    })),
  setBroadcasterName: (newBroadcasterName) =>
    set((state) => ({
      query: { ...state.query, broadcasterName: newBroadcasterName },
    })),
  setTimespan: (newTimespan) =>
    set((state) => ({
      query: { ...state.query, timespan: newTimespan },
    })),
  reset: () =>
    set(() => ({
      query: {
        title: "",
        broadcasterName: "",
        timespan: [oneMonthPriorToToday, today],
      },
    })),
}));
