import { Navigate, Route, Routes } from 'react-router-dom'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import AboutPage from './pages/AboutPage'
import BookingConfirmationPage from './pages/BookingConfirmationPage'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import CarTestPage from './pages/CarTestPage'
import EffectGuidePage from './pages/EffectGuidePage'
import FaqPage from './pages/FaqPage'
import GuaranteePage from './pages/GuaranteePage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import MotorOptimizationPage from './pages/MotorOptimizationPage'
import PricesPage from './pages/PricesPage'
import RepairsPage from './pages/RepairsPage'
import ServicePage from './pages/ServicePage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Hoppa till innehåll
      </a>

      <SiteHeader />

      <main id="main-content" className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tjanster" element={<ServicesPage />} />
          <Route path="/tjanster/motoroptimering" element={<MotorOptimizationPage />} />
          <Route path="/tjanster/service" element={<ServicePage />} />
          <Route path="/tjanster/reparationer" element={<RepairsPage />} />
          <Route path="/priser" element={<PricesPage />} />
          <Route path="/effektguide" element={<EffectGuidePage />} />
          <Route path="/garanti" element={<GuaranteePage />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/testa-din-bil" element={<CarTestPage />} />
          <Route path="/bilkalkylator" element={<CarTestPage />} />
          <Route path="/boka" element={<BookingPage />} />
          <Route path="/boka/bekraftelse" element={<BookingConfirmationPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/integritetspolicy" element={<LegalPage pageType="privacy" />} />
          <Route path="/cookiepolicy" element={<LegalPage pageType="cookie" />} />
          <Route path="/villkor" element={<LegalPage pageType="terms" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
