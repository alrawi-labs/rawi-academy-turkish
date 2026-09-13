type LabelVariant = 'label' | 'line'

type LabelPreset = {
  backgroundColor: string
  textColor: string
  fontSize: number
  paddingX: number
  paddingY: number
  borderRadius: number
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
}

type LabelProps = {
  children: string
  variant?: LabelVariant   // 'label' (varsayılan) veya 'line'
  backgroundColor?: string  // verilirse variant'ın rengini override eder
  textColor?: string
  fontSize?: number
  paddingX?: number
  paddingY?: number
  borderRadius?: number
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
}: LabelProps) {
  const preset = LABEL_VARIANTS[variant]

  const resolved = {
    backgroundColor: backgroundColor ?? preset.backgroundColor,
    textColor: textColor ?? preset.textColor,
    fontSize: fontSize ?? preset.fontSize,
    paddingX: paddingX ?? preset.paddingX,
    paddingY: paddingY ?? preset.paddingY,
    borderRadius: borderRadius ?? preset.borderRadius,
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
        }}
      >
        {children}
      </span>
    </span>
  )
}