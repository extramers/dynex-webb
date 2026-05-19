import Seo from '../components/Seo'
import { contactInfo } from '../data/siteContent'

function DealerPage() {
  return (
    <section className="section">
      <Seo
        title="Bli återförsäljare – Dynex Performance Umeå"
        description="Intresserad av samarbete? Ansök om att bli återförsäljare och erbjud motoroptimering med stöd från Dynex Performance."
      />

      <div className="container page-intro">
        <p className="eyebrow">Bli återförsäljare</p>
        <h1>Vill du bli återförsäljare?</h1>
        <p className="lead">
          Vi söker samarbetspartners som vill erbjuda kvalitetssäkrad motoroptimering med
          tydligt tekniskt stöd och snabb återkoppling.
        </p>
      </div>

      <div className="container section-block">
        <h2>Ansökan</h2>
        <p>
          Skicka ett mejl till <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> med
          information om företag, ort och nuvarande tjänsteutbud så kontaktar vi dig.
        </p>
      </div>
    </section>
  )
}

export default DealerPage
