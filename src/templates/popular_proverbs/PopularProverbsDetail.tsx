// templates/popular-proverbs/PopularProverbsDetail.tsx
import CoverBG from "../../assets/templates/popular_proverbs/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import Sentence from "../../components/canvas/Sentence";
import type { TemplateProps } from "../registry";
import type { PopularProverbsData } from "./types";

// Veri, her iki cümle için de \n ile ayrılmış satırlar içermeli, örn:
// turkishProverb: "Bir fincan kahvenin\nkırk yıl hatırı vardır"
// arabicProverb:  "فنجان قهوة واحد له ذكرى\nتمتد لأربعين سنة"
type PgData = Pick<PopularProverbsData, "turkishProverb" | "arabicProverb">;

export default function PopularProverbsDetail({ data }: TemplateProps<PgData>) {
  const { turkishProverb, arabicProverb } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      {/* 1. المثل بالتركي — başlık (sabit metin) */}
      <WordText
        size={120}
        Width={1000}
        maxWidth={1000}
        align="center"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
        top={250}
        centerX
      >
        المثـــل بالتركي
      </WordText>

      {/* 2. Türkçe atasözü — parametreden gelir, pembe vurgulu */}
      <Sentence
        size={125}
        Width={950}
        align="center"
        maxLines={2}
        lineGap={30}
        dir="ltr"
        color="white"
        backgroundColor="#ff2daa"
        paddingX={20}
        paddingY={10}
        top={480}
        left={540}
        stagger={20}
        centerX
      >
        {turkishProverb}
      </Sentence>

      {/* 3. المثل بالعربي — başlık (sabit metin) */}
      <WordText
        size={120}
        Width={1000}
        maxWidth={1000}
        align="center"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
        top={770}
        centerX
      >
        المثـــل بالعربي
      </WordText>

      {/* 4. Arapça atasözü — parametreden gelir, aynı Sentence bileşeni */}
      <Sentence
        size={125}
        Width={950}
        align="right"
        maxLines={2}
        lineGap={30}
        dir="rtl"
        color="white"
        backgroundColor="#ff2daa"
        paddingX={20}
        paddingY={10}
        top={1000}
        left={540}
        stagger={10}
        centerX
      >
        {arabicProverb}
      </Sentence>
    </div>
  );
}