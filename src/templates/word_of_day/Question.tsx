import QsAsClosedBG from "../../assets/templates/word_of_day/qs_as_closed.png";
import OptionRow from "../../components/canvas/OptionRow";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "quizOptions">;

export default function WordOfDayQuestion({
  data,
}: TemplateProps<PgData>) {
  const { quizOptions } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${QsAsClosedBG})` }}
    >
      {/* Konum TAHMİNİ - dev server'da görünce birlikte ayarlayacağız */}
      <div
        style={{
          position: "absolute",
          top: "730px",
          left: "180px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {quizOptions.map((opt, i) => (
          <OptionRow key={i} strokeWidth={0.9} letter={opt.letter} text={opt.text} maxWidth={600} />
        ))}
      </div>
    </div>
  );
}