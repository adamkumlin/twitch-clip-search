import type { Clip as ClipT, ResponseDetails } from "../types";
import { Clip } from "./Clip";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";

interface ClipsContainerProps {
  clips: ClipT[];
  responseDetails: ResponseDetails;
  populateClipsArray: (data: any) => void;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
  goToNextPage: () => any;
}

export function ClipsContainer({ clips, responseDetails, populateClipsArray, setResponseDetails, goToNextPage }: ClipsContainerProps) {

  return (
    <div className="ClipsContainer">
      {clips ? (
        clips.map((clip, index) => {
          return <Clip key={index} clip={clip} />;
        })
      ) : (
        <h2>No results</h2>
      )}

      <PreviousButton
        responseDetails={responseDetails}
        populateClipsArray={populateClipsArray}
        setResponseDetails={setResponseDetails}
      />
      <NextButton
        responseDetails={responseDetails}
        populateClipsArray={populateClipsArray}
        setResponseDetails={setResponseDetails}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
