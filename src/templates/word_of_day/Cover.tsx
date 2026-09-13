// src/templates/word_of_day/Cover.tsx
import coverBg from "../../assets/templates/word_of_day/cover.png";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type CoverData = Pick<WordOfDayData, "word" | "level">;

export default function WordOfDayCover({
  data,
}: TemplateProps<CoverData>) {
  const { word, level } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${coverBg})` }}
    >
      <WordText
        maxSize={51}
        maxWidth={95}
        align="right"
        top="537px"
        left="135px"
        fit="shrink"
        centerY
        color="white"
      >
        {level}
      </WordText>

      <WordText
        maxSize={140}
        maxWidth={590}
        padding={24}
        align="center"
        top="860px"
        left="48px"
        fit="shrink"
        centerY
      >
        {word}
      </WordText>
    </div>
  );
}