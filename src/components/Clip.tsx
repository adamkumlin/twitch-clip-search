import { useState } from "react";
import type { Clip } from "../types";

interface ClipProps {
  clip: Clip;
}

export function Clip({ clip }: ClipProps) {
  const [showEmbed, setShowEmbed] = useState<boolean>(false);

  const style = {
    hidden: {
      display: "none",
    },
    shown: {
      display: "block",
    },
  };

  return (
    <div className="flex flex-col flex-[40%] justify-center">
      <div className="flex flex-row justify-between">
      <h2 className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-96">{clip.title}</h2>
      <a className="text-blue-600" href={clip.url}>
        Clip page
      </a>
      </div>
      <iframe
      className="mx-0"
        style={showEmbed ? style.shown : style.hidden}
        src={clip.embedUrl + "&parent=localhost"}
        height="360"
        width="640"></iframe>
      <button
        className="bg-white text-black h-11 w-36 rounded-md justify-self-center border-2 border-cyan-400 cursor-pointer"
        onClick={() => setShowEmbed(!showEmbed)}>
        Toggle embed
      </button>
    </div>
  );
}
