import DerivedConjugationsBG from "../../assets/templates/word_of_day/derived_conjugations.png";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";
import PillListCard from "../../components/canvas/PillListCard";

type PgData = Pick<WordOfDayData, "conjugations">;

export default function WordOfDayConjugations({ data }: TemplateProps<PgData>) {
  const { conjugations } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${DerivedConjugationsBG})` }}
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
