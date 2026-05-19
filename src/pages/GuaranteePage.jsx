import Seo from '../components/Seo'
import { guaranteeCoverage } from '../data/siteContent'

function GuaranteePage() {
  return (
    <section className="section">
      <Seo
        title="Garanti på motoroptimering och verkstadsarbete"
        description="Läs våra garantivillkor för motoroptimering och utfört arbete. Tydlig information om omfattning, villkor och kontaktväg."
      />

      <div className="container page-intro">
        <p className="eyebrow">Garanti</p>
        <h1>Garanti på utfört arbete</h1>
        <p className="lead">
          Vi erbjuder tydliga garantivillkor och transparent kommunikation kring vad som
          omfattas och inte omfattas.
        </p>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>Ingår i garantin</h2>
          <ul>
            {guaranteeCoverage.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Omfattas inte</h2>
          <ul>
            {guaranteeCoverage.excluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="container section-block">
        <p>
          Vid frågor om garanti, kontakta oss direkt så går vi igenom ditt ärende och nästa
          steg.
        </p>
      </div>
    </section>
  )
}

export default GuaranteePage
