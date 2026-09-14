import DerivedConjugationsBG from "../../assets/templates/word_of_day/derived_conjugations.png";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";
import PillListCard from "../../components/canvas/PillListCard";

type PgData = Pick<WordOfDayData, "conjugations">;

// Bu etiketler her fiil çekimi kartında hep aynı sırada, hep aynı metinle
// tekrar ediyor — bu yüzden dışarıdan (n8n) beklemek yerine burada sabitliyoruz.
const CONJUGATION_LABELS = [
  "مصدر (اسم)",
  "صفة",
  "الفعل المضارع الواسع",
  "الفعل المضارع المستمر",
  "الفعل المستقبل",
  "الفعل الماضي", 
] as const;

export default function WordOfDayConjugations({ data }: TemplateProps<PgData>) {
  const { conjugations } = data;

  const items = conjugations.map((item, i) => ({
    term: item.term,
    meaning: item.meaning,
    label: CONJUGATION_LABELS[i],
  }));

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
        items={items}
        rowGap={20}
        maxBodyHeight={740}
        termColor="rose"
      />
    </div>
  );
}