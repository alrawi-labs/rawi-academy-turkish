import { useMemo, useState } from "react";
// NOT: Bu arka planı kendi dosya adınla değiştir (sağ üst çizgi, bayrak, alt mor üçgen, logo bu görselin içinde varsayıldı)
import DetailBG from "../../assets/templates/five_word/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { FiveWordData } from "./types";

// index: bu sayfada hangi kelime gösterilecek (0-4)
type DetailData = Pick<FiveWordData, "where" | "words"> & { index: number };

/* ---------- Layout sabitleri (tek yerden yönet) ---------- */
const WORD_SIZE = 110; // "Bardak" font boyutu
const MEANING_SIZE = 100; // "كوب" font boyutu
const WORD_LEFT = 91; // numara + kelime bloğunun sol başlangıcı
const WORD_TOP = 287; // numara + kelime bloğunun top konumu
const BADGE_W = 95;
const BADGE_H = 105;
const BADGE_GAP = 10;

const EX_START_TOP = 570; // 1. örneğin (Türkçe) top konumu
const EX_PAIR_GAP = 239; // örnek çiftleri arası dikey mesafe
const EX_AR_OFFSET = 104; // Arapça satırın Türkçe satıra göre kayması
const EX_TR_SIZE = 64;
const EX_AR_SIZE = 60;

export default function FiveWordDetail({ data }: TemplateProps<DetailData>) {
  const { where, words, index } = data;
  const item = words[index];
  const examples = item?.examples ?? [];

  // Türkçe örneklerin hepsi aynı font boyutunda, Arapçalar da kendi içinde aynı
  const trSizes = useRefSizes(examples.length);
  const arSizes = useRefSizes(examples.length);

  const trShared = useSharedSize(trSizes, examples.length, EX_TR_SIZE);
  const arShared = useSharedSize(arSizes, examples.length, EX_AR_SIZE);

  if (!item) return null;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${DetailBG})` }}
    >

         <Sentence
                size={65}
                maxWidth={650}
                align="center"
                maxLines={1}
                dir="rtl"
                color="white"
                top={120}
                right={45}
                backgroundColor={colors.word.pink}
                offsetTop={5}
                paddingBottom={5}
                paddingX={1}
              >
                {where}
              </Sentence>
      {/* ---------- Ana kelime + Arapça karşılığı ---------- */}
      <div
        style={{
          position: "absolute",
          top: WORD_TOP,
          left: WORD_LEFT,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Arapça anlam kelimenin sağ kenarına hizalı
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            direction: "ltr", // "1 Bardak" her zaman soldan sağa
            alignItems: "center",
          }}
        >
          <Label
            fontSize={WORD_SIZE}
            textColor="black"
            variant="badge"
            width={BADGE_W}
            height={BADGE_H}
          >
            {`${index + 1}`}
          </Label>

          <div style={{ width: BADGE_GAP }} />

          <Sentence
            size={WORD_SIZE}
            maxWidth={800}
            align="left"
            maxLines={1}
            dir="ltr"
            color="black"
            backgroundColor={colors.word.pink}
            strokeWidth={1}
            offsetBottom={27}
            offsetTop={45}
          >
            {item.word}
          </Sentence>
        </div>

        {/* Arapça anlam: şeffaf, vurgusuz */}
        <Sentence
          size={MEANING_SIZE}
          maxWidth={600}
          align="right"
          maxLines={1}
          dir="rtl"
          color="black"
          backgroundColor="transparent"
          strokeWidth={1}
        >
          {item.wordAr}
        </Sentence>
      </div>

      {/* ---------- Örnek cümleler ---------- */}
      {examples.map((ex, i) => {
        const trTop = EX_START_TOP + i * EX_PAIR_GAP;
        return (
          <div key={i}>
            {/* Türkçe: sol kenara yapışık, beyaz yazı + pembe zemin */}
            <Sentence
              size={EX_TR_SIZE}
              maxWidth={820}
              align="left"
              maxLines={1}
              dir="ltr"
              color="white"
              backgroundColor={colors.word.pink}
              paddingX={8}
              paddingTop={10}
              paddingBottom={15}
              onNaturalSize={trSizes.report(i)}
              sizeOverride={trShared}
              left={0}
              top={trTop}
            >
              {ex.exampleTr}
            </Sentence>

            {/* Arapça: sağ kenara yapışık, beyaz yazı + pembe zemin */}
            <Sentence
              size={EX_AR_SIZE}
              maxWidth={820}
              align="right"
              maxLines={1}
              dir="rtl"
              color="white"
              backgroundColor={colors.word.pink}
              paddingTop={10}
              paddingBottom={15}
              paddingX={8}
              onNaturalSize={arSizes.report(i)}
              sizeOverride={arShared}
              top={trTop + EX_AR_OFFSET}
              right={0}
            >
              {ex.exampleAr}
            </Sentence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Yardımcılar ---------- */

// Birden fazla Sentence'ın doğal boyutlarını toplar (FiveWordWords ile aynı mantık)
function useRefSizes(count: number) {
  const [sizes, setSizes] = useState<(number | null)[]>(() =>
    Array(count).fill(null),
  );

  return Object.assign(sizes, {
    report: (index: number) => (size: number) => {
      setSizes((prev) => {
        if (prev[index] === size) return prev;
        const next = [...prev];
        next[index] = size;
        return next;
      });
    },
  }) as (number | null)[] & {
    report: (index: number) => (size: number) => void;
  };
}

// Hepsi rapor verince en küçük boyutu döndürür; o zamana kadar varsayılan
function useSharedSize(
  sizes: (number | null)[],
  count: number,
  fallback: number,
) {
  return useMemo(() => {
    const collected = sizes.filter((s): s is number => s !== null);
    if (count === 0 || collected.length < count) return fallback;
    return Math.min(...collected);
  }, [sizes, count, fallback]);
}
