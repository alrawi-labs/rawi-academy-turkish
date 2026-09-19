import examplesBG from "../../assets/templates/difference_tow_words/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { DifferenceTowWordsData } from "./types";

type PgData = Pick<
  DifferenceTowWordsData,
  | "word1"
  | "exampleSentence1"
  | "exampleMeaning1"
  | "word2"
  | "exampleSentence2"
  | "exampleMeaning2"
>;

export default function DifferenceTowWordsExamples({ data }: TemplateProps<PgData>) {
  const {
    word1,
    exampleSentence1,
    exampleMeaning1,
    word2,
    exampleSentence2,
    exampleMeaning2,
  } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${examplesBG})` }}
    >
      {/* Kelime 1 rozeti */}
      <WordText
        size={110}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={230}
        centerX
        padding={20}
        strokeWidth={0.6}
      >
        {word1}
      </WordText>

      {/* Türkçe örnek cümle — sola yaslı, LTR */}
      <WordText
        size={58}
        maxWidth={800}
        align="left"
        fit="wrap"
        maxLines={1}
        dir="ltr"
        color="black"
        top={460}
        left={90}
        strokeWidth={0.6}
      >
        {exampleSentence1}
      </WordText>

      {/* Arapça anlamı — sağa yaslı, RTL, right ile sağdan sabit */}
      <WordText
        size={58}
        maxWidth={900}
        align="right"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
        top={600}
        right={90}
        strokeWidth={0.6}
      >
        {exampleMeaning1}
      </WordText>

      {/* Kelime 2 rozeti */}
      <WordText
        size={110}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={750}
        centerX
        padding={20}
        strokeWidth={0.6}
      >
        {word2}
      </WordText>

      {/* Türkçe örnek cümle — sola yaslı, LTR */}
      <WordText
        size={58}
        maxWidth={800}
        align="left"
        fit="wrap"
        maxLines={1}
        dir="ltr"
        color="black"
        top={980}
        left={90}
        strokeWidth={0.6}
      >
        {exampleSentence2}
      </WordText>

      {/* Arapça anlamı — sağa yaslı, RTL, right ile sağdan sabit */}
      <WordText
        size={58}
        maxWidth={900}
        align="right"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
        top={1120}
        right={90}
        strokeWidth={0.6}
      >
        {exampleMeaning2}
      </WordText>
    </div>
  );
}