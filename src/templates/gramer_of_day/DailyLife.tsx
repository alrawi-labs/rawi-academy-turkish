import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayDailyLifeData } from "./types";

export default function GramerOfDayDailyLife({
  data,
}: TemplateProps<GramerOfDayDailyLifeData>) {
  const { example1, example2 } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText
        top={220}
        centerX
        size={75}
        align="center"
        maxWidth={750}
        maxLines={2}
      >
        استخدماتها في الحيــاة اليوميــــة
      </WordText>

      {/* 1. örnek */}
      <NoteCard
        number={1}
        width={950}
        maxBodyHeight={420}
        topText={example1.tr}
        bottomText={example1.ar}
        topSize={55}
        bottomSize={55}
        topTextColor="black"
        bottomTextColor="pink"
        topAlign="left"
        bottomAlign="right"
        top="450px"
        centerX={true}
        bodyPaddingY={30}
        textPadding={40}
      />

      {/* 2. örnek */}
      <NoteCard
        number={2}
        width={950}
        maxBodyHeight={420}
        topText={example2.tr}
        bottomText={example2.ar}
        topSize={55}
        bottomSize={55}
        topTextColor="black"
        bottomTextColor="pink"
        topAlign="left"
        bottomAlign="right"
        top="950px"
        centerX={true}
        bodyPaddingY={30}
        textPadding={40}
      />
    </div>
  );
}