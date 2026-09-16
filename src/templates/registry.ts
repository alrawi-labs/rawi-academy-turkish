import type { ComponentType } from 'react'
import type { CanvasSizeValue } from '../design/tokens'
import { canvasPresets } from '../design/tokens'
import WordOfDayCover from './word_of_day/Cover'
import WordOfDayMeaning from './word_of_day/Meaning'
import WordOfDayUsageOdd from './word_of_day/UsageOdd'
import WordOfDayUsageEven from './word_of_day/UsageEven'
import WordOfDayDerivedWords from './word_of_day/DerivedWords'
import WordOfDayConjugations from './word_of_day/Conjugations'
import WordOfDayQuestion from './word_of_day/Question'
import WordOfDayAnswer from './word_of_day/Answer'
import WordOfDayClosed from './word_of_day/Closed'
import ColloquialUsageCover from './colloquial_usage/Cover'
import ColloquialUsageColloquialTR from './colloquial_usage/ColloquialTR'
import ColloquialUsageTranslate from './colloquial_usage/Translate'
import ColloquialUsageWordMeanings from './colloquial_usage/WordMeanings'
import ColloquialUsageConversation from './colloquial_usage/Conversation'
import ColloquialUsageSaveCta from './colloquial_usage/SaveCta'
import ColloquialUsageStory from './colloquial_usage/story'

export type TemplateProps<T = Record<string, unknown>> = {
  data: T
}

export type TemplateDefinition = {
  key: string
  component: ComponentType<TemplateProps<any>>
  size: CanvasSizeValue
}

export const templateRegistry: Record<string, TemplateDefinition> = {

  // ---------- Word of Day ---------- 
  word_of_day_cover: {
    key: 'word_of_day_cover',
    component: WordOfDayCover,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_meaning: {
    key: 'word_of_day_meaning',
    component: WordOfDayMeaning,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_usage_odd: {
    key: 'word_of_day_usage_odd',
    component: WordOfDayUsageOdd,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_usage_even: {
    key: 'word_of_day_usage_even',
    component: WordOfDayUsageEven,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_derived_words: {
    key: 'word_of_day_derived_words',
    component: WordOfDayDerivedWords,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_conjugations: {
    key: 'word_of_day_conjugations',
    component: WordOfDayConjugations,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_question: {
    key: 'word_of_day_question',
    component: WordOfDayQuestion,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_answer: {
    key: 'word_of_day_answer',
    component: WordOfDayAnswer,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_closed: {
    key: 'word_of_day_closed',
    component: WordOfDayClosed,
    size: canvasPresets.portrait4x5,
  },


  // ---------- Colloquial Usage ---------- 
  colloquial_usage_cover: {
    key: 'colloquial_usage_cover',
    component: ColloquialUsageCover,
    size: canvasPresets.carousel,
  },
  colloquial_usage_colloquial_tr: {
    key: 'colloquial_usage_colloquial_tr',
    component: ColloquialUsageColloquialTR,
    size: canvasPresets.carousel,
  },
  colloquial_usage_translate: {
    key: 'colloquial_usage_translate',
    component: ColloquialUsageTranslate,
    size: canvasPresets.carousel,
  },
  colloquial_usage_word_meanings: {
    key: 'colloquial_usage_word_meanings',
    component: ColloquialUsageWordMeanings,
    size: canvasPresets.carousel,
  },
  colloquial_usage_conversation: {
    key: 'colloquial_usage_conversation',
    component: ColloquialUsageConversation,
    size: canvasPresets.carousel,
  },
  colloquial_usage_save_cta: {
  key: 'colloquial_usage_save_cta',
  component: ColloquialUsageSaveCta,
  size: canvasPresets.carousel,
},
colloquial_usage_cover_story: {
  key: 'colloquial_usage_cover_story',
  component: ColloquialUsageStory,
  size: canvasPresets.story, 
},

}

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key]
}