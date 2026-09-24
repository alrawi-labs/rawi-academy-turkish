import { useMemo, useState } from "react";
// NOT: Arka plan dosyasını kendi dosya adınla değiştir (sayfa 2 ile aynı arka plan olabilir)
import PollBG from "../../assets/templates/five_word/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { FiveWordData } from "./types";

type PollData = Pick<FiveWordData, "where"> & {
  question?: string;   // boş bırakılırsa varsayılan soru
  options: string[];   // 1-4 seçenek
  cta?: string;        // boş bırakılırsa varsayılan çağrı
};

const DEFAULT_QUESTION = "شنو تحبون يكون موضوع\nالكلمــات الجايــة؟";
const DEFAULT_CTA = "اكتب لنا اختيارك\nبالتعليقـــات";

/* ---------- Layout sabitleri (görsel px × 0.651 ile 1080 genişliğe çevrildi) ---------- */
const QUESTION_TOP = 384;
const QUESTION_SIZE = 110;

const OPT_START_TOP = 672;     // 1. seçenek satırı top
const OPT_GAP = 119;           // satırlar arası dikey mesafe
const OPT_RIGHT = 145;         // satırların sabit sağ kenarı (rozetin sağı)
const OPT_SIZE = 80;           // seçenek yazı boyutu
const BADGE_W = 74;
const BADGE_H = 82;
const BADGE_GAP = 14;          // rozet ile yazı arası boşluk

const CTA_TOP = 1152;
const CTA_RIGHT = 90;
const CTA_SIZE = 100;

const AR_DIGITS = ["١", "٢", "٣", "٤", "٥"];

export default function FiveWordPoll({ data }: TemplateProps<PollData>) {
  const { where, options, question = DEFAULT_QUESTION, cta = DEFAULT_CTA } = data;

  // Tüm seçenekler aynı font boyutunda olsun
  const naturalSizes = useRefSizes(options.length);
  const sharedSize = useMemo(() => {
    const collected = naturalSizes.filter((s): s is number => s !== null);
    if (options.length === 0 || collected.length < options.length) return OPT_SIZE;
    return Math.min(...collected);
  }, [naturalSizes, options.length]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${PollBG})` }}
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

      {/* ---------- Soru: ortalı, 2 satır ---------- */}
      <Sentence
        size={130}
        maxWidth={900}
        align="center"
        maxLines={4}
        dir="rtl"
        color="black"
        top={QUESTION_TOP}
        centerX
        backgroundColor="transparent"
        strokeWidth={1}
      >
        {question}
      </Sentence>

      {/* ---------- Seçenekler: sağa hizalı rozet + pembe vurgulu yazı ---------- */}
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: OPT_START_TOP + i * OPT_GAP,
            right: OPT_RIGHT,
            display: "flex",
            flexDirection: "row",
            direction: "rtl", // ilk çocuk (rozet) en sağda
            alignItems: "center",
          }}
        >
          <Label
            fontSize={sharedSize}
            textColor="black"
            variant="badge"
            width={BADGE_W}
            height={BADGE_H}
          >
            {AR_DIGITS[i] ?? `${i + 1}`}
          </Label>

          <div style={{ width: BADGE_GAP }} />

          <Sentence
            size={OPT_SIZE}
            maxWidth={800}
            align="left"
            maxLines={1}
            dir="ltr"
            color="black"
            backgroundColor={colors.word.pink}
            strokeWidth={1}
            offsetBottom={15}
            offsetTop={40}
            onNaturalSize={naturalSizes.report(i)}
            sizeOverride={sharedSize}
          >
            {opt}
          </Sentence>
        </div>
      ))}

      {/* ---------- Alt çağrı: sağdan 90px, kendi içinde ortalı ---------- */}
      <Sentence
        size={CTA_SIZE}
        maxWidth={500}
        align="center"
        maxLines={2}
        maxSize={140}
        dir="rtl"
        color="black"
        top={CTA_TOP}
        right={CTA_RIGHT}
        backgroundColor="transparent"
        strokeWidth={0.5}
      >
        {cta}
      </Sentence>
    </div>
  );
}

// Birden fazla Sentence'ın doğal boyutlarını toplayan yardımcı hook (FiveWordWords ile aynı)
function useRefSizes(count: number) {
  const [sizes, setSizes] = useState<(number | null)[]>(() => Array(count).fill(null));

  return Object.assign(sizes, {
    report: (index: number) => (size: number) => {
      setSizes((prev) => {
        if (prev[index] === size) return prev;
        const next = [...prev];
        next[index] = size;
        return next;
      });
    },
  }) as (number | null)[] & { report: (index: number) => (size: number) => void };
}