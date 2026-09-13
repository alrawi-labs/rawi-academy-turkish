import page3Bg from "../../assets/templates/word_of_day/pg_3.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type Pg3Data = Pick<
  WordOfDayData,
  "word" | "usageTr" | "usageAr" | "usageNumber"
>;

export default function WordOfDayPg3({ data }: TemplateProps<Pg3Data>) {
  const { word, usageTr, usageAr, usageNumber = 1 } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${page3Bg})` }}
    >
      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}

      <WordText
        maxSize={80}
        maxWidth={460}
        padding={24}
        align="center"
        top="130px"
        left="370px"
        fit="shrink"
        centerY
      >
        {word}
      </WordText>

      <NoteCard
        width={776}
        maxBodyHeight={500}
        number={usageNumber}
        topText={usageTr}
        topSize={60}
        topTextColor="rose"
        bottomText={usageAr}
        bottomSize={60}
        top="520px"
        left="260px"
        
      />
    </div>
  );
}
