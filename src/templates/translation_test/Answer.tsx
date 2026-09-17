import postsBG from "../../assets/templates/translation_test/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import NoteCard from "../../components/canvas/NoteCard";
import type { TranslationTestData } from "./types";

type PgData = Pick<TranslationTestData, "answer">;

export default function TranslationTestAnswer({
  data,
}: TemplateProps<Record<string, never>>) {
  const { answer } = data;
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${postsBG})` }}
    >
      <WordText
        size={120}
        maxWidth={900}
        align="center"
        top="260px"
        left="100px"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
      >
        جــواب
      </WordText>

      <div style={{ position: "absolute", top: "500px", left: "290px" }}>
        <Label
          variant="label"
          backgroundColor="#ff2daa"
          textColor="white"
          fontSize={90}
          paddingX={26}
          paddingY={30}
        >
          أختبار الترجمــة
        </Label>
      </div>

      <WordText
        size={55}
        maxWidth={680}
        align="center"
        top="685px"
        left="200px"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
      >
        تم نشر السؤال قبل ساعة في المنشور السابق
      </WordText>

      <NoteCard
        width={800}
        maxBodyHeight={960}
        topText={answer}
        topSize={70}
        topTextColor="black"
        bottomText=""
        top="890px"
        left="130px"
        bodyPaddingY={0}
      />
    </div>
  );
}
