import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import Label from "../../components/canvas/Label";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayQuizData } from "./types";

export default function GramerOfDayQuiz({
  data,
}: TemplateProps<GramerOfDayQuizData>) {
  const { sentence, hint } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText top={200} centerX size={75} align="center">
        أختبــر فهمـــك
      </WordText>

      {/* Alt başlık */}
      <WordText top={340} maxWidth={900} centerX size={85} align="center">
        ترجم الجملة التالية
      </WordText>

      {/* Çevrilecek cümle - yırtık kağıt kart */}
      <NoteCard
        width={950}
        topText=""
        bottomText={sentence}
        topSize={1}
        bottomSize={70}
        bottomTextColor="black"
        bottomAlign="center"
        bottomMaxLines={2}
        top="500px"
        centerX={true}
        bodyPaddingY={20}
        textPadding={40}
      />

      {/* استخدم */}
      <WordText top={850} centerX size={85} align="center">
        استخــدم
      </WordText>

      <div
        style={{
          position: "absolute",
          top: "1000px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Label fontSize={85} paddingY={10} paddingX={30} strokeWidth={0.6} >{hint}</Label>
      </div>

      {/* Alt not */}
      <WordText
        top={1130}
        centerX
        size={55}
        align="center"
        maxWidth={600}
        maxLines={2}
      >
        أكتب جوابـك بالتعليقات قبــل لا تقلب للصفحة الجايـة
      </WordText>
    </div>
  );
}
