import { useState } from "react";
import type { Clip, SearchQuery } from "../types";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import TitleIcon from "@mui/icons-material/Title";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFilterProps {
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
  setResponseDetails: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchFilter({ setClips, setResponseDetails }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: "",
    streamer: "",
  });

  async function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();

    if (searchQuery.streamer === "" || searchQuery.title === "") {
      alert("Missing input");
      return;
    }

    const data = await getBroadcasterId();
    const rawClips = await getClips(data.data[0].id);
    setResponseDetails(data.pagination.cursor);
    populateClipsArray(rawClips);
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
      setSearchQuery((current) => ({ ...current, title: e.target.value }));
    } else {
      setSearchQuery((current) => ({ ...current, streamer: e.target.value }));
    }
  }

  function getClips(broadcasterId: string) {
    if (broadcasterId === "") {
      return;
    }

    const data = fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=15`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Client-Id": import.meta.env.VITE_CLIENT_ID,
      },
    }).then((res) => res.json());

    return data;
  }

  function getBroadcasterId() {
    let data = fetch(`https://api.twitch.tv/helix/users?login=${searchQuery.streamer}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Client-Id": import.meta.env.VITE_CLIENT_ID,
      },
    }).then((response) => response.json());

    return data;
  }

  function populateClipsArray(data: any) {
    const clips: Clip[] = [];
    for (const clipData of data.data) {
      const clip: Clip = {
        id: clipData.id,
        url: clipData.url,
        embedUrl: clipData.embed_url,
        broadcasterName: clipData.broadcaster_name,
        creatorName: clipData.creator_name,
        title: clipData.title,
        viewCount: clipData.view_count,
        createdAt: clipData.created_at,
      };

      clips.push(clip);
    }
    setClips(clips);
  }

  return (
    <>
      <div className="flex flex-row place-content-center">
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
            className="text-black block m-auto h-10 bg-gray-500 border-r-2 border-t-2 border-b-2"
            type="text"
            value={searchQuery.title}
            onChange={(e) => handleChange(e)}
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
      </div>
      {searchQuery.title !== "" || searchQuery.streamer !== "" ? (
        <input className="bg-slate-400 text-black" type="button" value="Reset" onClick={(e) => resetSearch(e)} />
      ) : null}
    </>
  );
}
