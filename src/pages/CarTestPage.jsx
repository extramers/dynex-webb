import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import carCatalog from '../data/carCatalog'

const manualStageGains = {
  1: { hp: 0.15, nm: 0.2 },
  2: { hp: 0.24, nm: 0.3 },
}

const stageLabels = {
  1: 'Steg 1',
  2: 'Steg 2',
}

const availabilityLabels = {
  available: 'Tillgänglig',
  limited: 'Begränsat stöd',
  unavailable: 'Ej tillgänglig',
}

const fuelLabels = {
  petrol: 'Bensin',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'El',
}

function round(value) {
  return Math.round(value)
}

function roundPct(value) {
  return Math.round(value * 10) / 10
}

function stageLabel(stage) {
  return stageLabels[Number(stage)] ?? `Steg ${stage}`
}

function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...payload })
}

function CarTestPage() {
  const [resultMode, setResultMode] = useState('search')

  const [selection, setSelection] = useState({
    brand: '',
    model: '',
    year: '',
    variantId: '',
    stage: '',
    // Nya fält för manuell inmatning
    manualBrand: '',
    manualModel: '',
    manualEngine: '',
    manualHp: '',
    manualNm: '',
    manualStage: '1',
  })

  const variants = carCatalog

  const allBrands = useMemo(
    () => [...new Set(variants.map((entry) => entry.brand))].sort((a, b) => a.localeCompare(b, 'sv')),
    [variants],
  )

  const brandOptions = allBrands

  const modelOptions = useMemo(() => {
    if (!selection.brand) return []

    const models = variants.filter((entry) => entry.brand === selection.brand).map((entry) => entry.model)

    return [...new Set(models)].sort((a, b) => a.localeCompare(b, 'sv'))
  }, [selection.brand, variants])

  const yearOptions = useMemo(() => {
    if (!selection.brand || !selection.model) return []

    const years = variants
      .filter((entry) => entry.brand === selection.brand && entry.model === selection.model)
      .map((entry) => entry.year)

    return [...new Set(years)].sort((a, b) => b - a)
  }, [selection.brand, selection.model, variants])

  const variantOptions = useMemo(() => {
    if (!selection.brand || !selection.model || !selection.year) return []

    const selectedYear = Number(selection.year)

    return variants
      .filter(
        (entry) =>
          entry.brand === selection.brand && entry.model === selection.model && entry.year === selectedYear,
      )
      .sort((a, b) => a.engineVariant.localeCompare(b.engineVariant, 'sv'))
  }, [selection.brand, selection.model, selection.year, variants])

  const selectedVariant = useMemo(
    () => variants.find((entry) => entry.id === selection.variantId) ?? null,
    [variants, selection.variantId],
  )

  const supportedStages = useMemo(() => {
    if (!selectedVariant) return []

    return selectedVariant.stageResults
      .map((stageResult) => Number(stageResult.stage))
      .filter((stage) => stage <= 2)
      .sort((a, b) => a - b)
  }, [selectedVariant])

  const selectedStageResult = useMemo(() => {
    if (!selectedVariant || !selection.stage) return null

    return (
      selectedVariant.stageResults.find((stageResult) => Number(stageResult.stage) === Number(selection.stage)) ??
      null
    )
  }, [selectedVariant, selection.stage])

  const dbResult = useMemo(() => {
    if (!selectedVariant || !selectedStageResult) return null

    const stockHp = Number(selectedVariant.stockHp)
    const stockNm = Number(selectedVariant.stockNm)

    const estimatedHp = Number(selectedStageResult.estimatedHp)
    const estimatedNm = Number(selectedStageResult.estimatedNm)
    const parsedDeltaHp = Number(selectedStageResult.deltaHp)
    const parsedDeltaNm = Number(selectedStageResult.deltaNm)

    const tunedHp = Number.isFinite(estimatedHp) ? estimatedHp : null
    const tunedNm = Number.isFinite(estimatedNm) ? estimatedNm : null

    const hasPerformance = Number.isFinite(tunedHp) && Number.isFinite(tunedNm)

    const deltaHp = Number.isFinite(parsedDeltaHp)
      ? parsedDeltaHp
      : hasPerformance
        ? Number(tunedHp) - stockHp
        : null
    const deltaNm = Number.isFinite(parsedDeltaNm)
      ? parsedDeltaNm
      : hasPerformance
        ? Number(tunedNm) - stockNm
        : null

    const noteParts = [selectedStageResult.note, selectedVariant.notes].filter(Boolean)

    return {
      source: 'database',
      stockHp: round(stockHp),
      stockNm: round(stockNm),
      tunedHp: hasPerformance ? round(Number(tunedHp)) : null,
      tunedNm: hasPerformance ? round(Number(tunedNm)) : null,
      deltaHp: Number.isFinite(deltaHp) ? round(Number(deltaHp)) : null,
      deltaNm: Number.isFinite(deltaNm) ? round(Number(deltaNm)) : null,
      deltaHpPct: Number.isFinite(deltaHp) ? roundPct((Number(deltaHp) / stockHp) * 100) : null,
      deltaNmPct: Number.isFinite(deltaNm) ? roundPct((Number(deltaNm) / stockNm) * 100) : null,
      stageLabel: stageLabel(selection.stage),
      availability: selectedStageResult.status ?? selectedVariant.supportStatus ?? 'limited',
      notes: noteParts.join(' '),
      priceFromSek: null,
      hasPerformance,
    }
  }, [selectedStageResult, selectedVariant, selection.stage])

  const manualResult = useMemo(() => {
    const stockHp = Number(selection.manualHp)
    const stockNm = Number(selection.manualNm)

    if (!Number.isFinite(stockHp) || !Number.isFinite(stockNm) || stockHp <= 0 || stockNm <= 0) return null

    const gains = manualStageGains[Number(selection.manualStage)]
    const tunedHp = stockHp * (1 + gains.hp)
    const tunedNm = stockNm * (1 + gains.nm)
    const deltaHp = tunedHp - stockHp
    const deltaNm = tunedNm - stockNm

    return {
      source: 'manual',
      stockHp: round(stockHp),
      stockNm: round(stockNm),
      tunedHp: round(tunedHp),
      tunedNm: round(tunedNm),
      deltaHp: round(deltaHp),
      deltaNm: round(deltaNm),
      deltaHpPct: roundPct((deltaHp / stockHp) * 100),
      deltaNmPct: roundPct((deltaNm / stockNm) * 100),
      stageLabel: stageLabel(selection.manualStage),
      availability: 'limited',
      notes: 'Manuell uppskattning – exakt variant behöver verifieras av verkstaden.',
      priceFromSek: null,
      hasPerformance: true,
    }
  }, [selection.manualHp, selection.manualNm, selection.manualStage])

  const shownResult = resultMode === 'manual' ? manualResult : dbResult

  const noExactVariant = selection.brand && selection.model && selection.year && variantOptions.length === 0

  const canUseDatabaseResult = Boolean(
    resultMode === 'search' &&
      shownResult?.source === 'database' &&
      shownResult?.hasPerformance &&
      shownResult?.availability !== 'unavailable',
  )

  const bookingQuery = useMemo(() => {
    const params = new URLSearchParams()
    params.set('service', 'motoroptimering')

    if (selection.brand) params.set('brand', selection.brand)
    if (selection.model) params.set('model', selection.model)
    if (selection.year) params.set('year', selection.year)
    if (selectedVariant?.id) params.set('engineVariantId', selectedVariant.id)
    if (selection.stage) params.set('stage', selection.stage)

    return params.toString()
  }, [selection.brand, selection.model, selection.year, selectedVariant?.id, selection.stage])

  const manualQuery = useMemo(() => {
    const params = new URLSearchParams()
    params.set('service', 'motoroptimering')
    params.set('subService', stageLabel(selection.manualStage))

    // Använder de manuella fälten i första hand, annars fallback till sökfälten
    const finalBrand = selection.manualBrand || selection.brand
    const finalModel = selection.manualModel || selection.model

    if (finalBrand) params.set('brand', finalBrand)
    if (finalModel) params.set('model', finalModel)
    if (selection.manualEngine) params.set('engine', selection.manualEngine)
    if (selection.year) params.set('year', selection.year)
    if (selection.manualHp) params.set('stockHp', selection.manualHp)
    if (selection.manualNm) params.set('stockNm', selection.manualNm)

    return params.toString()
  }, [
    selection.brand,
    selection.model,
    selection.year,
    selection.manualBrand,
    selection.manualModel,
    selection.manualEngine,
    selection.manualHp,
    selection.manualNm,
    selection.manualStage,
  ])

  useEffect(() => {
    document.body.classList.add('car-test-view')
    trackEvent('calculator_viewed')
    return () => document.body.classList.remove('car-test-view')
  }, [])

  useEffect(() => {
    if (shownResult) {
      trackEvent('calculator_result_shown', {
        mode: resultMode,
        brand: selection.brand,
        model: selection.model,
        year: selection.year,
        engineVariantId: selectedVariant?.id ?? 'manual',
        stage: resultMode === 'search' ? selection.stage : selection.manualStage,
        availability: shownResult.availability,
      })
    }
  }, [shownResult, resultMode, selection.brand, selection.model, selection.year, selection.stage, selection.manualStage, selectedVariant?.id])

  const setBrand = (value) => {
    setSelection((prev) => ({
      ...prev,
      brand: value,
      model: '',
      year: '',
      variantId: '',
      stage: '',
    }))
    setResultMode('search')

    if (value) trackEvent('calculator_brand_selected', { brand: value })
  }

  const setModel = (value) => {
    setSelection((prev) => ({
      ...prev,
      model: value,
      year: '',
      variantId: '',
      stage: '',
    }))
    setResultMode('search')

    if (value) trackEvent('calculator_model_selected', { brand: selection.brand, model: value })
  }

  const setYear = (value) => {
    setSelection((prev) => ({ ...prev, year: value, variantId: '', stage: '' }))
    setResultMode('search')
  }

  const setVariant = (value) => {
    const variant = variantOptions.find((entry) => entry.id === value)
    const allowedStages = (variant?.stageResults ?? []).filter((stageResult) => Number(stageResult.stage) <= 2)
    const firstAvailableStage = allowedStages.find((stageResult) => stageResult.status !== 'unavailable')
    const firstStage = firstAvailableStage?.stage ?? allowedStages?.[0]?.stage ?? ''

    setSelection((prev) => ({ ...prev, variantId: value, stage: firstStage ? String(firstStage) : '' }))
    setResultMode('search')

    if (variant) {
      trackEvent('calculator_variant_selected', {
        brand: variant.brand,
        model: variant.model,
        year: variant.year,
        engineVariantId: variant.id,
      })
    }
  }

  const setStage = (value) => {
    setSelection((prev) => ({ ...prev, stage: value }))
    setResultMode('search')

    if (value) {
      trackEvent('calculator_stage_selected', {
        brand: selection.brand,
        model: selection.model,
        year: selection.year,
        engineVariantId: selection.variantId,
        stage: value,
      })
    }
  }

  const setManualField = (field, value) => {
    setSelection((prev) => ({ ...prev, [field]: value }))
    setResultMode('manual')
  }

  return (
    <section className="section car-test-page">
      <Seo
        title="Testa din bil – Bilkalkylator för motoroptimering"
        description="Välj bil i databasen eller lägg till egna biluppgifter för att se uppskattad skillnad i HK/Nm hos Dynex Performance Umeå."
      />

      <div className="container calculator-hero">
        <div className="calculator-hero-inner">
          <p className="eyebrow">Testa din bil</p>
          <h1>Bilkalkylator för motoroptimering</h1>
          <p className="lead">
            Sök i vår utökade bilkatalog eller fyll i egna biluppgifter för att få en snabb uppskattning
            innan du bokar.
          </p>
        </div>
      </div>

      <div className="container calculator-layout">
        <div className="calculator-panels">
          <section
            className="booking-form calculator-panel calculator-panel-search"
            aria-label="Sök biluppgifter"
          >
            <h2>Sök biluppgifter</h2>
            <p className="muted">Välj märke → modell → årsmodell → motorvariant → steg.</p>

            <div className="form-grid two-col">
              <label>
                Märke*
                <select value={selection.brand} onChange={(event) => setBrand(event.target.value)}>
                  <option value="">Välj märke</option>
                  {brandOptions.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </label>


              <label>
                Modell*
                <select value={selection.model} onChange={(event) => setModel(event.target.value)} disabled={!selection.brand}>
                  <option value="">Välj modell</option>
                  {modelOptions.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Årsmodell*
                <select value={selection.year} onChange={(event) => setYear(event.target.value)} disabled={!selection.model}>
                  <option value="">Välj årsmodell</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>


              <label>
                Motor/variant*
                <select
                  value={selection.variantId}
                  onChange={(event) => setVariant(event.target.value)}
                  disabled={!selection.year || variantOptions.length === 0}
                >
                  <option value="">Välj motorvariant</option>
                  {variantOptions.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.engineVariant} ({fuelLabels[variant.fuelType] ?? variant.fuelType})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Steg*
                <select value={selection.stage} onChange={(event) => setStage(event.target.value)} disabled={!selectedVariant || supportedStages.length === 0}>
                  <option value="">Välj steg</option>
                  {supportedStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stageLabel(stage)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="section-cta">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setResultMode('search')}
                disabled={!dbResult}
              >
                Visa resultat från sökning
              </button>
            </div>

            {noExactVariant && (
              <p className="field-error">
                Inga varianter hittades för ditt val. Använd panelen “Lägg till egna biluppgifter” för
                indikativ uppskattning och offertförfrågan.
              </p>
            )}
          </section>

          <section
            className="booking-form calculator-panel calculator-panel-manual"
            aria-label="Lägg till egna biluppgifter"
          >
            <h2>Lägg till egna biluppgifter</h2>
            <p className="muted">Fyll i nuvarande värden för att få en manuell uppskattning direkt.</p>

            <div className="form-grid two-col">
              {/* Nya fält för Bilmärke, Modell och Motor */}
              <label>
                Bilmärke
                <input
                  type="text"
                  value={selection.manualBrand}
                  onChange={(event) => setManualField('manualBrand', event.target.value)}
                  placeholder="T.ex. BMW"
                />
              </label>

              <label>
                Modell
                <input
                  type="text"
                  value={selection.manualModel}
                  onChange={(event) => setManualField('manualModel', event.target.value)}
                  placeholder="T.ex. 320d"
                />
              </label>

              <label>
                Motor / Variant
                <input
                  type="text"
                  value={selection.manualEngine}
                  onChange={(event) => setManualField('manualEngine', event.target.value)}
                  placeholder="T.ex. 2.0 B47"
                />
              </label>

              <label>
                Nuvarande effekt (hk)
                <input
                  type="number"
                  min="1"
                  value={selection.manualHp}
                  onChange={(event) => setManualField('manualHp', event.target.value)}
                  placeholder="Ex. 184"
                />
              </label>

              <label>
                Nuvarande vridmoment (Nm)
                <input
                  type="number"
                  min="1"
                  value={selection.manualNm}
                  onChange={(event) => setManualField('manualNm', event.target.value)}
                  placeholder="Ex. 380"
                />
              </label>

              <label>
                Önskat steg
                <select
                  value={selection.manualStage}
                  onChange={(event) => setManualField('manualStage', event.target.value)}
                >
                  <option value="1">Steg 1</option>
                  <option value="2">Steg 2</option>
                </select>
              </label>
            </div>

            <div className="section-cta">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setResultMode('manual')}
                disabled={!manualResult}
              >
                Visa manuell uppskattning
              </button>

              <Link
                to={`/boka?${manualQuery}`}
                className="button button-primary"
                onClick={() => trackEvent('calculator_cta_advice', { mode: 'manual_offer' })}
              >
                Begär offert och pris
              </Link>
            </div>
          </section>
        </div>

        <aside className="card calculator-result" aria-live="polite">
          <h2>3. Uppskattat resultat</h2>
          <p className="muted">
            {resultMode === 'manual'
              ? 'Visar uppskattning baserat på egna biluppgifter.'
              : 'Visar uppskattning baserat på vald variant i bilkatalogen.'}
          </p>

          {!shownResult && (
            <p className="lead small">
              {resultMode === 'manual'
                ? 'Fyll i egna hk/Nm i panelen “Lägg till egna biluppgifter”.'
                : 'Välj motorvariant och steg i panelen “Sök biluppgifter”.'}
            </p>
          )}

          {shownResult && (
            <>
              <p className={`status-badge status-${shownResult.availability}`}>
                {availabilityLabels[shownResult.availability]}
              </p>

              <ul className="result-list">
                <li>
                  <span>Original</span>
                  <strong>
                    {shownResult.stockHp} hk / {shownResult.stockNm} Nm
                  </strong>
                </li>

                {shownResult.hasPerformance ? (
                  <>
                    <li>
                      <span>Efter {shownResult.stageLabel}</span>
                      <strong>
                        {shownResult.tunedHp} hk / {shownResult.tunedNm} Nm
                      </strong>
                    </li>
                    <li>
                      <span>Skillnad (absolut)</span>
                      <strong>
                        +{shownResult.deltaHp} hk / +{shownResult.deltaNm} Nm
                      </strong>
                    </li>
                    <li>
                      <span>Skillnad (%)</span>
                      <strong>
                        +{shownResult.deltaHpPct}% hk / +{shownResult.deltaNmPct}% Nm
                      </strong>
                    </li>
                  </>
                ) : (
                  <li>
                    <span>Efter {shownResult.stageLabel}</span>
                    <strong>Ej tillgängligt för vald variant</strong>
                  </li>
                )}
              </ul>

              {shownResult.notes && <p className="muted">{shownResult.notes}</p>}

              <p className="muted">
                Resultatet är en uppskattning. Slutligt utfall påverkas av bilens skick, mjukvaruversion
                och tidigare modifieringar.
              </p>

              <div className="section-cta">
                {canUseDatabaseResult ? (
                  <Link
                    to={`/boka?${bookingQuery}`}
                    className="button button-primary"
                    onClick={() =>
                      trackEvent('calculator_cta_book', {
                        mode: 'search',
                        brand: selection.brand,
                        model: selection.model,
                        year: selection.year,
                        engineVariantId: selection.variantId,
                        stage: selection.stage,
                      })
                    }
                  >
                    Begär offert och pris
                  </Link>
                ) : (
                  <Link
                    to={`/boka?${resultMode === 'search' ? bookingQuery : manualQuery}`}
                    className="button button-primary"
                    onClick={() => trackEvent('calculator_cta_advice', { mode: resultMode })}
                  >
                    Begär offert och pris
                  </Link>
                )}

                <Link
                  to="/kontakt"
                  className="button button-secondary"
                  onClick={() => trackEvent('calculator_cta_advice', { mode: 'contact' })}
                >
                  Få rådgivning
                </Link>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}

export default CarTestPage