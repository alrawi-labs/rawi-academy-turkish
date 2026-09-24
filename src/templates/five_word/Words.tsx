import { useMemo, useState } from "react";
import WordsBG from "../../assets/templates/five_word/posts_bg.png";
import Sentence from "../../components/canvas/Sentence";
import { colors } from '../../design/tokens';
import type { TemplateProps } from "../registry";
import type { FiveWordData } from "./types";
import Label from '../../components/canvas/Label';

type PgData = Pick<FiveWordData, "where" | "words">;

const WORD_SIZE = 80;        // ortak font boyutu — tek yerden yönet
const ROW_LEFT = 180;        // tüm satırların sabit sol başlangıcı
const ROW_START_TOP = 500;   // ilk satırın (1. kelime) top konumu
const ROW_GAP = 110;         // satırlar arası dikey mesafe
const NUMBER_GAP = 24;       // numara ile kelime arası yatay boşluk

export default function FiveWordWords({ data }: TemplateProps<PgData>) {
  const { where, words } = data;

  // Numaralar dahil tüm kelimeler için tek bir senkronize font boyutu
  const naturalSizes = useRefSizes(words.length);

  const sharedSize = useMemo(() => {
    const collected = naturalSizes.filter((s): s is number => s !== null);
    if (collected.length < words.length) return WORD_SIZE; // henüz hepsi rapor vermedi
    return Math.min(...collected);
  }, [naturalSizes, words.length]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${WordsBG})` }}
    >
      <Sentence
        size={65}
        maxWidth={650}
        align="center"
        maxLines={1}
        dir="rtl"
        color="white"
        top={120}
        right={45}
        backgroundColor={colors.word.pink}
        offsetTop={5}
        paddingBottom={5}
        paddingX={1}
      >
        {where}
      </Sentence>

      <Sentence
        size={130}
        maxWidth={1050}
        align="center"
        maxLines={1}
        dir="rtl"
        color="black"
        top={250}
        backgroundColor="transparent"
        centerX
        strokeWidth={1}
      >
        الكلمـــات
      </Sentence>

      {/* Kelime listesi: numara + dar pembe vurgulu kelime, sabit sol kenardan */}
      {words.map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: ROW_START_TOP + i * ROW_GAP,
            left: ROW_LEFT,
            display: "flex",
            flexDirection: "row",
            direction: "ltr", // "1 Bardak" sırası her zaman soldan sağa
            alignItems: "center",
          }}
        >
          {/* Numara — vurgusuz, siyah */}
          {/* <span
            className="font-black p-3 m-0"
            style={{
              fontSize: `${sharedSize}px`,
              color: "black",
              WebkitTextStroke: "1px currentColor",
              lineHeight: 1,
              backgroundColor: colors.word.pink
            }}
          >
            {i + 1}
          </span> */}

          <Label fontSize={sharedSize} textColor="black" variant="badge" width={70} height={80}>
            {`${i + 1}`}
          </Label>

          <div style={{width: "10px"}} >

          </div>

          {/* Kelime — dar pembe vurgu, sadece kelimenin kendisi kadar geniş */}
          <Sentence
            size={WORD_SIZE}
            maxWidth={900}
            align="left"
            maxLines={1}
            dir="ltr"
            color="black"
            backgroundColor={colors.word.pink}
            strokeWidth={1}
            offsetBottom={20}
            offsetTop={30}
            onNaturalSize={naturalSizes.report(i)}
            sizeOverride={sharedSize}
          >
            {item.word}
          </Sentence>
        </div>
      ))}
      <Sentence
        size={100}
        maxWidth={600}
        align="right"
        maxLines={3}
        maxSize={140}
        dir="rtl"
        color="black"
        top={1130}
        backgroundColor="transparent"
        right={90}
        strokeWidth={0.5}
      >
        اقلب الصفحــــة لنتعرف
      </Sentence>
      <Sentence
        size={30}
        maxWidth={680}
        align="center"
        maxLines={3}
        maxSize={140}
        dir="rtl"
        color="black"
        top={1200}
        backgroundColor="transparent"
        right={40}
        strokeWidth={0.5}
      >
        على استخدامات كل واحـــدة
      </Sentence>
    </div>
  );
}

// Birden fazla Sentence'ın doğal boyutlarını toplamak için küçük yardımcı hook.
function useRefSizes(count: number) {
  const [sizes, setSizes] = useState<(number | null)[]>(
    () => Array(count).fill(null)
  );

  return Object.assign(sizes, {
    report: (index: number) => (size: number) => {
      setSizes((prev) => {
        if (prev[index] === size) return prev;
        const next = [...prev];
        next[index] = size;
        return next;
      });
    },
  }) as (number | null)[] & { report: (index: number) => (size: number) => void };
}