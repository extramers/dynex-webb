import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contactInfo } from '../data/siteContent'
import emailjs from '@emailjs/browser'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  regnr: '',
  postalCode: '',
  brand: '',
  model: '',
  year: '',
  mileage: '',
  service: '',
  subService: '',
  desiredDate: '',
  desiredTime: '',
  contactMethod: 'Telefon',
  message: '',
  gdpr: false,
  goal: '',
  modifications: '',
  lastService: '',
  oilSpec: '',
  symptoms: '',
  faultCode: '',
  whenOccurs: '',
  website: '',
}

const subServiceOptions = {
  motoroptimering: ['Steg 1', 'Steg 2', 'Växellådsoptimering', 'A-traktor strypning'],
  service: ['Basservice', 'Fullservice'],
  reparation: ['Felsökning', 'Bromsar', 'Motor', 'Elsystem'],
  specialtjanster: [
    'AdblueOFF',
    'EGRoff',
    'DPFoff',
    'NOXoff',
    'Kloning',
    'Pops & Bangs',
    'Launch control',
    'VMaxoff',
    'Annat',
  ],
}

function BookingForm({ className = 'booking-form', prefill = {} }) {
  const navigate = useNavigate()
  const mergedInitialForm = useMemo(() => ({ ...initialForm, ...prefill }), [prefill])
  const [formData, setFormData] = useState(mergedInitialForm)
  const [errors, setErrors] = useState({})
  
  // Håller koll på om formuläret skickas för tillfället
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData((previous) => ({ ...previous, ...mergedInitialForm }))
  }, [mergedInitialForm])

  const currentSubServices = useMemo(
    () => subServiceOptions[formData.service] ?? [],
    [formData.service],
  )

  const validate = () => {
    const nextErrors = {}

    const requiredFields = [
      ['name', 'Ange ditt namn.'],
      ['phone', 'Ange telefonnummer.'],
      ['email', 'Ange e-postadress.'],
      ['regnr', 'Ange registreringsnummer.'],
      ['postalCode', 'Ange postnummer.'],
      ['brand', 'Ange bilmärke.'],
      ['model', 'Ange modell.'],
      ['year', 'Ange årsmodell.'],
      ['service', 'Välj tjänst.'],
      ['subService', 'Välj undertjänst.'],
      ['message', 'Beskrivning krävs för att vi ska kunna hjälpa dig.'],
      ['desiredDate', 'Välj önskat datum.'],
    ]

    requiredFields.forEach(([field, errorMessage]) => {
      if (!`${formData[field]}`.trim()) {
        nextErrors[field] = errorMessage
      }
    })

    if (formData.phone && !/^\+?[0-9\s-]{7,}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Telefonnumret verkar inte vara giltigt.'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Ange en giltig e-postadress.'
    }

    if (formData.year && !/^\d{4}$/.test(formData.year.trim())) {
      nextErrors.year = 'Årsmodell ska vara fyra siffror, t.ex. 2020.'
    }

    if (!formData.gdpr) {
      nextErrors.gdpr = 'Du måste godkänna hantering av personuppgifter.'
    }

    if (formData.website.trim()) {
      nextErrors.website = 'Spamdetektering aktiverad.'
    }

    if (formData.service === 'motoroptimering' && !formData.goal.trim()) {
      nextErrors.goal = 'Välj mål med optimeringen.'
    }

    if (formData.service === 'service' && !formData.lastService.trim()) {
      nextErrors.lastService = 'Ange när senaste service gjordes.'
    }

    if (formData.service === 'reparation' && !formData.symptoms.trim()) {
      nextErrors.symptoms = 'Beskriv symtom för reparation/felsökning.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((previous) => {
      const next = {
        ...previous,
        [name]: type === 'checkbox' ? checked : value,
      }

      if (name === 'service') {
        next.subService = ''
      }

      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    // Om inga fel finns, börja skicka!
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Skickar mailet via EmailJS med dina unika koder
        await emailjs.send(
          'service_bfrat0o',    // Ditt Service ID
          'template_be7a8nc',   // Ditt Template ID
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            regnr: formData.regnr,
            postalCode: formData.postalCode,
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
            mileage: formData.mileage,
            service: formData.service,
            subService: formData.subService,
            desiredDate: formData.desiredDate,
            desiredTime: formData.desiredTime,
            contactMethod: formData.contactMethod,
            message: formData.message,
            goal: formData.goal,
            modifications: formData.modifications,
            lastService: formData.lastService,
            oilSpec: formData.oilSpec,
            symptoms: formData.symptoms,
            faultCode: formData.faultCode,
            whenOccurs: formData.whenOccurs,
          },
          '2wCuwEq3KZK9l2zAb'   // Din Public Key
        )

        // Gå till bekräftelsesidan när mailet skickats framgångsrikt
        navigate('/boka/bekraftelse', {
          state: {
            name: formData.name,
            service: formData.service,
          },
        })
        setFormData(mergedInitialForm)

      } catch (error) {
        console.error('Kunde inte skicka mail:', error)
        alert('Något gick fel när förfrågan skulle skickas. Vänligen försök igen eller kontakta oss via telefon.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Lämna detta fält tomt</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="form-grid two-col">
        <label>
          Namn*
          <input name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label>
          Telefon*
          <input name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>

        <label>
          E-post*
          <input name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label>
          Registreringsnummer*
          <input name="regnr" value={formData.regnr} onChange={handleChange} disabled={isSubmitting} />
          {errors.regnr && <span className="field-error">{errors.regnr}</span>}
        </label>

        <label>
          Postnummer*
          <input name="postalCode" value={formData.postalCode} onChange={handleChange} disabled={isSubmitting} />
          {errors.postalCode && <span className="field-error">{errors.postalCode}</span>}
        </label>

        <label>
          Bilmärke*
          <input name="brand" value={formData.brand} onChange={handleChange} disabled={isSubmitting} />
          {errors.brand && <span className="field-error">{errors.brand}</span>}
        </label>

        <label>
          Modell*
          <input name="model" value={formData.model} onChange={handleChange} disabled={isSubmitting} />
          {errors.model && <span className="field-error">{errors.model}</span>}
        </label>

        <label>
          Årsmodell*
          <input name="year" value={formData.year} onChange={handleChange} disabled={isSubmitting} />
          {errors.year && <span className="field-error">{errors.year}</span>}
        </label>

        <label>
          Miltal (valfritt)
          <input name="mileage" value={formData.mileage} onChange={handleChange} disabled={isSubmitting} />
        </label>

        <label>
          Tjänst*
          <select name="service" value={formData.service} onChange={handleChange} disabled={isSubmitting}>
            <option value="">Välj tjänst</option>
            <option value="motoroptimering">Motoroptimering</option>
            <option value="service">Service</option>
            <option value="reparation">Reparation</option>
            <option value="specialtjanster">Specialtjänster / Annat</option>
          </select>
          {errors.service && <span className="field-error">{errors.service}</span>}
        </label>

        <label>
          Undertjänst*
          <select name="subService" value={formData.subService} onChange={handleChange} disabled={isSubmitting}>
            <option value="">Välj undertjänst</option>
            {currentSubServices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subService && <span className="field-error">{errors.subService}</span>}
        </label>

        <label>
          Kontaktmetod*
          <select name="contactMethod" value={formData.contactMethod} onChange={handleChange} disabled={isSubmitting}>
            <option>Telefon</option>
            <option>SMS</option>
            <option>E-post</option>
          </select>
        </label>

        <label>
          Önskat datum*
          <input
            name="desiredDate"
            type="date"
            value={formData.desiredDate}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.desiredDate && <span className="field-error">{errors.desiredDate}</span>}
        </label>

        <label>
          Önskad tid (valfritt)
          <input
            name="desiredTime"
            type="text"
            placeholder="t.ex. 08:00-11:00"
            value={formData.desiredTime}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
      </div>

      {formData.service === 'motoroptimering' && (
        <div className="conditional-block">
          <h3>Motoroptimering – extra uppgifter</h3>
          <div className="form-grid two-col">
            <label>
              Mål med optimeringen*
              <select name="goal" value={formData.goal} onChange={handleChange} disabled={isSubmitting}>
                <option value="">Välj mål</option>
                <option value="effekt">Mer effekt</option>
                <option value="ekonomi">Bättre bränsleekonomi</option>
                <option value="korbarhet">Bättre körbarhet</option>
              </select>
              {errors.goal && <span className="field-error">{errors.goal}</span>}
            </label>

            <label>
              Nuvarande modifieringar
              <input
                name="modifications"
                value={formData.modifications}
                onChange={handleChange}
                placeholder="Ex. downpipe, intercooler"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
      )}

      {formData.service === 'service' && (
        <div className="conditional-block">
          <h3>Service – extra uppgifter</h3>
          <div className="form-grid two-col">
            <label>
              Senaste service*
              <input
                name="lastService"
                value={formData.lastService}
                onChange={handleChange}
                placeholder="Ex. 2025-10 eller 12 000 mil"
                disabled={isSubmitting}
              />
              {errors.lastService && <span className="field-error">{errors.lastService}</span>}
            </label>

            <label>
              Oljespec (om känd)
              <input
                name="oilSpec"
                value={formData.oilSpec}
                onChange={handleChange}
                placeholder="Ex. 5W-30"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
      )}

      {formData.service === 'reparation' && (
        <div className="conditional-block">
          <h3>Reparation – extra uppgifter</h3>
          <div className="form-grid two-col">
            <label>
              Symtom*
              <input
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Ex. vibration vid broms"
                disabled={isSubmitting}
              />
              {errors.symptoms && <span className="field-error">{errors.symptoms}</span>}
            </label>

            <label>
              Felkod (om känd)
              <input name="faultCode" value={formData.faultCode} onChange={handleChange} disabled={isSubmitting} />
            </label>

            <label>
              När uppstår felet?
              <input
                name="whenOccurs"
                value={formData.whenOccurs}
                onChange={handleChange}
                placeholder="Ex. vid kallstart"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
      )}

      <label>
        Felbeskrivning / önskemål*
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Beskriv bil, problem eller mål"
          disabled={isSubmitting}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>

      <label className="checkbox-label">
        <input type="checkbox" name="gdpr" checked={formData.gdpr} onChange={handleChange} disabled={isSubmitting} />
        Jag godkänner att Dynex Performance Umeå hanterar mina uppgifter för att återkoppla om
        bokning/offert.
      </label>
      {errors.gdpr && <span className="field-error">{errors.gdpr}</span>}

      <button type="submit" className="button button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Skickar...' : 'Skicka bokningsförfrågan'}
      </button>
      <a href={contactInfo.phoneHref} className="button button-secondary">
        Ring verkstaden
      </a>
    </form>
  )
}

export default BookingForm