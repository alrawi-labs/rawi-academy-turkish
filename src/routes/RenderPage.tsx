import { useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getTemplate } from '../templates/registry'

/**
 * Puppeteer bu sayfayı şu şekilde açacak:
 *   /render/word_of_day?data=%7B%22word%22%3A%22merhaba%22%7D
 *
 * - :templateKey  -> registry.ts'teki hangi şablon
 * - ?data=        -> JSON.stringify edilip URL-encode edilmiş veri
 *
 * Puppeteer tarafı sonra sadece #canvas elementinin
 * screenshot'unu alacak (tam piksel boyutunda, kenar boşluksuz).
 */
export default function RenderPage() {
  const { templateKey } = useParams<{ templateKey: string }>()
  const [searchParams] = useSearchParams()

  const template = templateKey ? getTemplate(templateKey) : undefined

  const data = useMemo(() => {
    const raw = searchParams.get('data')
    if (!raw) return {}
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }, [searchParams])

  // Puppeteer'a "sayfa hazır, screenshot alabilirsin" sinyali vermek
  // için html'e render-mode class'ı ekliyoruz (index.css'teki kural).
  useEffect(() => {
    document.documentElement.classList.add('render-mode')
    return () => document.documentElement.classList.remove('render-mode')
  }, [])

  if (!template) {
    return (
      <div className="p-8 font-mono text-red-600">
        Şablon bulunamadı: "{templateKey}". registry.ts'e eklendi mi?
      </div>
    )
  }

  const { width, height } = template.size
  const TemplateComponent = template.component

  return (
    <div
      id="canvas"
      style={{ width, height }}
      className="overflow-hidden bg-white"
    >
      <TemplateComponent data={data} />
    </div>
  )
}