import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import type { ResponseDetails } from "../types";

interface PreviousButtonProps {
  responseDetails: ResponseDetails;
  populateClipsArray: (data: any) => void;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
}

export function PreviousButton({ responseDetails, populateClipsArray, setResponseDetails }: PreviousButtonProps) {
  function goToPreviousPage() {
    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${responseDetails.broadcasterId}&first=15&before=${responseDetails.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Client-Id": import.meta.env.VITE_CLIENT_ID,
        },
      }
    ).then((res) => res.json());

    return data;
  }

  async function handlePreviousButtonClick() {
    const rawClips = await goToPreviousPage();
    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
    }));
    console.log(rawClips)
    populateClipsArray(rawClips);
  }

  return (
    <button type="button" onClick={() => handlePreviousButtonClick()}>
      <NavigateBeforeIcon />
    </button>
  );
}