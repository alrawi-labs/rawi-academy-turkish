import AnswerBG from "../../assets/templates/stories/clock.png";
import Sentence from "../../components/canvas/Sentence";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { ClockData } from "./types";

export default function StoriesClock({
  data,
}: TemplateProps<ClockData>) {
  const { clock_number, clock_text } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >

      <Sentence
        size={130}
        maxWidth={700}
        align="center"
        maxLines={1}
        dir="ltr"
        color="white"
        backgroundColor={colors.word.pink}
        top={870}
        right={60}
        strokeWidth={1}
        paddingX={90}
      >
        {clock_number}
      </Sentence>
      <WordText
      size={100}
        maxSize={100}
        maxWidth={1080}
        align="center"
        maxLines={2}
        dir="ltr"
        color="black"
        backgroundColor={colors.word.pink}
        top={1200}
        right={0}
        fit="wrap"
        strokeWidth={1}
        padding={50}
      >
        {clock_text}
      </WordText>
    </div>
  );
}
