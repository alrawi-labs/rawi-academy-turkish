export type WordMeaningItem = {
    word: string;
    meaning: string;
}

export type BeautifulSentenceData = {
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "C+";
    sentence: string;
    meaning: string;
    count:string;
    wordMeanings: WordMeaningItem[];

}