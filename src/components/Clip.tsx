import type { Clip } from "../types";

interface ClipProps {
  clip: Clip;
}

export function Clip({ clip }: ClipProps) {

  return (
    <div className="grid grid-cols-3 odd:bg-blue-950 even:bg-blue-800 *:p-4">
      <a href={clip.url} target="_blank" className="text-left underline">{clip.title}</a>
      <span className="border-r-2 border-l-2 border-dashed border-gray-500">{clip.createdAt.toLocaleString("en-US").slice(0, 10)}</span>
      <span>{clip.viewCount.toLocaleString("en-US")}</span>
    </div>
  );
}
