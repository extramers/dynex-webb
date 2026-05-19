import Seo from '../components/Seo'
import { contactInfo, whyChooseUs } from '../data/siteContent'

function AboutPage() {
  return (
    <section className="section">
      <Seo
        title="Om Dynex Performance Umeå – Verkstad i Vännäsby"
        description="Lär känna Dynex Performance Umeå. Här hittar du adress och kontaktuppgifter samt information om vår kompetens."
      />

      <div className="container page-intro info-panel">
        <p className="eyebrow">Om oss</p>
        <h1>Om Dynex Performance Umeå</h1>
        <p className="lead">
          Vi kombinerar motoroptimering med traditionell verkstadskompetens för att ge dig en
          trygg helhetslösning.
        </p>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>Vår verkstad i Vännäsby</h2>
          <p>Adress: {contactInfo.address}</p>
          <p>
            Telefon: <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
          </p>
          <p>
            E-post: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
          <p className="muted">Verksamheten drivs i privat fastighet med företagets verkstad i garaget.</p>
        </article>

        <article className="card">
          <h2>Därför väljer kunder oss i Vännäsby</h2>
          <p className="muted">Vi jobbar nära kunden, med tydliga besked och rätt åtgärd från start.</p>
          <ul className="icon-list">
            {whyChooseUs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
