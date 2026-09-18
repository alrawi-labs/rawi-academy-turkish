import QuestionBg from "../../assets/templates/words_test/posts_bg.png";
import Label from "../../components/canvas/Label";
import OptionRow from "../../components/canvas/OptionRow";
import type { TemplateProps } from "../registry";
import type { WordsTestData } from "./types";
import NoteCard from "../../components/canvas/NoteCard";
import OptionList from "../../components/canvas/OptionList";

type QuestionData = Pick<WordsTestData, "word" | "count" | "QuestionOptions">;

export default function WordsTestQuestion({
  data,
}: TemplateProps<QuestionData>) {
  const { word, count, QuestionOptions } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${QuestionBg})` }}
    >
      <div
        style={{
          position: "absolute",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Label
          variant="badge"
          width={150}
          height={100}
          fontSize={70}
          paddingY={20}
          strokeWidth={0.5}
        >
          {String(count)}
        </Label>
      </div>

      <NoteCard
        top="300px"
        centerX={true}
        topSize={190}
        bodyPaddingY={0}
        textPadding={0}
        maxBodyHeight={300}
        width={800}
        topText={word}
        topTextColor="black"
      />

      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}
      <OptionList dir="rtl" align="center" size={60} items={QuestionOptions} columns={2} width={900} top={650} left={100} variant="badge" />

    </div>
  );
}
