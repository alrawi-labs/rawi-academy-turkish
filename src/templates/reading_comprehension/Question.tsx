import readingBg from "../../assets/templates/reading_comprehension/posts_bg.png";
import PillListCard from "../../components/canvas/PillListCard";
import OptionList from "../../components/canvas/OptionList";
import type { TemplateProps } from "../registry";
import type { ReadingComprehensionData } from "./types";

type QData = Pick<ReadingComprehensionData, "question" | "options" | "number">;

const CANVAS_WIDTH = 1080; // canvasPresets.carousel genişliğinize göre ayarlayın

export default function ReadingComprehensionQuestion({
  data,
}: TemplateProps<QData>) {
  const { question, options, number } = data;

  const cardWidth = 800;

  const horizontalPadding = 50;
  // PillListCard body'sinin gerçek içerik genişliği — OptionList bunun
  // dışına taşmasın diye cardWidth değil bu değer veriliyor.
  const optionsWidth = cardWidth - horizontalPadding * 2;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${readingBg})` }}
    >
      <PillListCard
        width={cardWidth}
        top={280}
        left={80}
        title={question}
        titleSize={60}
        titleColor="black"
        number={number}
        numberBackgroundColor="#ff2daa"
        numberTextColor="white"
        maxBodyHeight={800}
        bodyPaddingY={40}
        horizontalPadding={horizontalPadding}
        titlePadding={30}
      >
        <OptionList strokeWidth={0} width={optionsWidth} items={options} />
      </PillListCard>
    </div>
  );
}