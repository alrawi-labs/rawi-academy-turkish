import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import OptionRow, {
  OPTION_ROW_VARIANTS,
  type OptionRowVariant,
} from "./OptionRow";

export type OptionItem = {
  number: string | number;
  word: string;
};

type OptionListAlign = "left" | "center" | "right";
type OptionListDir = "ltr" | "rtl";

// WordText'in varsayılan lineHeight'ı ile aynı olmalı (satır sayısı buna göre hesaplanıyor).
const LINE_HEIGHT = 1.3;

type OptionListProps = {
  items: OptionItem[];
  width: number;
  columns?: number;
  gapX?: number;
  gapY?: number;
  variant?: OptionRowVariant;
  size?: number;
  maxLines?: number;
  backgroundColor?: string;
  strokeWidth?: number;
  align?: OptionListAlign;
  dir?: OptionListDir;
  top?: string | number;
  left?: string | number;
};

export default function OptionList({
  items,
  width,
  columns = 1,
  gapX = 48,
  gapY = 40,
  variant = "default",
  size,
  maxLines = 2,
  backgroundColor,
  strokeWidth,
  align = "left",
  dir = "ltr",
  top,
  left,
}: OptionListProps) {
  const columnWidth = (width - gapX * (columns - 1)) / columns;

  // Tüm seçeneklerin başlayacağı (ve asla aşmayacağı) font boyutu.
  const baseSize = size ?? OPTION_ROW_VARIANTS[variant].size;

  const probeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [uniformSize, setUniformSize] = useState(baseSize);

  useLayoutEffect(() => {
    let cancelled = false;

    const runMeasure = () => {
      if (cancelled) return;
      let minFit = baseSize;

      for (const probe of probeRefs.current) {
        // display: contents wrapper'ın ilk çocuğu = WordText'in span'i
        const el = probe?.firstElementChild as HTMLElement | null;
        if (!el) continue;

        let currentSize = baseSize;
        const countLines = () => {
          el.style.fontSize = `${currentSize}px`;
          return Math.round(el.scrollHeight / (currentSize * LINE_HEIGHT));
        };
        while (countLines() > maxLines && currentSize > 1) currentSize -= 1;

        if (currentSize < minFit) minFit = currentSize;
      }

      // Bir seçenek küçüldüyse hepsi o boyuta iner.
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
  }, [items, baseSize, maxLines, columnWidth, variant, strokeWidth, dir]);

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`,
    columnGap: `${gapX}px`,
    rowGap: `${gapY}px`,
    width: `${width}px`,
    boxSizing: "border-box",
  };

  const positionStyle: CSSProperties =
    top === undefined && left === undefined
      ? { position: "relative", width: `${width}px` }
      : { position: "absolute", top, left, width: `${width}px` };

  return (
    <div style={positionStyle}>
      {/* Gizli ölçüm katmanı: gerçek liste ile aynı grid/genişlik/satır yapısı,
          her seçenek bağımsız olarak baseSize'tan başlayıp sığana kadar küçülür. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${width}px`,
          height: 0,
          overflow: "hidden",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div dir={dir} style={gridStyle}>
          {items.map((item, i) => (
            <OptionRow
              key={i}
              variant={variant}
              letter={String(item.number)}
              text={item.word}
              maxWidth={columnWidth}
              size={size}
              textSize={baseSize}
              backgroundColor={backgroundColor}
              strokeWidth={strokeWidth}
              align={align}
              dir={dir}
              measureRef={(el) => {
                probeRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      <div dir={dir} style={gridStyle}>
        {items.map((item, i) => (
          <OptionRow
            key={i}
            variant={variant}
            letter={String(item.number)}
            text={item.word}
            maxWidth={columnWidth}
            size={size}
            textSize={uniformSize}
            maxLines={maxLines}
            backgroundColor={backgroundColor}
            strokeWidth={strokeWidth}
            align={align}
            dir={dir}
          />
        ))}
      </div>
    </div>
  );
}