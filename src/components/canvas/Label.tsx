type LabelVariant = 'label' | 'line' | 'badge'
type LabelAlign = 'left' | 'center' | 'right'

type LabelPreset = {
  backgroundColor: string
  textColor: string
  fontSize: number
  paddingX: number
  paddingY: number
  borderRadius: number
  width?: number    // sadece 'badge' varyantında kullanılır
  height?: number    // sadece 'badge' varyantında kullanılır
}

const LABEL_VARIANTS: Record<LabelVariant, LabelPreset> = {
  label: {
    backgroundColor: '#ff2daa',
    textColor: '#ffffff',
    fontSize: 30,
    paddingX: 14,
    paddingY: 3,
    borderRadius: 2,
  },
  line: {
    backgroundColor: '#ff2daa',
    textColor: '#000',
    fontSize: 30,
    paddingX: 14,
    paddingY: -5,
    borderRadius: 2,
  },
  badge: {
    backgroundColor: '#ff2daa',
    textColor: '#ffffff',
    fontSize: 40,
    paddingX: 0,
    paddingY: 0,
    borderRadius: 0,
    width: 70,
    height: 70,
  },
}

type LabelProps = {
  children: string
  variant?: LabelVariant
  backgroundColor?: string
  textColor?: string
  fontSize?: number
  paddingX?: number
  paddingY?: number
  paddingTop?: number      // sadece üst boşluğu override eder
  paddingBottom?: number   // sadece alt boşluğu override eder
  // paddingTop/paddingBottom'un üzerine eklenen ince ayar — preset'i değiştirmeden
  // tek bir kullanımda arkaplanı üstten/alttan biraz daha küçültüp büyütmek için.
  // Pozitif değer arkaplanı o kenardan içeri çeker (küçültür), negatif dışarı taşırır (büyütür).
  offsetTop?: number
  offsetBottom?: number
  borderRadius?: number
  width?: number
  height?: number
  align?: LabelAlign
  strokeWidth?: number
  marginTop?: number
  marginBottom?: number
}

export default function Label({
  children,
  variant = 'label',
  backgroundColor,
  textColor,
  fontSize,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  offsetTop,
  offsetBottom,
  borderRadius,
  width,
  height,
  align = 'center',
  strokeWidth = 0,
  marginTop,
  marginBottom,
}: LabelProps) {
  const preset = LABEL_VARIANTS[variant]

  const resolved = {
    backgroundColor: backgroundColor ?? preset.backgroundColor,
    textColor: textColor ?? preset.textColor,
    fontSize: fontSize ?? preset.fontSize,
    paddingX: paddingX ?? preset.paddingX,
    paddingY: paddingY ?? preset.paddingY,
    // paddingTop/paddingBottom verilmezse paddingY'ye (o da verilmezse preset'e) düşer
    paddingTop: paddingTop ?? paddingY ?? preset.paddingY,
    paddingBottom: paddingBottom ?? paddingY ?? preset.paddingY,
    borderRadius: borderRadius ?? preset.borderRadius,
    width: width ?? preset.width,
    height: height ?? preset.height,
  }

  const resolvedOffsetTop = offsetTop ?? 0
  const resolvedOffsetBottom = offsetBottom ?? 0

  const strokeStyle =
    strokeWidth > 0 ? { WebkitTextStroke: `${strokeWidth}px currentColor` } : undefined

  const justifyContent =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'

  const alignSelf =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'

  if (resolved.width !== undefined && resolved.height !== undefined) {
    return (
      <div
        style={{
          width: `${resolved.width}px`,
          height: `${resolved.height}px`,
          backgroundColor: resolved.backgroundColor,
          color: resolved.textColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent,
          fontWeight: 900,
          fontSize: `${resolved.fontSize}px`,
          borderRadius: `${resolved.borderRadius}px`,
          flexShrink: 0,
          marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
          marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
          ...strokeStyle,
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: 1,
        alignSelf,
        marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
        marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-resolved.paddingTop + resolvedOffsetTop}px`,
          bottom: `${-resolved.paddingBottom + resolvedOffsetBottom}px`,
          left: `${-resolved.paddingX}px`,
          right: `${-resolved.paddingX}px`,
          backgroundColor: resolved.backgroundColor,
          borderRadius: `${resolved.borderRadius}px`,
        }}
      />
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          color: resolved.textColor,
          fontWeight: 900,
          fontSize: `${resolved.fontSize}px`,
          whiteSpace: 'nowrap',
          ...strokeStyle,
        }}
      >
        {children}
      </span>
    </span>
  )
}