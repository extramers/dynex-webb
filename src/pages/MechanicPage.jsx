import { Link } from 'react-router-dom'
import { mechanicServices } from '../data/siteContent'

function MechanicPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Tjänster / Mekaniker</p>
        <h1>Service och reparationer</h1>
        <p className="lead">
          Utöver tuning erbjuder vi mekanikertjänster för dig som vill ha en långsiktig och
          trygg verkstadspartner.
        </p>
      </div>

      <div className="container card-grid two-columns">
        {mechanicServices.map((service) => (
          <article className="service-card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <div className="container notice-card">
        <h2>Kombinera med optimering</h2>
        <p>
          Vi kan planera service och tuning i samma bokning för att spara tid och ge bättre
          helhetsresultat.
        </p>
        <Link to="/kontakt-bokning" className="text-link">
          Skicka bokningsförfrågan →
        </Link>
      </div>
    </section>
  )
}

export default MechanicPage
