

export type ExampleItem = {
    exampleTr: string;
    exampleAr: string;
}
export type WordItem = {
    word: string;
    wordAr: string;
    examples: ExampleItem[];
}

export type FiveWordData = {
    where: string;
    words: WordItem[];
}