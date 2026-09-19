import selfTestBG from "../../assets/templates/difference_tow_words/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import Label from "../../components/canvas/Label";
import NoteCard from "../../components/canvas/NoteCard";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { DifferenceTowWordsData } from "./types";

// DifferenceTowWordsData'da bu alan yoksa oraya ekleyip Pick ile çekebilirsin —
// şimdilik sayfanın kendi başına anlaşılır kalması için ayrı bir tip tanımladım.

type PgData = Pick<DifferenceTowWordsData, "answer">;


export default function DifferenceTowWordsAnswer({
  data,
}: TemplateProps<PgData>) {
  const { answer } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${selfTestBG})` }}
    >
      <WordText
        size={110}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={200}
        centerX
        padding={20}
        strokeWidth={0.6}
      >
       الأجابة
      </WordText>


      {/* Cümle — yırtık kağıt görünümünde NoteCard.
          topText zorunlu bir prop ama burada kullanılmıyor: boş bırakıp
          fontunu 1px'e indirerek görünmez hale getiriyoruz. Asıl cümle
          bottomText'te — NoteCard bunu otomatik dir="rtl" ile render ediyor. */}
      <NoteCard
        width={840}
        top={560}
        centerX
        textPadding={20}
        maxBodyHeight={360}
        bodyPaddingY={20}
        topText=""
        topSize={1}
        bottomText={answer}
        bottomTextColor="black"
        bottomSize={86}
        bottomMaxLines={2}
        
      />

      <div
        style={{
          position: "absolute",
          top: "1000px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Label offsetTop={12} offsetBottom={4} variant="line" fontSize={55}>
         هــل كانت اجابتــــك صحيحة؟
        </Label>
      </div>

      {/* Uyarı — "لا تقلب للصفحة التالية قبل ان تكتب اجابتك" */}
      <WordText
        size={50}
        maxWidth={950}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        top={1110}
        centerX
        lineHeight={1.4}
        strokeWidth={0.6}
      >
       للمزيد من المنشورات المفيدة لا تنسى المتابعة
      </WordText>
    </div>
  );
}