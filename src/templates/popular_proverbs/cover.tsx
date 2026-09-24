import { useLayoutEffect, useRef, useState } from "react";
import CoverBG from "../../assets/templates/popular_proverbs/cover.png";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { PopularProverbsData } from "./types";
import { colors } from "../../design/tokens";
import Sentence from "../../components/canvas/Sentence";

type PgData = Pick<PopularProverbsData, "proverbs">;

export default function PopularProverbsCover({ data }: TemplateProps<PgData>) {
  const { proverbs } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <Sentence
        size={70}
        Width={750}
        align="center"
        maxLines={2}
        stagger={30}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        paddingX={14}
        paddingY={4}
        top={620}
        left={630}
        centerX
        lineGap={15}
        offsetBottom={0}
        offsetTop={0}
      >
        {proverbs}
      </Sentence>
    </div>
  );
}
