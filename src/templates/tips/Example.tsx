import CoverBG from "../../assets/templates/tips/posts_bg.png";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { TipsData } from "./types";

type PgData = Pick<TipsData, "example">;

export default function TipsExample({ data }: TemplateProps<PgData>) {
  const { example } = data;

  // "\n" (gerçek satır sonu) ve "\\n" (literal backslash-n) ikisini de destekler
  const lines = example
    .split(/\r?\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <div
        style={{
          position: "absolute",
          top: "400px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Label
          offsetBottom={30}
          offsetTop={50}
          variant="line"
          fontSize={85}
          paddingX={35}
          paddingY={18}
        >
          مثـــال
        </Label>
      </div>

      <div
        style={{
          position: "absolute",
          top: 500,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {lines.map((line, i) => (
          <WordText
            key={i}
            size={60}
            Width={1000}
            maxWidth={1000}
            align="center"
            fit="wrap"
            maxLines={2}
            dir="rtl"
            color="black"
          >
            {line}
          </WordText>
        ))}
      </div>
    </div>
  );
}