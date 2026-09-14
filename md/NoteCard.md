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

## Two ways to give `topText` / `bottomText`

`topText` and `bottomText` no longer only accept plain text — each one accepts **either**:

1. **A plain string** — rendered as normal text, using `WordText` (this is the original behavior, still the default and fully backward-compatible).
2. **A label object** — rendered as a small colored tag/badge instead, using the `Label` component (see `Label.md`). Use this when the top or bottom line should look like a highlighted tag rather than a plain sentence — for example a short grammar note or a "new word" flag.

```ts
export type NoteCardText =
  | string
  | {
      text: string
      variant?: "label" | "line" | "badge"
      backgroundColor?: string
      textColor?: string
      fontSize?: number
      paddingX?: number
      paddingY?: number
    }
```

The component checks the type of the value at runtime: if it's a plain string, it goes through `WordText` (with wrapping and auto-shrinking, exactly as before). If it's an object, it goes through `Label` instead, using `variant`, `backgroundColor`, `textColor`, `fontSize`, `paddingX`, and `paddingY` from that object (any of these you leave out falls back to `Label`'s own defaults for that variant).

**⚠️ Important limitation:** the label-object path does **not** auto-shrink or wrap the way `WordText` does. Only use it for short tag-like text (e.g. `"1. tekil şahıs"`, `"Yeni"`) — long sentences should always be sent as a plain string, so they can wrap and shrink normally.

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `width` | number | — | Width of the entire card, in px. The images and text all scale to this width |
| `maxBodyHeight` | number | — | The most the middle section is allowed to grow to. If content is shorter, the card stays shorter |
| `bodyPaddingY` | number | `0` | Extra empty space added above and below the text, inside the middle section |
| `number` | number | — | If given, shows a small colored numbered badge in the top-left corner (e.g. "1") |
| `topText` | `NoteCardText` (string or label object, see above) | — | The first line of content (usually Turkish) |
| `bottomText` | `NoteCardText` (string or label object, see above) | — | The second line of content (usually Arabic) |
| `top` / `left` | string or number | — | Where to place the whole card on the canvas |
| `textPadding` | number | `32` | Horizontal space kept empty on both sides of the text area, inside the card (only applies to the plain-string/`WordText` path) |
| `topMaxLines` / `bottomMaxLines` | number | `2` | Maximum number of lines allowed for each text before the font shrinks (only applies when that text is a plain string) |
| `topSize` / `bottomSize` | number | `44` / `40` | Starting font size. Used as `WordText`'s `size` for plain strings, and as the fallback `fontSize` for a label object if it doesn't specify its own |
| `topTextColor` / `bottomTextColor` | color name | `"pink"` / `"black"` | Text colors, only used for the plain-string/`WordText` path (a label object controls its own color via `textColor`) |
| `numberBackgroundColor` | string | `colors.word.pink` | Background color of the number badge |
| `numberTextColor` | string | `"white"` | Text color of the number badge |

## How the text inside works

- **Plain string path:** uses `WordText` internally, always with `fit="wrap"` and the matching `maxLines` prop — so each text wraps normally, but if it still takes more lines than allowed, its font shrinks (the same "wrap + maxLines" behavior explained in the `WordText` guide). The bottom text is always rendered with `dir="rtl"` on this path, since it usually holds the Arabic meaning.
- **Label object path:** uses `Label` internally, passing through `variant`, `backgroundColor`, `textColor`, `fontSize`, `paddingX`, and `paddingY` from the object. See `Label.md` for what each of these does and what the three variants (`"label"`, `"line"`, `"badge"`) look like.

## Example usage

```tsx
{/* Both lines as plain text — original behavior, unchanged */}
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

{/* Top line shown as a small tag instead of plain text */}
<NoteCard
  width={776}
  topText={{ text: "Yeni Kelime", variant: "line", textColor: "black", paddingX: 12, paddingY: 4 }}
  bottomText={usageAr}
/>
```

## Note about positioning

Just like `WordText`, if you don't give `top`/`left`, `NoteCard` returns just the card itself, without any position wrapper — this is how it's used inside `PillListCard`, where the parent decides the position instead.