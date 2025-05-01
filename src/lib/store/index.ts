
import { oneMonthPriorToToday, today } from "../../constants";
import { SearchQuery } from "../types";
import { create } from "zustand";

interface SearchQueryState {
    searchQuery: SearchQuery;
    edit: (query: SearchQuery) => void;
}

export const useSearchQueryStore = create<SearchQueryState>((set) => ({
    searchQuery: {
        title: "",
        broadcasterName: "forsen",
        timespan: [oneMonthPriorToToday, today]
    },
    edit: (query) => set(() => ({
        searchQuery: query
    }))
}))