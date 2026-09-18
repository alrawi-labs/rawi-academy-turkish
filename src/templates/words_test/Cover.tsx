import coverBg from "../../assets/templates/words_test/cover.png";
import Label from "../../components/canvas/Label";
import WordText from '../../components/canvas/WordText';
import type { TemplateProps } from "../registry";
import type { WordsTestData } from "./types";

type CoverData = Pick<WordsTestData, "level">;

export default function WordsTestCover({
  data,
}: TemplateProps<CoverData>) {
  const { level } = data;

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${coverBg})` }}
    >
<div style={{position: "absolute", top: "570px", left:"293px"}}>
    <Label fontSize={100} paddingY={20} strokeWidth={0.5}>
        {level + "  المستوى"}
      </Label>
</div>
  

  <WordText top={770} left={130} align="center" size={65} maxWidth={800}>اكتب إجاباتــك وستجد الحلــول
 في الصفحـة الأخيــــرة
    </WordText>

      

 
    </div>
  );
}