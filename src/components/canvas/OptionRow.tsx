import Label from './Label'
import WordText from './WordText'

type OptionRowProps = {
  letter: string
  text: string
  maxWidth: number
  size?: number
  backgroundColor?: string
  strokeWidth?: number;
}

export default function OptionRow({
  letter,
  text,
  maxWidth,
  size = 48,
  backgroundColor = '#ff2daa',
  strokeWidth = 0,
}: OptionRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '28px' }}>
      <Label strokeWidth={strokeWidth} variant='badge' backgroundColor={backgroundColor}>{letter}</Label>
      <WordText size={size} maxWidth={maxWidth} align="left" fit="wrap" maxLines={2} color="black">
        {text}
      </WordText>
    </div>
  )
}