type LevelBadgeProps = {
  level: string
}

/**
 * Pembe seviye rozeti (B1, A2, C1 vb.)
 * Rengi/boyutu değiştirmek istersen SADECE bu dosyayı düzenle,
 * onu kullanan tüm şablonlar otomatik güncellenir.
 */
export default function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="inline-flex items-center justify-center rounded-md bg-[#ec1c8e] px-6 py-2">
      <span className="text-3xl font-bold text-white">{level}</span>
    </div>
  )
}