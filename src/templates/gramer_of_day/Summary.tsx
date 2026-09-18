import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDaySummaryData } from "./types";


export default function GramerOfDaySummary({
  data,
}: TemplateProps<GramerOfDaySummaryData>) {
  const { hint, meaning, usage, example_tr, example_ar } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText
        top={220}
        centerX
        size={70}
        align="center"
        maxWidth={900}
        maxLines={2}
      >
        احفظهـا بهذا الشكـل
      </WordText>

      {/* -DIGI ICIN */}
      <WordText padding={15} backgroundColor="#ff2daa" maxHeight={130} top={350} centerX maxWidth={800} maxLines={1} size={65} color="white" align="center">
        {hint}
      </WordText>

      {/* المعنى başlığı + kutu */}
      <WordText top={480} centerX size={70} align="center">
        المعنى
      </WordText>
       <WordText padding={15} backgroundColor="#ff2daa" maxHeight={130} top={590} centerX maxWidth={800} maxLines={1} size={65} color="white" align="center">
        {meaning}
      </WordText>

      {/* الأستخدام başlığı + kutu */}
      <WordText top={730} centerX size={70} align="center">
        الأستخـدام
      </WordText>
       <WordText padding={15} backgroundColor="#ff2daa" maxHeight={130} top={860} centerX maxWidth={800} maxLines={1} size={65} color="white" align="center">
        {usage}
      </WordText>

      {/* Alt örnek kartı - tamamı siyah metin */}
      <NoteCard
        width={950}
        maxBodyHeight={320}
        topText={example_tr}
        bottomText={example_ar}
        topSize={55}
        bottomSize={55}
        topTextColor="black"
        bottomTextColor="black"
        topAlign="left"
        bottomAlign="right"
        top="1000px"
        centerX={true}
        bodyPaddingY={30}
        textPadding={40}
      />
    </div>
  );
}