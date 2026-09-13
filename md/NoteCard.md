# NoteCard

**File:** `src/components/canvas/NoteCard.tsx`

## What it is

`NoteCard` shows a "torn paper note" style card — an image with a fancy top edge, a stretchy middle body, and a fancy bottom edge (like a torn note). Inside it, it shows two lines of text: a top text (usually Turkish) and a bottom text (usually the Arabic meaning). It can also show a small numbered badge in the top-left corner, like "1", "2", "3"...

This is the card used, for example, to show an example sentence and its translation.

## How the card is built (three layers)

1. **`headImg`** — a fixed-ratio image for the top edge of the note
2. **A flexible middle box** — its background is `bodyImg`, stretched to fill whatever height is needed (this is what grows or shrinks depending on how much text is inside)
3. **`tailImg`** — a fixed-ratio image for the torn bottom edge

Because the middle box's height depends on the content, `NoteCard` can naturally become taller when there's more text, and shorter when there's less — with an optional `maxBodyHeight` used as a ceiling if you don't want it to grow forever.

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `width` | number | — | Width of the entire card, in px. The images and text all scale to this width |
| `maxBodyHeight` | number | — | The most the middle section is allowed to grow to. If content is shorter, the card stays shorter |
| `bodyPaddingY` | number | `0` | Extra empty space added above and below the text, inside the middle section |
| `number` | number | — | If given, shows a small colored numbered badge in the top-left corner (e.g. "1") |
| `topText` | text | — | The first line of text (usually Turkish) |
| `bottomText` | text | — | The second line of text (usually Arabic) |
| `top` / `left` | string or number | — | Where to place the whole card on the canvas |
| `textPadding` | number | `32` | Horizontal space kept empty on both sides of the text, inside the card |
| `topMaxLines` / `bottomMaxLines` | number | `2` | Maximum number of lines allowed for each text before the font shrinks |
| `topSize` / `bottomSize` | number | `44` / `40` | Starting font size for each text |
| `topTextColor` / `bottomTextColor` | color name | `"pink"` / `"black"` | Text colors |
| `numberBackgroundColor` | string | `colors.word.pink` | Background color of the number badge |
| `numberTextColor` | string | `"white"` | Text color of the number badge |

## How the text inside works

Both texts use `WordText` internally, always with `fit="wrap"` and their own `maxLines` — so each text wraps normally, but if it still takes more lines than allowed, its font shrinks (this is the same "wrap + maxLines" behavior explained in the `WordText` guide). The bottom text is always rendered with `dir="rtl"`, since it holds the Arabic meaning.

## Example usage

```tsx
<NoteCard
  width={776}
  maxBodyHeight={500}
  number={1}
  topText={usageTr}
  topSize={60}
  topTextColor="rose"
  bottomText={usageAr}
  bottomSize={60}
  top="520px"
  left="260px"
/>
```

## Note about positioning

Just like `WordText`, if you don't give `top`/`left`, `NoteCard` returns just the card itself, without any position wrapper — this is how it's used inside `PillListCard`, where the parent decides the position instead.