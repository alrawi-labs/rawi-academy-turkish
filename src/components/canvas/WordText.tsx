import { useLayoutEffect, useRef, useState } from "react";
import { colors, type WordColor } from "../../design/tokens";

type WordTextProps = {
  children: string;
  size?: number;
  maxWidth?: number;
  padding?: number;
  align?: "left" | "center" | "right";
  top?: string | number;
  left?: string | number;
  fit?: "wrap" | "shrink";
  maxSize?: number;
  centerY?: boolean;
  color?: WordColor | (string & {});
  dir?: "ltr" | "rtl";
  maxLines?: number; // 'wrap' modunda bu satır sayısını aşarsa font otomatik küçülür
  lineHeight?: number; // satır yükseklik çarpanı (varsayılan 1.3) — maxLines hesaplaması bunu kullanır
};

export default function WordText({
  children,
  size = 72,
  maxWidth,
  padding = 0,
  align = "left",
  top,
  left,
  fit = "wrap",
  maxSize,
  centerY = false,
  color = "black",
  dir,
  maxLines,
  lineHeight = 1.3,
}: WordTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cap = maxSize ?? size;
  const [fittedSize, setFittedSize] = useState(cap); // 'shrink' modu için (genişlik bazlı)
  const [wrappedSize, setWrappedSize] = useState(size); // 'wrap' + maxLines için (satır bazlı)

  const resolvedColor = colors.word[color as WordColor] ?? color;

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

  // --- 'shrink' modu: tek satır, genişliğe göre küçül/büyü ---
  useLayoutEffect(() => {
    if (fit !== "shrink" || !maxWidth || !spanRef.current) return;

    let cancelled = false;
    const contentWidth = maxWidth - padding * 2;

    const runMeasure = () => {
      if (cancelled || !spanRef.current) return;
      let currentSize = cap;

      const measure = () => {
        if (!spanRef.current) return 0;
        spanRef.current.style.fontSize = `${currentSize}px`;
        return spanRef.current.scrollWidth - padding * 2;
      };

      while (measure() > contentWidth && currentSize > 1) {
        currentSize -= 1;
      }

      setFittedSize(currentSize);
    };

    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
  }, [children, maxWidth, padding, fit, cap]);

  // --- 'wrap' modu + maxLines: satır sayısını aşarsa font küçült ---
  useLayoutEffect(() => {
    if (fit !== "wrap" || !maxLines || !maxWidth || !spanRef.current) return;

    let cancelled = false;

    const runMeasure = () => {
      if (cancelled || !spanRef.current) return;
      let currentSize = size;

      const countLines = () => {
        if (!spanRef.current) return 0;
        spanRef.current.style.fontSize = `${currentSize}px`;
        const lineHeightPx = currentSize * lineHeight;
        return Math.round(spanRef.current.scrollHeight / lineHeightPx);
      };

      while (countLines() > maxLines && currentSize > 1) {
        currentSize -= 1;
      }

      setWrappedSize(currentSize);
    };

    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
  }, [children, maxWidth, padding, fit, maxLines, size, lineHeight]);

  const activeFontSize =
    fit === "shrink" ? fittedSize : maxLines ? wrappedSize : size;

  const textSpan = (
    <span
      ref={spanRef}
      dir={dir}
      className="font-black"
      style={{
        fontSize: `${activeFontSize}px`,
        WebkitTextStroke: "0.6px currentColor",
        lineHeight: fit === "wrap" ? lineHeight : undefined,
        color: resolvedColor,
        display: "block",
        width: maxWidth ? `${maxWidth}px` : undefined,
        paddingLeft: padding ? `${padding}px` : undefined,
        paddingRight: padding ? `${padding}px` : undefined,
        boxSizing: "border-box",
        wordBreak: fit === "wrap" ? "break-word" : undefined,
        whiteSpace: fit === "shrink" ? "nowrap" : undefined,
        overflow: fit === "shrink" ? "hidden" : undefined,
        textAlign: align,
      }}
    >
      {children}
    </span>
  );

  if (top === undefined && left === undefined) {
    return textSpan;
  }

  return (
    <div
      className="absolute"
      style={{ top, left, transform: centerY ? "translateY(-50%)" : undefined }}
    >
      {textSpan}
    </div>
  );
}
