export type WordMeanings = {
    word: string;
    meaning: string;
}

export type ConversationItem = {
    sentenceTr: string;
    sentenceAr: string;
}

export type ColloquialUsageData = {
    sentence: string;
    colloquial_tr: string;
    translate: string;
    wordMeanings: WordMeanings[];
    conversations: ConversationItem[];
}