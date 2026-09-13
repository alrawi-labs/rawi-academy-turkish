# Design Tokens

**File:** `src/design/tokens.ts`

## What this file is for

This file is the **single source of truth** for all colors, fonts, and canvas sizes used across every template. The rule for the whole project is:

> **Templates never write a raw color code (like `#ff2daa`) or a raw font name directly. They always import it from here.**

This way, if the brand color changes one day, you edit this one file, and every template updates automatically.

## `colors`

```ts
colors.brand.primary       // main brand color
colors.brand.primaryDark   // a darker version of the brand color
colors.surface.light       // light background color
colors.surface.dark        // dark background color
colors.text.heading        // color for headings
colors.text.body           // color for normal body text
colors.text.onDark         // text color to use on dark backgrounds
colors.word.white          // used by WordText / Label as color="white"
colors.word.black          // used as color="black"
colors.word.pink           // used as color="pink"
colors.word.rose           // used as color="rose"
```

`colors.word` is the set of colors you can pass by name into `WordText` and `Label` (for example `color="pink"`). The type `WordColor` is just "any key inside `colors.word`" — this is what lets components accept either one of these names, or a raw color string as a fallback.

## `canvasPresets`

These are the ready-made Instagram image sizes:

```ts
canvasPresets.square       // 1080 x 1080  (feed post)
canvasPresets.portrait4x5  // 1080 x 1350  (tall feed post)
canvasPresets.carousel     // 1080 x 1440  (carousel slide)
canvasPresets.story        // 1080 x 1920  (story / reels)
```

A template doesn't have to use one of these — it can also just write its own `{ width, height }` — but using a preset keeps sizes consistent and avoids typing the wrong number by accident.

There's also an older, smaller set called `canvasSizes` (`square` and `story` only) — `canvasPresets` is the newer, more complete list and is the one currently used in `templates/registry.ts`.

## `fonts`

```ts
fonts.display // "'Thmanyah Serif Display', serif"
```

Currently there's one font family defined, used across all templates. The actual font files are loaded separately, in `src/index.css`, using `@font-face` rules (weights 300 to 900).

## `fromPsd(px)`

```ts
export function fromPsd(px: number): number {
  return Math.round(px / 4.1666)
}
```

### Why this function exists

Designs are made in Photoshop on a large canvas (4500px wide), but the actual templates in code are built at Instagram's real size (1080px wide). `4500 / 1080 ≈ 4.1666` — this is the scale difference between the two.

So whenever you measure a distance in Photoshop (for example, "there's 200px of empty space before the text starts"), you cannot use that number directly in the code — it needs to be converted down to the 1080px scale first.

### How to use it

```ts
import { fromPsd } from '../../design/tokens'

// Instead of manually calculating 200 / 4.1666 = 48
<div style={{ left: `${fromPsd(200)}px` }}>
```

### Important note

If you already found the correct pixel value **by testing/eyeballing it directly in the browser** (for example, you tried `45px` and it looked exactly right), keep using that exact number — don't run it through `fromPsd()` again. `fromPsd()` is only for converting a **fresh measurement taken in Photoshop**, not for numbers you already fine-tuned by testing.