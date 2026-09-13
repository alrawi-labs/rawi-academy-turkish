# PillRow

**File:** `src/components/canvas/PillRow.tsx`

## What it is

`PillRow` shows one single row inside a word list: a Turkish word on the left, and its Arabic meaning on the right (optionally with a small colored label above the meaning, like a grammar tag). It's the smallest building block used by `WordListCard`, `PillListCard`, and `PillListCardSection` — those components repeat `PillRow` once per item in a list.

`PillRow` itself does **not** calculate font sizes — it only displays text at whatever size it's given. The font-size calculation (finding one common size that fits every row in a list) happens one level up, in the parent component.

## Props

| Prop | Type | Default | What it does |
|---|---|---|---|
| `term` | text | — | The Turkish word (left side) |
| `label` | text | — | Optional small tag shown above the meaning (e.g. a grammar note). If not given, no label is shown, and no extra space is reserved for it |
| `meaning` | text | — | The Arabic meaning (right side) |
| `termSize` | number | — | Font size for the term |
| `meaningSize` | number | — | Font size for the meaning |
| `termWidth` | number | — | Maximum width for the term column |
| `meaningWidth` | number | — | Maximum width for the meaning column |
| `termColor` | color name | `"rose"` | Color of the term text |
| `meaningColor` | color name | `"black"` | Color of the meaning text |

## Layout

```
[ term (left, aligned left) ]                [ label (optional) ]
                                              [ meaning (right, aligned right, RTL) ]
```

The term sits on the left. The meaning column sits on the right, and inside that column, the optional `label` is stacked above the `meaning` text, both aligned to the right.

## Example usage

```tsx
<PillRow
  term="Özenli"
  label="sıfat"
  meaning="دقيق / مهتم بالتفاصيل"
  termSize={44}
  meaningSize={44}
  termWidth={310}
  meaningWidth={380}
/>
```

## Related components

`PillRow` is not meant to be used alone in a template. It's always rendered in a loop by one of the "list card" components — see `WordListCard.md`, `PillListCard.md`, and `PillListCardSection.md`.