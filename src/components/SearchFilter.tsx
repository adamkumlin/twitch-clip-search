import type { ResponseDetails, SearchQuery } from "../types";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import TitleIcon from "@mui/icons-material/Title";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";

interface SearchFilterProps {
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  populateClipsArray: (data: any) => void;
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

export function SearchFilter({ setResponseDetails, populateClipsArray, searchQuery, setSearchQuery }: SearchFilterProps) {
  async function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();

    if (searchQuery.streamer === "") {
      alert("Streamer is mandatory");
      return;
    }

    const data = await getBroadcasterId();

    const rawClips = await getClips(data.data[0].id);

    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
      broadcasterId: data.data[0].id,
    }));

    if (searchQuery.title !== "") {
      const filteredClips = filterClips(rawClips);
      populateClipsArray(filteredClips);
      return;
    }
    populateClipsArray(rawClips);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "title") {
      setSearchQuery((current) => ({ ...current, title: e.target.value }));
    } else {
      setSearchQuery((current) => ({ ...current, streamer: e.target.value }));
    }
  }

  function getClips(broadcasterId: string): any {
    if (broadcasterId === "") {
      return;
    }

    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=15&started_at=${searchQuery.startDate}&ended_at=${searchQuery.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Client-Id": import.meta.env.VITE_CLIENT_ID,
        },
      }
    ).then((res) => res.json());

    return data;
  }

  function getBroadcasterId(): any {
    let data = fetch(`https://api.twitch.tv/helix/users?login=${searchQuery.streamer}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Client-Id": import.meta.env.VITE_CLIENT_ID,
      },
    }).then((response) => response.json());

    return data;
  }

  function filterClips(rawClips: any): any {
    const filteredClips = rawClips.data.filter((clip) =>
      clip.title.toLowerCase().includes(searchQuery.title.toLowerCase())
    );
    return filteredClips;
  }

  return (
    <>
      <form className="flex flex-row place-content-center">
        <div className="group">
          <VideoCameraFrontIcon className="relative top-8 right-3 pointer-events-none group-focus-within:hidden" />
          <label htmlFor="streamer" className="relative top-8 pointer-events-none group-focus-within:top-0">
            Streamer
          </label>
          <input
            id="streamer"
            className="text-black block m-auto h-10 bg-gray-500 border-l-2 border-t-2 border-b-2"
            type="text"
            value={searchQuery.streamer}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="group">
          <TitleIcon className="relative top-8 right-3 pointer-events-none group-focus-within:hidden" />
          <label htmlFor="title" className="relative top-8 pointer-events-none group-focus-within:top-0">
            Clip title
          </label>
          <input
            id="title"
            className="text-black block m-auto h-10 bg-gray-500 border-t-2 border-b-2"
            type="text"
            value={searchQuery.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="group">
          <DateRangeIcon className="relative top-8 right-3 pointer-events-none group-focus-within:hidden" />
          <label htmlFor="dateFrom" className="relative top-8 pointer-events-none group-focus-within:top-0">
            From
          </label>
          <input
            type="date"
            id="dateFrom"
            value={searchQuery.startDate}
            onChange={(e) => setSearchQuery((current) => ({...current, startDate: e.target.value}))}
            className="text-transparent group-focus-within:text-white block h-10 bg-gray-500 border-t-2 border-b-2"
          />
        </div>
        <div className="group">
          <DateRangeIcon className="relative top-8 right-3 pointer-events-none group-focus-within:hidden" />
          <label htmlFor="dateTo" className="relative top-8 pointer-events-none group-focus-within:top-0">
            To
          </label>
          <input
            type="date"
            id="dateTo"
            value={searchQuery.endDate}
            onChange={(e) => setSearchQuery((current) => ({...current, startDate: e.target.value}))}
            className="text-transparent group-focus-within:text-white block h-10 bg-gray-500 border-r-2 border-t-2 border-b-2 *"
            max={Date.now()}
          />
        </div>
        <SearchIcon
          color="primary"
          className="relative top-9 left-12 z-10 pointer-events-none group-focus-within:hidden"
        />
        <input
          className="bg-white text-black h-11 rounded-md relative top-6 mx-4 border-2 pl-8 pr-2 border-cyan-400 cursor-pointer"
          type="submit"
          value="Search"
          onClick={(e) => handleSearch(e)}
        />
      </form>
    </>
  );
}
