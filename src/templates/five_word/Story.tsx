import { useMemo, useState } from "react";
import StoryBG from "../../assets/templates/five_word/story.png";
import Sentence from "../../components/canvas/Sentence";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { FiveWordData } from "./types";

type StoryData = Pick<FiveWordData, "where">;



export default function FiveWordStory({ data }: TemplateProps<StoryData>) {
  const {
    where,
  } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${StoryBG})` }}
    >
       <Sentence
        size={195}
        maxWidth={880}
        align="center"
        maxLines={1}
        dir="rtl"
        color="white"
        top={850}
        right={105}
        backgroundColor={colors.word.pink}
        offsetTop={5}
        paddingBottom={5}
        paddingX={1}
      >
        {where}
      </Sentence>

    </div>
  );
}

