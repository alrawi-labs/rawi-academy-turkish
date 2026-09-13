type LabelVariant = 'label' | 'line' | 'badge'

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
  borderRadius?: number
  width?: number
  height?: number
  strokeWidth?: number   // ekstra kalınlık — 0 = kapalı (fontWeight:900'e ek olarak uygulanır)
}

export default function Label({
  children,
  variant = 'label',
  backgroundColor,
  textColor,
  fontSize,
  paddingX,
  paddingY,
  borderRadius,
  width,
  height,
  strokeWidth = 0,
}: LabelProps) {
  const preset = LABEL_VARIANTS[variant]

  const resolved = {
    backgroundColor: backgroundColor ?? preset.backgroundColor,
    textColor: textColor ?? preset.textColor,
    fontSize: fontSize ?? preset.fontSize,
    paddingX: paddingX ?? preset.paddingX,
    paddingY: paddingY ?? preset.paddingY,
    borderRadius: borderRadius ?? preset.borderRadius,
    width: width ?? preset.width,
    height: height ?? preset.height,
  }

  const strokeStyle =
    strokeWidth > 0 ? { WebkitTextStroke: `${strokeWidth}px currentColor` } : undefined

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
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: `${resolved.fontSize}px`,
          borderRadius: `${resolved.borderRadius}px`,
          flexShrink: 0,
          ...strokeStyle,
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <span style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-resolved.paddingY}px`,
          bottom: `${-resolved.paddingY}px`,
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