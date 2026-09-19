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



```js
const data = {
  "word2": "Bakmak",
  "meaning2": "ينظر / يَنظُر إلى شيء",
  "explain2": "تُستخدم لما يكون المقصود توجيه النظر أو النظر إلى شيء",
  "example2": "Bana bak!",
  "answer2": "! انظر إليّ",

}

console.log("http://localhost:5173/render/difference_tow_words_meaning2?data=" + encodeURIComponent(JSON.stringify(data)));
```

# Example Links
## Word of Day

### 1. Cover
```
http://localhost:5173/render/word_of_day_cover?data=%7B%22word%22%3A%20%22%C3%96zen%22%2C%20%22level%22%3A%20%22B1%22%7D
```

### 2. Meaning
```
http://localhost:5173/render/word_of_day_meaning?data=%7B%22word%22%3A%20%22%C3%96zen%22%2C%20%22meaning%22%3A%20%22%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%22%2C%20%22explain%22%3A%20%22%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85%20%D8%A8%D8%B4%D9%8A%D8%A1%D8%8C%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%AD%D8%B1%D8%B5%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D9%82%D9%8A%D8%A7%D9%85%20%D8%A8%D9%87%20%D8%A8%D8%B4%D9%83%D9%84%20%D8%AC%D9%8A%D8%AF%22%7D
```

### 3. UsageOdd
```
http://localhost:5173/render/word_of_day_usage_odd?data=%7B%22word%22%3A%20%22%C3%96zen%22%2C%20%22usageTr%22%3A%20%22Annem%20yemek%20yaparken%20her%20zaman%20%C3%A7ok%20%C3%B6zen%20g%C3%B6sterir.%22%2C%20%22usageAr%22%3A%20%22%D8%A3%D9%85%D9%8A%20%D8%AF%D8%A7%D8%A6%D9%85%D8%A7%D9%8B%20%D8%AA%D8%B9%D8%AA%D9%86%D9%8A%20%D9%83%D8%AB%D9%8A%D8%B1%D8%A7%D9%8B%20%D8%B9%D9%86%D8%AF%D9%85%D8%A7%20%D8%AA%D8%B7%D8%A8%D8%AE.%22%2C%20%22usageNumber%22%3A%201%7D
```

### 4. UsageEven
```
http://localhost:5173/render/word_of_day_usage_even?data=%7B%22word%22%3A%20%22%C3%96zen%22%2C%20%22usageTr%22%3A%20%22Bu%20projeye%20%C3%B6zen%20g%C3%B6stermemiz%20gerekiyor.%22%2C%20%22usageAr%22%3A%20%22%D9%8A%D8%AC%D8%A8%20%D8%A3%D9%86%20%D9%86%D8%B9%D8%AA%D9%86%D9%8A%20%D8%A8%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9.%22%2C%20%22usageNumber%22%3A%202%7D
```

### 5. DerivedWords
```
http://localhost:5173/render/word_of_day_derived_words?data=%7B%22derivedWords%22%3A%20%5B%7B%22term%22%3A%20%22%C3%96zenli%22%2C%20%22meaning%22%3A%20%22%D8%AF%D9%82%D9%8A%D9%82%20/%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A8%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zensiz%22%2C%20%22meaning%22%3A%20%22%D9%85%D9%87%D9%85%D9%84%20/%20%D8%BA%D9%8A%D8%B1%20%D8%AF%D9%82%D9%8A%D9%82%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zenmek%22%2C%20%22meaning%22%3A%20%22%D8%A3%D9%86%20%D9%8A%D8%B9%D8%AA%D9%86%D9%8A%20/%20%D9%8A%D9%87%D8%AA%D9%85%22%7D%5D%7D
```

### 6. Conjugations
```
http://localhost:5173/render/word_of_day_conjugations?data=%7B%22conjugations%22%3A%20%5B%7B%22term%22%3A%20%22%C3%96zen%22%2C%20%22label%22%3A%20%22%D9%85%D8%B5%D8%AF%D8%B1%20%28%D8%A7%D8%B3%D9%85%29%22%2C%20%22meaning%22%3A%20%22%D8%B9%D9%86%D8%A7%D9%8A%D8%A9/%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zenli%22%2C%20%22label%22%3A%20%22%D8%B5%D9%81%D8%A9%22%2C%20%22meaning%22%3A%20%22%D8%AF%D9%82%D9%8A%D9%82/%D9%85%D9%87%D8%AA%D9%85%20%D8%A8%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zenir%22%2C%20%22label%22%3A%20%22%D8%A7%D9%84%D9%81%D8%B9%D9%84%20%D8%A7%D9%84%D9%85%D8%B6%D8%A7%D8%B1%D8%B9%20%D8%A7%D9%84%D9%88%D8%A7%D8%B3%D8%B9%22%2C%20%22meaning%22%3A%20%22%D9%8A%D9%88%D9%84%D9%8A%20%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85%D8%A7%D9%8B/%D9%8A%D8%B9%D8%AA%D9%86%D9%8A%20%D8%A8%D9%80%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zeniyor%22%2C%20%22label%22%3A%20%22%D8%A7%D9%84%D9%81%D8%B9%D9%84%20%D8%A7%D9%84%D9%85%D8%B6%D8%A7%D8%B1%D8%B9%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%85%D8%B1%22%2C%20%22meaning%22%3A%20%22%D9%8A%D9%88%D9%84%D9%8A%20%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85%D8%A7%D9%8B/%D9%8A%D8%B9%D8%AA%D9%86%D9%8A%20%D8%A8%D9%80%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zenecek%22%2C%20%22label%22%3A%20%22%D8%A7%D9%84%D9%81%D8%B9%D9%84%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84%22%2C%20%22meaning%22%3A%20%22%D8%B3%D9%88%D9%81%20%D9%8A%D9%87%D8%AA%D9%85/%D8%B3%D8%B9%D8%AA%D9%86%D9%8A%20%D8%A8%D9%80%22%7D%2C%20%7B%22term%22%3A%20%22%C3%96zendi%22%2C%20%22label%22%3A%20%22%D8%A7%D9%84%D9%81%D8%B9%D9%84%20%D8%A7%D9%84%D9%85%D8%B6%D8%A7%D8%B1%D8%B9%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%85%D8%B1%22%2C%20%22meaning%22%3A%20%22%D8%A7%D9%88%D9%84%D9%89%20%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85/%D8%A7%D8%B9%D8%AA%D9%86%D9%89%20%D8%A8%D9%80%22%7D%5D%7D
```

### 7. Question
```
http://localhost:5173/render/word_of_day_question?data=%7B%22quizOptions%22%3A%20%5B%7B%22letter%22%3A%20%22A%22%2C%20%22text%22%3A%20%22Dikkat%20ve%20titizlik%20g%C3%B6stermek%22%7D%2C%20%7B%22letter%22%3A%20%22B%22%2C%20%22text%22%3A%20%22Aceleyle%20bir%20i%C5%9Fi%20bitirmek%22%7D%2C%20%7B%22letter%22%3A%20%22C%22%2C%20%22text%22%3A%20%22Bir%20%C5%9Feyi%20tamamen%20unutmak%22%7D%2C%20%7B%22letter%22%3A%20%22D%22%2C%20%22text%22%3A%20%22Yorgun%20ve%20isteksiz%20olmak%22%7D%5D%7D
```

### 8. Answer
```
http://localhost:5173/render/word_of_day_answer?data=%7B%22correctAnswer%22%3A%20%7B%22letter%22%3A%20%22B%22%2C%20%22text%22%3A%20%22Bu%20i%C5%9Fi%20%C3%B6zenle%20yapt%C4%B1m%22%2C%20%22translation%22%3A%20%22%D9%84%D9%82%D8%AF%20%D9%82%D9%8F%D9%85%D8%AA%D9%8F%20%D8%A8%D9%87%D8%B0%D8%A7%20%D8%A7%D9%84%D8%B9%D9%85%D9%84%20%D8%A8%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%22%7D%7D
```


### 9. Closed
```
http://localhost:5173/render/word_of_day_closed?data=%7B%22word%22%3A%20%22%C3%96zen%22%2C%20%22fullMeaning%22%3A%20%22%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%20%D8%A3%D9%88%20%D8%A7%D9%84%D8%A7%D9%87%D8%AA%D9%85%D8%A7%D9%85%20%D8%A8%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%22%7D
```






---------------------------------------------------------------------------------------------------------------------
