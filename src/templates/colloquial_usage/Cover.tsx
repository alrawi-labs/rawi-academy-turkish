import CoverBG from "../../assets/templates/colloquial_usage/cover.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "sentence">;

export default function ColloquialUsageCover({ data }: TemplateProps<PgData>) {
  const { sentence } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <div
        style={{
          position: "absolute",
          top: "520px",
          left: "215px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <NoteCard
          width={790}
          maxBodyHeight={400}
          topText={sentence}
          topSize={90}
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
      </div>
    </div>
  );
}