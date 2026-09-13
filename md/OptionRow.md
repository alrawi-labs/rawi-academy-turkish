# OptionRow

**File:** `src/components/canvas/OptionRow.tsx`

## What it is

`OptionRow` shows one quiz answer choice: a colored round letter badge (like "A") on one side, and the answer text next to it. It's used to build multiple-choice quiz templates, one `OptionRow` per option.

It's a small, focused component — internally it just combines `Label` (for the letter badge) and `WordText` (for the answer text).

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `letter` | text | — | The letter shown in the badge (e.g. `"A"`) |
| `text` | text | — | The answer text shown next to the badge |
| `maxWidth` | number | — | The maximum width the answer text can use before wrapping |
| `size` | number | `48` | Font size of the answer text |
| `backgroundColor` | string | `'#ff2daa'` | Background color of the letter badge |
| `strokeWidth` | number | `0` | Extra text outline thickness passed to the letter badge (`Label`) |

## How it's built

```tsx
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '28px' }}>
  <Label variant="badge" backgroundColor={backgroundColor} strokeWidth={strokeWidth}>
    {letter}
  </Label>
  <WordText size={size} maxWidth={maxWidth} align="left" fit="wrap" maxLines={2} color="black">
    {text}
  </WordText>
</div>
```

The answer text always uses `fit="wrap"` with a maximum of 2 lines — if an answer is too long to fit in 2 lines at the given `size`, the font shrinks to make it fit (this is the "wrap + maxLines" behavior explained in the `WordText` guide).

## Example usage

A full quiz question is usually built as a list of `OptionRow`s, stacked vertically:

```tsx
<div style={{ position: "absolute", top: "730px", left: "180px", display: "flex", flexDirection: "column", gap: "48px" }}>
  {quizOptions.map((opt, i) => (
    <OptionRow key={i} strokeWidth={0.9} letter={opt.letter} text={opt.text} maxWidth={600} />
  ))}
</div>
```