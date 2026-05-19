import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'

function BookingConfirmationPage() {
  const location = useLocation()
  const customerName = location.state?.name ?? 'du'

  return (
    <section className="section">
      <Seo
        title="Tack för din bokning – Dynex Performance Umeå"
        description="Tack för din bokningsförfrågan. Vi återkopplar inom 1 arbetsdag med nästa steg."
      />

      <div className="container section-block confirmation-card">
        <p className="eyebrow">Bekräftelse</p>
        <h1>Tack för din bokningsförfrågan, {customerName}!</h1>
        <p className="lead">
          Vi har tagit emot din förfrågan och skickar en återkoppling inom 1 arbetsdag.
          Autosvar har skickats till den e-postadress du angav.
        </p>

        <div className="button-row">
          <Link to="/" className="button button-secondary">
            Till startsidan
          </Link>
          <Link to="/kontakt" className="button button-primary">
            Kontakta oss direkt
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BookingConfirmationPage
