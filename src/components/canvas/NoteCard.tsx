import headImg from "../../assets/note_card/head.png";
import bodyImg from "../../assets/note_card/body.png";
import tailImg from "../../assets/note_card/tail.png";
import { colors, type WordColor } from "../../design/tokens";
import WordText from "./WordText";
import Label from "./Label";

// Metin olarak ya düz string, ya da bir Label nesnesi gönderilebilir.
// String gelirse WordText ile normal metin olarak basılır.
// Nesne gelirse Label component'iyle (renkli etiket/rozet görünümüyle) basılır.
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
  maxBodyHeight?: number; // body'nin ULAŞABİLECEĞİ EN FAZLA yükseklik — içerik azsa daha kısa kalır
  bodyPaddingY?: number; // body'nin dikey iç boşluğu (varsayılan 32)
  number?: number;
  topText: NoteCardText;
  bottomText: NoteCardText;
  top?: string | number;
  left?: string | number;
  textPadding?: number;
  topMaxLines?: number;
  bottomMaxLines?: number;
  topSize?: number;
  bottomSize?: number;
  topTextColor?: WordColor | (string & {});
  bottomTextColor?: WordColor | (string & {});
  numberBackgroundColor?: string;
  numberTextColor?: string;
};

// Gelen değer string mi, Label nesnesi mi diye bakıp doğru component'i basar.
function renderText(
  value: NoteCardText,
  fallback: {
    size: number;
    maxWidth: number;
    maxLines: number;
    color: WordColor | (string & {});
    dir?: "ltr" | "rtl";
  },
) {
  if (typeof value === "string") {
    return (
      <WordText
        size={fallback.size}
        maxWidth={fallback.maxWidth}
        align="center"
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
  bottomText,
  top,
  left,
  textPadding = 32,
  topMaxLines = 2,
  bottomMaxLines = 2,
  topSize = 44,
  bottomSize = 40,
  topTextColor = "pink",
  bottomTextColor = "black",
  numberBackgroundColor = colors.word.pink,
  numberTextColor = "white",
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

      {/* Sabit oranlı üst kapak — yükseklik genişliğe göre otomatik hesaplanır */}
      <img
        src={headImg}
        style={{
          width: "100%",
          display: "block",
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Gövde — yüksekliği içeriğe göre DOĞAL olarak büyür,
          maxBodyHeight verilmişse bir tavan olarak devreye girer */}
      <div
        style={{
          width: "100%",
          maxHeight: maxBodyHeight ? `${maxBodyHeight}px` : undefined,
          overflow: "hidden",
          backgroundImage: `url(${bodyImg})`,
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
        })}

        {renderText(bottomText, {
          size: bottomSize,
          maxWidth: contentWidth,
          maxLines: bottomMaxLines,
          color: bottomTextColor,
          dir: "rtl",
        })}
      </div>

      {/* Sabit oranlı yırtık alt kenar */}
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
