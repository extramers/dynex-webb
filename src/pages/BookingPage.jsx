import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import Seo from '../components/Seo'

function BookingPage() {
  const location = useLocation()

  const prefill = useMemo(() => {
    const params = new URLSearchParams(location.search)

    const serviceValue = params.get('service')
    const serviceMap = {
      motoroptimering: 'motoroptimering',
      service: 'service',
      reparation: 'reparation',
    }

    const stage = params.get('stage')
    const normalizedStage = stage === '3' || stage === 'steg3' ? '2' : stage

    const stageLabelMap = {
      '1': 'Steg 1',
      '2': 'Steg 2',
      steg1: 'Steg 1',
      steg2: 'Steg 2',
    }

    const prefillMessage = [
      params.get('brand') ? `Märke: ${params.get('brand')}` : null,
      params.get('model') ? `Modell: ${params.get('model')}` : null,
      params.get('year') ? `Årsmodell: ${params.get('year')}` : null,
      params.get('engineVariantId') ? `Variant-ID: ${params.get('engineVariantId')}` : null,
      normalizedStage ? `Önskat steg: ${stageLabelMap[normalizedStage] ?? normalizedStage}` : null,
    ]
      .filter(Boolean)
      .join(' | ')

    return {
      service: serviceMap[serviceValue] ?? '',
      subService: params.get('subService') ?? stageLabelMap[normalizedStage] ?? '',
      brand: params.get('brand') ?? '',
      model: params.get('model') ?? '',
      year: params.get('year') ?? '',
      message: prefillMessage,
    }
  }, [location.search])

  return (
    <section className="section">
      <Seo
        title="Skicka en förfrågan – Dynex Performance Umeå"
        description="Skicka en förfrågan online för optimering, service eller reparation i Vännäsby. Fyll i formuläret så återkopplar vi snabbt."
      />

      <div className="container page-intro">
        <p className="eyebrow">Skicka en förfrågan</p>
        <h1>Skicka en förfrågan för Optimering, service eller reparation</h1>
        <p className="lead">
          Fyll i formuläret så återkommer vi med förslag på tid, prisbild och nästa steg inom
          1 arbetsdag.
        </p>
      </div>

      <div className="container">
        <BookingForm prefill={prefill} />
      </div>
    </section>
  )
}

export default BookingPage