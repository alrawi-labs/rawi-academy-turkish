import DerivedConjugationsBG from "../../assets/templates/word_of_day/derived_conjugations.png";
import WordListCard from "../../components/canvas/WordListCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "derivedWords">;

export default function WordOfDayDerivedWords({
  data,
}: TemplateProps<PgData>) {
  const { derivedWords } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${DerivedConjugationsBG})` }}
    >

      <WordText
            maxSize={180}
            maxWidth={860}
            padding={24}
            align="center"
            top="330px"
            left="115px"
            fit="shrink"
            centerY
          >
            كلمات مشتقـة منهــا
          </WordText>

      <WordListCard
        width={950}
        items={derivedWords}
        top="470px"
        left="65px"
      />
    </div>
  );
}