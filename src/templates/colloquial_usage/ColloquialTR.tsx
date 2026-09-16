import ColloquialBG from "../../assets/templates/colloquial_usage/posts_bg.png";
import Label from "../../components/canvas/Label";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "sentence" | "colloquial_tr">;

export default function ColloquialUsageColloquialTR({
  data,
}: TemplateProps<PgData>) {
  const { sentence, colloquial_tr } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ColloquialBG})` }}
    >
      <div style={{ position: "absolute", top: "350px", left: "300px" }}>
        <Label fontSize={80} paddingBottom={35} paddingTop={15} paddingX={30}>
          المقابـل بالتركــي العامي
        </Label>
      </div>

      <div
        style={{
          position: "absolute",
          top: "520px",
          left: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <NoteCard
          width={970}
          maxBodyHeight={400}
          topText={colloquial_tr}
          topSize={90}
          topTextColor="black"
          bottomText=""
          bottomTextColor="pink"
          bottomSize={50}
          bodyPaddingY={40}
          topMaxLines={4}
        />

        <div style={{ transform: "translateX(-60px)" }}>
          <WordText
            size={80}
            maxWidth={700}
            align="center"
            fit="wrap"
            maxHeight={220}
            dir="rtl"
            color="pink"
          >
            {sentence}
          </WordText>
        </div>
      </div>
    </div>
  );
}
