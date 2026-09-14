# RAWI Generator — Full Project Context

> This single file is meant to be pasted into a conversation with an AI assistant so it can understand this entire project at once — what it does, how it's structured, every reusable component, every template, and the exact rules to follow when writing new code for it. It combines the project's README, every component guide, the design system, the render pipeline, and the current template family, plus the real source code of the core files for exact reference.

---


---

# RAWI Generator

This project creates Instagram images automatically. It does **not** post to Instagram by itself — it only builds the pictures. Another system (n8n) sends data to this project, this project turns that data into a picture, and then n8n posts that picture to Instagram.

## What this project actually does (simple explanation)

1. You have "templates". A template is one design — for example, the cover image, or the "meaning of the word" image.
2. Each template is a React component. It receives **data** (like a word, a meaning, a sentence) as input.
3. A special page called the **Render Page** loads one template with real data, in a real browser.
4. A tool called **Puppeteer** (this lives outside this project, on the server) opens that page and takes a screenshot. That screenshot is the final PNG image.
5. That PNG is sent to n8n, and n8n posts it to Instagram.

So this project's only job is: **"Given this data and this template name, show the correct picture on screen, perfectly positioned, so it can be photographed."**

## Folder structure

```
src/
  assets/            → images and fonts used inside templates (backgrounds, icons)
  components/canvas/ → small reusable building blocks (text boxes, cards, rows...)
  design/tokens.ts   → all colors, sizes, and fonts in one place (see design-tokens.md)
  templates/
    registry.ts      → the list of all templates, with a name ("key") for each
    word_of_day/      → one folder per "template family" (all templates for the Word of the Day series)
  routes/
    HomePage.tsx      → a simple page for you, listing all templates, for testing only
    RenderPage.tsx    → the real page that Puppeteer opens to take screenshots
  App.tsx             → connects the two routes above
  main.tsx            → starts the React app
  index.css           → fonts and a special "render-mode" CSS rule
```

## How a template is displayed

Every template is opened using a URL like this:

```
/render/word_of_day_cover?data=%7B%22word%22%3A%22merhaba%22%7D
```

- `word_of_day_cover` is the template's **key** (its unique name, defined in `templates/registry.ts`)
- everything after `?data=` is the real content (a word, a meaning, etc.), written as JSON and then URL-encoded

`RenderPage.tsx` reads the key and the data, finds the right template in the registry, and displays it at the exact pixel size Instagram needs (for example 1080×1350). Puppeteer then screenshots exactly that area — nothing else on the page matters.

## Where to find more details

- **`docs/components/`** — one file per reusable building block (`WordText`, `Label`, `NoteCard`, etc.)
- **`docs/templates/`** — how the actual Word of the Day pictures are built, page by page
- **`docs/design-tokens.md`** — colors, fonts, canvas sizes, and the `fromPsd()` helper (for converting Photoshop measurements)
- **`docs/render-pipeline.md`** — how `registry.ts`, `RenderPage.tsx`, and `App.tsx` work together

## Important rule for anyone editing this project

**Never write a color, a font name, or a canvas size directly inside a template.** Always take it from `design/tokens.ts`. This way, if the brand colors change one day, you only need to update one file, and every template updates automatically.




---

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


---

# Render Pipeline

This explains how a template becomes an actual picture, step by step. It covers 4 files working together: `templates/registry.ts`, `routes/RenderPage.tsx`, `routes/HomePage.tsx`, and `App.tsx`.

## 1. `templates/registry.ts` — the list of all templates

This file is the **map** between a simple text name (a "key") and the actual React component + image size to use.

```ts
export const templateRegistry: Record<string, TemplateDefinition> = {
  word_of_day_cover: {
    key: 'word_of_day_cover',
    component: WordOfDayCover,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_meaning: {
    key: 'word_of_day_meaning',
    component: WordOfDayMeaning,
    size: canvasPresets.portrait4x5,
  },
  // ...and so on
}
```

Every template must be registered here to be usable. Registering a new template means: pick a unique key (a plain string, this is what the outside system — n8n — will send), import its component, and add one entry with that key, the component, and the image size it should be rendered at.

There's also a small helper:
```ts
export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key]
}
```
This just looks up one entry by its key, and is used by `RenderPage.tsx`.

### Naming note

The template files, their component function names, and the registry keys were all renamed together to describe their **content** instead of their **page position** — for example, `Meaning.tsx` (`word_of_day_meaning`), `UsageOdd.tsx` / `UsageEven.tsx` (`word_of_day_usage_odd` / `word_of_day_usage_even`), `DerivedWords.tsx` (`word_of_day_derived_words`), `Conjugations.tsx` (`word_of_day_conjugations`), and `Question.tsx` (`word_of_day_question`). The old position-based names (`Pg1`, `Pg2`, `word_of_day_pg1`, etc.) are no longer used anywhere in this project.

**This is a breaking change for n8n.** Since n8n sends the registry key as part of its request, the n8n workflow must be updated to send these new key names — otherwise `getTemplate()` will fail to find a match and `RenderPage.tsx` will show a "template not found" error instead of the image.

## 2. `routes/RenderPage.tsx` — the page that gets screenshotted

This is the single most important page in the whole project — it's the **only** page that actually matters for producing the final image. Everything else exists just to support this page or to help you test it.

It works like this:

1. It reads the template key from the URL, for example from `/render/word_of_day_cover`.
2. It reads the `data` query parameter, which is a JSON object that's been URL-encoded, for example: `?data=%7B%22word%22%3A%22merhaba%22%7D` (this decodes to `{"word":"merhaba"}`).
3. It looks up the template using `getTemplate(templateKey)`.
4. If the template isn't found, it shows a plain error message on the page (this should never happen in production if the key sent by n8n is correct).
5. If it is found, it renders the template's component inside a `<div id="canvas">`, sized exactly to the template's registered width/height, with `overflow: hidden` so nothing can visually spill outside that box.
6. It adds a CSS class (`render-mode`) to the page while this page is open. This class is defined in `index.css` and simply removes all default margins/padding from the page, so the screenshot has zero unwanted white space around it.

**The tool that takes the actual screenshot (Puppeteer) is not part of this project** — it lives on a separate server. That server opens this exact URL in a headless browser, waits for the page to finish rendering, and then takes a screenshot of exactly the `#canvas` element.

## 3. `routes/HomePage.tsx` — for you, not for production

This page is only useful while you're building/testing templates yourself. It reads the same `templateRegistry` and shows a plain list of links, one per template key, so you can click through and preview every registered template in your own browser. Puppeteer never opens this page — n8n never needs it — it exists purely to make development easier.

## 4. `App.tsx` — connects everything with routing

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/render/:templateKey" element={<RenderPage />} />
  </Routes>
</BrowserRouter>
```

This just says: "the homepage (`/`) shows the testing list, and any URL like `/render/anything` shows that specific template, rendered with real data, ready to be screenshotted."

## Putting it all together — the full journey of one image

1. n8n has data ready (for example, today's word and its meaning).
2. n8n sends a request to the render server with a template key (e.g. `word_of_day_cover`) and the data as JSON.
3. The render server's Puppeteer opens `/render/word_of_day_cover?data=...` in a headless browser.
4. `RenderPage.tsx` reads the key and data, finds `WordOfDayCover` in the registry, and renders it at `1080x1350`.
5. `WordOfDayCover` (and the smaller components inside it, like `WordText`) lay out the background image and the text exactly where they should go, auto-sizing text as needed.
6. Puppeteer takes a screenshot of the `#canvas` element — this becomes the final PNG.
7. The render server sends the PNG back to n8n.
8. n8n posts the PNG to Instagram.

This project (the React app) is only responsible for step 4 and 5 — displaying the correct picture on screen. Everything before and after that (talking to n8n, running Puppeteer, posting to Instagram) happens outside this codebase.


---

# Word of the Day — Templates

**Folder:** `src/templates/word_of_day/`

This is one "template family" — a set of pictures that together make up one Instagram carousel post about a single word. Each file is one slide of that carousel. All of them share one data shape, defined in `types.ts`.

## Shared data shape: `types.ts`

```ts
export type WordOfDayData = {
  word: string
  level: string
  meaning: string
  explain: string
  usageTr: string       // Turkish example sentence (shown inside a NoteCard)
  usageAr: string       // Arabic translation of that sentence
  usageNumber?: number  // the number badge shown on the NoteCard (defaults to 1)
  derivedWords: DerivedWordItem[]
  conjugations: ConjugationItem[]
  quizOptions: QuizOption[]
}
```

No single template uses all of this at once. Each template file uses `Pick<WordOfDayData, ...>` to say exactly which fields *it* needs — this keeps each template's required data small and clear, even though they all come from the same overall shape.

```ts
export type DerivedWordItem = { term: string; meaning: string }
export type ConjugationItem = { term: string; meaning: string }
export type QuizOption = { letter: string; text: string }
```

## Slide 1: `Cover.tsx` (registry key: `word_of_day_cover`)

**Needs:** `word`, `level`

The cover slide of the carousel. Shows:
- The word's level (e.g. "A1", "B2") near the top, right-aligned, using `fit="shrink"` so it always stays on one line no matter its length.
- The word itself, big, centered, using `fit="shrink"` — this is the main visual of the cover, so it should look as large as possible while still fitting on one line inside a 590px wide area.

## Slide 2: `Meaning.tsx` (registry key: `word_of_day_meaning`)

**Needs:** `word`, `meaning`, `explain`
**Background:** `assets/templates/word_of_day/meaning.png`

Shows the word, its direct meaning (in a different color, `"rose"`, and right-to-left since it's Arabic), and a longer explanation sentence. The word and meaning use `fit="shrink"` (must fit on one line each). The explanation uses `fit="wrap"` with `maxLines={5}`, since an explanation is a full sentence and might naturally need more than one line — but should never exceed 5 lines.

> Note: positions in this file are marked in the code as "estimated" (`Konum TAHMİNİ`) — meaning they were placed by guessing and are expected to be fine-tuned later by viewing them in the dev server.

## Slide 3 & 4: `UsageOdd.tsx` (registry key: `word_of_day_usage_odd`) and `UsageEven.tsx` (registry key: `word_of_day_usage_even`)

**Needs:** `word`, `usageTr`, `usageAr`, `usageNumber`
**Backgrounds:** `assets/templates/word_of_day/usageOdd.png` and `assets/templates/word_of_day/usageEven.png` (two separate background images, one per file)

Both show the same idea: the word again at the top, and a `NoteCard` underneath containing one usage example sentence in Turkish (`usageTr`) with its Arabic translation (`usageAr`), plus a number badge (`usageNumber`).

They exist as two separate files because, as explained in `render-pipeline.md`, the same *kind* of slide ("here's an example sentence") is meant to repeat multiple times in one carousel (e.g. sentence 1, 3, 5, 7 use one visual layout, and sentence 2, 4, 6 use a slightly different one — for example a mirrored layout, since their card positions differ: `UsageOdd` places the card starting at `left="70px"`, `UsageEven` at `left="260px"`). When you need another repeat of the *same* layout with different data, you reuse the same file with new data — you do not create a new file per carousel position.

## Slide 5: `DerivedWords.tsx` (registry key: `word_of_day_derived_words`)

**Needs:** `derivedWords`
**Background:** `assets/templates/word_of_day/derived_conjugations.png`

Shows the list of words that come from today's word, using `WordListCard` (see `docs/components/WordListCard.md`). All terms and meanings in the list automatically share one consistent font size.

## Slide 6: `Conjugations.tsx` (registry key: `word_of_day_conjugations`)

**Needs:** `conjugations` — an array of exactly 6 `{ term, meaning }` pairs, in a fixed order
**Background:** `assets/templates/word_of_day/derived_conjugations.png` (same background file as `DerivedWords.tsx` — both slides share one image, only the content on top differs)

Shows the verb's conjugations (forms), using `PillListCard` (see `docs/components/PillListCard.md`), with a title header reading "التصريفات الفعلية" (verb conjugations).

**Fixed labels:** this slide always shows the same 6 grammar categories, in the same order, on every word — noun form, adjective form, wide present tense, continuous present tense, future tense, past tense (`مصدر (اسم)`, `صفة`, `الفعل المضارع الواسع`, `الفعل المضارع المستمر`, `الفعل المستقبل`, `الفعل الماضي`). Because these never change, they are hardcoded inside `Conjugations.tsx` instead of being sent from n8n — see the exact code in the Appendix below. The incoming `conjugations` array only needs to provide `term` and `meaning` for each of the 6 positions; the label is decided by position, not by anything in the data itself, so the 6 items must always be sent in that exact order.

## Slide 7: `Question.tsx` (registry key: `word_of_day_question`)

**Needs:** `quizOptions`
**Background:** `assets/templates/word_of_day/qs_as_closed.png`

Shows a multiple-choice quiz question's answer options, using a stacked list of `OptionRow`s (see `docs/components/OptionRow.md`) — one per option, each with its own letter badge.

## Shared backgrounds worth knowing about

`DerivedWords.tsx` and `Conjugations.tsx` currently use the **same** background image (`derived_conjugations.png`). This is intentional and fine — but if one of these two slides ever needs a visually different background from the other, remember to split it into its own image file first, otherwise changing one will change both.

## Not yet documented / possibly upcoming

Earlier planning discussions mentioned additional closing slides — `Answer` (revealing the correct quiz answer) and `CallToAction` (encouraging viewers to comment) — meant to share one common background image (a "closing card" background) with `Question`. These files were not included in what's been shared so far, so they're not covered here yet. Add them to this document once their code is available.


---

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


---

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


---

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


---

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


---

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


---

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


---

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


---

# Appendix: Current Source Code (exact reference)

This section contains the real, current code of the core files, for exact prop names, types, and behavior. Component-level docs above explain *why* and *how to use* — this appendix is the ground truth for *exact syntax*.

## `src/design/tokens.ts`

```ts
export const colors = {
  brand: {
    primary: '#aa3bff',
    primaryDark: '#7a1fd6',
  },
  surface: {
    light: '#ffffff',
    dark: '#16171d',
  },
  text: {
    heading: '#08060d',
    body: '#6b6375',
    onDark: '#f3f4f6',
  },
  word: {
    white: '#ffffff',
    black: '#000000',
    pink: '#ff2daa',
    rose: '#ea4391',
  },
} as const

export type WordColor = keyof typeof colors.word

export const spacing = {
  sm: '16px',
  md: '32px',
  lg: '64px',
  xl: '96px',
} as const

export const canvasSizes = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
} as const

export type CanvasSize = keyof typeof canvasSizes

export const canvasPresets = {
  square: { width: 1080, height: 1080 },
  portrait4x5: { width: 1080, height: 1350 },
  carousel: { width: 1080, height: 1440 },
  story: { width: 1080, height: 1920 },
} as const

export type CanvasSizeValue = { width: number; height: number }

export const fonts = {
  display: "'Thmanyah Serif Display', serif",
} as const

export function fromPsd(px: number): number {
  return Math.round(px / 4.1666)
}
```

## `src/templates/registry.ts`

```ts
import type { ComponentType } from 'react'
import type { CanvasSizeValue } from '../design/tokens'
import { canvasPresets } from '../design/tokens'
import WordOfDayCover from './word_of_day/Cover'
import WordOfDayMeaning from './word_of_day/Meaning'
import WordOfDayUsageOdd from './word_of_day/UsageOdd'
import WordOfDayUsageEven from './word_of_day/UsageEven'
import WordOfDayDerivedWords from './word_of_day/DerivedWords'
import WordOfDayConjugations from './word_of_day/Conjugations'
import WordOfDayQuestion from './word_of_day/Question'

export type TemplateProps<T = Record<string, unknown>> = {
  data: T
}

export type TemplateDefinition = {
  key: string
  component: ComponentType<TemplateProps<any>>
  size: CanvasSizeValue
}

export const templateRegistry: Record<string, TemplateDefinition> = {
  word_of_day_cover: { key: 'word_of_day_cover', component: WordOfDayCover, size: canvasPresets.portrait4x5 },
  word_of_day_meaning: { key: 'word_of_day_meaning', component: WordOfDayMeaning, size: canvasPresets.portrait4x5 },
  word_of_day_usage_odd: { key: 'word_of_day_usage_odd', component: WordOfDayUsageOdd, size: canvasPresets.portrait4x5 },
  word_of_day_usage_even: { key: 'word_of_day_usage_even', component: WordOfDayUsageEven, size: canvasPresets.portrait4x5 },
  word_of_day_derived_words: { key: 'word_of_day_derived_words', component: WordOfDayDerivedWords, size: canvasPresets.portrait4x5 },
  word_of_day_conjugations: { key: 'word_of_day_conjugations', component: WordOfDayConjugations, size: canvasPresets.portrait4x5 },
  word_of_day_question: { key: 'word_of_day_question', component: WordOfDayQuestion, size: canvasPresets.portrait4x5 },
}

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key]
}
```

## `src/routes/RenderPage.tsx`

```tsx
import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getTemplate } from '../templates/registry'

export default function RenderPage() {
  const { templateKey } = useParams<{ templateKey: string }>()
  const [searchParams] = useSearchParams()

  const template = templateKey ? getTemplate(templateKey) : undefined

  const data = useMemo(() => {
    const raw = searchParams.get('data')
    if (!raw) return {}
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }, [searchParams])

  useEffect(() => {
    document.documentElement.classList.add('render-mode')
    return () => document.documentElement.classList.remove('render-mode')
  }, [])

  if (!template) {
    return (
      <div className="p-8 font-mono text-red-600">
        Şablon bulunamadı: "{templateKey}". registry.ts'e eklendi mi?
      </div>
    )
  }

  const { width, height } = template.size
  const TemplateComponent = template.component

  return (
    <div id="canvas" style={{ width, height }} className="overflow-hidden bg-white">
      <TemplateComponent data={data} />
    </div>
  )
}
```

## `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RenderPage from './routes/RenderPage'
import HomePage from './routes/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/render/:templateKey" element={<RenderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## `src/components/canvas/WordText.tsx`

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { colors, type WordColor } from "../../design/tokens";

type WordTextProps = {
  children: string;
  size?: number;
  maxWidth?: number;
  padding?: number;
  align?: "left" | "center" | "right";
  top?: string | number;
  left?: string | number;
  fit?: "wrap" | "shrink";
  maxSize?: number;
  centerY?: boolean;
  color?: WordColor | (string & {});
  dir?: "ltr" | "rtl";
  maxLines?: number;
  lineHeight?: number;
};

export default function WordText({
  children, size = 72, maxWidth, padding = 0, align = "left", top, left,
  fit = "wrap", maxSize, centerY = false, color = "black", dir, maxLines, lineHeight = 1.3,
}: WordTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cap = maxSize ?? size;
  const [fittedSize, setFittedSize] = useState(cap);
  const [wrappedSize, setWrappedSize] = useState(size);
  const resolvedColor = colors.word[color as WordColor] ?? color;

  const waitForFonts = (cb: () => void) => {
    if (typeof document !== "undefined" && "fonts" in document && document.fonts.status !== "loaded") {
      document.fonts.ready.then(cb);
    } else {
      cb();
    }
  };

  useLayoutEffect(() => {
    if (fit !== "shrink" || !maxWidth || !spanRef.current) return;
    let cancelled = false;
    const contentWidth = maxWidth - padding * 2;
    const runMeasure = () => {
      if (cancelled || !spanRef.current) return;
      let currentSize = cap;
      const measure = () => {
        if (!spanRef.current) return 0;
        spanRef.current.style.fontSize = `${currentSize}px`;
        return spanRef.current.scrollWidth - padding * 2;
      };
      while (measure() > contentWidth && currentSize > 1) currentSize -= 1;
      setFittedSize(currentSize);
    };
    waitForFonts(runMeasure);
    return () => { cancelled = true; };
  }, [children, maxWidth, padding, fit, cap]);

  useLayoutEffect(() => {
    if (fit !== "wrap" || !maxLines || !maxWidth || !spanRef.current) return;
    let cancelled = false;
    const runMeasure = () => {
      if (cancelled || !spanRef.current) return;
      let currentSize = size;
      const countLines = () => {
        if (!spanRef.current) return 0;
        spanRef.current.style.fontSize = `${currentSize}px`;
        const lineHeightPx = currentSize * lineHeight;
        return Math.round(spanRef.current.scrollHeight / lineHeightPx);
      };
      while (countLines() > maxLines && currentSize > 1) currentSize -= 1;
      setWrappedSize(currentSize);
    };
    waitForFonts(runMeasure);
    return () => { cancelled = true; };
  }, [children, maxWidth, padding, fit, maxLines, size, lineHeight]);

  const activeFontSize = fit === "shrink" ? fittedSize : maxLines ? wrappedSize : size;

  const textSpan = (
    <span
      ref={spanRef}
      dir={dir}
      className="font-black"
      style={{
        fontSize: `${activeFontSize}px`,
        WebkitTextStroke: "0.6px currentColor",
        lineHeight: fit === "wrap" ? lineHeight : undefined,
        color: resolvedColor,
        display: "block",
        width: maxWidth ? `${maxWidth}px` : undefined,
        paddingLeft: padding ? `${padding}px` : undefined,
        paddingRight: padding ? `${padding}px` : undefined,
        boxSizing: "border-box",
        wordBreak: fit === "wrap" ? "break-word" : undefined,
        whiteSpace: fit === "shrink" ? "nowrap" : undefined,
        overflow: fit === "shrink" ? "hidden" : undefined,
        textAlign: align,
      }}
    >
      {children}
    </span>
  );

  if (top === undefined && left === undefined) return textSpan;

  return (
    <div className="absolute" style={{ top, left, transform: centerY ? "translateY(-50%)" : undefined }}>
      {textSpan}
    </div>
  );
}
```

## `src/components/canvas/NoteCard.tsx`

```tsx
import headImg from "../../assets/note_card/head.png";
import bodyImg from "../../assets/note_card/body.png";
import tailImg from "../../assets/note_card/tail.png";
import { colors, type WordColor } from "../../design/tokens";
import WordText from "./WordText";
import Label from "./Label";

export type NoteCardText =
  | string
  | {
      text: string;
      variant?: "label" | "line" | "badge";
      backgroundColor?: string;
      textColor?: string;
      fontSize?: number;
      paddingX?: number;
      paddingY?: number;
    };

type NoteCardProps = {
  width: number;
  maxBodyHeight?: number;
  bodyPaddingY?: number;
  number?: number;
  topText: NoteCardText;
  bottomText: NoteCardText;
  top?: string | number;
  left?: string | number;
  textPadding?: number;
  topMaxLines?: number;
  bottomMaxLines?: number;
  topSize?: number;
  bottomSize?: number;
  topTextColor?: WordColor | (string & {});
  bottomTextColor?: WordColor | (string & {});
  numberBackgroundColor?: string;
  numberTextColor?: string;
};

function renderText(
  value: NoteCardText,
  fallback: {
    size: number;
    maxWidth: number;
    maxLines: number;
    color: WordColor | (string & {});
    dir?: "ltr" | "rtl";
  }
) {
  if (typeof value === "string") {
    return (
      <WordText
        size={fallback.size}
        maxWidth={fallback.maxWidth}
        align="center"
        fit="wrap"
        maxLines={fallback.maxLines}
        color={fallback.color}
        dir={fallback.dir}
      >
        {value}
      </WordText>
    );
  }

  return (
    <Label
      variant={value.variant ?? "label"}
      backgroundColor={value.backgroundColor}
      textColor={value.textColor}
      fontSize={value.fontSize ?? fallback.size}
    >
      {value.text}
    </Label>
  );
}

export default function NoteCard({
  width,
  maxBodyHeight,
  bodyPaddingY = 0,
  number,
  topText,
  bottomText,
  top,
  left,
  textPadding = 32,
  topMaxLines = 2,
  bottomMaxLines = 2,
  topSize = 44,
  bottomSize = 40,
  topTextColor = "pink",
  bottomTextColor = "black",
  numberBackgroundColor = colors.word.pink,
  numberTextColor = "white",
}: NoteCardProps) {
  const contentWidth = width - textPadding * 2;

  const card = (
    <div style={{ position: "relative", width: `${width}px` }}>
      {number !== undefined && (
        <div
          style={{
            position: "absolute",
            top: "-55px",
            left: "18px",
            width: "92px",
            height: "80px",
            backgroundColor: numberBackgroundColor,
            color: numberTextColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "48px",
            zIndex: 1,
          }}
        >
          {number}
        </div>
      )}

      <img
        src={headImg}
        style={{ width: "100%", display: "block", position: "relative", zIndex: 2 }}
      />

      <div
        style={{
          width: "100%",
          maxHeight: maxBodyHeight ? `${maxBodyHeight}px` : undefined,
          overflow: "hidden",
          backgroundImage: `url(${bodyImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: `${bodyPaddingY}px 0`,
          boxSizing: "border-box",
        }}
      >
        {renderText(topText, {
          size: topSize,
          maxWidth: contentWidth,
          maxLines: topMaxLines,
          color: topTextColor,
        })}

        {renderText(bottomText, {
          size: bottomSize,
          maxWidth: contentWidth,
          maxLines: bottomMaxLines,
          color: bottomTextColor,
          dir: "rtl",
        })}
      </div>

      <img src={tailImg} style={{ width: "100%", display: "block" }} />
    </div>
  );

  if (top === undefined && left === undefined) return card;

  return (
    <div className="absolute" style={{ top, left }}>
      {card}
    </div>
  );
}
```

## `src/templates/word_of_day/types.ts`

```ts
export type DerivedWordItem = { term: string; meaning: string }
export type ConjugationItem = { term: string; meaning: string }
export type QuizOption = { letter: string; text: string }

export type WordOfDayData = {
  word: string
  level: string
  meaning: string
  explain: string
  usageTr: string
  usageAr: string
  usageNumber?: number
  derivedWords: DerivedWordItem[]
  conjugations: ConjugationItem[]
  quizOptions: QuizOption[]
}
```

## `src/templates/word_of_day/Conjugations.tsx`

```tsx
import DerivedConjugationsBG from "../../assets/templates/word_of_day/derived_conjugations.png";
import type { TemplateProps } from "../registry";
import type { WordOfDayData } from "./types";
import PillListCard from "../../components/canvas/PillListCard";

type PgData = Pick<WordOfDayData, "conjugations">;

// These labels always repeat in the same order on every verb — so they are
// fixed here instead of being sent by n8n on every request.
const CONJUGATION_LABELS = [
  "مصدر (اسم)",
  "صفة",
  "الفعل المضارع الواسع",
  "الفعل المضارع المستمر",
  "الفعل المستقبل",
  "الفعل الماضي",
] as const;

export default function WordOfDayConjugations({ data }: TemplateProps<PgData>) {
  const { conjugations } = data;

  const items = conjugations.map((item, i) => ({
    term: item.term,
    meaning: item.meaning,
    label: CONJUGATION_LABELS[i],
  }));

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${DerivedConjugationsBG})` }}
    >
      <PillListCard
        width={776}
        top={200}
        left={95}
        title="التصريفات الفعلية"
        items={items}
        rowGap={20}
        maxBodyHeight={740}
        termColor="rose"
      />
    </div>
  );
}
```

---

# Rules for writing new code in this project

1. Never write a raw hex color or raw font name in a template — always use `design/tokens.ts`.
2. Every new template must be registered in `templates/registry.ts` with a unique, content-based key (not a position-based one like `pg7`).
3. For a single word/title that must stay on one line and look as big as possible: use `WordText` with `fit="shrink"` and `maxSize`.
4. For a sentence/paragraph that can wrap but must not exceed N lines: use `WordText` with `fit="wrap"` and `maxLines`.
5. For a list of term/meaning pairs where all rows should look visually consistent: use `WordListCard` (no header) or `PillListCard` (with a title header) — never write a new custom measuring loop from scratch.
6. When converting a fresh measurement taken in Photoshop into code, run it through `fromPsd()` first. Never reuse `fromPsd()` on a number you already found by testing directly in the browser — that number is already correct at the real scale.
7. Whenever a registry key is renamed or added, the n8n workflow sending render requests must be updated to match — the two are not connected automatically.
8. When a text field could reasonably be either a plain sentence or a short highlighted tag, follow the `NoteCard` pattern: accept a union type (`string | { text, ...Label props }`), render through `WordText` for strings and through `Label` for objects. Don't build a second custom text-measuring component for this — `Label` already handles the tag look, `WordText` already handles auto-sizing.