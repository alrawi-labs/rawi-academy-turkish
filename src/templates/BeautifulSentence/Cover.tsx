import SaveCtaBG from "../../assets/templates/beautiful_sentence/cover.png";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { BeautifulSentenceData } from "./types";

type PgData = Pick<BeautifulSentenceData, "level">;

export default function BeautifulSentenceCover({
  data,
}: TemplateProps<PgData>) {
  const { level } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${SaveCtaBG})` }}
    >
      {/* Konum TAHMİNİ — dev server'da gözle ince ayar gerekir */}
      <div
        style={{
          position: "absolute",
          top: "780px",
          left: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Label
          variant="label"
          fontSize={36}
          paddingX={24}
          paddingY={10}
          backgroundColor={colors.word.black}
          textColor={colors.word.white}
        >
          المستوى
        </Label>

        <div style={{ transform: "rotate(-6deg)" }}>
          <Label
            variant="badge"
            width={190}
            height={190}
            borderRadius={110}
            fontSize={90}
            backgroundColor={colors.word.pink}
            strokeWidth={1}
          >
            {level}
          </Label>
        </div>
      </div>
    </div>
  );
}