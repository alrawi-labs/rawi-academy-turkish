import { useLayoutEffect, useRef, useState } from 'react'
import bodyImg from '../../assets/note_card/body.png'
import newTailImg from "../../assets/note_card/tail_Pill.png";
import PillRow from './PillRow'

export type PillListCardSectionItem = {
  term: string
  label: string
  meaning: string
}

type PillListCardSectionProps = {
  width: number
  items: PillListCardSectionItem[]
  maxBodyHeight?: number
  bodyPaddingY?: number
  rowGap?: number
  horizontalPadding?: number
  termWidthRatio?: number
  size?: number
  maxLines?: number
  lineHeight?: number
}

export default function PillListCardSection({
  width,
  items,
  maxBodyHeight,
  bodyPaddingY = 40,
  rowGap = 28,
  horizontalPadding = 40,
  termWidthRatio = 0.45,
  size = 44,
  maxLines = 2,
  lineHeight = 1.3,
}: PillListCardSectionProps) {
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

      for (const el of termRefs.current) {
        if (!el) continue
        let currentSize = size
        const measure = () => {
          el.style.fontSize = `${currentSize}px`
          return el.scrollWidth
        }
        while (measure() > termWidth && currentSize > 1) currentSize -= 1
        if (currentSize < minFit) minFit = currentSize
      }

      for (const el of meaningRefs.current) {
        if (!el) continue
        let currentSize = size
        const countLines = () => {
          el.style.fontSize = `${currentSize}px`
          const lineHeightPx = currentSize * lineHeight
          return Math.round(el.scrollHeight / lineHeightPx)
        }
        while (countLines() > maxLines && currentSize > 1) currentSize -= 1
        if (currentSize < minFit) minFit = currentSize
      }

      setUniformSize(minFit)
    }

    if (typeof document !== 'undefined' && 'fonts' in document && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(runMeasure)
    } else {
      runMeasure()
    }
    return () => { cancelled = true }
  }, [items, termWidth, meaningWidth, size, maxLines, lineHeight])

  return (
    <div style={{ position: 'relative', width: `${width}px` }}>
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {items.map((item, i) => (
          <span key={i} ref={(el) => { termRefs.current[i] = el }} style={{ fontWeight: 900, WebkitTextStroke: '0.6px currentColor', display: 'inline-block' }}>
            {item.term}
          </span>
        ))}
      </div>
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden' }}>
        {items.map((item, i) => (
          <div key={i} ref={(el) => { meaningRefs.current[i] = el }} dir="rtl" style={{ fontWeight: 900, WebkitTextStroke: '0.6px currentColor', width: `${meaningWidth}px`, wordBreak: 'break-word', boxSizing: 'border-box' }}>
            {item.meaning}
          </div>
        ))}
      </div>

      {/* head YOK — üstteki NoteCard'ın body'sinden kesintisiz devam ediyor */}
      <div
        style={{
          width: '90%',
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
          <PillRow
            key={i}
            term={item.term}
            label={item.label}
            meaning={item.meaning}
            termSize={uniformSize}
            meaningSize={uniformSize}
            termWidth={termWidth}
            meaningWidth={meaningWidth}
          />
        ))}
      </div>

      <img src={newTailImg} style={{ width: '100%', display: 'block' }} />
    </div>
  )
}