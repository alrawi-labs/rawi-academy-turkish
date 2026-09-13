# PillListCard

**File:** `src/components/canvas/PillListCard.tsx`

## What it is

`PillListCard` is like `WordListCard`, but bigger: it includes its **own title header** (a `NoteCard` with a title and an optional number badge) sitting on top of the list. It's used, for example, for the "verb conjugations" template, where the card needs a title like "التصريفات الفعلية" (verb conjugations) above the list of forms.

It uses the exact same "measure everything, then use one shared size" logic explained in `WordListCard.md` — the only difference here is that the size decision also takes the **meaning's line count** into account (using `maxLines`), the same way `WordListCard` does, combined into a single shared size across both term and meaning columns.

## Props

### Header (title) settings
| Prop | Type | Default | What it does |
|---|---|---|---|
| `title` | text | — | The title text shown inside the header `NoteCard` |
| `titleColor` | color name | `"black"` | Title text color |
| `titleSize` | number | `90` | Title font size |
| `titlePadding` | number | `0` | Horizontal padding for the title text |
| `headerBodyPaddingY` | number | `0` | Extra vertical space inside the header |
| `number` | number | — | Optional numbered badge on the header, like in `NoteCard` |
| `numberBackgroundColor` / `numberTextColor` | string | — | Colors for the number badge |

### List settings
| Prop | Type | Default | What it does |
|---|---|---|---|
| `width` | number | — | Width of the list section (the header is made a bit wider automatically, see below) |
| `top` / `left` | number | — | Where to place the whole card (header + list together) |
| `items` | `{ term, meaning, label? }[]` | — | The list of rows. `label` is optional per item |
| `maxBodyHeight` | number | `660` | Maximum height of the list section |
| `bodyPaddingY` | number | `40` | Vertical padding inside the list section |
| `rowGap` | number | `28` | Space between rows |
| `horizontalPadding` | number | `40` | Left/right padding inside the list section |
| `termWidthRatio` | number (0–1) | `0.45` | Portion of width given to the term column |
| `size` | number | `44` | Starting/maximum font size shared by all rows |
| `maxLines` | number | `2` | Maximum lines allowed for the meaning text |
| `lineHeight` | number | `1.3` | Line spacing |
| `termColor` / `meaningColor` | color name | `"pink"` / `"black"` | Colors |
| `stripOffset` | number | `-40` | Moves the list section up (negative) so it slightly overlaps the header, avoiding a visible gap between them |

## How the header and the list connect visually

`PillListCard` renders two things stacked vertically: the `NoteCard` header, and then the list body below it. The header is deliberately made wider than the list (`width + width / 6`) because the header's card image has a slightly wider visual shape than the plain list body. `stripOffset` (a negative margin) then pulls the list section upward, so it visually continues from the header without a gap.

## Example usage

```tsx
<PillListCard
  width={776}
  top={200}
  left={95}
  title="التصريفات الفعلية"
  items={conjugations}
  rowGap={10}
  maxBodyHeight={740}
/>
```

## Related components

See `WordListCard.md` for the base "measure and apply one shared size" logic — it's the same idea here, just combined with a header.