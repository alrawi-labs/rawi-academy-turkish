import CoverBG from "../../assets/templates/stories/sentence_of_day.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import Sentence from "../../components/canvas/Sentence";
import { colors } from '../../design/tokens';
import type { TemplateProps } from "../registry";
import type { SentenceOfDayData } from "./types";
import Label from "../../components/canvas/Label";


export default function StoriesSentenceOfDay({
  data,
}: TemplateProps<SentenceOfDayData>) {
  const { sentenceAr, sentenceTr } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      

      <Sentence
        size={70}
        maxWidth={1080}
        align="left"
        maxLines={1}
        dir="rtl"
        color="black"
        top={900}
        left={0}
        offsetBottom={15}
        offsetTop={20}
      >
        {sentenceAr}
      </Sentence>

      <Sentence
        size={68}
        maxWidth={950}
        align="right"
        maxLines={1}
        dir="rtl"
        color="black"
        top={1090}
        right={0}
        offsetBottom={15}
        offsetTop={20}
      >
        {sentenceTr}
      </Sentence>

      
    </div>
  );
}
