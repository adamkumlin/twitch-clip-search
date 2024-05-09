import { useEffect, useState } from "react";
import type { Clip, ResponseDetails, SearchQuery } from "./types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";
import { DatePicker } from "./components/DatePicker";
import { oneMonthPriorToToday, today } from "./constants";

function App() {
  const [clips, setClips] = useState<Clip[]>([]);

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: "",
    streamer: "",
    startDate: oneMonthPriorToToday.toISOString(),
    endDate: today.toISOString(),
  });
  const [responseDetails, setResponseDetails] = useState<ResponseDetails>({
    pagination: "",
    broadcasterId: "",
  });

  const [editDateStatus, setEditDateStatus] = useState<"start" | "end" | null>(null);

  function populateClipsArray(data: any): void {
    const clips: Clip[] = [];

    if (data.data) {
      for (const clipData of data.data) {
        const clip: Clip = {
          id: clipData.id,
          url: clipData.url,
          embedUrl: clipData.embed_url,
          broadcasterName: clipData.broadcaster_name,
          creatorName: clipData.creator_name,
          thumbnailUrl: clipData.thumbnail_url,
          title: clipData.title,
          viewCount: clipData.view_count,
          createdAt: clipData.created_at,
        };
        clips.push(clip);
      }
    } else {
      for (const clipData of data) {
        const clip: Clip = {
          id: clipData.id,
          url: clipData.url,
          embedUrl: clipData.embed_url,
          broadcasterName: clipData.broadcaster_name,
          creatorName: clipData.creator_name,
          thumbnailUrl: clipData.thumbnail_url,
          title: clipData.title,
          viewCount: clipData.view_count,
          createdAt: clipData.created_at,
        };
        clips.push(clip);
      }
    }

    setClips(clips);
  }

  const [users, setUsers] = useState();

  console.log(users)
  useEffect(() => {
    fetch("https://localhost:3000/getUsers")
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="App text-center text-white p-4 overflow-x-hidden min-h-full">
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setResponseDetails={setResponseDetails}
        populateClipsArray={populateClipsArray}
        setEditDateStatus={setEditDateStatus}
      />

      {clips.length > 0 ? (
        <ClipsContainer
          searchQuery={searchQuery}
          setClips={setClips}
          clips={clips}
          responseDetails={responseDetails}
          populateClipsArray={populateClipsArray}
          setResponseDetails={setResponseDetails}
        />
      ) : null}
    
    {editDateStatus ? <DatePicker setEditDateStatus={setEditDateStatus} editDateStatus={editDateStatus} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> : null}
    </div>

  );
}

export default App;
