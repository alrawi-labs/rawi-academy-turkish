import AnswerBG from "../../assets/templates/quick_test/background.png";
import Sentence from "../../components/canvas/Sentence";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import { colors } from "../../design/tokens";
import type { TemplateProps } from "../registry";
import type { QuickTestData } from "./types";

// NOT: Cover'daki gibi, alt pembe yorum kutusu, logo, çizgiler ve tasarım
// öğeleri bu arka plan görselinin (answer_background.png) içinde varsayıldı.
// Eğer o kutu da dinamikse (örn. yorum metni değişiyorsa) ayrıca overlay olarak eklenmeli.

const TITLE_TOP_1 = 10;
const TITLE_RIGHT_1 = 250;
const TITLE_TOP_2 = 70;
const TITLE_RIGHT_2 = 375;
const TITLE_SIZE = 90;

const ANSWER_LABEL_TOP = 300;
const ANSWER_LABEL_RIGHT = 60;
const ANSWER_LABEL_SIZE = 130;

const ROW_TOP = 600;
const ROW_RIGHT = 50;
const BADGE_W = 80;
const BADGE_H = 110;
const BADGE_FONT = 75;
const BADGE_GAP = 6;
const WORD_SIZE = 80;
const WORD_PADDING_X = 12;
const WORD_PADDING_Y = 15;

const MEANING_TOP = 760;
const MEANING_RIGHT = 60;
const MEANING_SIZE = 90;
const MEANING_PADDING_X = 20;
const MEANING_PADDING_Y = 12;
const MEANING_MAX_WIDTH = 900;

const LETTERS = ["A", "B", "C", "D"];

type AnswerData = Pick<QuickTestData, "options" | "correctIndex" | "meaning">;

export default function QuickTestAnswer({ data }: TemplateProps<AnswerData>) {
  const { options, correctIndex, meaning } = data;
  const correctWord = options[correctIndex] ?? "";
  const correctLetter = LETTERS[correctIndex] ?? `${correctIndex + 1}`;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${AnswerBG})` }}
    >
      <WordText top={TITLE_TOP_1} right={TITLE_RIGHT_1} size={TITLE_SIZE}>
        اختبــــار
      </WordText>
      <WordText top={TITLE_TOP_2} right={TITLE_RIGHT_2} size={TITLE_SIZE}>
        سريـــــع
      </WordText>

      <WordText
        top={ANSWER_LABEL_TOP}
        right={ANSWER_LABEL_RIGHT}
        size={ANSWER_LABEL_SIZE}
      >
        الأجابة
      </WordText>

      {/* Doğru şık rozeti + kelime */}
      <div
        style={{
          position: "absolute",
          top: ROW_TOP,
          right: ROW_RIGHT,
          display: "flex",
          flexDirection: "row",
          direction: "ltr",
          alignItems: "center",
        }}
      >
        <Label
          fontSize={BADGE_FONT}
          textColor="white"
          variant="badge"
          width={BADGE_W}
          height={BADGE_H}
        >
          {correctLetter}
        </Label>

        <div style={{ width: BADGE_GAP + WORD_PADDING_X }} />

        <Sentence
          size={WORD_SIZE}
          align="right"
          maxLines={1}
          dir="ltr"
          color="white"
          backgroundColor={colors.word.pink}
          paddingX={WORD_PADDING_X}
          paddingY={WORD_PADDING_Y}
          strokeWidth={1}
        >
          {correctWord}
        </Sentence>
      </div>

      {/* Kelimenin anlamı (Arapça) */}
      <Sentence
        size={MEANING_SIZE}
        maxWidth={MEANING_MAX_WIDTH}
        align="right"
        maxLines={2}
        dir="rtl"
        color="black"
        top={MEANING_TOP}
        right={MEANING_RIGHT}
        backgroundColor={colors.word.pink}
        paddingX={MEANING_PADDING_X}
        paddingY={MEANING_PADDING_Y}
        strokeWidth={1}
      >
        {meaning}
      </Sentence>

      <WordText top={1050} centerX size={60} Width={600} align="center" backgroundColor={colors.word.pink} color="white" maxLines={2} maxHeight={100}>
        لا تنسى تكتبلنا بالتعليقات هل كانت اجابتك صحيحة
      </WordText>
    </div>
  );
}
