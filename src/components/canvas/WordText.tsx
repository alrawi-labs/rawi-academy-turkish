import { useLayoutEffect, useRef, useState } from "react";
import { colors, type WordColor } from "../../design/tokens";

export type WordSegment = {
  text: string;
  color?: WordColor | (string & {});
};

type WordTextProps = {
  children: string | WordSegment[];
  size?: number;
  Width?: number;
  maxWidth?: number;
  padding?: number;
  align?: "left" | "center" | "right";
  top?: string | number;
  left?: string | number;
  // left'in tersi: sağ kenarı sabitler, içerik büyüdükçe sola doğru genişler.
  // left ile birlikte verilmez — right verildiğinde left göz ardı edilir.
  right?: string | number;
  fit?: "wrap" | "shrink";
  maxSize?: number;
  centerY?: boolean;
  color?: WordColor | (string & {});
  backgroundColor?: string;
  dir?: "ltr" | "rtl";
  maxLines?: number;
  maxHeight?: number; // NoteCard'ın maxBodyHeight'ı gibi bir tavan — içerik bunu aşarsa
  // font küçültülür, aşmıyorsa `size` aynen kullanılır. Verilirse maxLines göz ardı edilir.
  lineHeight?: number;
  centerX?: boolean;
  strokeWidth?: number;
};

export default function WordText({
  children,
  size = 72,
  Width,
  maxWidth,
  padding = 0,
  align = "left",
  top,
  left,
  right,
  fit = "wrap",
  maxSize,
  centerY = false,
  color = "black",
  backgroundColor,
  dir,
  maxLines,
  maxHeight,
  lineHeight = 1.3,
  centerX = false,
  strokeWidth = 0.6,
}: WordTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cap = maxSize ?? size;
  const [fittedSize, setFittedSize] = useState(cap);
  const [wrappedSize, setWrappedSize] = useState(size);
  const [heightFitSize, setHeightFitSize] = useState(size);
  const resolvedColor = colors.word[color as WordColor] ?? color;

  const measurableText = Array.isArray(children)
    ? children.map((s) => s.text).join(" ")
    : children;

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
      while (measure() > contentWidth && currentSize > 1) currentSize -= 1;
      setFittedSize(currentSize);
    };
    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
  }, [measurableText, maxWidth, padding, fit, cap]);

  // maxLines yolu — sadece maxHeight verilmediğinde çalışır
  useLayoutEffect(() => {
    if (
      fit !== "wrap" ||
      !maxLines ||
      maxHeight ||
      !maxWidth ||
      !spanRef.current
    )
      return;
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
      while (countLines() > maxLines && currentSize > 1) currentSize -= 1;
      setWrappedSize(currentSize);
    };
    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
  }, [
    measurableText,
    maxWidth,
    padding,
    fit,
    maxLines,
    maxHeight,
    size,
    lineHeight,
  ]);

  // maxHeight yolu — piksel yüksekliğine göre küçültme (maxLines'a benzer, ama satır değil px ölçer)
  useLayoutEffect(() => {
    if (fit !== "wrap" || !maxHeight || !maxWidth || !spanRef.current) return;
    let cancelled = false;
    const runMeasure = () => {
      if (cancelled || !spanRef.current) return;
      let currentSize = size;
      const measureHeight = () => {
        if (!spanRef.current) return 0;
        spanRef.current.style.fontSize = `${currentSize}px`;
        return spanRef.current.scrollHeight;
      };
      while (measureHeight() > maxHeight && currentSize > 1) currentSize -= 1;
      setHeightFitSize(currentSize);
    };
    waitForFonts(runMeasure);
    return () => {
      cancelled = true;
    };
  }, [measurableText, maxWidth, padding, fit, maxHeight, size, lineHeight]);

  const activeFontSize =
    fit === "shrink"
      ? fittedSize
      : maxHeight
        ? heightFitSize
        : maxLines
          ? wrappedSize
          : size;

  const content = Array.isArray(children)
    ? children.map((seg, i) => (
        <span
          key={i}
          style={{
            color:
              colors.word[seg.color as WordColor] ?? seg.color ?? resolvedColor,
          }}
        >
          {seg.text}
          {i < children.length - 1 ? " " : ""}
        </span>
      ))
    : children;

  const textSpan = (
    <span
      ref={spanRef}
      dir={dir}
      className="font-black"
      style={{
        fontSize: `${activeFontSize}px`,
        WebkitTextStroke: `${strokeWidth}px currentColor`,
        lineHeight: fit === "wrap" ? lineHeight : undefined,
        color: resolvedColor,
        backgroundColor,
        display: "block",
        width: Width ? `${Width}px` : undefined,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        paddingLeft: padding ? `${padding}px` : undefined,
        paddingRight: padding ? `${padding}px` : undefined,
        boxSizing: "border-box",
        wordBreak: fit === "wrap" ? "break-word" : undefined,
        whiteSpace: fit === "shrink" ? "nowrap" : undefined,
        overflow: fit === "shrink" ? "hidden" : undefined,
        textAlign: align,
      }}
    >
      {content}
    </span>
  );

  if (
    top === undefined &&
    left === undefined &&
    right === undefined &&
    !centerX &&
    !centerY
  )
    return textSpan;

  // right verilmişse left'i (ve centerX'i) göz ardı ediyoruz — ikisi birlikte
  // anlamsız olur, kutu tek bir kenardan sabitlenmeli.
  const horizontal =
    right !== undefined
      ? { right }
      : { left: left ?? (centerX ? "50%" : undefined) };

  return (
    <div
      className="absolute"
      style={{
        top: top ?? (centerY ? "50%" : undefined),
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
      {textSpan}
    </div>
  );
}