import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import type { ResponseDetails, SearchQuery } from "../types";

interface PreviousButtonProps {
  responseDetails: ResponseDetails;
  populateClipsArray: (data: any, isFiltered: boolean) => void;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  searchQuery: SearchQuery;
}

export function PreviousButton({ responseDetails, populateClipsArray, setResponseDetails, searchQuery }: PreviousButtonProps) {
  function goToPreviousPage() {
    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${responseDetails.broadcasterId}&first=15&before=${responseDetails.pagination}&started_at=${searchQuery.startDate}&ended_at=${searchQuery.endDate}`,
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
    console.log(responseDetails.pagination)
    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
    }));
    populateClipsArray(rawClips, false);
  }

  return (
    <button type="button" onClick={() => handlePreviousButtonClick()}>
      <NavigateBeforeIcon />
    </button>
  );
}
