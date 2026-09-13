import page5Bg from "../../assets/templates/word_of_day/pg_5.png";
import ConjugationSection from "../../components/canvas/PillListCardSection";
import NoteCard from "../../components/canvas/NoteCard";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";
import PillListCard from "../../components/canvas/PillListCard";

type Pg5Data = Pick<WordOfDayData, "conjugations">;

export default function WordOfDayPg5({ data }: TemplateProps<Pg5Data>) {
  const { conjugations } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${page5Bg})` }}
    >
      <PillListCard
        width={776}
        top={200}
        left={95}
        title="التصريفات الفعلية"
        items={conjugations}
        rowGap={10}
        maxBodyHeight={740}
      />
    </div>
  );
}
