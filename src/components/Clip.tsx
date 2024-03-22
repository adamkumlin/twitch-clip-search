import type { Clip } from "../types";

interface ClipProps {
  clip: Clip;
}

export function Clip({ clip }: ClipProps) {

  return (
    <div>
      <h2>{clip.title}</h2>
      <iframe
        src={clip.embedUrl}
        height="360"
        width="640"></iframe>
    </div>
  );
}
