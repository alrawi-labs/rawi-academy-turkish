import { useLayoutEffect, useRef, useState } from "react";
import CoverBG from "../../assets/templates/tips/posts_bg.png";
import Label from "../../components/canvas/Label";
import WordText from "../../components/canvas/WordText";
import type { TemplateProps } from "../registry";
import type { TipsData } from "./types";

type PgData = Pick<TipsData, "title" | "body" | "cta">;

/** Measures the wrapped element's natural width and returns a scale
 *  factor (<=1) so it never exceeds maxWidth, no matter the text length. */
function useFitScale(maxWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const naturalWidth = ref.current.scrollWidth;
    setScale(naturalWidth > maxWidth ? maxWidth / naturalWidth : 1);
  }, [maxWidth]);

  return { ref, scale };
}

export default function TipsContent({ data }: TemplateProps<PgData>) {
  const { title, body, cta } = data;
  const CTA_MAX_WIDTH = 900; // canvas is 1080px wide, leave side margin
  const { ref: ctaRef, scale: ctaScale } = useFitScale(CTA_MAX_WIDTH);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${CoverBG})` }}
    >
      <WordText
        size={90}
        Width={900}
        maxWidth={900}
        align="center"
        fit="wrap"
        maxLines={2}
        dir="rtl"
        color="black"
        top={300}
        centerX
      >
        {title}
      </WordText>

      <WordText
        size={60}
        Width={1000}
        maxWidth={1000}
        align="center"
        fit="wrap"
        maxLines={7}
        dir="rtl"
        color="black"
        top={500}
        centerX
      >
        {body}
      </WordText>

      <div
        style={{
          position: "absolute",
          top: "1000px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: `${CTA_MAX_WIDTH}px`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          ref={ctaRef}
          style={{
            display: "inline-block",
            transform: `scale(${ctaScale})`,
            transformOrigin: "center",
          }}
        >
          <Label offsetBottom={30} offsetTop={30} variant="line" fontSize={65} paddingX={35} paddingY={18}>
            {cta}
          </Label>
        </div>
      </div>
    </div>
  );
}