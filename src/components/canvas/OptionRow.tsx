import type { CSSProperties } from "react";
import Label from "./Label";
import WordText from "./WordText";

export type OptionRowVariant =
  | "default"
  | "filled"
  | "badge"
  | "outlined"
  | "compact";

type VariantStyle = {
  gap: number;
  labelVariant: "badge" | "label";
  size: number;
  container?: CSSProperties;
  textColor?: string;
};

// OptionList de varsayılan font boyutunu buradan okuduğu için export edildi.
export const OPTION_ROW_VARIANTS: Record<OptionRowVariant, VariantStyle> = {
  // mevcut görünüm — hiçbir şey değişmesin diye bire bir aynı
  default: {
    gap: 28,
    labelVariant: "badge",
    size: 48,
  },
  // satırın tamamı renkli bir zemin üstünde
  filled: {
    gap: 24,
    labelVariant: "badge",
    size: 44,
    container: {
      backgroundColor: "#fff0f8",
      padding: "18px 28px",
      borderRadius: 24,
    },
  },
  badge: {
    gap: 24,
    labelVariant: "badge",
    size: 44,
    container: {
      backgroundColor: "#ff2daa",
      padding: "18px 28px",
      borderRadius: 5,
    },
    textColor: "white",
  },
  // sadece çerçeve, zemin şeffaf
  outlined: {
    gap: 24,
    labelVariant: "badge",
    size: 44,
    container: {
      border: "4px solid #ff2daa",
      padding: "16px 26px",
      borderRadius: 24,
    },
  },
  // dar alanlar için küçük harf rozeti ve küçük metin
  compact: {
    gap: 16,
    labelVariant: "label",
    size: 34,
  },
};

type OptionRowAlign = "left" | "center" | "right";
type OptionRowDir = "ltr" | "rtl";

type OptionRowProps = {
  letter: string;
  text: string;
  maxWidth: number;
  variant?: OptionRowVariant;
  size?: number;
  // OptionList'in hesapladığı ortak (uniform) metin font boyutu.
  // Sadece metni etkiler; rozet fontu (`size`) olduğu gibi kalır.
  textSize?: number;
  backgroundColor?: string;
  strokeWidth?: number;
  textColor?: string;
  maxLines?: number;
  align?: OptionRowAlign;
  dir?: OptionRowDir;
  style?: CSSProperties;
  // Verilirse satır "ölçüm modu"nda render edilir: WordText kendi kendine
  // küçülmez, sabit `textSize` ile basılır ve metnin DOM'u bu ref üzerinden
  // dışarı verilir. OptionList gizli ölçüm satırları için kullanır.
  measureRef?: (el: HTMLDivElement | null) => void;
};

export default function OptionRow({
  letter,
  text,
  maxWidth,
  variant = "default",
  size,
  textSize,
  backgroundColor = "#ff2daa",
  strokeWidth = 0,
  textColor,
  maxLines = 2,
  align = "left",
  dir = "ltr",
  style,
  measureRef,
}: OptionRowProps) {
  const v = OPTION_ROW_VARIANTS[variant];
  const isProbe = measureRef !== undefined;

  const horizontalPadding =
    (parseInt(String(v.container?.padding ?? "0").split(" ")[1] ?? "0", 10) ||
      0) * 2;

  const justifyContent =
    align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

  const wordText = (
    <WordText
      size={textSize ?? size ?? v.size}
      maxWidth={maxWidth - horizontalPadding}
      align={align}
      fit="wrap"
      // Ölçüm modunda küçültmeyi OptionList yapar, satır kendi başına küçülmesin.
      maxLines={isProbe ? undefined : maxLines}
      color={textColor ?? v.textColor ?? "black"}
      strokeWidth={strokeWidth}
    >
      {text}
    </WordText>
  );

  return (
    <div
      dir={dir}
      style={{
        display: "flex",
        flexDirection: "row", // harf rozeti RTL'de sağda kalsın
        alignItems: "center",
        justifyContent,
        gap: `${v.gap}px`,
        boxSizing: "border-box",
        ...v.container,
        ...style,
      }}
    >
      <Label
        strokeWidth={strokeWidth}
        variant={v.labelVariant}
        backgroundColor={backgroundColor}
        fontSize={size}
      >
        {letter}
      </Label>

      {isProbe ? (
        // display: contents → wrapper layout'a girmez, ölçüm gerçek satırla birebir aynı kalır
        <div ref={measureRef} style={{ display: "contents" }}>
          {wordText}
        </div>
      ) : (
        wordText
      )}
    </div>
  );
}