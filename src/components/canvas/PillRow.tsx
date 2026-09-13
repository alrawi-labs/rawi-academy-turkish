import type { WordColor } from "../../design/tokens";
import Label from "./Label";
import WordText from "./WordText";

type PillRowProps = {
  term: string;
  label?: string; // artık opsiyonel — yoksa pill hiç render edilmez
  meaning: string;
  termSize: number;
  meaningSize: number;
  termWidth: number;
  meaningWidth: number;
  termColor?: WordColor | (string & {});
  meaningColor?: WordColor | (string & {});
};

export default function PillRow({
  term,
  label,
  meaning,
  termSize,
  meaningSize,
  termWidth,
  meaningWidth,
  termColor = "rose",
  meaningColor = "black",
}: PillRowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <WordText
        size={termSize}
        maxWidth={termWidth}
        align="left"
        fit="wrap"
        color={termColor}
      >
        {term}
      </WordText>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: label ? "8px" : "0px",
          width: `${meaningWidth}px`,
        }}
      >
        {label && <Label >{label}</Label>}

        <WordText
          size={meaningSize}
          maxWidth={meaningWidth}
          align="right"
          fit="wrap"
          dir="rtl"
          color={meaningColor}
        >
          {meaning}
        </WordText>
      </div>
    </div>
  );
}
