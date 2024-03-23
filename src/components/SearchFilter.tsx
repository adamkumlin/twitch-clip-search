import { useState } from "react";
import type { Clip, SearchQuery } from "../types";
import {Clip as ClipC} from "../classes/Clip";

interface SearchFilterProps {
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
}

export function SearchFilter({ setClips }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: "",
    streamer: "",
  });

  async function handleSearch(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    const data = await getBroadcasterId();
    const rawClips = await getClips(data.data[0].id);
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

    const data = fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=5`, {
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
      let clip: Clip = new ClipC(clipData.id, clipData.url, clipData.embed_url, clipData.broadcaster_name, clipData.creator_name, clipData.title, clipData.view_count, clipData.created_at);
      clips.push(clip);
    }
    setClips(clips);
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
