export type QuickTestData = {
  // Her satır "\n" ile ayrılır (Sentence otomatik satır kaydırma yapmaz), en fazla 3 satır
  question: string;
  // Türkçe şıklar (A, B, C) — en fazla 3
  options: string[];
};
