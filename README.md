# Dynex Performance Umeå

Responsiv React/Vite-webb i svart/orange profil för **Dynex Performance Umeå**.

## V6 (senaste ändringar)

- Startsidan är förenklad till en sammanhållen yta utan tydliga sektionslinjer/kortgränser.
- Hero-blocket **"Därför väljer kunder oss i Vännäsby"** är nu integrerat i samma informationsyta (ingen separat kort-ruta).
- **Vanliga frågor** ligger på samma rad som **Kontakta Dynex Performance Umeå** på startsidan.
- Endast en sammanhängande bakgrund per sida.
- Tjänst-undersidorna har tydlig knapp: **Tillbaka till Tjänster**.
- I **Testa din bil** är fälten **Sök modell** och **Sök motorvariant** borttagna.
- Endast **Steg 1–2** används i relevanta texter, val och datadriven visning.
- Bilden i **Testa din bil** är uppdaterad till:
  `https://i.postimg.cc/dVy6SbCr/dynex.jpg`

## Sidstruktur

- `/`
- `/tjanster`
- `/tjanster/motoroptimering`
- `/tjanster/service`
- `/tjanster/reparationer`
- `/priser`
- `/effektguide`
- `/garanti`
- `/om-oss`
- `/kontakt`
- `/testa-din-bil` (alias `/bilkalkylator`)
- `/boka` + `/boka/bekraftelse`
- `/faq`
- `/integritetspolicy`, `/cookiepolicy`, `/villkor`

## Kom igång

```bash
npm install
npm run dev
```

## Produktionsbuild

```bash
npm run build
npm run preview
```

## Viktiga filer

- `src/pages/` – sidor
- `src/components/` – återanvändbara komponenter
- `src/data/siteContent.js` – innehållsdata
- `src/data/car_catalog_expanded_v3.json` – bilkatalog
- `src/data/carCatalog.js` – normalisering/filter av katalogdata
- `src/index.css` – global styling
