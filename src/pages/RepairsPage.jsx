import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { repairAreas } from '../data/siteContent'

function RepairsPage() {
  return (
    <section className="section">
      <Seo
        title="Bilreparation i Vännäsby – Felsökning & Reparation"
        description="Professionell felsökning och bilreparation i Vännäsby. Vi felsöker först, lämnar åtgärdsförslag och reparerar med tydlig process."
      />

      <div className="container page-intro">
        <p className="eyebrow">Tjänster / Reparationer</p>
        <h1>Bilreparation i Vännäsby – felsökning och åtgärd</h1>
        <p className="lead">
          Vi börjar med diagnos och går igenom åtgärdsförslag med dig innan reparationen
          startar. Inga överraskningar – tydliga besked hela vägen.
        </p>
        <div className="section-cta">
          <Link to="/tjanster" className="button button-secondary">
            Tillbaka till Tjänster
          </Link>
        </div>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>Så går det till</h2>
          <ol>
            <li>Felsökning och verifiering av symtom</li>
            <li>Åtgärdsförslag med prioriterade rekommendationer</li>
            <li>Reparation efter godkännande</li>
            <li>Avslutande kontroll och uppföljning</li>
          </ol>
        </article>

        <article className="card">
          <h2>Vanliga reparationsområden</h2>
          <ul>
            {repairAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="muted">Exakt upplägg och offert ges efter diagnos.</p>
        </article>
      </div>

      <div className="container section-cta">
        <Link to="/boka" className="button button-primary">
          Skicka en förfrågan
        </Link>
      </div>
    </section>
  )
}

export default RepairsPage
