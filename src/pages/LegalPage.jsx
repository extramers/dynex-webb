import Seo from '../components/Seo'

const pageData = {
  privacy: {
    title: 'Integritetspolicy – Dynex Performance Umeå',
    description:
      'Information om hur Dynex Performance Umeå behandlar personuppgifter vid bokning och kontakt.',
    heading: 'Integritetspolicy',
    points: [
      'Vi behandlar personuppgifter för att hantera bokningsförfrågningar och kundkontakt.',
      'Uppgifter sparas endast så länge det behövs för ärendehantering och lagkrav.',
      'Du kan kontakta oss för registerutdrag, rättelse eller radering av uppgifter.',
    ],
  },
  cookie: {
    title: 'Cookiepolicy – Dynex Performance Umeå',
    description: 'Läs hur vi använder cookies och liknande teknik på dynexperformanceumea.se.',
    heading: 'Cookiepolicy',
    points: [
      'Vi använder nödvändiga cookies för grundfunktioner på webbplatsen.',
      'Statistikcookies används endast för att förbättra användarupplevelsen.',
      'Du kan när som helst ändra cookieinställningar i din webbläsare.',
    ],
  },
  terms: {
    title: 'Allmänna villkor – Dynex Performance Umeå',
    description: 'Översikt av villkor för bokning, arbete och garantier hos Dynex Performance Umeå.',
    heading: 'Allmänna villkor',
    points: [
      'Bokning blir bindande efter bekräftad tid från verkstaden.',
      'Kostnadsförslag lämnas före större åtgärder och arbete påbörjas efter godkännande.',
      'Garantier gäller enligt specificerade villkor och omfattning i arbetsordern.',
    ],
  },
}

function LegalPage({ pageType }) {
  const content = pageData[pageType] ?? pageData.privacy

  return (
    <section className="section">
      <Seo title={content.title} description={content.description} />

      <div className="container page-intro">
        <p className="eyebrow">Policy & villkor</p>
        <h1>{content.heading}</h1>
      </div>

      <div className="container section-block">
        <ul>
          {content.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LegalPage
