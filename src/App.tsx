import { useState } from "react";
import type { Clip, ResponseDetails } from "./types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";

function App() {
  const [clips, setClips] = useState<Clip[]>([]);
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
      <SearchFilter setResponseDetails={setResponseDetails} populateClipsArray={populateClipsArray} />
      <ClipsContainer
        clips={clips}
        responseDetails={responseDetails}
        populateClipsArray={populateClipsArray}
        setResponseDetails={setResponseDetails}
      />
    </div>
  );
}

export default App;
