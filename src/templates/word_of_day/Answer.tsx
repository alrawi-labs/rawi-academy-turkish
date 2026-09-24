import AnswerBG from "../../assets/templates/word_of_day/qs_as_closed.png";
import NoteCard from "../../components/canvas/NoteCard";
import OptionRow from "../../components/canvas/OptionRow";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "correctAnswer">;

export default function WordOfDayAnswer({ data }: TemplateProps<PgData>) {
  const { correctAnswer } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >
      {/* Başlık — sadece üst metin kullanılıyor, PillListCard'daki gibi bottomText boş bırakıldı */}
      <NoteCard
        width={700}
        maxBodyHeight={220}
        topText="الإجابة الصحيحة"
        topSize={100}
        topTextColor="black"
        bottomText=""
        top="230px"
        left="200px"
        bodyPaddingY={40}
      />

      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}
      <div style={{ position: "absolute", top: "700px", left: "180px" }}>
        <OptionRow
          strokeWidth={0.9}
          letter={correctAnswer.letter}
          text={correctAnswer.text}
          maxWidth={700}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "900px",
          left: "180px",
          display: "flex",
          flexDirection: "column",

        }}
      >
        <Label marginBottom={20} fontSize={40} align="right" variant="line" >
          الترجمة
        </Label>

        <WordText
          size={50}
          maxWidth={700}
          align="right"
          fit="wrap"
          maxLines={5}
          dir="rtl"
          color="black"
        >
          {correctAnswer.translation}
        </WordText>
      </div>
    </div>
  );
}