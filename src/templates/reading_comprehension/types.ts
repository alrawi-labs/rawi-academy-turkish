export type OptionItem = {
  number: string;
  word: string;
}

export type AnswerItem = {
  number: string | number;
  answer: string;
};


export type ReadingComprehensionAnswersData = {
  answers: AnswerItem[];
  title?: string;
  footer?: string;
  cta?: string;
};


export type ReadingComprehensionData = {
  passage: string;
  question:string
options:OptionItem[];
number:number;
}
