import defaultHeadImg from "../../assets/note_card/head.png";
import defaultBodyImg from "../../assets/note_card/body.png";
import defaultTailImg from "../../assets/note_card/tail.png";
import { colors, type WordColor } from "../../design/tokens";
import WordText from "./WordText";
import Label from "./Label";

export type NoteCardText =
  | string
  | {
      text: string;
      variant?: "label" | "line" | "badge";
      backgroundColor?: string;
      textColor?: string;
      fontSize?: number;
      paddingX?: number;
      paddingY?: number;
    };

type NoteCardProps = {
  width: number;
  maxBodyHeight?: number;
  bodyPaddingY?: number;
  number?: number;
  topText: NoteCardText;
  bottomText?: NoteCardText;
  top?: string | number;
  left?: string | number;
  textPadding?: number;
  topMaxLines?: number;
  bottomMaxLines?: number;
  topSize?: number;
  bottomSize?: number;
  topTextColor?: WordColor | (string & {});
  bottomTextColor?: WordColor | (string & {});
  topAlign?: "left" | "center" | "right";
  bottomAlign?: "left" | "center" | "right";
  numberBackgroundColor?: string;
  numberTextColor?: string;
  tailImg?: string; // yeni — dışarıdan farklı bir kuyruk görseli verilebilir, verilmezse mevcut default kullanılır
};

function renderText(
  value: NoteCardText,
  fallback: {
    size: number;
    maxWidth: number;
    maxLines: number;
    color: WordColor | (string & {});
    dir?: "ltr" | "rtl";
    align: "left" | "center" | "right";
  },
) {
  if (typeof value === "string") {
    return (
      <WordText
        size={fallback.size}
        maxWidth={fallback.maxWidth}
        align={fallback.align}
        fit="wrap"
        maxLines={fallback.maxLines}
        color={fallback.color}
        dir={fallback.dir}
      >
        {value}
      </WordText>
    );
  }

  return (
    <Label
      variant={value.variant ?? "label"}
      backgroundColor={value.backgroundColor}
      textColor={value.textColor}
      fontSize={value.fontSize ?? fallback.size}
      paddingX={value.paddingX}
      paddingY={value.paddingY}
      align={fallback.align}
    >
      {value.text}
    </Label>
  );
}

export default function NoteCard({
  width,
  maxBodyHeight,
  bodyPaddingY = 0,
  number,
  topText,
  bottomText = "",
  top,
  left,
  textPadding = 32,
  topMaxLines = 2,
  bottomMaxLines = 2,
  topSize = 44,
  bottomSize = 40,
  topTextColor = "pink",
  bottomTextColor = "black",
  topAlign = "center",
  bottomAlign = "center",
  numberBackgroundColor = colors.word.pink,
  numberTextColor = "white",
  tailImg = defaultTailImg,
}: NoteCardProps) {
  const contentWidth = width - textPadding * 2;

  const card = (
    <div style={{ position: "relative", width: `${width}px` }}>
      {number !== undefined && (
        <div
          style={{
            position: "absolute",
            top: "-55px",
            left: "18px",
            width: "92px",
            height: "80px",
            backgroundColor: numberBackgroundColor,
            color: numberTextColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "48px",
            zIndex: 1,
          }}
        >
          {number}
        </div>
      )}

      <img
        src={defaultHeadImg}
        style={{
          width: "100%",
          display: "block",
          position: "relative",
          zIndex: 2,
        }}
      />

      <div
        style={{
          width: "100%",
          maxHeight: maxBodyHeight ? `${maxBodyHeight}px` : undefined,
          overflow: "hidden",
          backgroundImage: `url(${defaultBodyImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: `${bodyPaddingY}px 0`,
          boxSizing: "border-box",
        }}
      >
        {renderText(topText, {
          size: topSize,
          maxWidth: contentWidth,
          maxLines: topMaxLines,
          color: topTextColor,
          align: topAlign,
        })}

        {renderText(bottomText, {
          size: bottomSize,
          maxWidth: contentWidth,
          maxLines: bottomMaxLines,
          color: bottomTextColor,
          dir: "rtl",
          align: bottomAlign,
        })}
      </div>

      <img src={tailImg} style={{ width: "100%", display: "block" }} />
    </div>
  );

  if (top === undefined && left === undefined) {
    return card;
  }

  return (
    <div className="absolute" style={{ top, left }}>
      {card}
    </div>
  );
}