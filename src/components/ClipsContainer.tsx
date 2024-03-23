import type { Clip as ClipT } from "../types";
import { Clip } from "./Clip";

interface ClipsContainerProps {
  clips: ClipT[];
}

export function ClipsContainer({ clips }: ClipsContainerProps) {
  return (
    <div className="ClipsContainer">
      {clips ? (
        clips.map((clip, index) => {
          return <Clip key={index} clip={clip} />;
        })
      ) : (
        <h2>No results</h2>
      )}
    </div>
  );
}
