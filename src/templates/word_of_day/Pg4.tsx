import page4Bg from "../../assets/templates/word_of_day/pg_4.png";
import WordListCard from "../../components/canvas/WordListCard";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type Pg4Data = Pick<WordOfDayData, "derivedWords">;

export default function WordOfDayPg4({
  data,
}: TemplateProps<Pg4Data>) {
  const { derivedWords } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${page4Bg})` }}
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