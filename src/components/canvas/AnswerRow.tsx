import type { CSSProperties } from "react";
import Label from "./Label";

export type AnswerRowVariant = "default" | "soft" | "outlined" | "compact";

type VariantStyle = {
  badgeWidth: number;
  badgeHeight: number;
  fontSize: number;
  borderRadius: number;
  gap: number;
  arrowThickness: number;
  arrowHeadSize: number;
  // sadece "outlined": rozet zemini şeffaf, çerçeve kalınlığı bu
  borderWidth?: number;
  backgroundColor?: string;
  textColor?: string;
};

// AnswerList varsayılan ölçüleri buradan okuduğu için export edildi.
export const ANSWER_ROW_VARIANTS: Record<AnswerRowVariant, VariantStyle> = {
  // fotoğraftaki görünüm: dolu pembe kare rozet + ince pembe ok
  default: {
    badgeWidth: 120,
    badgeHeight: 100,
    fontSize: 64,
    borderRadius: 8,
    gap: 28,
    arrowThickness: 6,
    arrowHeadSize: 18,
  },
  // açık pembe zemin, pembe yazı
  soft: {
    badgeWidth: 120,
    badgeHeight: 100,
    fontSize: 64,
    borderRadius: 8,
    gap: 28,
    arrowThickness: 6,
    arrowHeadSize: 18,
    backgroundColor: "#fff0f8",
    textColor: "#ff2daa",
  },
  // sadece çerçeve, zemin şeffaf
  outlined: {
    badgeWidth: 120,
    badgeHeight: 100,
    fontSize: 64,
    borderRadius: 8,
    gap: 28,
    arrowThickness: 6,
    arrowHeadSize: 18,
    borderWidth: 5,
    backgroundColor: "transparent",
    textColor: "#ff2daa",
  },
  // dar alanlar / 2 sütunlu yerleşim için
  compact: {
    badgeWidth: 84,
    badgeHeight: 72,
    fontSize: 44,
    borderRadius: 6,
    gap: 18,
    arrowThickness: 4,
    arrowHeadSize: 13,
  },
};

type AnswerRowDir = "ltr" | "rtl";

type AnswerRowProps = {
  number: string | number;
  answer: string;
  // satırın toplam genişliği — ok, iki rozetten artan alanı doldurur
  width: number;
  variant?: AnswerRowVariant;
  badgeWidth?: number;
  badgeHeight?: number;
  fontSize?: number;
  borderRadius?: number;
  gap?: number;
  // rozet zemini (outlined'da çerçeve rengi) ve ok rengi bundan türer
  backgroundColor?: string;
  textColor?: string;
  arrowColor?: string;
  arrowThickness?: number;
  arrowHeadSize?: number;
  // "1." mi "1" mi — fotoğraftaki gibi noktalı varsayılan
  showDot?: boolean;
  strokeWidth?: number;
  dir?: AnswerRowDir;
  style?: CSSProperties;
};

export default function AnswerRow({
  number,
  answer,
  width,
  variant = "default",
  badgeWidth,
  badgeHeight,
  fontSize,
  borderRadius,
  gap,
  backgroundColor = "#ff2daa",
  textColor,
  arrowColor,
  arrowThickness,
  arrowHeadSize,
  showDot = true,
  strokeWidth = 0,
  dir = "ltr",
  style,
}: AnswerRowProps) {
  const v = ANSWER_ROW_VARIANTS[variant];

  const w = badgeWidth ?? v.badgeWidth;
  const h = badgeHeight ?? v.badgeHeight;
  const radius = borderRadius ?? v.borderRadius;
  const size = fontSize ?? v.fontSize;
  const rowGap = gap ?? v.gap;
  const thickness = arrowThickness ?? v.arrowThickness;
  const headSize = arrowHeadSize ?? v.arrowHeadSize;

  // outlined'da `backgroundColor` çerçeve rengi olarak kullanılır
  const accent = backgroundColor;
  const badgeBg = v.backgroundColor ?? accent;
  const badgeText = textColor ?? v.textColor ?? "#ffffff";
  const lineColor = arrowColor ?? accent;

  const isOutlined = v.borderWidth !== undefined;
  const border = v.borderWidth ?? 0;

  const badge = (text: string) => {
    const inner = (
      <Label
        variant="badge"
        width={w - border * 2}
        height={h - border * 2}
        fontSize={size}
        borderRadius={Math.max(radius - border, 0)}
        backgroundColor={badgeBg}
        textColor={badgeText}
        strokeWidth={strokeWidth}
      >
        {text}
      </Label>
    );

    if (!isOutlined) return inner;

    return (
      <div
        style={{
          border: `${border}px solid ${accent}`,
          borderRadius: `${radius}px`,
          display: "flex",
          boxSizing: "content-box",
          flexShrink: 0,
        }}
      >
        {inner}
      </div>
    );
  };

  // Ok her zaman numaradan harfe doğru bakar; dir="rtl" olduğunda
  // satır ters döndüğü için ok ucu da otomatik olarak sola geçer.
  const arrow = (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: dir === "rtl" ? "row-reverse" : "row",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1, height: `${thickness}px`, backgroundColor: lineColor }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: `${headSize}px solid transparent`,
          borderBottom: `${headSize}px solid transparent`,
          ...(dir === "rtl"
            ? { borderRight: `${headSize * 1.4}px solid ${lineColor}` }
            : { borderLeft: `${headSize * 1.4}px solid ${lineColor}` }),
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: dir === "rtl" ? "row-reverse" : "row",
        alignItems: "center",
        gap: `${rowGap}px`,
        width: `${width}px`,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {badge(showDot ? `${number}.` : String(number))}
      {arrow}
      {badge(answer)}
    </div>
  );
}