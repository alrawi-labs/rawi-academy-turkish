import CoverBG from "../../assets/templates/popular_proverbs/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { PopularProverbsData } from "./types";

type PgData = Pick<PopularProverbsData, "meaningExplain" | "featuredSentence">;

export default function PopularProverbsMeaning({ data }: TemplateProps<PgData>) {
  const { meaningExplain, featuredSentence } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
{/* 1. المثل بالتركي — başlık (sabit metin) */}
      <WordText
        size={90}
        Width={800}
        maxWidth={800}
        align="right"
        fit="wrap"
        maxLines={6}
        dir="rtl"
        color="black"
        top={300}
        right={50}
      >
        المعنى المقصود
      </WordText>

      {/* 1. المثل بالتركي — başlık (sabit metin) */}
      <WordText
        size={70}
        Width={800}
        maxWidth={800}
        align="right"
        fit="wrap"
        maxLines={6}
        dir="rtl"
        color="black"
        top={450}
        right={50}
      >
        {meaningExplain}
      </WordText>
{/* 3. المثل بالعربي — başlık (dinamik metin), Sentence ile */}
{/* 3. المثل بالعربي — başlık (dinamik metin), Sentence ile */}
<Sentence
  size={80}
  Width={1000}
  align="center"
  maxLines={2}
  dir="rtl"
  color="black"
  backgroundColor="#ff2daa"
  paddingX={24}
  paddingY={12}
  offsetTop={25}
  offsetBottom={20}
  top={1070}
  left={540}
  centerX
>
  {featuredSentence}
</Sentence>
    </div>
  );
}
