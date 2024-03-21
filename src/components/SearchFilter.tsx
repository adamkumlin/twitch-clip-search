import type { SearchQuery } from "../types";

interface SearchFilterProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

export function SearchFilter({ searchQuery, setSearchQuery }: SearchFilterProps) {
  function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
  }

  function resetSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    setSearchQuery((current) => ({
      ...current,
      title: "",
      streamer: "",
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "title") {
        setSearchQuery((current) => ({...current, title: e.target.value}))
    } else {
        setSearchQuery((current) => ({ ...current, streamer: e.target.value }));
    }
  }

  return (
    <>
      <div className="flex flex-row place-content-center">
        <label>
          Clip title
          <input
            id="title"
            placeholder="Minecraft"
            className="text-black"
            type="text"
            value={searchQuery.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Streamer
          <input
            id="streamer"
            placeholder="Forsen"
            className="text-black"
            type="text"
            value={searchQuery.streamer}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <input className="bg-slate-400 text-black" type="submit" value="Search" onClick={(e) => handleSearch(e)} />
      {searchQuery.title !== "" || searchQuery.streamer !== "" ? (
        <input className="bg-slate-400 text-black" type="button" value="Reset" onClick={(e) => resetSearch(e)} />
      ) : null}
    </>
  );
}
