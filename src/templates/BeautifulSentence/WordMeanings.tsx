import ColloquialBG from "../../assets/templates/colloquial_usage/posts_bg.png";
import Label from "../../components/canvas/Label";
import PillListCard from "../../components/canvas/PillListCard";
import type { TemplateProps } from "../registry";
import type { BeautifulSentenceData } from "./types";

type PgData = Pick<
  BeautifulSentenceData,
  "sentence" | "meaning" | "wordMeanings" | "count"
>;

export default function BeautifulSentenceWordMeanings({
  data,
}: TemplateProps<PgData>) {
  const { sentence, meaning, wordMeanings, count } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ColloquialBG})` }}
    >
      <div
        style={{
          position: "absolute",
          top: "150px",
          left: "490px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Label fontSize={70} variant="badge" width={100} height={100}>
          {count}
        </Label>
      </div>

      <PillListCard
        width={870}
        top={300}
        left={50}
        title={sentence}
        titleSize={52}
        titleColor="black"
        titleAlign="left"
        subtitle={meaning}
        subtitleColor="pink"
        subtitleSize={52}
        subtitleAlign="right"
        maxBodyHeight={555}
        bodyPaddingY={40}
        titlePadding={30}
        rowGap={0}
        items={wordMeanings.map((w) => ({
          term: w.word,
          meaning: w.meaning,
        }))}
        termColor="black"
        meaningColor="pink"
      />
    </div>
  );
}
