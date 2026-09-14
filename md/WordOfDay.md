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

**Fixed labels:** Unlike `DerivedWords`, this slide always shows the same 6 grammar categories, in the same order, on every word:

```ts
const CONJUGATION_LABELS = [
  "مصدر (اسم)",
  "صفة",
  "الفعل المضارع الواسع",
  "الفعل المضارع المستمر",
  "الفعل المستقبل",
  "الفعل الماضي",
] as const;
```

Because these never change, they are hardcoded inside `Conjugations.tsx` instead of being sent from n8n. The incoming `conjugations` data only needs to provide `term` and `meaning` for each of the 6 positions — the template matches position `0` to `مصدر (اسم)`, position `1` to `صفة`, and so on, then passes the combined `{ term, meaning, label }` list into `PillListCard`.

⚠️ This means the 6 items in the `conjugations` array must always be sent **in this exact order** (noun form, adjective form, wide present tense, continuous present tense, future tense, past tense) — the label is decided by position, not by anything in the data itself.

## Slide 7: `Question.tsx` (registry key: `word_of_day_question`)

**Needs:** `quizOptions`
**Background:** `assets/templates/word_of_day/qs_as_closed.png`

Shows a multiple-choice quiz question's answer options, using a stacked list of `OptionRow`s (see `docs/components/OptionRow.md`) — one per option, each with its own letter badge.

## Shared backgrounds worth knowing about

`DerivedWords.tsx` and `Conjugations.tsx` currently use the **same** background image (`derived_conjugations.png`). This is intentional and fine — but if one of these two slides ever needs a visually different background from the other, remember to split it into its own image file first, otherwise changing one will change both.

## Not yet documented / possibly upcoming

Earlier planning discussions mentioned additional closing slides — `Answer` (revealing the correct quiz answer) and `CallToAction` (encouraging viewers to comment) — meant to share one common background image (a "closing card" background) with `Question`. These files were not included in what's been shared so far, so they're not covered here yet. Add them to this document once their code is available.