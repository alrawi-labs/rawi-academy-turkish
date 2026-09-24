import CoverBG from "../../assets/templates/one_word_many_uses/cover.png";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { OneWordManyUsesData } from "./types";

type PgData = Pick<OneWordManyUsesData, "word">;

export default function OneWordManyUsesCover({ data }: TemplateProps<PgData>) {
  const { word } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <WordText
        size={130}
        maxWidth={900}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={970}
        right={100}
        padding={20}
        strokeWidth={0.6}
      >
        {word}
      </WordText>
    </div>
  );
}
