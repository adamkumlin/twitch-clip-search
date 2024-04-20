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

      if (sortOption.fromTop) {
        sortedClips = clips.sort((a, b) => a.viewCount - b.viewCount);
      } else {
        sortedClips = clips.sort((a, b) => b.viewCount - a.viewCount);
      }
    }

    setClips(sortedClips);
  }, [sortOption]);

  return (
    <div className="ClipsContainer w-1/2 m-auto mt-10">
      <div className="grid grid-cols-3 font-bold *:underline *:cursor-pointer">
        <a onClick={() => handleSortOption("title" as unknown as SortMetric)}>
          Title{" "}
          {sortOption.fromTop && sortOption.metric === ("title" as unknown as SortMetric) ? (
            <ArrowUpward />
          ) : !sortOption.fromTop && sortOption.metric === ("title" as unknown as SortMetric) ? (
            <ArrowDownward />
          ) : null}
        </a>
        <a onClick={() => handleSortOption("date" as unknown as SortMetric)}>
          Upload date{" "}
          {sortOption.fromTop && sortOption.metric === ("date" as unknown as SortMetric) ? (
            <ArrowUpward />
          ) : !sortOption.fromTop && sortOption.metric === ("date" as unknown as SortMetric) ? (
            <ArrowDownward />
          ) : null}
        </a>
        <a onClick={() => handleSortOption("views" as unknown as SortMetric)}>
          Views{" "}
          {sortOption.fromTop && sortOption.metric === ("views" as unknown as SortMetric) ? (
            <ArrowUpward />
          ) : !sortOption.fromTop && sortOption.metric === ("views" as unknown as SortMetric) ? (
            <ArrowDownward />
          ) : null}
        </a>
      </div>

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
      />
    </div>
  );
}
