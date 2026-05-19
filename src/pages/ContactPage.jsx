import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { contactInfo } from '../data/siteContent'

function ContactPage() {
  return (
    <section className="section">
      <Seo
        title="Kontakta Dynex Performance Umeå – Skicka en förfrågan"
        description="Kontakta Dynex Performance Umeå via telefon eller formulär. Skicka en förfrågan för motoroptimering, service eller reparation."
      />

      <div className="container page-intro">
        <p className="eyebrow">Kontakt</p>
        <h1>Kontakta Dynex Performance Umeå</h1>
        <p className="lead">
          Ring oss direkt eller skicka en snabb förfrågan så återkopplar vi inom 1 arbetsdag.
        </p>
      </div>

      <div className="container contact-layout">
        <article className="card">
          <h2>Kontaktuppgifter</h2>
          <ul>
            <li>
              Telefon: <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
            </li>
            <li>
              E-post: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>Adress: {contactInfo.address}</li>
          </ul>
          <p className="muted">Verksamheten drivs i privat fastighet med företagets verkstad i garaget.</p>
        </article>

        <form className="card quick-form" onSubmit={(event) => event.preventDefault()}>
          <h2>Snabbförfrågan</h2>
          <label>
            Namn*
            <input required type="text" placeholder="För- och efternamn" />
          </label>
          <label>
            Telefon*
            <input required type="tel" placeholder="070-000 00 00" />
          </label>
          <label>
            Meddelande*
            <textarea required rows="4" placeholder="Beskriv kort vad du behöver hjälp med" />
          </label>
          <label className="checkbox-label">
            <input required type="checkbox" />
            Jag godkänner hantering av personuppgifter enligt integritetspolicyn.
          </label>
          <button className="button button-primary" type="submit">
            Skicka förfrågan
          </button>
          <Link to="/boka" className="button button-secondary">
            Gå till full bokning
          </Link>
        </form>
      </div>

      <div className="container section-block">
        <h2>Hitta till verkstaden</h2>
        <iframe
          title="Karta till Dynex Performance Umeå"
          className="map-frame"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=19.8027000%2C63.9182000%2C19.8094000%2C63.9207000&layer=mapnik&marker=63.9194582%2C19.8060260"
        />
      </div>
    </section>
  )
}

export default ContactPage
