import OptionRow, { type OptionRowVariant } from './OptionRow'

export type OptionItem = {
  number: string | number
  word: string
}

type OptionListAlign = "left" | "center" | "right"
type OptionListDir = "ltr" | "rtl"

type OptionListProps = {
  items: OptionItem[]
  width: number
  columns?: number
  gapX?: number
  gapY?: number
  variant?: OptionRowVariant
  size?: number
  backgroundColor?: string
  strokeWidth?: number
  align?: OptionListAlign
  dir?: OptionListDir        
  top?: string | number
  left?: string | number
}

export default function OptionList({
  items,
  width,
  columns = 1,
  gapX = 48,
  gapY = 40,
  variant = 'default',
  size,
  backgroundColor,
  strokeWidth,
  align = 'left',
  dir = 'ltr',                
  top,
  left,
}: OptionListProps) {
  const columnWidth = (width - gapX * (columns - 1)) / columns

  const list = (
    <div
      dir={dir}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`,
        columnGap: `${gapX}px`,
        rowGap: `${gapY}px`,
        width: `${width}px`,
        boxSizing: 'border-box',
      }}
    >
      {items.map((item, i) => (
        <OptionRow
          key={i}
          variant={variant}
          letter={String(item.number)}
          text={item.word}
          maxWidth={columnWidth}
          size={size}
          backgroundColor={backgroundColor}
          strokeWidth={strokeWidth}
          align={align}
          dir={dir}          
        />
      ))}
    </div>
  )

  if (top === undefined && left === undefined) return list

  return (
    <div style={{ position: 'absolute', top, left }}>
      {list}
    </div>
  )
}