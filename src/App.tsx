import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RenderPage from './routes/RenderPage'
import HomePage from './routes/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Geliştirme sırasında şablonları göz önünde görmek için */}
        <Route path="/" element={<HomePage />} />

        {/* Puppeteer'ın screenshot alacağı, gerçek üretimde kullanılan yol */}
        <Route path="/render/:templateKey" element={<RenderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App