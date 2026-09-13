import type { ComponentType } from 'react'
import type { CanvasSizeValue } from '../design/tokens'
import { canvasPresets } from '../design/tokens'
import WordOfDayCover from './word_of_day/Cover'
import WordOfDayPg1 from './word_of_day/Pg1'
import WordOfDayPg2 from './word_of_day/Pg2'
import WordOfDayPg3 from './word_of_day/Pg3'
import WordOfDayPg4 from './word_of_day/Pg4'

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
  word_of_day_pg1: {
    key: 'word_of_day_pg1',
    component: WordOfDayPg1,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_pg2: {
    key: 'word_of_day_pg2',
    component: WordOfDayPg2,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_pg3: {
    key: 'word_of_day_pg3',
    component: WordOfDayPg3,
    size: canvasPresets.portrait4x5,
  },
  word_of_day_pg4: {
    key: 'word_of_day_pg4',
    component: WordOfDayPg4,
    size: canvasPresets.portrait4x5,
  },
}

export function getTemplate(key: string): TemplateDefinition | undefined {
  return templateRegistry[key]
}