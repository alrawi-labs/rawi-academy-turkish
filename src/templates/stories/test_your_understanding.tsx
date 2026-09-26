import AnswerBG from "../../assets/templates/stories/test_your_understanding.png";
import Sentence from "../../components/canvas/Sentence";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { TestYourUnderstandingData } from "./types";

// NOT: Logo, üst boşluk ve instagram hesabı (rawi.turkish) bu arka plan
// görselinin (test_your_turkish.png) içinde varsayıldı.

const LETTERS = ["A", "B", "C", "D"];

export default function StoriesTestYourUnderstanding({
  data,
}: TemplateProps<TestYourUnderstandingData>) {
//   const { sentence, question,options } = data;

  const options = ["لانه كان مشغول", "لانه كان مريض", "لانه كان مسافر"]
  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >

      {/* Türkçe cümle (beyaz kutu, her satır kendi kutusunda) */}
      <Sentence
        size={120}
        maxWidth={900}
        align="center"
        maxLines={2}
        dir="ltr"
        color="black"
        backgroundColor="white"
        top={590}
        centerX
        paddingX={20}
        paddingY={12}
        strokeWidth={1}
        lineGap={30}
      >
        Ali bugün işe gitmedi çünkü hastaydı
      </Sentence>

      {/* Soru (pembe kutu) */}
      <Sentence
        size={100}
        maxWidth={1000}
        align="center"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={980}
        centerX
        paddingX={30}
        paddingY={18}
        strokeWidth={1}
      >
        علي ليش ما راح للدوام؟
      </Sentence>

      {/* Şıklar: sağda pembe rozet (A/B/C) + solda beyaz kutulu cevap */}
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 1180 + i * 160,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "row",
            direction: "ltr",
            alignItems: "center",
          }}
        >
          <Sentence
            size={90}
            maxWidth={800}
            align="right"
            maxLines={1}
            dir="ltr"
            color="black"
            backgroundColor="white"
            paddingX={20}
            paddingY={20}
            strokeWidth={1}
          >
            {opt}
          </Sentence>

          <div style={{ width: 6 }} />

          <Label
            fontSize={90}
            textColor="white"
            variant="badge"
            width={110}
            height={130}
          >
            {LETTERS[i] ?? `${i + 1}`}
          </Label>
          
        </div>
      ))}
    </div>
  );
}