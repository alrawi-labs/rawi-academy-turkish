# WordListCard

**File:** `src/components/canvas/WordListCard.tsx`

## What it is

`WordListCard` shows a "torn note" style card (same head/body/tail image pattern as `NoteCard`) containing a **list** of word pairs — for example, all the words that come from the word of the day ("derived words"). Each row is one `PillRow` (term on the left, meaning on the right).

Recommended limit: **up to 8 terms**, so the card doesn't get too tall.

## Why the "uniform size" logic exists (read this first)

If every row picked its own best font size independently, a list could look messy — one row's word looks huge, the next row's word looks tiny, because one word was short and another was long. `WordListCard` avoids this by:

1. First, secretly rendering all the terms and all the meanings in a hidden layer (not visible on the final image).
2. Measuring, for each one, "what is the biggest font size that lets this specific text still fit?"
3. Taking the **smallest** result out of all of them.
4. Applying that **one shared size** to every term and every meaning in the whole card.

This means: if you have 5 short words and 1 long word, all 6 will show at the size that the *longest* one needs — so the whole list looks consistent, instead of jumping between different sizes.

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `width` | number | — | Width of the whole card |
| `items` | `{ term, meaning }[]` | — | The list of word pairs to show |
| `maxBodyHeight` | number | `560` | Maximum height of the middle (scrollable-looking) section |
| `bodyPaddingY` | number | `0` | Extra vertical space inside the body, above/below the rows |
| `rowGap` | number | `20` | Vertical space between rows |
| `horizontalPadding` | number | `40` | Space kept empty on the left and right inside the card |
| `termWidthRatio` | number (0–1) | `0.4` | How much of the inner width is given to the term column (the rest goes to meaning) |
| `size` | number | `50` | The starting/maximum font size that both columns try to use, before shrinking |
| `maxLines` | number | `2` | Maximum lines allowed for the meaning text (term is always a single line) |
| `lineHeight` | number | `1.3` | Line spacing, used both for rendering and for the line-count measurement |
| `termColor` / `meaningColor` | color name | `"pink"` / `"black"` | Text colors |
| `top` / `left` | string or number | — | Where to place the card |

## How the measurement actually works

- **Term column:** measured by width. For each term, the code starts at `size` and reduces it until the text's rendered width fits inside the term column's width.
- **Meaning column:** measured by number of lines. For each meaning, the code starts at `size` and reduces it until the text takes no more than `maxLines` lines.
- The **smallest** size found across *all* terms and *all* meanings becomes the one size used everywhere in the card.

This measurement only runs after custom fonts have finished loading (`document.fonts.ready`), so the sizes are measured using the real font, not a fallback.

## Example usage

```tsx
<WordListCard
  width={776}
  items={derivedWords}
  top="480px"
  left="150px"
/>
```

## Related components

`PillListCard.md` uses the exact same "measure everything, apply the smallest size" idea, but adds its own title header (`NoteCard`) on top and supports a per-row `label`. Use `WordListCard` for a plain list, and `PillListCard` when the list needs a title above it.