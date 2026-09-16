import ColloquialBG from "../../assets/templates/colloquial_usage/posts_bg.png";
import Label from "../../components/canvas/Label";
import PillListCard from "../../components/canvas/PillListCard";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "sentence" | "colloquial_tr" | "wordMeanings">;

export default function ColloquialUsageWordMeanings({
  data,
}: TemplateProps<PgData>) {
  const { sentence, colloquial_tr, wordMeanings } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ColloquialBG})` }}
    >

      <PillListCard
        width={870}
        top={200}
        left={50}
        title={sentence}
        titleSize={52}
        titleColor="black"
        titleAlign="left"
        subtitle={colloquial_tr}
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