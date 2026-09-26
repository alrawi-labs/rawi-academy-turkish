export type SentenceOfDayData = {
  sentenceAr: string;
  sentenceTr: string;
}

export type ExamOfDayData = {
  sentence: string;   // NoteCard içindeki Türkçe cümle
  question: string;   // "هاي الجملة بأي زمن؟"
  options: string[];  // sıralı şıklar
};

export type ClockData = {
  clock_number: string;
  clock_text: string;
};

export type TestYourUnderstandingData = {
  sentence: string;
  question: string;
  options: string[];
};

export type TestYourTurkishData = {
  question: string;
};
