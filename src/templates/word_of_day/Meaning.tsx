import meaningBG from "../../assets/templates/word_of_day/meaning.png";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "word" | "meaning" | "explain">;

export default function WordOfDayMeaning({
  data,
}: TemplateProps<PgData>) {
  const { word, meaning, explain } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBG})` }}
    >
      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}

      <WordText
        maxSize={80}
        maxWidth={460}
        padding={24}
        align="center"
        top="130px"
        left="370px"
        fit="shrink"
        centerY
      >
        {word}
      </WordText>

      <WordText
        maxSize={180}
        maxWidth={780}
        padding={24}
        align="center"
        top="660px"
        left="270px"
        fit="shrink"
        color="rose"
        centerY
        dir="rtl"
      >
        {meaning}
      </WordText>

      {/* Örnek cümle uzun olabileceği için 'shrink' değil 'wrap' kullanıyoruz */}
      <WordText
        size={56}
        maxWidth={850}
        padding={32}
        align="right"
        top="900px"
        left="200px"
        fit="wrap"
         maxLines={5}
      >
        {explain}
      </WordText>
    </div>
  );
}