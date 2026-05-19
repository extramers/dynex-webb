import { Link } from 'react-router-dom'
import { contactInfo } from '../data/siteContent'

function TopBar() {
  return (
    <div className="top-bar" role="region" aria-label="Snabbkontakt">
      <div className="container top-bar-inner">
        <p>
          <strong>Telefon:</strong>{' '}
          <a href={contactInfo.phoneHref} className="inline-link">
            {contactInfo.phoneLabel}
          </a>
        </p>
        <p>
          <strong>Adress:</strong> {contactInfo.address}
        </p>
        <Link to="/boka" className="inline-link">
          Skicka en förfrågan
        </Link>
      </div>
    </div>
  )
}

export default TopBar
