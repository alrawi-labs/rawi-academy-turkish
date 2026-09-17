import CtaBg from "../../assets/templates/translation_test/posts_bg.png";
import WordText from "../../components/canvas/WordText";
import Label from "../../components/canvas/Label";
import type { TemplateProps } from "../registry";

// Bu sayfa tamamen sabit — n8n'den hiçbir veri beklemiyor.
// Her çeviri testinde aynı "yorumlara yaz" çağrısı gösteriliyor.
export default function TranslationTestCTA({}: TemplateProps<Record<string, never>>) {
  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${CtaBg})` }}
    >
      <WordText
        size={120}
        maxWidth={900}
        align="center"
        top="260px"
        left="100px"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
      >
        اكتب جوابـك
      </WordText>

      <div style={{ position: "absolute", top: "500px", left: "290px" }}>
        <Label
          variant="label"
          backgroundColor="#ff2daa"
          textColor="white"
          fontSize={130}
          paddingX={26}
          paddingY={30}
        >
          بالتعليقات
        </Label>
      </div>

      {/* Sabit açıklama — 3 ayrı satır, WordText ile.
          Ortadaki satır iki renk taşıdığı için WordSegment[] kullanılıyor,
          son satır ise diğerlerinden büyük punto olduğu için ayrı bir WordText. */}
      <WordText
        size={75}
        maxWidth={980}
        align="center"
        top="680px"
        left="50px"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
      >
        وبعد ساعـة راح
      </WordText>

      <WordText
        size={75}
        maxWidth={980}
        align="center"
        top="785px"
        left="50px"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
      >
        {[
          { text: "ننشر الحـل" },
          { text: "ان شاء الله", color: "pink" },
        ]}
      </WordText>

      <WordText
        size={90}
        maxWidth={980}
        align="center"
        top="890px"
        left="50px"
        fit="wrap"
        maxLines={1}
        dir="rtl"
        color="black"
      >
        فكــن قريب!
      </WordText>
    </div>
  );
}