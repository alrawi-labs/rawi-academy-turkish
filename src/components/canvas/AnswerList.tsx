import type { CSSProperties } from "react";
import AnswerRow, {
  ANSWER_ROW_VARIANTS,
  type AnswerRowVariant,
} from "./AnswerRow";

export type AnswerItem = {
  number: string | number;
  answer: string;
};

type AnswerListDir = "ltr" | "rtl";

type AnswerListProps = {
  items: AnswerItem[];
  width: number;
  columns?: number;
  gapX?: number;
  gapY?: number;
  variant?: AnswerRowVariant;
  badgeWidth?: number;
  badgeHeight?: number;
  fontSize?: number;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  arrowColor?: string;
  arrowThickness?: number;
  arrowHeadSize?: number;
  showDot?: boolean;
  strokeWidth?: number;
  dir?: AnswerListDir;
  top?: string | number;
  left?: string | number;
};

export default function AnswerList({
  items,
  width,
  columns = 1,
  gapX = 64,
  gapY = 40,
  variant = "default",
  badgeWidth,
  badgeHeight,
  fontSize,
  borderRadius,
  backgroundColor,
  textColor,
  arrowColor,
  arrowThickness,
  arrowHeadSize,
  showDot,
  strokeWidth,
  dir = "ltr",
  top,
  left,
}: AnswerListProps) {
  const columnWidth = (width - gapX * (columns - 1)) / columns;

  // Rozetler sabit genişlikte; sütun bunlardan en az biraz geniş olmalı ki ok görünsün.
  const v = ANSWER_ROW_VARIANTS[variant];
  const minColumnWidth = (badgeWidth ?? v.badgeWidth) * 2 + v.gap * 2 + 40;
  if (import.meta.env.DEV && columnWidth < minColumnWidth) {
    console.warn(
      `AnswerList: sütun genişliği (${Math.round(columnWidth)}px) rozetler için dar. ` +
        `variant="compact" kullan veya badgeWidth/columns değerini düşür.`,
    );
  }

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
      <div dir={dir} style={gridStyle}>
        {items.map((item, i) => (
          <AnswerRow
            key={i}
            number={item.number}
            answer={item.answer}
            width={columnWidth}
            variant={variant}
            badgeWidth={badgeWidth}
            badgeHeight={badgeHeight}
            fontSize={fontSize}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            textColor={textColor}
            arrowColor={arrowColor}
            arrowThickness={arrowThickness}
            arrowHeadSize={arrowHeadSize}
            showDot={showDot}
            strokeWidth={strokeWidth}
            dir={dir}
          />
        ))}
      </div>
    </div>
  );
}
