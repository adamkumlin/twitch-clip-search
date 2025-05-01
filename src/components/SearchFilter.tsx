import type { ResponseDetails } from "../lib/types";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import TitleIcon from "@mui/icons-material/Title";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { clipService } from "../lib/services/clip.service";
import { useSearchQueryStore } from "../lib/store";

interface Props {
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  populateClipsArray: (data: any) => void;
}

export function SearchFilter({
  setResponseDetails,
  populateClipsArray,
}: Props) {

  const searchQuery = useSearchQueryStore(s => s.edit)
  async function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();

    if (searchQuery.broadcasterName === "") {
      alert("Streamer is mandatory");
      return;
    }
    const broadcasterId = await clipService.getBroadcasterId(searchQuery.broadcasterName);

    const rawClips = await clipService.getClips({
      broadcasterId: broadcasterId,
      timespan: searchQuery.timespan
    });

    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
      broadcasterId: broadcasterId,
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
      setSearchQuery((current) => ({ ...current, broadcasterName: e.target.value }));
    }
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
            value={searchQuery.broadcasterName}
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
        <div className="flex flex-row items-end">
          <div className="flex flex-row bg-gray-500 border-t-2 border-b-2 h-10 pr-2 pt-1">
            <DateRangeIcon />
            <label className="pl-2">Date range</label>
          </div>
          <input type="date" className="block h-10 bg-gray-500 border-t-2 border-b-2 outline-none"/>
          <span className="h-10 bg-gray-500 border-t-2 border-b-2 font-bold px-2 pt-1">to</span>
          <input type="date" className="block h-10 bg-gray-500 border-t-2 border-b-2 border-r-2 outline-none"/>
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
