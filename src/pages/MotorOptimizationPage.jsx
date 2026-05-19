import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { tuningSteps } from '../data/siteContent'

function MotorOptimizationPage() {
  return (
    <section className="section">
      <Seo
        title="Motoroptimering i Vännäsby (Steg 1–2) – Dynex Performance Umeå"
        description="Få bättre respons och prestanda med motoroptimering i Vännäsby. Vi erbjuder Steg 1–2, diagnostik och trygg process från start till mål."
      />

      <div className="container page-intro">
        <p className="eyebrow">Tjänster / Motoroptimering</p>
        <h1>Motoroptimering i Vännäsby – steg 1 och 2</h1>
        <p className="lead">
          Vi anpassar mjukvaran efter just din bil för bättre respons, högre vridmoment och
          trygg körbarhet i vardagen.
        </p>
        <div className="section-cta">
          <Link to="/tjanster" className="button button-secondary">
            Tillbaka till Tjänster
          </Link>
        </div>
      </div>

      <div className="container grid two">
        {tuningSteps.map((step) => (
          <article className="card performance" key={step.title}>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="container section-block">
        <h2>Vår process</h2>
        <ol>
          <li>Diagnos och genomgång av bilens nuläge</li>
          <li>Läsning och analys av originalmjukvara</li>
          <li>Optimering mot önskat mål (effekt/ekonomi/körbarhet)</li>
          <li>Verifiering med loggning samt rekommendationer</li>
        </ol>
      </div>

      <div className="container section-cta">
        <Link to="/boka" className="button button-primary">
          Skicka en förfrågan
        </Link>
        <Link to="/testa-din-bil" className="button button-secondary">
          Räkna på din bil
        </Link>
      </div>
    </section>
  )
}

export default MotorOptimizationPage
