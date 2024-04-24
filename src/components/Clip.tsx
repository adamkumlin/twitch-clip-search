import { SetStateAction } from "react";
import type { Clip } from "../types";

interface ClipProps {
  clip: Clip;
  setFocusedThumbnail: React.Dispatch<SetStateAction<string>>;
}

export function Clip({ clip, setFocusedThumbnail }: ClipProps) {
  return (
    <div className="grid grid-cols-3 odd:bg-blue-950 even:bg-blue-800 *:p-4">
      <div className="flex flex-row justify-between items-center">
        <a
          href={clip.url}
          target="_blank"
          className="underline max-w-1/2 overflow-hidden text-nowrap overflow-ellipsis">
          {clip.title}
        </a>
        <img
          className="w-10 h-8 object-cover rounded-md"
          src={clip.thumbnailUrl}
          alt={"Thumbnail of a twitch clip depicting" + clip.title}
          onMouseEnter={() => setFocusedThumbnail(clip.thumbnailUrl)}
          onMouseLeave={() => setFocusedThumbnail("")}
        />
      </div>
      <span className="border-r-2 border-l-2 border-dashed border-gray-500">
        {clip.createdAt.toLocaleString("en-US").slice(0, 10)}
      </span>
      <span>{clip.viewCount.toLocaleString("en-US")}</span>
    </div>
  );
}
