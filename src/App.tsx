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
    setClips(clips);
  }

  function goToNextPage() {
    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${responseDetails.broadcasterId}&first=15&after=${responseDetails.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Client-Id": import.meta.env.VITE_CLIENT_ID,
        },
      }
    ).then((res) => res.json());

    return data;
  }

  return (
    <div className="App text-center text-white p-4 overflow-x-hidden min-h-full">
      <SearchFilter
        setResponseDetails={setResponseDetails}
        populateClipsArray={populateClipsArray}
        goToNextPage={goToNextPage}
      />
      <ClipsContainer goToNextPage={goToNextPage} clips={clips} responseDetails={responseDetails} populateClipsArray={populateClipsArray} setResponseDetails={setResponseDetails} />
    </div>
  );
}

export default App;
