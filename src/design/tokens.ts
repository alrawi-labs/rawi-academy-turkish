/**
 * RAWI Generator - Tasarım Token Sistemi
 *
 * Kural: Şablon componentleri asla ham hex/px değer kullanmaz.
 * Her renk, font, boşluk buradan gelir. Marka güncellenince
 * sadece bu dosya değişir, tüm şablonlar otomatik güncellenir.
 */

export const colors = {
  brand: {
    primary: '#aa3bff',
    primaryDark: '#7a1fd6',
  },
  surface: {
    light: '#ffffff',
    dark: '#16171d',
  },
  text: {
    heading: '#08060d',
    body: '#6b6375',
    onDark: '#f3f4f6',
  },
  // WordText gibi kart/kelime bileşenlerinde kullanılan hazır renkler
  word: {
    white: '#ffffff',
    black: '#000000',
    pink: '#ff2daa',
    rose: '#ea4391',
  },
} as const

export type WordColor = keyof typeof colors.word

export const spacing = {
  sm: '16px',
  md: '32px',
  lg: '64px',
  xl: '96px',
} as const

// Instagram post boyutları - Puppeteer bu boyutlarda screenshot alacak
export const canvasSizes = {
  square: { width: 1080, height: 1080 }, // feed postu
  story: { width: 1080, height: 1920 }, // story/reels
} as const

export type CanvasSize = keyof typeof canvasSizes



// Sık kullanılan Instagram boyutları - kolaylık için, zorunlu değil.
// Bir şablon bunlardan birini kullanabilir ya da kendi width/height'ını
// (örn. 1080x1350) doğrudan tanımlayabilir.

export const canvasPresets = {
  square: { width: 1080, height: 1080 },
  portrait4x5: { width: 1080, height: 1350 },
  carousel: { width: 1080, height: 1440 },
  story: { width: 1080, height: 1920 },
} as const

export type CanvasSizeValue = { width: number; height: number }



export const fonts = {
  display: "'Thmanyah Serif Display', serif",
} as const

export function fromPsd(px: number): number {
  return Math.round(px / 4.1666)
}