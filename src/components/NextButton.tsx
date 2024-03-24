import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ResponseDetails } from "../types";

interface NextButtonProps {
  responseDetails: ResponseDetails;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  populateClipsArray: (data: any) => void;
}

export function NextButton({ responseDetails, populateClipsArray, setResponseDetails }: NextButtonProps) {
  function goToNextPage() {
    const data = fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${responseDetails.broadcasterId}&first=15&after=${responseDetails.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Client-Id": import.meta.env.VITE_CLIENT_ID,
        },
      }
    ).then((res) => res.json());

    return data;
  }

  async function handleNextButtonClick() {
    const rawClips = await goToNextPage();
    setResponseDetails((current) => ({
      ...current,
      pagination: rawClips.pagination.cursor,
    }));
    populateClipsArray(rawClips);
  }

  return (
    <button type="button" onClick={() => handleNextButtonClick()}>
      <NavigateNextIcon />
    </button>
  );
}
