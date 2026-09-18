import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import Label from "../../components/canvas/Label";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayData } from "./types";

type MeaningData = Pick<
  GramerOfDayData,
  "gramer" | "meaning" | "explain" | "example"
>;

export default function GramerOfDayMeaning({
  data,
}: TemplateProps<MeaningData>) {
  const { gramer, meaning, explain, example } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      <WordText top={250} left={270} size={100}>
        {[{ text: "تعــني", color: "pink" }, { text: `${gramer}` }]}
      </WordText>

      <NoteCard
        width={900}
        maxBodyHeight={400}
        topText={meaning}
        topSize={120}
        topTextColor="black"
        top="430px"
        left="120px"
        bodyPaddingY={10}
      />

      <WordText top={770} left={250} align="center" size={65} maxWidth={700}>
        {explain}
      </WordText>

      <WordText color="pink" top={970} left={250} align="center" size={80} maxWidth={700}>
        مثـــال
      </WordText>

      <div style={{ position: "absolute", top: "1100px", width: "100%" }}>
  {/* Türkçe cümle - tam genişlik şerit */}
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: 0,
      width: "1080px",
      backgroundColor: "#ff2daa",
      padding: "6px 14px",
      boxSizing: "border-box",
    }}
  >
    <WordText
      fit="wrap"
      maxWidth={1080 - 48}
      size={50}
      color="white"
      align="left"
      maxLines={2}
    >
      Yorgun olduğum için dışarı çıkamadım
    </WordText>
  </div>

  {/* Arapça cümle - sağa yaslı, sabit maxWidth ile sınırlı kutu */}
  <div
    style={{
      position: "absolute",
      top: "120px",
      right: 0,
      backgroundColor: "#ff2daa",
      padding: "6px 14px",
      boxSizing: "border-box",
    }}
  >
    <WordText
      fit="wrap"
      maxWidth={1080 - 48}
      size={50}
      color="white"
      align="right"
      dir="rtl"
      maxLines={2}
    >
      ما طلعت لأنني كنت تعبان
    </WordText>
  </div>
</div>
    </div>
  );
}
