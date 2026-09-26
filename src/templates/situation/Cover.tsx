import CoverBG from "../../assets/templates/situation/cover.png";
import Sentence from "../../components/canvas/Sentence";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { SituationData } from "./types";

// NOT: Logo, "أضفها إلى محفوظاتك" yazısı, instagram hesabı ve fotoğraf
// (İstanbul gün batımı) bu arka plan görselinin (background.png) içinde
// varsayıldı — diğer  şablonlarındaki mantığın aynısı.

export default function Situation({ data }: TemplateProps<SituationData>) {
  const {
    level,
    situation,
    turkishPhrase,
    connector,
    answerPhrase,
  } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      {/* Seviye rozeti */}
      <Sentence
        size={70}
        maxWidth={400}
        align="right"
        maxLines={1}
        dir="rtl"
        color="white"
        backgroundColor="transparent"
        top={60}
        right={30}
        paddingX={30}
        paddingY={15}
        strokeWidth={1}
      >
        {`المستوى ${level}`}
      </Sentence>


      {/* Senaryo cümlesi */}
      <Sentence
        size={70}
        maxWidth={1080}
        align="center"
        maxLines={2}
        dir="rtl"
        color="black"
        backgroundColor="transparent"
        top={600}
        centerX
      >
        {situation}
      </Sentence>

      {/* Türkçe ifade (pembe vurgu kutusu) */}
      <Sentence
        size={70}
        maxWidth={1080}
        align="center"
        maxLines={1}
        dir="ltr"
        color="black"
        backgroundColor={colors.word.pink}
        top={750}
        centerX
        offsetBottom={15}
        offsetTop={35}
        strokeWidth={1}
      >
        {turkishPhrase}
      </Sentence>

      {/* Bağlayıcı cümle */}
      <Sentence
        size={70}
        maxWidth={1080}
        align="center"
        maxLines={1}
        dir="rtl"
        color="black"
        top={850}
        centerX
        backgroundColor="transparent"
      >
        {connector}
      </Sentence>

      {/* Cevap ifadesi (pembe vurgu kutusu) */}
      <Sentence
        size={70}
        maxWidth={1080}
        align="center"
        maxLines={1}
        dir="rtl"
        color="black"
        backgroundColor={colors.word.pink}
        top={990}
        centerX
        offsetBottom={15}
        offsetTop={35}
        strokeWidth={1}
      >
        {answerPhrase}
      </Sentence>
    </div>
  );
}