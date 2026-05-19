import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { quickServiceCards } from '../data/siteContent'

function ServicesPage() {
  return (
    <section className="section">
      <Seo
        title="Tjänster – Optimering, Service & Reparation"
        description="Se alla tjänster hos Dynex Performance Umeå: Steg 1–2 optimering, service och reparationer för personbil och transportbil."
      />

      <div className="container page-intro">
        <p className="eyebrow">Tjänster</p>
        <h1>Tjänster för prestanda och bilhälsa</h1>
        <p className="lead">Här hittar du samtliga huvudtjänster och snabbvägar till bokning.</p>
      </div>

      <div className="container grid three">
        {quickServiceCards.map((service) => (
          <article className="card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <Link to={service.link} className="button button-secondary">
              Läs mer
            </Link>
          </article>
        ))}
      </div>

      {/* RUTA FÖR MJUKVARUUPPDATERING & SPECIALTJÄNSTER (Nu utan den orangea ramen) */}
      <div className="container section-block" style={{ marginTop: '2rem' }}>
        <article className="card">
          <h2>Mjukvaruuppdatering & Specialtjänster</h2>
          <p style={{ marginBottom: '1.2rem' }}>
            Utöver våra huvudtjänster erbjuder vi ett brett utbud av mjukvarulösningar och optimeringar. Hos oss fixar vi bland annat:
          </p>
          
          <ul 
            className="icon-list" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '0.8rem' 
            }}
          >
            <li>AdblueOFF</li>
            <li>Växellådsoptimering</li>
            <li>EGRoff</li>
            <li>DPFoff</li>
            <li>NOXoff</li>
            <li>A-traktor strypning</li>
            <li>Kloning</li>
            <li>Pops & Bangs</li>
            <li>Launch control</li>
            <li>VMaxoff</li>
            <li>m.m.</li>
          </ul>
          
          <div className="section-cta" style={{ marginTop: '1.5rem' }}>
            <Link to="/boka" className="button button-primary">
              Skicka en förfrågan
            </Link>
          </div>
        </article>
      </div>

    </section>
  )
}

export default ServicesPage