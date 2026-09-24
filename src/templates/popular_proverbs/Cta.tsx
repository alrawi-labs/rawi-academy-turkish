import CoverBG from "../../assets/templates/popular_proverbs/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { PopularProverbsData } from "./types";

type PgData = Pick<PopularProverbsData, "ctaTitle" | "ctaExplain">;

export default function PopularProverbsCta({
  data,
}: TemplateProps<PgData>) {
  const { ctaTitle, ctaExplain } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <WordText
        size={120}
        Width={700}
        maxWidth={700}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        top={300}
        centerX
        strokeWidth={1}
      >
        {ctaTitle}
      </WordText>

      <WordText
        size={70}
        Width={800}
        maxWidth={800}
        align="center"
        fit="wrap"
        maxLines={7}
        dir="rtl"
        color="black"
        top={650}
        centerX
      >
        {ctaExplain}
      </WordText>
    
    </div>
  );
}
