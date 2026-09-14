import QsAsClosedBG from "../../assets/templates/word_of_day/qs_as_closed.png";
import NoteCard from "../../components/canvas/NoteCard";
import OptionRow from "../../components/canvas/OptionRow";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "quizOptions">;

export default function WordOfDayQuestion({ data }: TemplateProps<PgData>) {
  const { quizOptions } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${QsAsClosedBG})` }}
    >
      <NoteCard
        width={700}
        maxBodyHeight={600}
        topText={"أختبر نفسك"}
        topSize={100}
        topTextColor="black"
        bottomText={{ text: "أختر الجملة الصحيحة", paddingY: 8 }}
        bottomTextColor="pink"
        bottomSize={50}
        top="230px"
        left="200px"
        bodyPaddingY={40}
      />
      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}
      <div
        style={{
          position: "absolute",
          top: "700px",
          left: "180px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {quizOptions.map((opt, i) => (
          <OptionRow
            key={i}
            strokeWidth={0.9}
            letter={opt.letter}
            text={opt.text}
            maxWidth={700}
          />
        ))}
      </div>
    </div>
  );
}
