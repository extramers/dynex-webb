import { Link } from 'react-router-dom'
import FaqList from '../components/FaqList'
import Seo from '../components/Seo'
import { contactInfo, faqItems } from '../data/siteContent'

function FaqPage() {
  return (
    <section className="section">
      <Seo
        title="Vanliga frågor – Dynex Performance Umeå"
        description="Svar på vanliga frågor om motoroptimering, service, reparationer, garanti och bokning hos Dynex Performance Umeå."
      />

      <div className="container page-intro">
        <p className="eyebrow">FAQ</p>
        <h1>Vanliga frågor</h1>
        <p className="lead">
          Här har vi samlat svar på de vanligaste frågorna om optimering, service och
          reparationer.
        </p>
      </div>

      <div className="container section-block">
        <FaqList items={faqItems} />
      </div>

      <div className="container section-cta">
        <a href={contactInfo.phoneHref} className="button button-secondary">
          Ring oss
        </a>
        <Link to="/boka" className="button button-primary">
          Skicka en förfrågan
        </Link>
      </div>
    </section>
  )
}

export default FaqPage
