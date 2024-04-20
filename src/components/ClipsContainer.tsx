import { useEffect, useState } from "react";
import type { Clip as ClipT, ResponseDetails, SortMetric, SortOption } from "../types";
import { Clip } from "./Clip";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

interface ClipsContainerProps {
  clips: ClipT[];
  setClips: React.Dispatch<React.SetStateAction<ClipT[]>>;
  responseDetails: ResponseDetails;
  populateClipsArray: (data: any) => void;
  setResponseDetails: React.Dispatch<React.SetStateAction<ResponseDetails>>;
}

export function ClipsContainer({
  clips,
  setClips,
  responseDetails,
  populateClipsArray,
  setResponseDetails,
}: ClipsContainerProps) {
  const [sortOption, setSortOption] = useState<SortOption>({
    metric: "views" as unknown as SortMetric,
    fromTop: true,
  });

  const [focusedThumbnail, setFocusedThumbnail] = useState<string>("");

  function handleSortOption(metric: SortMetric): void {
    if (!sortOption) {
      setSortOption({
        metric: metric,
        fromTop: true,
      });
    } else if (sortOption.metric === metric) {
      setSortOption({
        metric: metric,
        fromTop: !sortOption.fromTop,
      });
    } else {
      setSortOption({
        metric: metric,
        fromTop: true,
      });
    }
  }

  useEffect(() => {
    let sortedClips: ClipT[] = [];
    if (sortOption.metric === ("title" as unknown as SortMetric)) {
      // Sort alphabetically
      sortedClips = clips.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (sortOption.fromTop) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
        }
        return 0;
      });
    } else if (sortOption.metric === ("date" as unknown as SortMetric)) {
      // Sort based on earliest/latest date
      sortedClips = clips.sort((a, b) => {
        const nameA = a.createdAt;
        const nameB = b.createdAt;

        if (sortOption.fromTop) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
        }
        return 0;
      });
    } else if (sortOption.metric === ("views" as unknown as SortMetric)) {
      // Sort based on highest/lowest views
      if (sortOption.fromTop) {
        sortedClips = clips.sort((a, b) => a.viewCount - b.viewCount);
      } else {
        sortedClips = clips.sort((a, b) => b.viewCount - a.viewCount);
      }
    }

    setClips(sortedClips);
  }, [sortOption]);

  return (
    <>
      <div
        className="ClipsContainer w-1/2 m-auto mt-10"
        style={focusedThumbnail !== "" ? { filter: "brightness(0.4)" } : { display: "block" }}>
        <div className="grid grid-cols-3 font-bold">
          <div>
            <a className="cursor-pointer underline" onClick={() => handleSortOption("title" as unknown as SortMetric)}>
              Title{" "}
              {sortOption.fromTop && sortOption.metric === ("title" as unknown as SortMetric) ? (
                <ArrowDownward />
              ) : !sortOption.fromTop && sortOption.metric === ("title" as unknown as SortMetric) ? (
                <ArrowUpward />
              ) : null}
            </a>
          </div>

          <div>
            <a className="cursor-pointer underline" onClick={() => handleSortOption("date" as unknown as SortMetric)}>
              Upload date{" "}
              {sortOption.fromTop && sortOption.metric === ("date" as unknown as SortMetric) ? (
                <ArrowDownward />
              ) : !sortOption.fromTop && sortOption.metric === ("date" as unknown as SortMetric) ? (
                <ArrowUpward />
              ) : null}
            </a>
          </div>
          <div>
            <a className="cursor-pointer underline" onClick={() => handleSortOption("views" as unknown as SortMetric)}>
              Views{" "}
              {sortOption.fromTop && sortOption.metric === ("views" as unknown as SortMetric) ? (
                <ArrowDownward />
              ) : !sortOption.fromTop && sortOption.metric === ("views" as unknown as SortMetric) ? (
                <ArrowUpward />
              ) : null}
            </a>
          </div>
        </div>

        {clips ? (
          clips.map((clip, index) => {
            return <Clip key={index} clip={clip} setFocusedThumbnail={setFocusedThumbnail} />;
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
        />
      </div>
      {focusedThumbnail !== "" ? (
        <img
          className="fixed z-20 border-white border-2 top-48 w-1/2 pointer-events-none right-[29.5rem] rounded-lg"
          src={focusedThumbnail}
        />
      ) : null}
    </>
  );
}
