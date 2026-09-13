import headImg from "../../assets/note_card/head.png";
import bodyImg from "../../assets/note_card/body.png";
import tailImg from "../../assets/note_card/tail.png";
import { colors, type WordColor } from "../../design/tokens";
import WordText from "./WordText";

type NoteCardProps = {
  width: number;
  maxBodyHeight?: number; // body'nin ULAŞABİLECEĞİ EN FAZLA yükseklik — içerik azsa daha kısa kalır
  bodyPaddingY?: number;  // body'nin dikey iç boşluğu (varsayılan 32)
  number?: number;
  topText: string;
  bottomText: string;
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
        <WordText
          size={topSize}
          maxWidth={width - textPadding * 2}
          align="center"
          fit="wrap"
          maxLines={topMaxLines}
          color={topTextColor}
        >
          {topText}
        </WordText>

        <WordText
          size={bottomSize}
          maxWidth={width - textPadding * 2}
          align="center"
          fit="wrap"
          maxLines={bottomMaxLines}
          dir="rtl"
          color={bottomTextColor}
        >
          {bottomText}
        </WordText>
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