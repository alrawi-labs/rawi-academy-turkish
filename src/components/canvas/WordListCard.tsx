import { useLayoutEffect, useRef, useState } from 'react'
import headImg from '../../assets/note_card/head.png'
import bodyImg from '../../assets/note_card/body.png'
import tailImg from '../../assets/note_card/tail.png'
import type { WordColor } from '../../design/tokens'
import WordText from './WordText'

export type DerivedWordItem = {
  term: string
  meaning: string
}

type WordListCardProps = {
  width: number
  items: DerivedWordItem[]
  maxBodyHeight?: number
  bodyPaddingY?: number
  rowGap?: number
  horizontalPadding?: number
  termWidthRatio?: number
  size?: number          // TEK ortak tavan boyut — hem term hem meaning, hem tüm satırlar buna göre birlikte küçülür
  maxLines?: number       // meaning için satır sınırı (term zaten tek satır)
  lineHeight?: number
  termColor?: WordColor | (string & {})
  meaningColor?: WordColor | (string & {})
  top?: string | number
  left?: string | number
}

// En fazla 8 terimlik olmsı gerek
export default function WordListCard({
  width,
  items,
  maxBodyHeight= 560,
  bodyPaddingY = 0,
  rowGap = 20,
  horizontalPadding = 40,
  termWidthRatio = 0.4,
  size = 50,
  maxLines = 2,
  lineHeight = 1.3,
  termColor = 'pink',
  meaningColor = 'black',
  top,
  left,
}: WordListCardProps) {
  const contentWidth = width - horizontalPadding * 2
  const termWidth = contentWidth * termWidthRatio
  const meaningWidth = contentWidth * (1 - termWidthRatio)

  const termRefs = useRef<(HTMLSpanElement | null)[]>([])
  const meaningRefs = useRef<(HTMLDivElement | null)[]>([])
  const [uniformSize, setUniformSize] = useState(size)

  useLayoutEffect(() => {
    let cancelled = false

    const runMeasure = () => {
      if (cancelled) return

      let minFit = size

      // term sütunu: genişliğe göre sığan boyutu bul
      for (const el of termRefs.current) {
        if (!el) continue
        let currentSize = size
        const measure = () => {
          el.style.fontSize = `${currentSize}px`
          return el.scrollWidth
        }
        while (measure() > termWidth && currentSize > 1) {
          currentSize -= 1
        }
        if (currentSize < minFit) minFit = currentSize
      }

      // meaning sütunu: satır sayısına göre sığan boyutu bul
      for (const el of meaningRefs.current) {
        if (!el) continue
        let currentSize = size
        const countLines = () => {
          el.style.fontSize = `${currentSize}px`
          const lineHeightPx = currentSize * lineHeight
          return Math.round(el.scrollHeight / lineHeightPx)
        }
        while (countLines() > maxLines && currentSize > 1) {
          currentSize -= 1
        }
        if (currentSize < minFit) minFit = currentSize
      }

      // İKİ sütundan da çıkan en küçük değer HEPSİNE uygulanır
      setUniformSize(minFit)
    }

    if (typeof document !== 'undefined' && 'fonts' in document && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(runMeasure)
    } else {
      runMeasure()
    }

    return () => {
      cancelled = true
    }
  }, [items, termWidth, meaningWidth, size, maxLines, lineHeight])

  const card = (
    <div style={{ position: 'relative', width: `${width}px` }}>
      {/* Gizli ölçüm — term (tek satır, genişlik bazlı) */}
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {items.map((item, i) => (
          <span
            key={i}
            ref={(el) => { termRefs.current[i] = el }}
            style={{ fontWeight: 900, WebkitTextStroke: '0.6px currentColor', display: 'inline-block' }}
          >
            {item.term}
          </span>
        ))}
      </div>

      {/* Gizli ölçüm — meaning (çok satır, yükseklik bazlı) */}
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden' }}>
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { meaningRefs.current[i] = el }}
            dir="rtl"
            style={{
              fontWeight: 900,
              WebkitTextStroke: '0.6px currentColor',
              width: `${meaningWidth}px`,
              wordBreak: 'break-word',
              boxSizing: 'border-box',
            }}
          >
            {item.meaning}
          </div>
        ))}
      </div>

      <img src={headImg} style={{ width: '100%', display: 'block' }} />

      <div
        style={{
          width: '100%',
          maxHeight: maxBodyHeight ? `${maxBodyHeight}px` : undefined,
          overflow: 'hidden',
          backgroundImage: `url(${bodyImg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          gap: `${rowGap}px`,
          padding: `${bodyPaddingY}px ${horizontalPadding}px`,
          boxSizing: 'border-box',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <WordText
              size={uniformSize}
              maxWidth={termWidth}
              align="left"
              fit="wrap"
              color={termColor}
            >
              {item.term}
            </WordText>

            <WordText
              size={uniformSize}
              maxWidth={meaningWidth}
              align="right"
              fit="wrap"
              dir="rtl"
              color={meaningColor}
            >
              {item.meaning}
            </WordText>
          </div>
        ))}
      </div>

      <img src={tailImg} style={{ width: '100%', display: 'block' }} />
    </div>
  )

  if (top === undefined && left === undefined) {
    return card
  }

  return (
    <div className="absolute" style={{ top, left }}>
      {card}
    </div>
  )
}