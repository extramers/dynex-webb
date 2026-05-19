import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { servicePackages } from '../data/siteContent'

function ServicePage() {
  return (
    <section className="section">
      <Seo
        title="Bilservice i Vännäsby – Märkesoberoende verkstad"
        description="Boka bilservice i Vännäsby hos Dynex Performance. Basservice, fullservice med tydlig process och återkoppling."
      />

      <div className="container page-intro">
        <p className="eyebrow">Tjänster / Service</p>
        <h1>Bilservice i Vännäsby – märkesoberoende verkstad</h1>
        <p className="lead">
          Vi utför service enligt intervall med kvalitetsdelar och tydlig dokumentation.
          Välj basservice eller fullservice utifrån bilens behov.
        </p>
        <div className="section-cta">
          <Link to="/tjanster" className="button button-secondary">
            Tillbaka till Tjänster
          </Link>
        </div>
      </div>

      <div className="container grid two">
        {servicePackages.map((service) => (
          <article className="card" key={service.title}>
            <h2>{service.title}</h2>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">Tidsestimat: {service.time}</p>
          </article>
        ))}
      </div>

      <div className="container section-block">
        <h2>Serviceupplägg</h2>
        <p>
          Vi servar enligt tillverkarens rekommendationer och går igenom bilen i samband med
          verkstadsbesöket för att upptäcka slitdelar i tid.
        </p>
      </div>

      <div className="container section-cta">
        <Link to="/boka" className="button button-primary">
          Skicka en förfrågan
        </Link>
      </div>
    </section>
  )
}

export default ServicePage