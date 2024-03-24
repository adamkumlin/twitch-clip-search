import { useState } from "react";
import type { Clip } from "./types";
import { SearchFilter } from "./components/SearchFilter";
import { ClipsContainer } from "./components/ClipsContainer";

function App() {

  const [clips, setClips] = useState<Clip[]>([]);
  const [responseDetails, setResponseDetails] = useState<string>("");

  return (
    <div className="App text-center text-white p-4 overflow-x-hidden min-h-full">
      <SearchFilter setClips={setClips} setResponseDetails={setResponseDetails} />
      <ClipsContainer clips={clips} />
    </div>
  );
}

export default App;
