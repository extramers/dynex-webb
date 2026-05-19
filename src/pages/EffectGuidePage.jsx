import { Link } from 'react-router-dom'
import FaqList from '../components/FaqList'
import Seo from '../components/Seo'
import { faqItems, tuningSteps } from '../data/siteContent'

function EffectGuidePage() {
  return (
    <section className="section">
      <Seo
        title="Effektguide för motoroptimering – Dynex Performance Umeå"
        description="Läs hur motoroptimering fungerar, vad du kan förvänta dig och hur effekt och vridmoment påverkas för olika biltyper."
      />

      <div className="container page-intro">
        <p className="eyebrow">Effektguide</p>
        <h1>Så fungerar motoroptimering</h1>
        <p className="lead">
          Effekten beror på motor, hårdvara och utgångsläge. Vi jobbar metodiskt och sätter
          realistiska förväntningar för både prestanda och hållbarhet.
        </p>
      </div>

      <div className="container grid three">
        {tuningSteps.map((step) => (
          <article className="card" key={step.title}>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="container section-block">
        <h2>Viktigt att veta</h2>
        <ul>
          <li>Utfall varierar mellan olika motorer och konfigurationer.</li>
          <li>Vi rekommenderar alltid grundservice före optimering.</li>
          <li>Vi går igenom juridiska och praktiska aspekter innan arbete startar.</li>
        </ul>
      </div>

      <div className="container section-block">
        <h2>Vanliga frågor</h2>
        <FaqList items={faqItems.slice(0, 4)} />
      </div>

      <div className="container section-cta">
        <Link to="/boka" className="button button-primary">
          Skicka en förfrågan
        </Link>
      </div>
    </section>
  )
}

export default EffectGuidePage
