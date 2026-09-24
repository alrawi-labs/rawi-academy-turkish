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
import ReadingComprehensionCover from "./reading_comprehension/Cover";
import ReadingComprehensionPassage from "./reading_comprehension/Passage";
import ReadingComprehensionQuestion from "./reading_comprehension/Question";
import ReadingComprehensionAnswers from "./reading_comprehension/Answers";
import ReadingComprehensionCta from "./reading_comprehension/CTA";
import ReadingComprehensionStory from "./reading_comprehension/Story";
import DifferenceTowWordsCover from "./difference_tow_words/Cover";
import DifferenceTowWordsMeaning1 from "./difference_tow_words/meaning1";
import DifferenceTowWordsMeaning2 from "./difference_tow_words/meaning2";
import DifferenceTowWordsSelfTest from "./difference_tow_words/SelfTest";
import DifferenceTowWordsAnswer from "./difference_tow_words/Answer";
import DifferenceTowWordsExamples from "./difference_tow_words/Examples";
import OneWordManyUsesCover from "./one_word_many_uses/Cover";
import OneWordManyUsesUsage from "./one_word_many_uses/Usage";
import OneWordManyUsesQuestion from "./one_word_many_uses/Question";
import TipsCover from "./tips/Cover";
import TipsContent from "./tips/TipsContent";
import TipsExample from "./tips/Example";
import PopularProverbsCover from "./popular_proverbs/cover";
import PopularProverbsDetail from "./popular_proverbs/PopularProverbsDetail";
import PopularProverbsMeaning from "./popular_proverbs/Meaning";
import PopularProverbsExample from "./popular_proverbs/Example";
import PopularProverbsCta from "./popular_proverbs/Cta";
import PopularProverbsLast from "./popular_proverbs/Last";
import FiveWordCover from "./five_word/Cover";
import FiveWordWords from "./five_word/Words";
import FiveWordDetail from "./five_word/Details";
import FiveWordPoll from "./five_word/Poll";
import FiveWordStory from "./five_word/Story";
import QuickTestCover from "./quick_test/Cover";
import QuickTestAnswer from "./quick_test/Answer";

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
  reading_comprehension_answer_list: {
    key: "reading_comprehension_answer_list",
    component: ReadingComprehensionAnswers,
    size: canvasPresets.carousel,
  },
  reading_comprehension_cta: {
    key: "reading_comprehension_cta",
    component: ReadingComprehensionCta,
    size: canvasPresets.carousel,
  },
  reading_comprehension_story: {
    key: "reading_comprehension_story",
    component: ReadingComprehensionStory,
    size: canvasPresets.story,
  },

  // ---------- Difference Tow Words ----------

  difference_tow_words_cover: {
    key: "difference_tow_words_cover",
    component: DifferenceTowWordsCover,
    size: canvasPresets.carousel,
  },
  difference_tow_words_examples: {
    key: "difference_tow_words_examples",
    component: DifferenceTowWordsExamples,
    size: canvasPresets.carousel,
  },
  difference_tow_words_meaning1: {
    key: "difference_tow_words_meaning1",
    component: DifferenceTowWordsMeaning1,
    size: canvasPresets.carousel,
  },
  difference_tow_words_meaning2: {
    key: "difference_tow_words_meaning2",
    component: DifferenceTowWordsMeaning2,
    size: canvasPresets.carousel,
  },
  difference_tow_words_self_test: {
    key: "difference_tow_words_self_test",
    component: DifferenceTowWordsSelfTest,
    size: canvasPresets.carousel,
  },
  difference_tow_words_answer: {
    key: "difference_tow_words_answer",
    component: DifferenceTowWordsAnswer,
    size: canvasPresets.carousel,
  },

  // ---------- One Word Many Uses ----------

  one_word_many_uses_cover: {
    key: "one_word_many_uses_cover",
    component: OneWordManyUsesCover,
    size: canvasPresets.carousel,
  },
  one_word_many_uses_usage: {
    key: "one_word_many_uses_usage",
    component: OneWordManyUsesUsage,
    size: canvasPresets.carousel,
  },
  one_word_many_uses_question: {
    key: "one_word_many_uses_question",
    component: OneWordManyUsesQuestion,
    size: canvasPresets.carousel,
  },

  // ---------- Tips ----------

  tips_cover: {
    key: "tips_cover",
    component: TipsCover,
    size: canvasPresets.carousel,
  },
  tips_content: {
    key: "tips_content",
    component: TipsContent,
    size: canvasPresets.carousel,
  },
  tips_example: {
    key: "tips_example",
    component: TipsExample,
    size: canvasPresets.carousel,
  },

  // ---------- Popular Proverbs ----------
  popular_proverbs_cover: {
    key: "popular_proverbs_cover",
    component: PopularProverbsCover,
    size: canvasPresets.carousel,
  },
  popular_proverbs_detail: {
    key: "popular_proverbs_detail",
    component: PopularProverbsDetail,
    size: canvasPresets.carousel,
  },
  popular_proverbs_meaning: {
    key: "popular_proverbs_meaning",
    component: PopularProverbsMeaning,
    size: canvasPresets.carousel,
  },
  popular_proverbs_example: {
    key: "popular_proverbs_example",
    component: PopularProverbsExample,
    size: canvasPresets.carousel,
  },
  popular_proverbs_cta: {
    key: "popular_proverbs_cta",
    component: PopularProverbsCta,
    size: canvasPresets.carousel,
  },
  popular_proverbs_last: {
    key: "popular_proverbs_last",
    component: PopularProverbsLast,
    size: canvasPresets.carousel,
  },

  // ---------- Five Word ----------
  five_word_cover: {
    key: "five_word_cover",
    component: FiveWordCover,
    size: canvasPresets.carousel,
  },
  five_word_words: {
    key: "five_word_words",
    component: FiveWordWords,
    size: canvasPresets.carousel,
  },
  five_word_detail: {
    key: "five_word_detail",
    component: FiveWordDetail,
    size: canvasPresets.carousel,
  },
  five_word_poll: {
    key: "five_word_poll",
    component: FiveWordPoll,
    size: canvasPresets.carousel,
  },
  five_word_story: {
    key: "five_word_story",
    component: FiveWordStory,
    size: canvasPresets.story,
  },

  // ---------- Quick Test ----------
  quick_test_cover: {
    key: "quick_test_cover",
    component: QuickTestCover,
    size: canvasPresets.carousel,
  },
  quick_test_answer: {
    key: "quick_test_answer",
    component: QuickTestAnswer,
    size: canvasPresets.carousel,
  },
};

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key];
}
