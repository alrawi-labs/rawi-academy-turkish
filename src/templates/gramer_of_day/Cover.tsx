import coverBg from "../../assets/templates/gramer_of_day/cover.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayData } from "./types";

type CoverData = Pick<GramerOfDayData, "gramer">;

export default function GramerOfDayCover({ data }: TemplateProps<CoverData>) {
  const { gramer } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${coverBg})` }}
    >
      <NoteCard
        width={900}
        maxBodyHeight={400}
        topText={gramer}
        topSize={120}
        topTextColor="black"
        top="430px"
        left="120px"
        bodyPaddingY={10}
      />

      <WordText top={770} left={250} align="center" size={65} maxWidth={700}>
        القاعــدة الي متقــدر تستغني عنهــا وبدونهــا مــا راح تتكلـم التركيـــــة
      </WordText>
    </div>
  );
}
