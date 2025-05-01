import { useState } from "react";
import { Clip, ResponseDetails } from "./lib/types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";

function App() {
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
        setResponseDetails={setResponseDetails}
        populateClipsArray={populateClipsArray}
      />

      <ClipsContainer
        responseDetails={responseDetails}
        populateClipsArray={populateClipsArray}
        setResponseDetails={setResponseDetails}
      />
    </div>
  );
}

export default App;
