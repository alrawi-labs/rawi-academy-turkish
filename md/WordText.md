# WordText

**File:** `src/components/canvas/WordText.tsx`

## What it is

`WordText` is the basic building block for showing text on a template. Almost every piece of text in this project (a word, a meaning, a sentence) goes through `WordText`. It can:

- Show text in a fixed position on the canvas
- Limit how wide the text can be
- Automatically make text smaller so it fits, in two different ways
- Add space (padding) on the left/right
- Align text to the left, center, or right
- Use a color from the design system
- Support right-to-left text (for Arabic)

## Props (settings you can pass in)

| Prop | Type | Default | What it does |
|---|---|---|---|
| `children` | text | — | The actual text to display |
| `size` | number | `72` | Font size in pixels, used when no auto-sizing is happening |
| `maxWidth` | number | — | The width (in px) the text box should take |
| `padding` | number | `0` | Empty space added on the left and right, inside `maxWidth` |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |
| `top` / `left` | string or number | — | If given, the text is placed at an exact position on the canvas (see "Positioning" below) |
| `fit` | `"wrap" \| "shrink"` | `"wrap"` | How the text behaves when it's too big (see below) |
| `maxSize` | number | same as `size` | Only used in `"shrink"` mode — the biggest the font is allowed to become |
| `centerY` | boolean | `false` | If true, the text is vertically centered around the `top` position, instead of starting at it |
| `color` | a design-system color name (e.g. `"pink"`, `"black"`) or any CSS color | `"black"` | Text color |
| `dir` | `"ltr" \| "rtl"` | — | Text direction. Use `"rtl"` for Arabic |
| `maxLines` | number | — | Only used with `fit="wrap"` — the maximum number of lines allowed before the font shrinks |
| `lineHeight` | number | `1.3` | Controls the spacing between lines; also used in the `maxLines` calculation |

## The two "fit" modes — this is the most important part

### `fit="wrap"` (default)

Use this for text that **can spread across multiple lines**, like a sentence or explanation.

- If the text is too long for `maxWidth`, it moves down to a new line, like normal text wrapping.
- If you also set `maxLines`, the component checks: "does this text now take more lines than `maxLines`?" If yes, it slowly reduces the font size until it fits inside that many lines.
- If you don't set `maxLines`, the text can wrap onto as many lines as it needs — the font size never changes.

**Example — a sentence that must never be more than 5 lines:**
```tsx
<WordText size={56} maxWidth={850} padding={32} align="right" fit="wrap" maxLines={5}>
  {explain}
</WordText>
```

### `fit="shrink"`

Use this for text that must **always stay on one single line**, like a single word or a short title (for example the word of the day itself).

- The text never wraps to a new line (`white-space: nowrap`).
- It starts at `maxSize` (the biggest allowed size).
- If it's too wide to fit in `maxWidth`, the component reduces the font size, one pixel at a time, until it fits.
- This means: a short word (like "Özen") shows big, close to `maxSize`. A long word (like "Bahsedebilir") automatically becomes smaller so it still fits on one line.
- There is no minimum size — it will keep shrinking until it fits, however small that needs to be.

**Example — a word that should look as big as possible, but never wider than 590px:**
```tsx
<WordText maxSize={140} maxWidth={590} padding={24} align="center" fit="shrink">
  {word}
</WordText>
```

## Positioning

If you don't pass `top`/`left`, `WordText` returns just the text itself — you are expected to place it somewhere yourself (this is used, for example, inside `PillRow` and `NoteCard`, where the parent component controls positioning).

If you **do** pass `top` and `left`, `WordText` wraps itself in a positioned box:
```tsx
<div className="absolute" style={{ top, left, transform: centerY ? "translateY(-50%)" : undefined }}>
  {textSpan}
</div>
```

`centerY` is useful when you measured the **center** of where the text should sit in Photoshop, instead of its top edge. With `centerY`, you give the vertical center point as `top`, and the component shifts the text up by half its own height automatically.

## How padding works with maxWidth

`padding` is subtracted from `maxWidth` on both sides, using `box-sizing: border-box`. This means: if you say `maxWidth={590}` and `padding={24}`, the text box is really 590px wide on the outside, but the actual text can only use `590 - 24 - 24 = 542px` in the middle. This keeps text from touching the edges of a card or button.

## Colors

Colors are not written directly (no raw hex codes like `#ff2daa`). Instead, `color` accepts a name defined in `design/tokens.ts`, under `colors.word` (currently: `white`, `black`, `pink`, `rose`). If you pass any other string, it's used as-is (so a raw CSS color still works, but it won't come from the shared design system).

## Font weight and stroke

Every `WordText` always renders with `font-weight: 900` (extra bold) and a thin outline (`-webkit-text-stroke: 0.6px currentColor`) to make the text look slightly thicker and cleaner on Instagram images. This is fixed — it is not a prop you can change.

## Waiting for fonts to load

Both auto-sizing modes wait for the custom fonts to fully load (`document.fonts.ready`) before measuring the text. This matters because measuring text with the wrong (fallback) font would give a wrong size, and the final image would look slightly different from what you expect.