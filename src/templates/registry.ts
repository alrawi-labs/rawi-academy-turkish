import type { ComponentType } from "react";
import type { CanvasSizeValue } from "../design/tokens";
import { canvasPresets } from "../design/tokens";
import WordOfDayCover from "./word_of_day/Cover";
import WordOfDayMeaning from "./word_of_day/Meaning";
import WordOfDayUsageOdd from "./word_of_day/UsageOdd";
import WordOfDayUsageEven from "./word_of_day/UsageEven";
import WordOfDayDerivedWords from "./word_of_day/DerivedWords";
import WordOfDayConjugations from "./word_of_day/Conjugations";
import WordOfDayQuestion from "./word_of_day/Question";
import WordOfDayAnswer from "./word_of_day/Answer";
import WordOfDayClosed from "./word_of_day/Closed";
import ColloquialUsageCover from "./colloquial_usage/Cover";
import ColloquialUsageColloquialTR from "./colloquial_usage/ColloquialTR";
import ColloquialUsageTranslate from "./colloquial_usage/Translate";
import ColloquialUsageWordMeanings from "./colloquial_usage/WordMeanings";
import ColloquialUsageConversation from "./colloquial_usage/Conversation";
import ColloquialUsageSaveCta from "./colloquial_usage/SaveCta";
import ColloquialUsageStory from "./colloquial_usage/Story";
import BeautifulSentenceCover from "./BeautifulSentence/Cover";
import BeautifulSentenceWordMeanings from "./BeautifulSentence/WordMeanings";
import BeautifulSentenceSaveCta from "./BeautifulSentence/SaveCta";
import TranslationTestQuestion from "./translation_test/Question";
import TranslationTestCTA from "./translation_test/TranslationTestCTA";
import TranslationTestAnswer from "./translation_test/Answer";
import WordsTestCover from "./words_test/Cover";
import WordsTestQuestion from "./words_test/Question";
import WordsTestAnswers from "./words_test/Answers";
import GramerOfDayMeaning from "./gramer_of_day/Meaning";
import GramerOfDayCover from "./gramer_of_day/Cover";
import GramerOfDayFormation from "./gramer_of_day/FormationBox";
import GramerOfDayPronouns from "./gramer_of_day/Pronouns";
import GramerOfDayDailyLife from "./gramer_of_day/DailyLife";
import GramerOfDayQuiz from "./gramer_of_day/Quiz";
import GramerOfDayAnswer from "./gramer_of_day/Answer";
import GramerOfDaySummary from "./gramer_of_day/Summary";
import ReadingComprehensionCover from './reading_comprehension/Cover';
import ReadingComprehensionPassage from "./reading_comprehension/Passage";
import ReadingComprehensionQuestion from "./reading_comprehension/Question";

export type TemplateProps<T = Record<string, unknown>> = {
  data: T;
};

export type TemplateDefinition = {
  key: string;
  component: ComponentType<TemplateProps<any>>;
  size: CanvasSizeValue;
};

export const templateRegistry: Record<string, TemplateDefinition> = {
  // ---------- Word of Day ----------
  word_of_day_cover: {
    key: "word_of_day_cover",
    component: WordOfDayCover,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_meaning: {
    key: "word_of_day_meaning",
    component: WordOfDayMeaning,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_usage_odd: {
    key: "word_of_day_usage_odd",
    component: WordOfDayUsageOdd,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_usage_even: {
    key: "word_of_day_usage_even",
    component: WordOfDayUsageEven,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_derived_words: {
    key: "word_of_day_derived_words",
    component: WordOfDayDerivedWords,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_conjugations: {
    key: "word_of_day_conjugations",
    component: WordOfDayConjugations,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_question: {
    key: "word_of_day_question",
    component: WordOfDayQuestion,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_answer: {
    key: "word_of_day_answer",
    component: WordOfDayAnswer,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_closed: {
    key: "word_of_day_closed",
    component: WordOfDayClosed,
    size: canvasPresets.portrait4x5,
  },

  // ---------- Colloquial Usage ----------
  colloquial_usage_cover: {
    key: "colloquial_usage_cover",
    component: ColloquialUsageCover,
    size: canvasPresets.carousel,
  },
  colloquial_usage_colloquial_tr: {
    key: "colloquial_usage_colloquial_tr",
    component: ColloquialUsageColloquialTR,
    size: canvasPresets.carousel,
  },
  colloquial_usage_translate: {
    key: "colloquial_usage_translate",
    component: ColloquialUsageTranslate,
    size: canvasPresets.carousel,
  },
  colloquial_usage_word_meanings: {
    key: "colloquial_usage_word_meanings",
    component: ColloquialUsageWordMeanings,
    size: canvasPresets.carousel,
  },
  colloquial_usage_conversation: {
    key: "colloquial_usage_conversation",
    component: ColloquialUsageConversation,
    size: canvasPresets.carousel,
  },
  colloquial_usage_save_cta: {
    key: "colloquial_usage_save_cta",
    component: ColloquialUsageSaveCta,
    size: canvasPresets.carousel,
  },
  colloquial_usage_cover_story: {
    key: "colloquial_usage_cover_story",
    component: ColloquialUsageStory,
    size: canvasPresets.story,
  },

  // ---------- Beautiful Sentence ----------

  beautiful_sentence_cover: {
    key: "beautiful_sentence_cover",
    component: BeautifulSentenceCover,
    size: canvasPresets.carousel,
  },
  beautiful_sentence_word_meanings: {
    key: "beautiful_sentence_word_meanings",
    component: BeautifulSentenceWordMeanings,
    size: canvasPresets.carousel,
  },
  beautiful_sentence_save_cta: {
    key: "beautiful_sentence_save_cta",
    component: BeautifulSentenceSaveCta,
    size: canvasPresets.carousel,
  },

  // ---------- Translation Test ----------
  translation_test_question: {
    key: "translation_test_question",
    component: TranslationTestQuestion,
    size: canvasPresets.carousel,
  },
  translation_test_cta: {
    key: "translation_test_cta",
    component: TranslationTestCTA,
    size: canvasPresets.carousel,
  },
  translation_test_answer: {
    key: "translation_test_answer",
    component: TranslationTestAnswer,
    size: canvasPresets.carousel,
  },

  // ---------- Words Test ----------

  words_test_cover: {
    key: "words_test_cover",
    component: WordsTestCover,
    size: canvasPresets.carousel,
  },
  words_test_question: {
    key: "words_test_question",
    component: WordsTestQuestion,
    size: canvasPresets.carousel,
  },
  words_test_answers: {
    key: "words_test_answers",
    component: WordsTestAnswers,
    size: canvasPresets.carousel,
  },

  // ---------- Gramer of Day ----------

  gramer_of_day_cover: {
    key: "gramer_of_day_cover",
    component: GramerOfDayCover,
    size: canvasPresets.carousel,
  },
  gramer_of_day_meaning: {
    key: "gramer_of_day_meaning",
    component: GramerOfDayMeaning,
    size: canvasPresets.carousel,
  },
  gramer_of_day_formation: {
    key: "gramer_of_day_formation",
    component: GramerOfDayFormation,
    size: canvasPresets.carousel,
  },
  gramer_of_day_pronouns: {
    key: "gramer_of_day_pronouns",
    component: GramerOfDayPronouns,
    size: canvasPresets.carousel,
  },
  gramer_of_day_dayily_life: {
    key: "gramer_of_day_dayily_life",
    component: GramerOfDayDailyLife,
    size: canvasPresets.carousel,
  },
  gramer_of_day_quiz: {
    key: "gramer_of_day_quiz",
    component: GramerOfDayQuiz,
    size: canvasPresets.carousel,
  },
  gramer_of_day_answer: {
    key: "gramer_of_day_answer",
    component: GramerOfDayAnswer,
    size: canvasPresets.carousel,
  },
  gramer_of_day_summary: {
    key: "gramer_of_day_summary",
    component: GramerOfDaySummary,
    size: canvasPresets.carousel,
  },


  // ---------- Reading Comprehension ----------
  reading_comprehension_cover: {
    key: "reading_comprehension_cover",
    component: ReadingComprehensionCover,
    size: canvasPresets.carousel,
  },
  reading_comprehension_passage: {
    key: "reading_comprehension_passage",
    component: ReadingComprehensionPassage,
    size: canvasPresets.carousel,
  },
  reading_comprehension_question: {
    key: "reading_comprehension_question",
    component: ReadingComprehensionQuestion,
    size: canvasPresets.carousel,
  },
};

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key];
}
