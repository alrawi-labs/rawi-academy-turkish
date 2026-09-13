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

export type TemplateProps<T = Record<string, unknown>> = {
  data: T
}

export type TemplateDefinition = {
  key: string
  component: ComponentType<TemplateProps<any>>
  size: CanvasSizeValue
}

export const templateRegistry: Record<string, TemplateDefinition> = {
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
}

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key]
}