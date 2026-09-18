import readingBg from "../../assets/templates/reading_comprehension/posts_bg.png";
import PillListCard from "../../components/canvas/PillListCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { ReadingComprehensionData } from "./types";

type PgData = Pick<ReadingComprehensionData, "passage">;

export default function ReadingComprehensionPassage({
  data,
}: TemplateProps<PgData>) {
  const { passage } = data;
    const top = passage.length > 400 ? 200 : 300
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${readingBg})` }}
    >
      <PillListCard
        width={870}
        top={top}          // canvas içinde kalacak makul bir değer
        left={35}
        title="اقرأ القطعة"
        titleSize={80}
        titleColor="black"
        maxBodyHeight={700} // canvas yüksekliğinize göre ayarlayın (1350 - top - header vb.)
        bodyPaddingY={20}
      >
        <WordText
          size={50}
          maxWidth={790}
          align="left"     // Türkçe metin için sol hizalı
          fit="wrap"
          maxHeight={640}
          dir="ltr"         // Türkçe (LTR) — rtl değil
          color="black"     // pink yerine kontrast için black önerilir
          strokeWidth={0}
        >
          {passage}
        </WordText>
      </PillListCard>
    </div>
  );
}