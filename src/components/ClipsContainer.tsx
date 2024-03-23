import type { Clip as ClipT } from "../types";
import { Clip } from "./Clip";

interface ClipsContainerProps {
  clips: ClipT[];
}

export function ClipsContainer({ clips }: ClipsContainerProps) {

  const clipElements = clips.map((clip, index) => {
    <p key={index}>{clip.broadcasterName}</p>;
  });

  return (
    <>
      {clipElements}
    </>
  );
}
