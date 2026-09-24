import { useMemo, useState } from "react";
// NOT: "اختبار سريع" yazısı, logo, çizgiler ve alt mor üçgen bu arka plan görselinin içinde.
// Dosya adını kendi arka plan dosyanla değiştir.
import CoverBG from "../../assets/templates/quick_test/background.png";
import Sentence from "../../components/canvas/Sentence";
import Label from "../../components/canvas/Label";
import { colors, fonts } from '../../design/tokens';
import type { TemplateProps } from "../registry";
import type { QuickTestData } from "./types";
import WordText from "../../components/canvas/WordText";

// اكثر شي ثلاث خيارات ممكن ياخذ

/* ---------- Layout sabitleri (görsel px × 0.651 ile 1080 genişliğe çevrildi) ---------- */

// Soru: sağa yaslı, her satırın kendi pembe kutusu
const Q_SIZE = 90;
const Q_PADDING_X = 20;
const Q_PADDING_Y = 9; // kutu yüksekliği ≈ 90 + 2×9 = 108
const Q_LINE_GAP = 40; // satır adımı 130 → görünen kutular arası boşluk ≈ 22
const Q_TOP = 479;
const Q_RIGHT = 40 + Q_PADDING_X; // kutunun sağ kenarı tuvalin 40px içinde
const Q_MAX_WIDTH = 760;

// Şıklar: sol rozet (A/B/C) + uzun pembe kutulu kelime
const OPT_SIZE = 100;
const OPT_PADDING_X = 12;
const OPT_PADDING_Y = 15; // kutu yüksekliği ≈ 100 + 2×15 = 130
const OPT_LEFT = 92;
const OPT_START_TOP = 863; // 1. satırın top konumu
const OPT_GAP = 152; // satırlar arası dikey mesafe
const BADGE_W = 74;
const BADGE_H = 82;
const BADGE_FONT = 90;
const BADGE_GAP = 6; // rozet ile pembe kutu arası görünen boşluk

const LETTERS = ["A", "B", "C", "D"];

type CoverData = Pick<QuickTestData, "question" | "options">;

export default function QuickTestCover({ data }: TemplateProps<CoverData>) {
  const { question, options } = data;

  // Tüm şıklar aynı font boyutunda olsun (en uzun kelimeye göre küçülür)
  const naturalSizes = useRefSizes(options.length);
  const sharedSize = useMemo(() => {
    const collected = naturalSizes.filter((s): s is number => s !== null);
    if (options.length === 0 || collected.length < options.length)
      return OPT_SIZE;
    return Math.min(...collected);
  }, [naturalSizes, options.length]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <WordText top={150} right={50} size={130}>
        اختبــــار
      </WordText>
      <WordText top={240} right={230} size={130}>
        سريـــــع
      </WordText>

      {/* ---------- Soru: 3 satır, beyaz yazı + pembe kutu ---------- */}
      <Sentence
        size={Q_SIZE}
        maxWidth={Q_MAX_WIDTH}
        align="right"
        maxLines={3}
        lineGap={Q_LINE_GAP}
        dir="rtl"
        color="white"
        top={Q_TOP}
        right={Q_RIGHT}
        backgroundColor={colors.word.pink}
        paddingX={Q_PADDING_X}
        paddingY={Q_PADDING_Y}
        strokeWidth={1}
      >
        {question}
      </Sentence>

      {/* ---------- Şıklar: A/B/C rozeti + Türkçe kelime ---------- */}
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: OPT_START_TOP + i * OPT_GAP,
            left: OPT_LEFT,
            display: "flex",
            flexDirection: "row",
            direction: "ltr", // rozet solda, kelime sağında
            alignItems: "center",
          }}
        >
          <Label
            fontSize={BADGE_FONT}
            textColor="black"
            variant="badge"
            width={BADGE_W}
            height={BADGE_H}
          >
            {LETTERS[i] ?? `${i + 1}`}
          </Label>

          {/* pembe kutu paddingX kadar dışarı taştığı için boşluğa onu da ekliyoruz */}
          <div style={{ width: BADGE_GAP + OPT_PADDING_X }} />

          <Sentence
            size={OPT_SIZE}
            maxWidth={620}
            align="left"
            maxLines={1}
            dir="ltr"
            color="black"
            backgroundColor={colors.word.pink}
            paddingX={OPT_PADDING_X}
            paddingY={OPT_PADDING_Y}
            strokeWidth={1}
            onNaturalSize={naturalSizes.report(i)}
            sizeOverride={sharedSize}
          >
            {opt}
          </Sentence>
        </div>
      ))}
    </div>
  );
}

// Birden fazla Sentence'ın doğal boyutlarını toplayan yardımcı hook (diğer sayfalarla aynı)
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
