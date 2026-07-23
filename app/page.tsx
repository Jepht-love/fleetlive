'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Clock,
  AlertTriangle,
  MessageCircle,
  EyeOff,
  Car,
  Camera,
  ScanSearch,
  FileText,
  Database,
  MapPin,
  ArrowDown,
  Check,
  Gauge,
  Route,
  Wrench,
} from 'lucide-react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { getContent, type Lang } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CONTACT_EMAIL = 'lmsdrive45@gmail.com'
// Lien public Cal.com (RDV démo 30 min) — la réservation crée l'événement dans l'agenda.
// Page hébergée sur l'instance Cal.com région EU (cal.eu) → on précise l'origine + l'embed.js.
const CAL_ORIGIN = 'https://cal.eu'
const CAL_EMBED_JS = 'https://cal.eu/embed/embed.js'
const CAL_LINK = 'lmsdrive/30min'
const PROBLEM_ICONS = [Clock, AlertTriangle, MessageCircle, EyeOff]
// KPI financiers pilotant le coût réel par véhicule (section ROI)
const ROI_KPI_ICONS = [Gauge, Route, Wrench]
// Moteur d'inspection (hub radial géométrique) : Inspection IA au cœur,
// entrées (Véhicule, Photos) à gauche, sorties (Rapport, CRM) à droite.
// L'étape IA (index 2) porte la confluence Départ/Retour (signature propre).
const FLUX_ICONS = [Car, Camera, ScanSearch, FileText, Database]
const AI_STEP_INDEX = 2
// Position radiale de chaque étape hors-IA (par index de l'étape)
const HUB_POS: Record<number, string> = { 0: 'in-1', 1: 'in-2', 3: 'out-1', 4: 'out-2' }

export default function FleetLivePage() {
  const [lang, setLang] = useState<Lang>('fr')
  const [activeTab, setActiveTab] = useState(0)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('fleetlive_lang')
    if (stored === 'fr' || stored === 'en') setLang(stored)
  }, [])

  // Toutes les animations sont créées via GSAP (from) : le contenu reste visible
  // si JS ne tourne pas ou si l'utilisateur préfère le mouvement réduit.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero — séquence orchestrée au chargement
        gsap
          .timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
          .from('.fl-hero .fl-eyebrow', { y: 18, opacity: 0 })
          .from('.fl-hero h1', { y: 26, opacity: 0 }, '-=0.45')
          .from('.fl-hero-sub', { y: 18, opacity: 0 }, '-=0.5')
          .from('.fl-hero-cta > *', { y: 16, opacity: 0, stagger: 0.1 }, '-=0.45')
          .from('.fl-pill', { y: 12, opacity: 0, stagger: 0.06 }, '-=0.4')

        // Titres de section — révélation au scroll
        gsap.utils.toArray<HTMLElement>('.fl-section-head').forEach((head) => {
          gsap.from(head.children, {
            y: 22,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: head, start: 'top 84%' },
          })
        })

        // Groupes révélés en cascade au scroll
        const reveal = (targets: string, trigger: string) =>
          gsap.from(targets, {
            y: 28,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger, start: 'top 82%' },
          })

        reveal('.fl-grid-2 .fl-card', '.fl-grid-2')
        reveal('.fl-phones .fl-phone-item', '.fl-phones')
        reveal('.fl-roi-metric', '.fl-roi-metrics')
        reveal('.fl-audience-grid .fl-role', '.fl-audience-grid')
        reveal('.fl-phases .fl-phase', '.fl-phases')
        reveal('.fl-pricing', '.fl-pricing')

        // Moteur d'inspection — révélation du cœur et des satellites
        gsap.from('.fl-hub-node, .fl-hub-core', {
          scale: 0.6,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
          stagger: 0.12,
          // retire le transform inline en fin d'anim pour laisser la règle CSS
          // responsive gérer le positionnement (translate en radial, none en portrait empilé)
          clearProps: 'transform',
          scrollTrigger: { trigger: '.fl-hub', start: 'top 78%' },
        })
        // Cadres géométriques du cœur — rotation lente contra-rotative (motif carré)
        gsap.to('.fl-hub-frame', {
          rotate: 360,
          transformOrigin: '50% 50%',
          duration: 30,
          ease: 'none',
          repeat: -1,
        })
        gsap.to('.fl-hub-frame-inner', {
          rotate: -360,
          transformOrigin: '50% 50%',
          duration: 44,
          ease: 'none',
          repeat: -1,
        })
        // Impulsions de données le long des rayons (entrées → cœur → sorties)
        const HUB_PULSES = [
          { sel: '.fl-hub-pulse--in-1', from: [12, 15], to: [50, 50], delay: 0 },
          { sel: '.fl-hub-pulse--in-2', from: [12, 85], to: [50, 50], delay: 0.55 },
          { sel: '.fl-hub-pulse--out-1', from: [50, 50], to: [88, 15], delay: 1.1 },
          { sel: '.fl-hub-pulse--out-2', from: [50, 50], to: [88, 85], delay: 1.65 },
        ]
        HUB_PULSES.forEach(({ sel, from, to, delay }) => {
          gsap
            .timeline({
              repeat: -1,
              repeatDelay: 0.8,
              delay,
              scrollTrigger: { trigger: '.fl-hub', start: 'top 80%' },
            })
            .fromTo(
              sel,
              { attr: { cx: from[0], cy: from[1] }, opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power1.out' },
            )
            .to(sel, { attr: { cx: to[0], cy: to[1] }, duration: 1.4, ease: 'none' }, 0)
            .to(sel, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 1.15)
        })
        // Battement de la signature Départ → Retour → écarts localisés
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 1.1,
            scrollTrigger: { trigger: '.fl-hub-compare', start: 'top 90%' },
          })
          .fromTo(
            '.fl-flux-dot--dep',
            { boxShadow: '0 0 0 0 rgba(53, 183, 204, 0.7)' },
            { boxShadow: '0 0 0 7px rgba(53, 183, 204, 0)', duration: 0.75, ease: 'power2.out' },
          )
          .fromTo(
            '.fl-flux-dot--ret',
            { boxShadow: '0 0 0 0 rgba(20, 85, 254, 0.7)' },
            { boxShadow: '0 0 0 7px rgba(20, 85, 254, 0)', duration: 0.75, ease: 'power2.out' },
            '-=0.4',
          )
          .fromTo(
            '.fl-flux-result',
            { opacity: 0.55 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.15',
          )

        // Frame logiciel — entrée + balayage « scan » (signature vision artificielle)
        gsap.from('.fl-browser', {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fl-browser', start: 'top 80%' },
        })
        gsap
          .timeline({ scrollTrigger: { trigger: '.fl-browser', start: 'top 68%' } })
          .set('.fl-scan', { opacity: 1, top: '-12%' })
          .to('.fl-scan', { top: '100%', duration: 1.5, ease: 'power1.inOut' })
          .to('.fl-scan', { opacity: 0, duration: 0.3 }, '-=0.35')
      })
    },
    { scope: root },
  )

  const handleLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('fleetlive_lang', l)
  }

  const c = getContent(lang)
  const tab = c.software.tabs[activeTab]

  return (
    <main ref={root}>
      {/* ---------- NAVBAR ---------- */}
      <nav className="fl-nav">
        <div className="fl-container fl-nav-inner">
          <a className="fl-logo" href="#top" aria-label="FleetLive">
            <img className="fl-logo-img" src="/fleetlive-logo.png" alt="FleetLive" />
          </a>
          <div className="fl-nav-right">
            <div className="fl-lang" role="group" aria-label="Language">
              <button className={lang === 'fr' ? 'is-active' : ''} onClick={() => handleLang('fr')}>FR</button>
              <button className={lang === 'en' ? 'is-active' : ''} onClick={() => handleLang('en')}>EN</button>
            </div>
            <a href="#contact" className="fl-btn fl-btn--primary" style={{ padding: '10px 18px' }}>
              {c.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header id="top" className="fl-hero">
        <div className="fl-container fl-hero-inner">
          <span className="fl-eyebrow">{c.hero.eyebrow}</span>
          <h1>
            {c.hero.h1a}
            <br />
            <span className="fl-line2">{c.hero.h1b}</span>
          </h1>
          <p className="fl-hero-sub">{c.hero.sub}</p>
          <div className="fl-hero-cta">
            <a href="#contact" className="fl-btn fl-btn--primary">{c.hero.ctaPrimary}</a>
            <a href="#software" className="fl-btn fl-btn--ghost">
              {c.hero.ctaSecondary} <ArrowDown size={16} />
            </a>
          </div>
          <div className="fl-pills">
            {c.hero.tags.map((tag) => (
              <span key={tag} className="fl-pill">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- PROBLÈME ---------- */}
      <section className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <h2 className="fl-h2">{c.problem.title}</h2>
          </div>
          <div className="fl-grid-2">
            {c.problem.cards.map((card, i) => {
              const Icon = PROBLEM_ICONS[i]
              return (
                <div key={card.title} className="fl-card">
                  <div className="fl-card-icon"><Icon size={20} /></div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- LOGICIEL ---------- */}
      <section id="software" className="fl-section">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">01</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.software.title}</h2>
            <p className="fl-section-sub">{c.software.sub}</p>
          </div>

          <div className="fl-tabs" role="tablist">
            {c.software.tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === activeTab}
                className={`fl-tab ${i === activeTab ? 'is-active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab.id === 'inspection' ? (
            <div className="fl-inspect" key="inspection">
              <div className="fl-inspect-views">
                {c.software.inspection.views.map((v) => (
                  <figure key={v.img} className="fl-inspect-view">
                    <div className="fl-inspect-frame">
                      <img src={v.img} alt={v.label} onLoad={() => ScrollTrigger.refresh()} />
                    </div>
                    <figcaption>{v.label}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="fl-inspect-zones">
                <p className="fl-inspect-intro">{c.software.inspection.intro}</p>
                <h4 className="fl-inspect-zones-title">{c.software.inspection.zonesLabel}</h4>
                <div className="fl-faces">
                  {c.software.inspection.groups.map((g) => (
                    <span key={g.zone} className="fl-face">{g.zone}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="fl-browser">
                <div className="fl-browser-bar">
                  <span className="fl-dot fl-dot--r" />
                  <span className="fl-dot fl-dot--y" />
                  <span className="fl-dot fl-dot--g" />
                </div>
                {/* Balayage « scan » — animé une fois par GSAP quand la frame entre à l'écran */}
                <div className="fl-scan" aria-hidden="true" />
                {/* La clé force le remount → réanime le fondu à chaque changement d'onglet */}
                <img
                  key={tab.id}
                  className="fl-browser-shot"
                  src={tab.img}
                  alt={tab.label}
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
              <p className="fl-shot-caption">{tab.desc}</p>
            </>
          )}
        </div>
      </section>

      {/* ---------- FORMAT MOBILE ---------- */}
      <section id="mobile" className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">02</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.mobile.title}</h2>
            <p className="fl-section-sub">{c.mobile.sub}</p>
          </div>
          <div className="fl-phones">
            {c.mobile.shots.map((s) => (
              <figure key={s.img} className="fl-phone-item">
                <div className="fl-phone">
                  <span className="fl-phone-island" aria-hidden="true" />
                  <img
                    className="fl-phone-shot"
                    src={s.img}
                    alt={s.label}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
                <figcaption className="fl-phone-caption">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COMMENT ÇA FONCTIONNE — flux d'inspection ---------- */}
      <section className="fl-section">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">03</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.how.title}</h2>
          </div>

          {/* Hub radial géométrique — cœur IA, satellites entrées/sorties */}
          <div className="fl-hub">
            <div className="fl-hub-stage">
              <svg
                className="fl-hub-web"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <line className="fl-hub-line" x1="12" y1="15" x2="50" y2="50" />
                <line className="fl-hub-line" x1="12" y1="85" x2="50" y2="50" />
                <line className="fl-hub-line" x1="50" y1="50" x2="88" y2="15" />
                <line className="fl-hub-line" x1="50" y1="50" x2="88" y2="85" />
                <circle className="fl-hub-pulse fl-hub-pulse--in-1" r="1.4" cx="12" cy="15" />
                <circle className="fl-hub-pulse fl-hub-pulse--in-2" r="1.4" cx="12" cy="85" />
                <circle className="fl-hub-pulse fl-hub-pulse--out-1" r="1.4" cx="50" cy="50" />
                <circle className="fl-hub-pulse fl-hub-pulse--out-2" r="1.4" cx="50" cy="50" />
              </svg>

              {/* Flux vertical (portrait uniquement) : boules dorées haut → bas */}
              <span className="fl-hub-vflux" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>

              {c.how.steps.map((s, i) => {
                const Icon = FLUX_ICONS[i]
                if (i === AI_STEP_INDEX) {
                  return (
                    <div key={s.label} className="fl-hub-core">
                      <span className="fl-hub-frame" aria-hidden="true" />
                      <span className="fl-hub-frame-inner" aria-hidden="true" />
                      <span className="fl-hub-core-inner">
                        <Icon size={26} />
                        <span className="fl-hub-core-label">{s.label}</span>
                      </span>
                    </div>
                  )
                }
                return (
                  <div key={s.label} className={`fl-hub-node fl-hub-node--${HUB_POS[i]}`}>
                    <span className="fl-hub-glyph"><Icon size={22} /></span>
                    <span className="fl-hub-node-label">{s.label}</span>
                    <p className="fl-hub-node-desc">{s.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Signature propre : confluence Départ / Retour */}
            <div className="fl-hub-compare fl-flux-compare">
              <div className="fl-flux-streams">
                <div className="fl-flux-stream">
                  <span className="fl-flux-dot fl-flux-dot--dep" aria-hidden="true" />
                  <strong>{c.how.compare.departure}</strong>
                  <span>{c.how.compare.departureNote}</span>
                </div>
                <div className="fl-flux-stream">
                  <span className="fl-flux-dot fl-flux-dot--ret" aria-hidden="true" />
                  <strong>{c.how.compare.return}</strong>
                  <span>{c.how.compare.returnNote}</span>
                </div>
              </div>
              <hr className="fl-flux-merge-rule" />
              <div className="fl-flux-result">
                <MapPin size={16} />
                {c.how.compare.result}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ROI ---------- */}
      <section className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">04</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.roi.title}</h2>
            <p className="fl-section-sub">{c.roi.sub}</p>
          </div>

          <div className="fl-roi-kpis">
            {c.roi.kpis.map((k, i) => {
              const Icon = ROI_KPI_ICONS[i % ROI_KPI_ICONS.length]
              return (
                <div key={k.label} className="fl-roi-kpi">
                  <div className="fl-roi-kpi-icon"><Icon size={22} /></div>
                  <h4 className="fl-roi-kpi-label">{k.label}</h4>
                  <p className="fl-roi-kpi-hint">{k.hint}</p>
                </div>
              )
            })}
          </div>

          <div className="fl-roi-metrics">
            {c.roi.metrics.map((m) => (
              <div key={m} className="fl-roi-metric">
                <Check size={20} />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DÉCIDEURS / AUDIENCE ---------- */}
      <section className="fl-section">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">05</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.audience.title}</h2>
            <p className="fl-section-sub">{c.audience.sub}</p>
          </div>
          <div className="fl-audience-grid">
            {c.audience.roles.map((r) => (
              <div key={r.role} className="fl-role">
                <h3>{r.role}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="fl-chain">{c.audience.chain}</div>
        </div>
      </section>

      {/* ---------- DÉPLOIEMENT + CTA + FORM ---------- */}
      <section id="contact" className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">06</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.deploy.title}</h2>
          </div>

          <div className="fl-phases">
            {c.deploy.phases.map((p, i) => (
              <div key={p.phase} className="fl-phase">
                <div className="fl-phase-num">{i + 1}</div>
                <h4>{p.phase}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="fl-pricing">
            <span className="fl-pricing-label">{c.deploy.pricing.label}</span>
            <p className="fl-pricing-text">{c.deploy.pricing.text}</p>
            <p className="fl-pricing-contact">{c.deploy.pricing.contact}</p>
          </div>

          <div className="fl-cta">
            <h3>{c.deploy.ctaTitle}</h3>
          </div>

          <BookingCalendar c={c} />
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="fl-footer">
        <div className="fl-container fl-footer-inner">
          <div className="fl-footer-brand">
            <img className="fl-logo-img fl-logo-img--footer" src="/fleetlive-logo.png" alt="FleetLive" />
          </div>
          <div className="fl-footer-copy">{c.footer}</div>
        </div>
      </footer>
    </main>
  )
}

/* ---------- Agenda de réservation (Cal.com, aucun backend) ---------- */
function BookingCalendar({ c }: { c: ReturnType<typeof getContent> }) {
  useEffect(() => {
    let active = true
    ;(async () => {
      const cal = await getCalApi({ embedJsUrl: CAL_EMBED_JS })
      if (!active) return
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1455fe' },
          dark: { 'cal-brand': '#1455fe' },
        },
      })
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="fl-booking">
      <Cal
        calLink={CAL_LINK}
        calOrigin={CAL_ORIGIN}
        embedJsUrl={CAL_EMBED_JS}
        className="fl-booking-embed"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
      <p className="fl-booking-fallback">
        {c.deploy.bookingFallback}{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </div>
  )
}
