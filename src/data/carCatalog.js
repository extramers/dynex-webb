import expandedCatalog from './car_catalog_expanded_v3.json'

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const carCatalog = expandedCatalog.map((entry, index) => ({
  ...entry,
  notes: '',
  stageResults: (entry.stageResults ?? [])
    .filter((stageResult) => Number(stageResult.stage) <= 2)
    .map((stageResult) => ({
      ...stageResult,
      note: '',
    })),
  id: `${slugify(entry.brand)}-${slugify(entry.model)}-${entry.year}-${slugify(entry.engineVariant)}-${index + 1}`,
}))

export default carCatalog
