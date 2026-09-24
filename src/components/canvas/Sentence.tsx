// components/canvas/Sentence.tsx
import { useLayoutEffect, useRef, useState } from "react";
import { colors, type WordColor } from "../../design/tokens";

type SentenceProps = {
  children: string; // "\n" ile ayrılmış satırlar
  size?: number;
  maxSize?: number;
  Width?: number;
  maxWidth?: number;
  align?: "left" | "center" | "right";
  top?: number;
  left?: number;
  right?: number;
  centerX?: boolean;
  centerY?: boolean;
  dir?: "ltr" | "rtl";
  fit?: "shrink" | "none";
  maxLines?: number;
  lineGap?: number;
  color?: WordColor | (string & {});
  strokeWidth?: number;

  backgroundColor?: string;
  borderRadius?: number;
  paddingX?: number;
  paddingY?: number;
  paddingTop?: number;
  paddingBottom?: number;
  offsetTop?: number;
  offsetBottom?: number;

  stagger?: number;
  staggerReverse?: boolean;

  onNaturalSize?: (size: number) => void;
  sizeOverride?: number;
};

// Bir elemanın (word-wrap sonrası) kaç görsel satıra yayıldığını sayar.
// Satır sonu bir width/font-metrics fonksiyonudur, line-height'tan etkilenmez,
// bu yüzden ölçüm elemanının satır yüksekliği render'dakiyle aynı olmak
// zorunda değil.
function countWrappedLines(el: HTMLElement): number {
  const text = el.textContent;
  if (!text || text.trim() === "") return 0;
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects());
  if (rects.length === 0) return 1;
  const tops = new Set<number>();
  for (const r of rects) {
    tops.add(Math.round(r.top));
  }
  return Math.max(1, tops.size);
}

export default function Sentence({
  children,
  size = 65,
  maxSize,
  Width,
  maxWidth,
  align = "center",
  top,
  left,
  right,
  centerX = false,
  centerY = false,
  dir,
  fit = "shrink",
  maxLines = 2,
  lineGap = 6,
  color = "black",
  strokeWidth = 0,
  backgroundColor = "#ff2daa",
  borderRadius = 2,
  paddingX = 14,
  paddingY = 3,
  paddingTop,
  paddingBottom,
  offsetTop = 0,
  offsetBottom = 0,
  stagger = 0,
  staggerReverse = false,
  onNaturalSize,
  sizeOverride,
}: SentenceProps) {
  const resolvedWidth = Width ?? maxWidth;
  const contentWidth = resolvedWidth ? Math.max(0, resolvedWidth - paddingX * 2) : undefined;

  const resolvedPaddingTop = paddingTop ?? paddingY;
  const resolvedPaddingBottom = paddingBottom ?? paddingY;
  const resolvedOffsetTop = offsetTop ?? 0;
  const resolvedOffsetBottom = offsetBottom ?? 0;

  const resolvedColor = colors.word[color as WordColor] ?? color;

  // NOT: Artık maxLines'a göre kesmiyoruz — kaç görsel satır tutacağını
  // wrap + shrink döngüsü belirliyor.
  const lines = children
    .split(/\r?\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cap = maxSize ?? size;
  const [fontSize, setFontSize] = useState(cap);

  const waitForFonts = (cb: () => void) => {
    if (
      typeof document !== "undefined" &&
      "fonts" in document &&
      document.fonts.status !== "loaded"
    ) {
      document.fonts.ready.then(cb);
    } else {
      cb();
    }
  };

  // Kendi doğal boyutunu hesapla: her font boyutunda tüm satırların
  // (wrap edilmiş hâliyle) toplam görsel satır sayısını ölç, maxLines'a
  // sığana kadar küçült.
  useLayoutEffect(() => {
    if (fit !== "shrink" || !contentWidth) return;
    let cancelled = false;
    const runMeasure = () => {
      if (cancelled) return;
      let currentSize = cap;

      const totalLinesAt = (fontSizePx: number) => {
        let total = 0;
        for (const el of measureRefs.current) {
          if (!el) continue;
          el.style.fontSize = `${fontSizePx}px`;
          total += countWrappedLines(el);
        }
        return total;
      };

      while (totalLinesAt(currentSize) > maxLines && currentSize > 1) {
        currentSize -= 1;
      }

      setFontSize(currentSize);
      onNaturalSize?.(currentSize);
    };
    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, contentWidth, fit, cap, maxLines]);

  const activeFontSize =
    fit === "shrink" ? sizeOverride ?? fontSize : sizeOverride ?? size;

  const measureBlock = (
    <div
      aria-hidden
      style={{
        position: "fixed",
        visibility: "hidden",
        pointerEvents: "none",
        left: -99999,
        top: 0,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el) => {
            measureRefs.current[i] = el;
          }}
          dir={dir}
          className="font-black"
          style={{
            fontSize: `${size}px`,
            WebkitTextStroke: strokeWidth ? `${strokeWidth}px currentColor` : undefined,
            width: contentWidth ? `${contentWidth}px` : undefined,
            whiteSpace: contentWidth ? "normal" : "nowrap",
            wordBreak: "break-word",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );

  const justify =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  const linesBlock = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: justify,
        gap: `${lineGap}px`,
        width: resolvedWidth ? `${resolvedWidth}px` : undefined,
      }}
    >
      {lines.map((line, i) => {
        const isOdd = i % 2 === 1;
        const shift = isOdd ? stagger : 0;
        const finalShift = staggerReverse ? -shift : shift;

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              lineHeight: 1,
              transform: finalShift ? `translateX(${finalShift}px)` : undefined,
              maxWidth: contentWidth ? `${contentWidth}px` : undefined,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: `${-resolvedPaddingTop + resolvedOffsetTop}px`,
                bottom: `${-resolvedPaddingBottom + resolvedOffsetBottom}px`,
                left: `${-paddingX}px`,
                right: `${-paddingX}px`,
                backgroundColor,
                borderRadius: `${borderRadius}px`,
              }}
            />
            <span
              dir={dir}
              className="font-black"
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: `${activeFontSize}px`,
                WebkitTextStroke: strokeWidth ? `${strokeWidth}px currentColor` : undefined,
                color: resolvedColor,
                whiteSpace: contentWidth ? "normal" : "nowrap",
                wordBreak: "break-word",
                textAlign: align,
                maxWidth: contentWidth ? `${contentWidth}px` : undefined,
              }}
            >
              {line}
            </span>
          </span>
        );
      })}
    </div>
  );

  const wrapped = (
    <>
      {measureBlock}
      {linesBlock}
    </>
  );

  if (
    top === undefined &&
    left === undefined &&
    right === undefined &&
    !centerX &&
    !centerY
  )
    return wrapped;

  const horizontal =
    right !== undefined
      ? { right: `${right}px` }
      : { left: left !== undefined ? `${left}px` : centerX ? "50%" : undefined };

  return (
    <div
      className="absolute"
      style={{
        top: top !== undefined ? `${top}px` : centerY ? "50%" : undefined,
        ...horizontal,
        transform:
          centerX && centerY && right === undefined
            ? "translate(-50%, -50%)"
            : centerX && right === undefined
              ? "translateX(-50%)"
              : centerY
                ? "translateY(-50%)"
                : undefined,
      }}
    >
      {wrapped}
    </div>
  );
}