
export type ExampleData = {
    text_tr: string;
    text_ar: string;
}

export type FormationExample = {
  full: string;   // "geldigim için"
  split: string;  // "geldig-im için"
}

export type GramerOfDayFormationData = {
  formula: string; // "IÇIN + DIK + لاحقة الملكية + الفعل"
  example1: FormationExample;
  example2: FormationExample;
}

export type PronounConjugation = {
  pronoun: string; // "انا"
  form: string;    // "Geldigim için"
}

export type GramerOfDayPronounsData = {
  verb: string; // "Gelmek"
  conjugations: [
    PronounConjugation, PronounConjugation, // انا, انت
    PronounConjugation, PronounConjugation, // نحن, انتم
    PronounConjugation, PronounConjugation, // هو, هم
  ];
}

export type DailyLifeExample = {
  tr: string;
  ar: string;
}

export type GramerOfDayDailyLifeData = {
  example1: DailyLifeExample;
  example2: DailyLifeExample;
}


export type GramerOfDayQuizData = {
  sentence: string; // çevrilecek Arapça cümle
  hint: string;      // "-DIGI ICIN"
}

export type GramerOfDayAnswerData = {
  answer_tr: string;  // "Hasta oldugum için ise gitmedim"
  answer_ar: string;  // "ما رحت للدوام لأنني كنت مريضًا"
}

export type GramerOfDaySummaryData = {
  hint: string;        // "-DIGI ICIN"
  meaning: string;      // "لأن / بسبب أن"
  usage: string;        // "للتعبير عن السبب"
  example_tr: string;   // "Dogu yerde oldugum için ögreniyorum"
  example_ar: string;   // "انا اتعلم لأني بالمكان الصحيح"
}

export type GramerOfDayData = {
    gramer: string;
    meaning: string;
    explain: string;
    example: ExampleData;
}