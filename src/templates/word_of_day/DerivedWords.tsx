import DerivedConjugationsBG from "../../assets/templates/word_of_day/derived_conjugations.png";
import WordListCard from "../../components/canvas/WordListCard";
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
      <WordListCard
        width={776}
        items={derivedWords}
        top="480px"
        left="150px"
      />
    </div>
  );
}