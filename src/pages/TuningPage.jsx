import { Link } from 'react-router-dom'
import { tuningServices } from '../data/siteContent'

function TuningPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Tjänster / Tuning</p>
        <h1>Tuning och prestandaoptimering</h1>
        <p className="lead">
          Vi erbjuder optimering med fokus på körbarhet, säkerhet och dokumenterat
          resultat. Alla upplägg anpassas efter bilmodell, skick och användning.
        </p>
      </div>

      <div className="container card-grid three-columns">
        {tuningServices.map((service) => (
          <article className="service-card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul>
              {service.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="container notice-card">
        <h2>Innan bokning</h2>
        <p>
          För bästa resultat rekommenderar vi grundläggande service före optimering.
          Behöver bilen först ses över? Vi hjälper dig i vår mekanikerverkstad.
        </p>
        <Link to="/tjanster/mekaniker" className="text-link">
          Se mekanikertjänster →
        </Link>
      </div>
    </section>
  )
}

export default TuningPage
