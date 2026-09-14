export type DerivedWordItem = {
  term: string
  meaning: string
}

export type ConjugationItem = {
  term: string
  meaning: string
}

export type QuizOption = {
  letter: string   // 'A' | 'B' | 'C' | 'D'
  text: string
}

export type WordOfDayData = {
  word: string
  level: string
  meaning: string
  explain: string       
  usageTr: string       // NoteCard içindeki Türkçe örnek cümle
  usageAr: string       // NoteCard içindeki Arapça çeviri
  usageNumber?: number  // kartın sol üstündeki numara (varsayılan 1)
  derivedWords: DerivedWordItem[]
  conjugations: ConjugationItem[]
  quizOptions: QuizOption[]
}
