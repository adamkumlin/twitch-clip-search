import { useState } from "react";
import { Clip } from "./components/Clip";
import type { SearchQuery } from "./types";
import { SearchFilter } from "./components/SearchFilter";

function App() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    title: "",
    streamer: "",
  });

  return (
    <div className="flex place-content-center">
      <h1>yo</h1>
      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Clip video="tt" />
    </div>
  );
}

export default App;
