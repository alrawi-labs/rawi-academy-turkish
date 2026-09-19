import meaningBG from "../../assets/templates/difference_tow_words/posts_bg.png";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { DifferenceTowWordsData } from "./types";

type PgData = Pick<DifferenceTowWordsData, "word2" | "meaning2" | "explain2" | "example2" | "answer2">;

export default function DifferenceTowWordsMeaning2({ data }: TemplateProps<PgData>) {
  const { word2, meaning2, explain2, example2, answer2 } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBG})` }}
    >
      {/* Kelime rozeti — sağa sabit, uzun kelimede sola doğru büyür */}
      <WordText
        size={110}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={250}
        centerX
        padding={20}
        strokeWidth={0.6}
      >
        {word2}
      </WordText>

      {/* Anlamı — "ينظر / يَنظُر إلى شيء" */}
      <WordText
        size={90}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={2}
        dir="rtl"
        color="black"
        top={460}
        centerX
        strokeWidth={0.6}
      >
        {meaning2}
      </WordText>

      {/* Açıklama paragrafı */}
      <WordText
        size={55}
        Width={800}
        maxWidth={9950}
        align="center"
        fit="wrap"
        maxLines={3}
        dir="rtl"
        color="black"
        top={630}
        centerX
        lineHeight={1.4}
        strokeWidth={0.6}
        maxHeight={140}
      >
        {explain2}
      </WordText>


      {/* "مثال" etiketi — sabit metin, veriden gelmiyor */}
      <div style={{position: "absolute", top: "850px", left:"50%", transform: "translateX(-50%)"}}>
        <Label offsetTop={18} offsetBottom={5} variant="line" fontSize={80} >مثـــال</Label>
      </div>

    

      {/* Örnek cümle — Türkçe olduğundan dir="ltr" */}
      <WordText
      
        size={60}
        maxWidth={1700}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="ltr"
        color="black"
        top={950}
        centerX
        strokeWidth={0.6}
      >
        {example2}
      </WordText>

      {/* "معناه" etiketi — sabit metin, veriden gelmiyor */}
       <div style={{position: "absolute", top: "1100px", left:"50%", transform: "translateX(-50%)"}}>
        <Label offsetTop={18} offsetBottom={5} variant="line" fontSize={80} >معنـــاه</Label>
      </div>

      {/* Cevap / açıklama — "انظر إليّ !" */}
      <WordText
        size={60}
        maxWidth={1700}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="ltr"
        color="black"
        top={1200}
        centerX
        strokeWidth={0.6}
      >
        {answer2}
      </WordText>
    </div>
  );
}