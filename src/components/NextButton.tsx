import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ResponseDetails, SearchQuery } from "../types";

interface NextButtonProps {
  responseDetails: ResponseDetails;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  populateClipsArray: (data: any) => void;
  searchQuery: SearchQuery;
}

export function NextButton({ populateClipsArray, setResponseDetails, responseDetails, searchQuery }: NextButtonProps) {
  async function handleNextButtonClick() {
    const rawClips = await goToNextPage(searchQuery);
    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
    }));

    populateClipsArray(rawClips);
  }

  function goToNextPage(searchQuery: SearchQuery) {
    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${responseDetails.broadcasterId}&first=15&after=${responseDetails.pagination}&started_at=${searchQuery.startDate}&ended_at=${searchQuery.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Client-Id": import.meta.env.VITE_CLIENT_ID,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return data;
  }

  return (
    <button type="button" onClick={() => handleNextButtonClick()}>
      <NavigateNextIcon />
    </button>
  );
}
