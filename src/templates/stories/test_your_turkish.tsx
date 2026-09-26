import AnswerBG from "../../assets/templates/stories/test_your_turkish.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { TestYourTurkishData } from "./types";

export default function StoriesTestYourTurkish({
  data,
}: TemplateProps<TestYourTurkishData>) {
  const { question } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >

      {/* Cevap ifadesi (pembe vurgu kutusu) */}
      <WordText
        size={90}
        maxWidth={1000}
        align="center"
        maxLines={2}
        dir="ltr"
        color="black"
        backgroundColor="transparent"
        top={700}
        left={40}
        fit="wrap"
        maxHeight={350}
      >
        {question}
      </WordText>
    </div>
  );
}
