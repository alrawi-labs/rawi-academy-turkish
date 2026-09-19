import readingBg from "../../assets/templates/reading_comprehension/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import AnswerList from "../../components/canvas/AnswerList";
import type { TemplateProps } from "../registry";
import type { ReadingComprehensionAnswersData } from "./types";



const CANVAS_WIDTH = 1080;

export default function ReadingComprehensionAnswers({
  data,
}: TemplateProps<ReadingComprehensionAnswersData>) {
  const {
    answers,
    title = "الأجوبة",
    footer = "راجع اجوبتك واخبرنا بالتعليقات\nهل كانت اجوبتك صحيحة",
    cta = "اضفها الى محفوظاتك",
  } = data;

  const listWidth = 720;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${readingBg})` }}
    >
      <WordText
        size={170}
        maxWidth={CANVAS_WIDTH - 160}
        align="center"
        dir="rtl"
        color="black"
        strokeWidth={0}
        top={230}
        centerX
      >
        {title}
      </WordText>

      <AnswerList
        items={answers}
        width={listWidth}
        gapY={52}
        top={530}
        left={(CANVAS_WIDTH - listWidth) / 2}
      />

      <WordText
        size={46}
        maxWidth={CANVAS_WIDTH - 160}
        align="center"
        dir="rtl"
        color="black"
        strokeWidth={0}
        top={1140}
        centerX
      >
        {footer}
      </WordText>
      <WordText
        size={46}
        maxWidth={CANVAS_WIDTH - 160}
        align="center"
        dir="rtl"
        color="black"
        strokeWidth={0}
        top={1300}
        centerX
      >
        {cta}
      </WordText>
    </div>
  );
}