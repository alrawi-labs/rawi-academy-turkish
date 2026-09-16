import ColloquialBG from "../../assets/templates/colloquial_usage/posts_bg.png";
import Label from "../../components/canvas/Label";
import PillListCard from "../../components/canvas/PillListCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "sentence" | "translate">;

export default function ColloquialUsageTranslate({
  data,
}: TemplateProps<PgData>) {
  const { sentence, translate } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ColloquialBG})` }}
    >
      <div style={{ position: "absolute", top: "250px", left: "400px" }}>
        <Label fontSize={80} paddingBottom={35} paddingTop={15} paddingX={30}>
          الترجمة الحرفيـــة
        </Label>
      </div>

      <PillListCard
        width={870}
        top={420}
        left={50}
        title={sentence}
        titleSize={80}
        titleColor="black"
        maxBodyHeight={400}
        bodyPaddingY={20}
      >
        <WordText
          size={60}
          maxWidth={800}
          align="right"
          fit="wrap"
          maxHeight={300}
          dir="rtl"
          color="pink"
        >
          {`الترجمة الحرفية تكون ${translate}`}
        </WordText>
      </PillListCard>
    </div>
  );
}
