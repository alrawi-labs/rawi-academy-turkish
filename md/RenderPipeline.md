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