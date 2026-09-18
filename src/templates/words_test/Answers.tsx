import AnswersBg from "../../assets/templates/words_test/posts_bg.png";
import type { TemplateProps } from "../registry";
import type { WordsTestData } from "./types";
import OptionList from "../../components/canvas/OptionList";
import WordText from "../../components/canvas/WordText";

type AnswersData = Pick<WordsTestData, "AnswersOptions">;

export default function WordsTestAnswers({
  data,
}: TemplateProps<AnswersData>) {
  const { AnswersOptions } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${AnswersBg})` }}
    >
    
        <WordText top={250} size={100}  centerX >الأجوبــة</WordText>

      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}
      <OptionList dir="rtl" align="center" size={60} items={AnswersOptions} columns={2} width={900} top={450} left={90} variant="badge" />

    </div>
  );
}
