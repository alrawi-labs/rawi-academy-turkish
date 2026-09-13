# Label

**File:** `src/components/canvas/Label.tsx`

## What it is

`Label` shows a small colored tag with text inside it — for example a level tag, a letter badge ("A", "B", "C", "D" for quiz options), or a small colored word next to a sentence.

It comes in **three ready-made styles (variants)**, so you don't have to set colors and sizes by hand every time.

## The three variants

| Variant | What it looks like | Typical use |
|---|---|---|
| `"label"` | Colored background behind the text, small rounded corners | A small pink tag with white text |
| `"line"` | Same as `"label"`, but with almost no vertical padding (looks like a thin highlighted line under the text) | Underline-style highlight |
| `"badge"` | A fixed-size colored square/circle with a letter or number centered inside | The "A", "B", "C", "D" circles in quiz templates |

Each variant has its own built-in default colors and sizes — you don't need to set anything unless you want to change it.

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `children` | text | — | The text shown inside the label (e.g. `"A"`, `"Yeni"`) |
| `variant` | `"label" \| "line" \| "badge"` | `"label"` | Which built-in style to use |
| `backgroundColor` | string | from the variant | Overrides the background color |
| `textColor` | string | from the variant | Overrides the text color |
| `fontSize` | number | from the variant | Overrides the font size |
| `paddingX` / `paddingY` | number | from the variant | Overrides the inside spacing (only affects `"label"` / `"line"`) |
| `borderRadius` | number | from the variant | Overrides how rounded the corners are |
| `width` / `height` | number | from the variant (only `"badge"` has defaults) | Fixed size — only used for the `"badge"` variant |
| `strokeWidth` | number | `0` | Adds extra outline thickness to the text on top of the normal bold style. `0` means no extra outline |

## How it decides what to render

- If **both** `width` and `height` end up being set (either from the variant or from your own props), `Label` renders a **fixed-size box** with the text centered inside — this is the "badge" look (a circle/square with a letter in the middle).
- Otherwise, it renders an **inline tag**: the colored background is a separate layer placed behind the text, sized using negative `padding` values, so the background always matches however wide the text turns out to be.

## Example usage

```tsx
{/* A round badge with the letter "A" inside */}
<Label variant="badge" backgroundColor="#ff2daa">A</Label>

{/* A small pink tag with default label style */}
<Label>Yeni Kelime</Label>

{/* A thin underline-style highlight */}
<Label variant="line" textColor="black">önemli</Label>
```

## Note

`Label` always uses `font-weight: 900` (extra bold) for its text, matching the style used by `WordText`, so labels and word text look consistent across a template.