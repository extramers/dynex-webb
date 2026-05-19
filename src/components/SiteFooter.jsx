import { Link } from 'react-router-dom'
import { contactInfo } from '../data/siteContent'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <h2>Dynex Performance Umeå</h2>
          <p>
            Motoroptimering, service och reparationer med fokus på kvalitet,
            återkoppling och långsiktig bilhälsa.
          </p>
        </section>

        <section>
          <h3>Tjänster</h3>
          <ul>
            <li>
              <Link to="/tjanster/motoroptimering">Motoroptimering</Link>
            </li>
            <li>
              <Link to="/tjanster/service">Service</Link>
            </li>
            <li>
              <Link to="/tjanster/reparationer">Reparationer</Link>
            </li>

          </ul>
        </section>

        <section>
          <h3>Företag</h3>
          <ul>
            <li>
              <Link to="/effektguide">Effektguide</Link>
            </li>
            <li>
              <Link to="/testa-din-bil">Testa din bil</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/om-oss">Om oss</Link>
            </li>
          </ul>
        </section>

        <section>
          <h3>Kontakt</h3>
          <ul>
            <li>
              <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>{contactInfo.address}</li>
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Dynex Performance Umeå</p>
        <div className="footer-legal-links">
          <Link to="/integritetspolicy">Integritetspolicy</Link>
          <Link to="/cookiepolicy">Cookiepolicy</Link>
          <Link to="/villkor">Allmänna villkor</Link>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
