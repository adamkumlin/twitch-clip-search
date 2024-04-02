import type { Clip } from "../types";

interface ClipProps {
  clip: Clip;
}

export function Clip({ clip }: ClipProps) {

  return (
    <div className="flex flex-row bg-blue-950 justify-between border-2 border-black">
      <h2 className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-96">{clip.title}</h2>
      <span>{clip.createdAt.toLocaleString()}</span>
        <a className="text-blue-600" href={clip.url}>
          Clip page
        </a>
    </div>
  );
}
