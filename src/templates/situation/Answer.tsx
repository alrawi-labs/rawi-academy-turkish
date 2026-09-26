import AnswerBG from "../../assets/templates/situation/cover.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { SituationData } from "./types";

export default function SituationAnswer({ data }: TemplateProps<SituationData>) {
  const {
    level,
    answer,
  } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >
      {/* Seviye rozeti */}
      <Sentence
        size={70}
        maxWidth={400}
        align="right"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor="transparent"
        top={60}
        right={30}
        paddingX={30}
        paddingY={15}
        strokeWidth={1}
      >
        {`المستوى ${level}`}
      </Sentence>


      {/* Senaryo cümlesi */}
      <Sentence
        size={120}
        maxWidth={1080}
        align="center"
        maxLines={2}
        dir="rtl"
        color="black"
        backgroundColor="transparent"
        top={600}
        centerX
      >
        الأجابة
      </Sentence>

      {/* Cevap ifadesi (pembe vurgu kutusu) */}
      <WordText
        size={100}
        maxWidth={1080}
        align="center"
        maxLines={4}
        dir="ltr"
        color="black"
        backgroundColor={colors.word.pink}
        top={800}
        left={0}
        fit="wrap"
      >
        {answer}
      </WordText>
    </div>
  );
}