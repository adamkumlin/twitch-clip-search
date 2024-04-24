import { useState } from "react";
import type { Clip, ResponseDetails, SearchQuery } from "./types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";
import { DatePicker } from "./components/DatePicker";

function App() {
  const [clips, setClips] = useState<Clip[]>([]);
  const date = new Date();
  let oneMonthPriorToToday = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  oneMonthPriorToToday.setDate(today.getDate() - 30);
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

  return (
    <div className="App text-center text-white p-4 overflow-x-hidden min-h-full">
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setResponseDetails={setResponseDetails}
        populateClipsArray={populateClipsArray}
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
    <DatePicker searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>

  );
}

export default App;
