import { useState } from "react";
import type { Clip, SearchQuery } from "../types";

interface SearchFilterProps {
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
}

export function SearchFilter({ setClips }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: "",
    streamer: "",
  });

  function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    getBroadcasterId();
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

  function getClips() {
    fetch("https://api.twitch.tv/helix/clips?broadcaster_id=22484632&first=5")
      .then((res) => res.json())
      .then((data) => setClips(data));
  }

  function getBroadcasterId() {
    fetch(`https://api.twitch.tv/helix/users?login=${searchQuery.streamer}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Client-Id": import.meta.env.VITE_CLIENT_ID,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex flex-row place-content-center">
        <label className="mr-2">
          Clip title
          <input
            id="title"
            placeholder="Minecraft"
            className="text-black block"
            type="text"
            value={searchQuery.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label className="ml-2">
          Streamer
          <input
            id="streamer"
            placeholder="Forsen"
            className="text-black block"
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
