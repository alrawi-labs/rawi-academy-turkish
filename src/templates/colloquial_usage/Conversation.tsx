import { useLayoutEffect, useRef, useState } from "react";
import ConversationBG from "../../assets/templates/colloquial_usage/posts_bg.png";
import PersonPurple from "../../assets/balon_card/person_purple.png";
import PersonPink from "../../assets/balon_card/person_pink.png";
import TailImgLeft from "../../assets/balon_card/ballon_tail_left.png";
import TailImgRight from "../../assets/balon_card/ballon_tail_right.png";
import Label from "../../components/canvas/Label";
import NoteCard from "../../components/canvas/NoteCard";
import type { TemplateProps } from "../registry";
import type { ColloquialUsageData } from "./types";

type PgData = Pick<ColloquialUsageData, "conversations">;

const CARD_WIDTH = 770;
const CARD_MAX_BODY_HEIGHT = 130;
const CARD_TEXT_PADDING = 32; // NoteCard'ın textPadding varsayılanıyla aynı olmalı
const BODY_GAP = 12; // NoteCard'ın gövde flex'indeki sabit gap
const LINE_HEIGHT = 1.3;
const STARTING_SIZE = 35;

export default function ColloquialUsageConversation({
  data,
}: TemplateProps<PgData>) {
  const { conversations } = data;

  const topRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [uniformSize, setUniformSize] = useState(STARTING_SIZE);

  const contentWidth = CARD_WIDTH - CARD_TEXT_PADDING * 2;
  const halfHeight = Math.max((CARD_MAX_BODY_HEIGHT - BODY_GAP) / 2, 20);

  useLayoutEffect(() => {
    if (!conversations || conversations.length === 0) return;
    let cancelled = false;

    const runMeasure = () => {
      if (cancelled) return;
      let minFit = STARTING_SIZE;

      const measureAgainst = (el: HTMLSpanElement | null) => {
        if (!el) return;
        let currentSize = STARTING_SIZE;
        const measureHeight = () => {
          el.style.fontSize = `${currentSize}px`;
          return el.scrollHeight;
        };
        while (measureHeight() > halfHeight && currentSize > 1) currentSize -= 1;
        if (currentSize < minFit) minFit = currentSize;
      };

      for (const el of topRefs.current) measureAgainst(el);
      for (const el of bottomRefs.current) measureAgainst(el);

      setUniformSize(minFit);
    };

    if (
      typeof document !== "undefined" &&
      "fonts" in document &&
      document.fonts.status !== "loaded"
    ) {
      document.fonts.ready.then(runMeasure);
    } else {
      runMeasure();
    }
    return () => {
      cancelled = true;
    };
  }, [conversations, contentWidth, halfHeight]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ConversationBG})` }}
    >
      <div style={{ position: "absolute", top: "250px", left: "300px" }}>
        <Label variant="line" fontSize={80} backgroundColor="transparent">
          استخدامهـــا بالمحادثـــة
        </Label>
      </div>

      {/* Gizli ölçüm — her item için topText ve bottomText, ortak boyutu bulmak için */}
      <div
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
        }}
      >
        {conversations?.map((item, i) => (
          <div key={i}>
            <span
              ref={(el) => {
                topRefs.current[i] = el;
              }}
              style={{
                display: "block",
                width: `${contentWidth}px`,
                fontWeight: 900,
                WebkitTextStroke: "0.6px currentColor",
                lineHeight: LINE_HEIGHT,
                wordBreak: "break-word",
                boxSizing: "border-box",
              }}
            >
              {item.sentenceTr}
            </span>
            <span
              ref={(el) => {
                bottomRefs.current[i] = el;
              }}
              dir="rtl"
              style={{
                display: "block",
                width: `${contentWidth}px`,
                fontWeight: 900,
                WebkitTextStroke: "0.6px currentColor",
                lineHeight: LINE_HEIGHT,
                wordBreak: "break-word",
                boxSizing: "border-box",
              }}
            >
              {item.sentenceAr}
            </span>
          </div>
        ))}
      </div>

      {/* Konum TAHMİNİ — dev server'da gözle ince ayar gerekir */}
      <div
        style={{
          position: "absolute",
          top: "420px",
          left: "50px",
          width: "980px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {conversations?.map((item, i) => {
          const isEven = i % 2 === 0;
          const avatar = isEven ? PersonPurple : PersonPink;
          const tailImg = isEven ? TailImgLeft : TailImgRight;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: isEven ? "row" : "row-reverse",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <img
                src={avatar}
                style={{ width: "90px", height: "90px", flexShrink: 0, transform: "translateY(-100px)" }}
              />

              <NoteCard
                width={CARD_WIDTH}
                maxBodyHeight={CARD_MAX_BODY_HEIGHT}
                topText={item.sentenceTr}
                topSize={uniformSize}
                topTextColor="black"
                topAlign="left"
                bottomText={item.sentenceAr}
                bottomTextColor="pink"
                bottomSize={uniformSize}
                bottomAlign="right"
                bodyPaddingY={0}
                tailImg={tailImg}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}