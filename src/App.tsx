import { useState } from "react";
import { Clip } from "./components/Clip";
import type { Clip as ClipT, SearchQuery } from "./types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";

function App() {

  const [clips, setClips] = useState<ClipT[]>([]);
  return (
    <div className="App text-center text-white p-4 overflow-x-hidden min-h-full">
      <h1 className="font-mono text-5xl mb-16">Search clips</h1>
      <SearchFilter setClips={setClips}/>
      <ClipsContainer clips={clips} />
    </div>
  );
}

export default App;
