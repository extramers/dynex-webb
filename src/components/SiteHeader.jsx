import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { contactInfo } from '../data/siteContent'

const navLinks = [
  { to: '/', label: 'Hem' },
  { to: '/tjanster', label: 'Tjänster' },
  { to: '/testa-din-bil', label: 'Testa din bil' },
  { to: '/garanti', label: 'Garanti' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/kontakt', label: 'Kontakt' },
]

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">dynex</span>
          <span className="brand-text">Performance Umeå</span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Öppna meny"
        >
          ☰
        </button>

        <nav id="main-menu" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Huvudmeny">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mobile-cta-group">
            <a href={contactInfo.phoneHref} className="button button-secondary">
              Ring nu
            </a>
            <NavLink to="/boka" className="button button-primary" onClick={() => setMenuOpen(false)}>
              Skicka en förfrågan
            </NavLink>
          </div>
        </nav>

        <div className="desktop-cta">
          <a href={contactInfo.phoneHref} className="button button-secondary">
            Ring nu
          </a>
          <NavLink to="/boka" className="button button-primary">
            Skicka en förfrågan
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
