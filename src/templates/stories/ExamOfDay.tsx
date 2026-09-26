import CoverBG from "../../assets/templates/stories/exam_of_day.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import Sentence from "../../components/canvas/Sentence";
import { colors } from '../../design/tokens';
import type { TemplateProps } from "../registry";
import type { ExamOfDayData } from "./types";
import Label from "../../components/canvas/Label";

// NOT: Logo, instagram hesabı, İstanbul silueti ve alt sağdaki pembe üçgen +
// çay bardağı bu arka plan görselinin (background.png) içinde varsayıldı.

const ARABIC_NUMS = ["١", "٢", "٣", "٤", "٥", "٦"];

export default function StoriesExamOfDay({
  data,
}: TemplateProps<ExamOfDayData>) {
  const { sentence, question, options } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      {/* Türkçe cümle - not kartı */}
      <NoteCard
        width={850}
        top={450}
        centerX
        topText={sentence}
        topTextColor="black"
        topAlign="center"
        topSize={70}
        topMaxLines={2}
        bottomText=""
      />

      {/* السؤال + soru */}
      <Sentence
        size={70}
        maxWidth={950}
        align="right"
        maxLines={1}
        dir="rtl"
        color="black"
        top={800}
        right={60}
        backgroundColor="transparent"
      >
        الســـؤال
      </Sentence>

      <Sentence
        size={68}
        maxWidth={950}
        align="right"
        maxLines={1}
        dir="rtl"
        color="black"
        top={890}
        right={60}
        backgroundColor="transparent"
      >
        {question}
      </Sentence>

      {/* Numaralı şıklar */}
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 1000 + i * 70,
            right: 100,
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* <span
            className="font-black"
            dir="rtl"
            style={{ fontSize: "60px", color: "black", backgroundColor: colors.word.pink, lineHeight: 1 }}
          >
            {ARABIC_NUMS[i] ?? `${i + 1}`}
          </span> */}
          <Label
            variant="badge"
            fontSize={70}
            textColor="black"
            width={35}
            height={30}
            backgroundColor={colors.word.pink}
            paddingX={5}
          >
            {ARABIC_NUMS[i] ?? `${i + 1}`}
          </Label>

          <Sentence size={60} backgroundColor="transparent" strokeWidth={1}>
            {opt}
            </Sentence>
        </div>
      ))}
    </div>
  );
}
