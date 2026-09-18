import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayPronounsData } from "./types";

const CANVAS_WIDTH = 1080;
const GRID_WIDTH = 900;
const GRID_LEFT = (CANVAS_WIDTH - GRID_WIDTH) / 2;
const COL_GAP = 40;
const ROW_GAP = 50;
const COL_WIDTH = (GRID_WIDTH - COL_GAP) / 2;

function PronounCell({
  pronoun,
  form,
}: {
  pronoun: string;
  form: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <WordText size={65} align="center" dir="rtl">
        {pronoun}
      </WordText>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ff2daa",
          padding: "14px 20px",
          boxSizing: "border-box",
        }}
      >
        <WordText
          fit="shrink"
          maxWidth={COL_WIDTH - 40}
          size={44}
          color="white"
          align="center"
          strokeWidth={0}
        >
          {form}
        </WordText>
      </div>
    </div>
  );
}

export default function GramerOfDayPronouns({
  data,
}: TemplateProps<GramerOfDayPronounsData>) {
  const { verb, conjugations } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText top={220} centerX size={75} align="center" maxWidth={900} maxLines={2}>
        استخدامهــا مــع الضمائـــر
      </WordText>

      {/* Fiil - yırtık kağıt kart */}
      <NoteCard
        width={950}
        maxBodyHeight={250}
        topText={verb}
        topSize={100}
        topTextColor="black"
        top="350px"
        centerX={true}
        bodyPaddingY={20}
        textPadding={20}
      />

      {/* Zamir grid'i */}
      <div
        style={{
          position: "absolute",
          top: "650px",
          left: `${GRID_LEFT}px`,
          width: `${GRID_WIDTH}px`,
          display: "grid",
          gridTemplateColumns: `repeat(2, ${COL_WIDTH}px)`,
          columnGap: `${COL_GAP}px`,
          rowGap: `${ROW_GAP}px`,
        }}
      >
        <PronounCell pronoun="انا" form={conjugations[0].form} />
        <PronounCell pronoun="انت" form={conjugations[1].form} />
        <PronounCell pronoun="نحن" form={conjugations[2].form} />
        <PronounCell pronoun="انتم" form={conjugations[3].form} />
        <PronounCell pronoun="هو" form={conjugations[4].form} />
        <PronounCell pronoun="هم" form={conjugations[5].form} />
      </div>
    </div>
  );
}