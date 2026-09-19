import CoverBG from "../../assets/templates/difference_tow_words/cover.png";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { DifferenceTowWordsData } from "./types";

type PgData = Pick<DifferenceTowWordsData, "word1" | "word2">;

export default function DifferenceTowWordsCover({ data }: TemplateProps<PgData>) {
  const { word1, word2 } = data;


  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <WordText
        size={120}
        maxWidth={1800}
        align="left"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={710}
        right={30}
        padding={20}
        strokeWidth={0.6}
      >
        {word1}
      </WordText>

      <WordText
        size={120}
        maxWidth={1800}
        align="left"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={970}
        right={120}
        padding={20}
        strokeWidth={0.6}
      >
        {word2}
      </WordText>
    </div>
  );
}