import meaningBg from "../../assets/templates/gramer_of_day/posts_bg.png";
import NoteCard from "../../components/canvas/NoteCard";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { GramerOfDayFormationData } from "./types";

const BOX_WIDTH = 750;
const BOX_LEFT = (1080 - BOX_WIDTH) / 2;

function FormationBox({ top, text }: { top: number; text: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${BOX_LEFT}px`,
        width: `${BOX_WIDTH}px`,
        backgroundColor: "#ff2daa",
        padding: "16px 24px",
        boxSizing: "border-box",
      }}
    >
      <WordText
        fit="wrap"
        maxWidth={BOX_WIDTH - 48}
        size={50}
        color="white"
        align="center"
        maxLines={1}
         strokeWidth={0}
      >
        {text}
      </WordText>
    </div>
  );
}

export default function GramerOfDayFormation({
  data,
}: TemplateProps<GramerOfDayFormationData>) {
  const { formula, example1, example2 } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${meaningBg})` }}
    >
      {/* Başlık */}
      <WordText top={220} centerX size={90} align="center">
        تكويـن الجملــة
      </WordText>

      {/* Formül - yırtık kağıt kart */}
      <NoteCard
        width={950}
        maxBodyHeight={220}
        topText={formula}
        topSize={60}
        topTextColor="black"
        top="380px"
        centerX={true}
        bodyPaddingY={20}
        textPadding={20}
      />

      {/* Örnek 1 */}
      <WordText color="pink"  top={630} centerX align="center" size={70}>
        مثـــال
      </WordText>
      <FormationBox top={730} text={example1.full} />

      <WordText top={850} centerX align="center" size={70}>
        نفككها
      </WordText>
      <FormationBox top={950} text={example1.split} />

      {/* Örnek 2 */}
      <WordText top={1070} centerX align="center" size={70}>
        مثـال اخـر
      </WordText>
      <FormationBox top={1180} text={example2.full} />
      <FormationBox top={1300} text={example2.split} />
    </div>
  );
}