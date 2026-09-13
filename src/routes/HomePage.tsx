import { templateRegistry } from '../templates/registry'
import { colors } from '../design/tokens'

/**
 * Geliştirme sırasında kayıtlı şablonları görmek/test etmek için
 * basit bir liste. Production'da kullanılmıyor - sadece senin için.
 */
export default function HomePage() {
  const keys = Object.keys(templateRegistry)

  return (
    <div className="mx-auto max-w-xl p-10">
      <h1 className="text-2xl font-semibold text-slate-800">
        RAWI Generator
      </h1>
      <p className="mt-2 text-slate-500">Kayıtlı şablonlar:</p>

      {keys.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          Henüz şablon yok - templates/registry.ts'e ekle.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {keys.map((key) => (
            <li key={key}>
              <a
                className="underline"
                style={{ color: colors.brand.primary }}
                href={`/render/${key}`}
                target="_blank"
              >
                /render/{key}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}