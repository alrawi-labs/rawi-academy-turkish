import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayAnswerData } from "./types";

export default function GramerOfDayAnswer({
  data,
}: TemplateProps<GramerOfDayAnswerData>) {
  const { answer_tr, answer_ar } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText top={400} centerX size={110} align="center">
        الأجابـــة
      </WordText>

      {/* Cevap kartı */}
      <NoteCard
        width={950}
        maxBodyHeight={620}
        topText={answer_tr}
        bottomText={answer_ar}
        topSize={60}
        bottomSize={60}
        topTextColor="black"
        bottomTextColor="pink"
        topAlign="center"
        bottomAlign="center"
        topMaxLines={2}
        top="600px"
        centerX={true}
        bodyPaddingY={30}
        textPadding={40}
      />
    </div>
  );
}