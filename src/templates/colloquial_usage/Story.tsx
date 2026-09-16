import CoverBG from "../../assets/templates/colloquial_usage/story.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "sentence">;

export default function ColloquialUsageStory({ data }: TemplateProps<PgData>) {
  const { sentence } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <div
        style={{
          position: "absolute",
          top: "850px",
          left: "215px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <NoteCard
          width={790}
          maxBodyHeight={600}
          topText={sentence}
          topSize={50}
          topTextColor="black"
          bottomText=""
          bottomTextColor="pink"
          bottomSize={50}
          bodyPaddingY={40}
          topMaxLines={4}
        />

        <WordText
          size={100}
          maxWidth={400}
          align="left"
          fit="wrap"
          maxLines={1}
          dir="rtl"
          color="pink"
        >
          مثل الأتراك؟
        </WordText>

        <div style={{transform: "translateX(-120px)"}} >
            <WordText
          size={100}
          maxWidth={700}
          align="left"
          fit="wrap"
          maxLines={1}
          dir="rtl"
          color="black"
        >
         الجواب بآخر منشور
        </WordText>
        </div>
      </div>
    </div>
  );
}