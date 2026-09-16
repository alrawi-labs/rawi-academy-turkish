import ClosedBG from "../../assets/templates/word_of_day/qs_as_closed.png";
import NoteCard from "../../components/canvas/NoteCard";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";

type PgData = Pick<WordOfDayData, "word" | "fullMeaning">;

export default function WordOfDayClosed({ data }: TemplateProps<PgData>) {
  const { word, fullMeaning } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ClosedBG})` }}
    >
      <WordText
        size={95}
        maxWidth={700}
        align="center"
        fit="wrap"
        dir="rtl"
        maxLines={1}
        color="black"
        top={260}
        left={220}
      >
        تعلمنــا اليــوم كلمـــة
      </WordText>

      {/* Başlık — sadece üst metin kullanılıyor, PillListCard'daki gibi bottomText boş bırakıldı */}
      <NoteCard
        width={800}
        maxBodyHeight={420}
        topText={word}
        topSize={100}
        bottomText={fullMeaning}
        bottomSize={45}
        top="450px"
        left="150px"
        bodyPaddingY={30}
      />

      <div
        style={{
          position: "absolute",
          top: "900px",
          left: "180px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label
          strokeWidth={0.6}
          marginBottom={60}
          fontSize={70}
          align="center"
          variant="label"
          paddingY={20}
        >
          هل تستطيع استخدامهــا؟
        </Label>

        <WordText
          size={45}
          maxWidth={700}
          align="center"
          fit="wrap"
          maxLines={5}
          dir="rtl"
          color="black"
        >
          {[
            { text: "اكتب جملة من عندك باستخدام" },
            { text: word, color: "pink" },
            { text: "في التعليقات" },
          ]}
        </WordText>
      </div>
    </div>
  );
}
