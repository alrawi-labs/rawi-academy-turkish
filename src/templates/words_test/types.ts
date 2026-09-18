export type QuestionOptionItem = {
  number: string;
  word: string;
};
export type AnswerItem = {
  number: string;
  letter: string;
};
export type WordsTestData = {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "C+";
  word: string;
  count:number;
  QuestionOptions: QuestionOptionItem[];
  AnswersOptions: QuestionOptionItem[];
};
