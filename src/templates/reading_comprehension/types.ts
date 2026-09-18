export type OptionItem = {
  number: string;
  word: string;
}

export type ReadingComprehensionData = {
  passage: string;
  question:string
options:OptionItem[];
number:number;
}
