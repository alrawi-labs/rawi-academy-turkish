import { useLayoutEffect, useRef, useState } from "react";
import bodyImg from "../../assets/note_card/body.png";
import newTailImg from "../../assets/note_card/tail_Pill.png";
import type { WordColor } from "../../design/tokens";
import PillRow from "./PillRow";
import NoteCard from "./NoteCard";

export type PillListCardItem = {
  term: string;
  meaning: string;
  label?: string; // opsiyonel — dışarıdan her satır için ayrı ayrı belirlenir
};

type PillListCardProps = {
  width: number;
  top: number;
  left: number;

  // Başlık (NoteCard) parametreleri — artık dışarıdan
  title: string;
  titleColor?: WordColor | (string & {});
  titleSize?: number;
  titlePadding?: number;
  headerBodyPaddingY?: number;
  number?: number;
  numberBackgroundColor?: string;
  numberTextColor?: string;

  // Liste (şerit) parametreleri
  items: PillListCardItem[];
  maxBodyHeight?: number;
  bodyPaddingY?: number;
  rowGap?: number;
  horizontalPadding?: number;
  termWidthRatio?: number;
  size?: number;
  maxLines?: number;
  lineHeight?: number;
  termColor?: WordColor | (string & {});
  meaningColor?: WordColor | (string & {});
  stripOffset?: number; 
};

export default function PillListCard({
  width,
  top,
  left,
  title,
  titleColor = "black",
  titleSize = 90,
  titlePadding = 0,
  headerBodyPaddingY = 0,
  number,
  numberBackgroundColor,
  numberTextColor,
  items,
  maxBodyHeight = 660,
  bodyPaddingY = 40,
  rowGap = 28,
  horizontalPadding = 40,
  termWidthRatio = 0.45,
  size = 44,
  maxLines = 2,
  lineHeight = 1.3,
  termColor = "pink",
  meaningColor = "black",
  stripOffset = -40,
}: PillListCardProps) {
  const contentWidth = width - horizontalPadding * 2;
  const termWidth = contentWidth * termWidthRatio;
  const meaningWidth = contentWidth * (1 - termWidthRatio);

  const termRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const meaningRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [uniformSize, setUniformSize] = useState(size);

  useLayoutEffect(() => {
    let cancelled = false;
    const runMeasure = () => {
      if (cancelled) return;
      let minFit = size;

      for (const el of termRefs.current) {
        if (!el) continue;
        let currentSize = size;
        const measure = () => {
          el.style.fontSize = `${currentSize}px`;
          return el.scrollWidth;
        };
        while (measure() > termWidth && currentSize > 1) currentSize -= 1;
        if (currentSize < minFit) minFit = currentSize;
      }

      for (const el of meaningRefs.current) {
        if (!el) continue;
        let currentSize = size;
        const countLines = () => {
          el.style.fontSize = `${currentSize}px`;
          const lineHeightPx = currentSize * lineHeight;
          return Math.round(el.scrollHeight / lineHeightPx);
        };
        while (countLines() > maxLines && currentSize > 1) currentSize -= 1;
        if (currentSize < minFit) minFit = currentSize;
      }

      setUniformSize(minFit);
    };

    if (
      typeof document !== "undefined" &&
      "fonts" in document &&
      document.fonts.status !== "loaded"
    ) {
      document.fonts.ready.then(runMeasure);
    } else {
      runMeasure();
    }
    return () => {
      cancelled = true;
    };
  }, [items, termWidth, meaningWidth, size, maxLines, lineHeight]);

  return (
  <div
    style={{
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div style={{ position: "relative", zIndex: 2 }}>
      <NoteCard
        width={width + width / 6}
        topText={title}
        bottomText=""
        topTextColor={titleColor}
        topSize={titleSize}
        textPadding={titlePadding}
        bodyPaddingY={headerBodyPaddingY}
        number={number}
        numberBackgroundColor={numberBackgroundColor}
        numberTextColor={numberTextColor}
      />
    </div>

    <div style={{ position: "relative", width: `${width}px`, zIndex: 1 }}>
        {/* Gizli ölçüm — term (genişlik bazlı) */}
        <div
          style={{
            position: "absolute",
            visibility: "hidden",
            height: 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                termRefs.current[i] = el;
              }}
              style={{
                fontWeight: 900,
                WebkitTextStroke: "0.6px currentColor",
                display: "inline-block",
              }}
            >
              {item.term}
            </span>
          ))}
        </div>

        {/* Gizli ölçüm — meaning (satır sayısı bazlı) */}
        <div
          style={{
            position: "absolute",
            visibility: "hidden",
            height: 0,
            overflow: "hidden",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                meaningRefs.current[i] = el;
              }}
              dir="rtl"
              style={{
                fontWeight: 900,
                WebkitTextStroke: "0.6px currentColor",
                width: `${meaningWidth}px`,
                wordBreak: "break-word",
                boxSizing: "border-box",
              }}
            >
              {item.meaning}
            </div>
          ))}
        </div>
<div
  style={{
    width: "100%", // 90% -> 100% düzeltildi, head/tail ile hizalı olsun diye
    maxHeight: maxBodyHeight ? `${maxBodyHeight}px` : undefined,
    overflow: "hidden",
    backgroundImage: `url(${bodyImg})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    gap: `${rowGap}px`,
    padding: `${bodyPaddingY}px ${horizontalPadding}px`,
    boxSizing: "border-box",
    marginTop: `${stripOffset}px`,
  }}
>
  {items.map((item, i) => (
    <PillRow
      key={i}
      term={item.term}
      label={item.label}
      meaning={item.meaning}
      termSize={uniformSize}
      meaningSize={uniformSize}
      termWidth={termWidth}
      meaningWidth={meaningWidth}
      termColor={termColor}
      meaningColor={meaningColor}
    />
  ))}
</div>

        <img src={newTailImg} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  );
}
