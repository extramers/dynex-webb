import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { pricingRows } from '../data/siteContent'

function OfferTable({ title, rows }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <ul className="price-list">
        {rows.map((row) => (
          <li key={row.name}>
            <span>{row.name}</span>
            <strong>{row.details}</strong>
          </li>
        ))}
      </ul>
    </article>
  )
}

function PricesPage() {
  return (
    <section className="section">
      <Seo
        title="Offert – Motoroptimering, Service & Reparation i Vännäsby"
        description="Se våra upplägg för motoroptimering, service och reparationer hos Dynex Performance Umeå. Begär offert och pris för din bil."
      />

      <div className="container page-intro">
        <p className="eyebrow">Offert</p>
        <h1>Upplägg och offert</h1>
        <p className="lead">
          Vi lämnar alltid exakt offert efter att vi gått igenom bilens förutsättningar och ditt
          behov.
        </p>
      </div>

      <div className="container grid three">
        <OfferTable title="Motoroptimering" rows={pricingRows.tuning} />
        <OfferTable title="Service" rows={pricingRows.service} />
        <OfferTable title="Reparation" rows={pricingRows.repairs} />
      </div>

      <div className="container section-cta">
        <Link to="/boka" className="button button-primary">
          Begär offert och pris
        </Link>
      </div>
    </section>
  )
}

export default PricesPage
