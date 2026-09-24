import { useMemo, useState } from "react";
import CoverBG from "../../assets/templates/popular_proverbs/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { PopularProverbsData } from "./types";

type PgData = Pick<PopularProverbsData, "exampleTr" | "exampleAr">;

const SENTENCE_SIZE = 80; // her iki Sentence'ın ortak "size" prop'u — tek yerden yönet

export default function PopularProverbsExample({
  data,
}: TemplateProps<PgData>) {
  const { exampleTr, exampleAr } = data;

  // Her Sentence kendi doğal (kısıtlanmamış) boyutunu buraya bildirir
  const [naturalTr, setNaturalTr] = useState<number | null>(null);
  const [naturalAr, setNaturalAr] = useState<number | null>(null);

  // İkisi de rapor verdiğinde minimumu al; henüz biri rapor vermediyse
  // her ikisinin de "size" prop'unun minimumunu güvenli varsayılan olarak kullan
  const sharedSize = useMemo(() => {
    if (naturalTr === null || naturalAr === null) return SENTENCE_SIZE;
    return Math.min(naturalTr, naturalAr);
  }, [naturalTr, naturalAr]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      {/* 1. Başlık (sabit metin) */}
      <WordText
        size={120}
        Width={600}
        maxWidth={600}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        top={250}
        centerX
      >
        مثــــال من الحياة اليومية
      </WordText>

      <Sentence
        size={SENTENCE_SIZE}
        Width={1000}
        align="left"
        maxLines={3}
        dir="ltr"
        color="white"
        backgroundColor="#ff2daa"
        paddingX={24}
        paddingY={12}
        lineGap={20}
        offsetTop={5}
        offsetBottom={5}
        top={740}
        left={520}
        centerX
        onNaturalSize={setNaturalTr}
        sizeOverride={sharedSize}
      >
        {exampleTr}
      </Sentence>

      <Sentence
        size={SENTENCE_SIZE}
        Width={1000}
        align="right"
        maxLines={3}
        dir="rtl"
        color="white"
        backgroundColor="#ff2daa"
        paddingX={24}
        paddingY={12}
        lineGap={20}
        offsetTop={5}
        offsetBottom={5}
        top={970}
        right={20}
        centerX
        onNaturalSize={setNaturalAr}
        sizeOverride={sharedSize}
      >
        {exampleAr}
      </Sentence>
    </div>
  );
}