import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Seo from '../components/Seo'
import { contactInfo } from '../data/siteContent'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    gdpr: false,
    website: '', // Honeypot för spam
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Ange ditt namn.'
    if (!formData.phone.trim()) nextErrors.phone = 'Ange telefonnummer.'
    if (!formData.message.trim()) nextErrors.message = 'Meddelande krävs.'
    
    if (formData.phone && !/^\+?[0-9\s-]{7,}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Telefonnumret verkar inte vara giltigt.'
    }
    
    if (!formData.gdpr) {
      nextErrors.gdpr = 'Du måste godkänna hantering av personuppgifter.'
    }
    
    if (formData.website.trim()) {
      nextErrors.website = 'Spamdetektering aktiverad.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Vi skickar mailet med samma EmailJS-inställningar som bokningssidan
        await emailjs.send(
          'service_bfrat0o',    // Ditt Service ID
          'template_be7a8nc',   // Ditt Template ID (Du kanske vill skapa en separat mall i EmailJS för snabbförfrågan framöver)
          {
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
            // Eftersom mallen kanske förväntar sig fler fält från bokningssidan, 
            // skickar vi med dem som tomma strängar för säkerhets skull.
            email: 'Ingen e-post angiven (Snabbförfrågan)',
            service: 'Snabbförfrågan från kontaktsidan',
            regnr: '-',
            brand: '-',
            model: '-',
          },
          '2wCuwEq3KZK9l2zAb'   // Din Public Key
        )

        setIsSent(true)
        setFormData({ name: '', phone: '', message: '', gdpr: false, website: '' })

      } catch (error) {
        console.error('Kunde inte skicka mail:', error)
        alert('Något gick fel när förfrågan skulle skickas. Vänligen försök igen eller kontakta oss via telefon.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

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

        <form className="card quick-form" onSubmit={handleSubmit} noValidate>
          <h2>Snabbförfrågan</h2>

          {isSent ? (
            <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#e6fffa', color: '#234e52', borderRadius: '8px' }}>
              <strong>Tack för din förfrågan!</strong> Vi återkopplar så snart vi kan.
            </div>
          ) : (
            <>
              {/* Dold honeypot för spam */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website">Lämna detta fält tomt</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <label>
                Namn*
                <input 
                  name="name" 
                  type="text" 
                  placeholder="För- och efternamn" 
                  value={formData.name} 
                  onChange={handleChange} 
                  disabled={isSubmitting} 
                />
                {errors.name && <span className="field-error" style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</span>}
              </label>

              <label>
                Telefon*
                <input 
                  name="phone" 
                  type="tel" 
                  placeholder="070-000 00 00" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  disabled={isSubmitting} 
                />
                {errors.phone && <span className="field-error" style={{ color: 'red', fontSize: '0.85rem' }}>{errors.phone}</span>}
              </label>

              <label>
                Meddelande*
                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder="Beskriv kort vad du behöver hjälp med" 
                  value={formData.message} 
                  onChange={handleChange} 
                  disabled={isSubmitting} 
                />
                {errors.message && <span className="field-error" style={{ color: 'red', fontSize: '0.85rem' }}>{errors.message}</span>}
              </label>

              <label className="checkbox-label" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  name="gdpr" 
                  type="checkbox" 
                  checked={formData.gdpr} 
                  onChange={handleChange} 
                  disabled={isSubmitting} 
                />
                <span style={{ fontSize: '0.9rem' }}>Jag godkänner hantering av personuppgifter enligt integritetspolicyn.</span>
              </label>
              {errors.gdpr && <span className="field-error" style={{ color: 'red', fontSize: '0.85rem', display: 'block', marginTop: '-0.5rem', marginBottom: '1rem' }}>{errors.gdpr}</span>}

              <button className="button button-primary" type="submit" disabled={isSubmitting} style={{ marginTop: '1rem', width: '100%' }}>
                {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
              </button>
            </>
          )}

          <Link to="/boka" className="button button-secondary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
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
