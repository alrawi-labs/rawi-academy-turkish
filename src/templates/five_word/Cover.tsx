import CoverBG from "../../assets/templates/five_word/cover.png";
import Label from "../../components/canvas/Label";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { FiveWordData } from "./types";

type PgData = Pick<FiveWordData, "where">;

export default function FiveWordCover({ data }: TemplateProps<PgData>) {
  const { where } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <Sentence
        size={200}
        maxWidth={650}
        align="center"
        maxLines={1}
        dir="rtl"
        color="white"
        top={1150}
        right={15}
        backgroundColor={colors.word.pink}
        paddingX={80}
        paddingBottom={20}
        strokeWidth={1}
      >
        {where}
      </Sentence>
    </div>
  );
}
