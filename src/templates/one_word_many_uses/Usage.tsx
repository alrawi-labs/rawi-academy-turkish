import usageBG from "../../assets/templates/one_word_many_uses/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import Label from "../../components/canvas/Label";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { OneWordManyUsesData } from "./types";

// OneWordManyUsesData sadece `word` içeriyor — bu sayfa için gereken ek alanları
// burada tanımladım. Ana tipe eklemek istersen aynı isimlerle taşıyabilirsin,
// ya da birden çok kullanım için bir `usages: {...}[]` dizisi tutup registry'de
// bu şablona tek bir kullanımı seçerek geçirebilirsin.

type PgData = Pick<
  OneWordManyUsesData,
  "word" | "number" | "meaning" | "example" | "exampleMeaning"
>;

export default function OneWordManyUsesUsage({ data }: TemplateProps<PgData>) {
  const { word, number, meaning, example, exampleMeaning } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${usageBG})` }}
    >
      {/* Numara rozeti — sağ üstte sabit köşe kutusu */}
      <div style={{ position: "absolute", top: "230px", right: "-10px" }}>
        <Label
          variant="badge"
          width={180}
          height={230}
          fontSize={170}
          backgroundColor={colors.word.pink}
          textColor="white"
          strokeWidth={0.6}
        >
          {String(number)}
        </Label>
      </div>
      <WordText
        size={100}
        maxSize={100}
        maxWidth={880}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="ltr"
        color="white"
        backgroundColor={colors.word.pink}
        top={230}
        right={190}
        padding={20}
        maxHeight={230}
      >
        {word}
      </WordText>

      <WordText
        size={100}
        maxSize={100}
        maxWidth={880}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="ltr"
        color="white"
        backgroundColor={colors.word.pink}
        top={480}
        centerX
        padding={20}
      >
        {meaning}
      </WordText>

<WordText
        size={65}
        maxWidth={1000}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="black"
        top={680}
        right={90}
        strokeWidth={0.6}
      >
        مثـــال
      </WordText>

<WordText
        size={58}
        maxWidth={900}
        align="left"
        fit="wrap"
        maxLines={2}
        dir="ltr"
        color="white"
        backgroundColor={colors.word.pink}
        top={850}
        left={90}
        padding={20}
        lineHeight={1.3}
        strokeWidth={0.6}
      >
        {example}
      </WordText>
<WordText
        size={58}
        maxWidth={900}
        align="right"
        fit="wrap"
        maxLines={2}
        dir="ltr"
        color="white"
        backgroundColor={colors.word.pink}
        top={1030}
        right={90}
        padding={20}
        lineHeight={1.3}
        strokeWidth={0.6}
      >
        {exampleMeaning}
      </WordText>

   
    </div>
  );
}
