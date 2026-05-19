import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function HomePage() {
  return (
    <>
      <Seo
        title="Dynex Performance Umeå – Optimering, Service & Reparation"
        description="Motoroptimering, bilservice och reparationer. Skicka en förfrågan hos Dynex Performance Umeå för snabb återkoppling och tydlig process."
      />

      <section className="hero-section hero-home home-hero">
        <div className="container hero-grid home-hero-grid">
          <div className="hero-content info-panel home-hero-panel">
            <p className="eyebrow">Verkstad</p>
            <h1>Optimering, service och reparationer</h1>
            <p className="lead small">
              Dynex Performance Umeå hjälper dig med en trygg och tydlig verkstadsprocess —
              från första kontakt till färdig åtgärd.
            </p>
            <div className="button-row">
              <Link to="/tjanster" className="button button-primary">Våra tjänster</Link>
              <Link to="/testa-din-bil" className="button button-secondary">Testa din bil</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-secondary-section">
        <div className="container contact-split">
          <div className="info-panel">
            <h2>Kontakta Dynex Performance Umeå</h2>
            <p className="lead small">
              Telefon: 072-2070333<br />
              E-post: dynexperformanceumea@gmail.com<br />
              Adress: Konvaljvägen 8, Vännäsby
            </p>
            <p className="muted">Verksamheten drivs i privat fastighet med företagets verkstad i garaget.</p>
            <div className="button-row">
              <a href="tel:+46722070333" className="button button-secondary">Ring nu</a>
              <Link to="/boka" className="button button-primary">Begär offert och pris</Link>
            </div>
          </div>

          <div className="info-panel">
            <h2>Vanliga frågor</h2>
            <p className="lead small">Här hittar du svar om optimering, service, garanti och bokning.</p>
            <div className="section-cta">
              <Link to="/faq" className="button button-secondary">Se vanliga frågor</Link>
            </div>
          </div>
        </div>

        <div className="container section-block info-panel map-panel">
          <iframe
            title="Karta till verkstaden i Vännäsby"
            className="map-frame"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=19.8027000%2C63.9182000%2C19.8094000%2C63.9207000&layer=mapnik&marker=63.9194582%2C19.8060260"
          />
        </div>
      </section>
    </>
  )
}

export default HomePage