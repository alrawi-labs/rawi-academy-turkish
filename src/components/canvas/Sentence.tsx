// components/canvas/Sentence.tsx
import { useLayoutEffect, useState } from "react";
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

// Body'ye eklenip tek kelime/aday metin genişliği ölçmek için kullanılan,
// görünmez, "pre" (kırpılmayan) bir <span>.
function createMeasureSpan(dir: string | undefined, strokeWidth: number): HTMLSpanElement {
  const span = document.createElement("span");
  span.style.position = "fixed";
  span.style.visibility = "hidden";
  span.style.pointerEvents = "none";
  span.style.whiteSpace = "pre";
  span.style.left = "-99999px";
  span.style.top = "0";
  span.className = "font-black";
  if (dir) span.dir = dir;
  if (strokeWidth) span.style.webkitTextStroke = `${strokeWidth}px currentColor`;
  document.body.appendChild(span);
  return span;
}

// Tek bir mantıksal satırı (bir \n parçası), verilen contentWidth'e göre
// kelime kelime sararak birden fazla görsel satıra böler.
function wrapLineToWidth(
  text: string,
  contentWidth: number,
  measureSpan: HTMLSpanElement,
  fontSizePx: number,
): string[] {
  measureSpan.style.fontSize = `${fontSizePx}px`;
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const result: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    measureSpan.textContent = candidate;
    const width = measureSpan.scrollWidth;

    if (width <= contentWidth || !current) {
      // Sığıyor, ya da satır zaten boş (tek kelime bile sığmasa da taşırılır)
      current = candidate;
    } else {
      result.push(current);
      current = word;
    }
  }
  if (current) result.push(current);

  return result;
}

// Tüm mantıksal (\n ile ayrılmış) satırları sarıp düz bir görsel satır
// listesine çevirir. contentWidth yoksa hiçbir şey sarılmaz (eski davranış).
function wrapAllLines(
  rawLines: string[],
  contentWidth: number | undefined,
  dir: string | undefined,
  strokeWidth: number,
  fontSizePx: number,
): string[] {
  if (!contentWidth || contentWidth <= 0 || typeof document === "undefined") {
    return rawLines;
  }
  const measureSpan = createMeasureSpan(dir, strokeWidth);
  try {
    const result: string[] = [];
    for (const line of rawLines) {
      result.push(...wrapLineToWidth(line, contentWidth, measureSpan, fontSizePx));
    }
    return result.length ? result : rawLines;
  } finally {
    document.body.removeChild(measureSpan);
  }
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

  // \n ile ayrılmış "mantıksal" satırlar — henüz sarılmamış.
  const rawLines = children
    .split(/\r?\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);

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

  // 1) fit="shrink" ise: sarılmış toplam görsel satır sayısı maxLines'ı
  // aşmayana kadar fontu küçült.
  useLayoutEffect(() => {
    if (fit !== "shrink" || !contentWidth) return;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      let currentSize = cap;
      while (currentSize > 1) {
        const wrapped = wrapAllLines(rawLines, contentWidth, dir, strokeWidth, currentSize);
        if (wrapped.length <= maxLines) break;
        currentSize -= 1;
      }
      setFontSize(currentSize);
      onNaturalSize?.(currentSize);
    };
    waitForFonts(run);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, contentWidth, fit, cap, maxLines, dir, strokeWidth]);

  const activeFontSize =
    fit === "shrink" ? sizeOverride ?? fontSize : sizeOverride ?? size;

  // 2) Nihai boyutla, gerçekten render edilecek görsel satır listesini
  // hesapla (her biri kendi kutusunu/offsetini alacak).
  const [renderLines, setRenderLines] = useState<string[]>(rawLines);

  useLayoutEffect(() => {
    if (!contentWidth) {
      setRenderLines(rawLines);
      return;
    }
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      const wrapped = wrapAllLines(rawLines, contentWidth, dir, strokeWidth, activeFontSize);
      if (!cancelled) setRenderLines(wrapped);
    };
    waitForFonts(run);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, contentWidth, activeFontSize, dir, strokeWidth]);

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
      {renderLines.map((line, i) => {
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
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </span>
          </span>
        );
      })}
    </div>
  );

  if (
    top === undefined &&
    left === undefined &&
    right === undefined &&
    !centerX &&
    !centerY
  )
    return linesBlock;

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
      {linesBlock}
    </div>
  );
}