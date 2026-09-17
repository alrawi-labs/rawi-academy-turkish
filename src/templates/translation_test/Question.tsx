import QuestionBG from "../../assets/templates/translation_test/posts_bg.png";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import NoteCard from "../../components/canvas/NoteCard";
import type { TemplateProps } from "../registry";
import type { TranslationTestData } from "./types";

type PgData = Pick<TranslationTestData, "question">;

export default function TranslationTestQuestion({ data }: TemplateProps<PgData>) {
  const { question } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${QuestionBG})` }}
    >
      {/* Sabit başlık — her çeviri testinde aynı metin, dışarıdan gelmiyor */}
      <div style={{ position: "absolute", top: "300px", left: "250px" }}>
        <Label
          variant="label"
          backgroundColor="#ff2daa"
          textColor="white"
          fontSize={110}
          paddingX={22}
          paddingY={26}
        >
          أختبار الترجمـة
        </Label>
      </div>

      {/* Sabit alt açıklama — yine sabit metin */}
      <WordText
        size={80}
        maxWidth={700}
        align="center"
        top="450px"
        left="210px"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
      >
        اختبر نفسك بترجمة الجمل التركيــة
      </WordText>

      {/* Gerçek veri — çevrilecek Türkçe cümle, torn-paper kart içinde */}
      <NoteCard
        width={800}
        maxBodyHeight={960}
        topText={question}
        topSize={70}
        topTextColor="black"
        bottomText=""
        top="720px"
        left="130px"
        bodyPaddingY={0}
      />
    </div>
  );
}