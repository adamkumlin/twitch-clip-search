import type { Clip as ClipT } from "../types";
import { Clip } from "./Clip";

interface ClipsContainerProps {
  clips: ClipT[];
}

export function ClipsContainer({ clips }: ClipsContainerProps) {
  return (
    <>
    {clips.map((clip, index) => {
      <Clip key={index} clip={clip}/>
    })}
    </>
  );
}
