import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ResponseDetails } from "../types";

interface NextButtonProps {
  responseDetails: ResponseDetails;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  populateClipsArray: (data: any) => void;
  goToNextPage: () => any;
}

export function NextButton({ responseDetails, populateClipsArray, setResponseDetails, goToNextPage }: NextButtonProps) {

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
