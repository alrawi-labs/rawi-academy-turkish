import questionBG from "../../assets/templates/one_word_many_uses/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { OneWordManyUsesData } from "./types";

type PgData = Pick<OneWordManyUsesData, "question">;

export default function OneWordManyUsesQuestion({ data }: TemplateProps<PgData>) {
  const { question } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${questionBG})` }}
    >
      {/* Başlık rozeti — "اختبر نفسك", diğer sayfayla aynı sol hizalı konum */}
      <WordText
        size={100}
        maxWidth={1300}
        align="left"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor={colors.word.pink}
        top={330}
        left={90}
        padding={20}
        strokeWidth={0.6}
      >
        اختبر نفسك
      </WordText>

      {/* Yönerge — "ترجم الجملة التالية", düz metin */}
      <WordText
        size={65}
        maxWidth={1400}
        align="center"
        fit="shrink"
        maxLines={1}
        dir="rtl"
        color="black"
        top={750}
        centerX
        strokeWidth={0.6}
      >
        ترجم الجملة التالية
      </WordText>

      {/* Çevrilecek cümle — pembe zemin, siyah metin, 2 satıra kadar sarabilir */}
      <WordText
        size={72}
        Width={1400}
        maxWidth={1400}
        align="left"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        backgroundColor={colors.word.pink}
        top={950}
        left={90}
        padding={20}
        lineHeight={1.3}
        strokeWidth={0.6}
      >
        {question}
      </WordText>

      {/* Alt talimat — "اكتب اجابتك في التعليقات قبل ان تقلب الصفحة" */}
      <WordText
        size={55}
        maxWidth={1400}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        top={1450}
        centerX
        lineHeight={1.4}
        strokeWidth={0.6}
      >
        اكتب اجابتك في التعليقات قبل ان تقلب الصفحة
      </WordText>
    </div>
  );
}