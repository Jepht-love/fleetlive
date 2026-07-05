'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import {
  Clock,
  AlertTriangle,
  MessageCircle,
  EyeOff,
  Car,
  Camera,
  FileText,
  Database,
  ArrowDown,
  Check,
} from 'lucide-react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { getContent, type Lang } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

const CONTACT_EMAIL = 'akpadjijepht@gmail.com'
// Lien public Cal.com (RDV démo 30 min) — la réservation crée l'événement dans l'agenda.
const CAL_LINK = 'jepht-akpadji-j457vn/30min'
const PROBLEM_ICONS = [Clock, AlertTriangle, MessageCircle, EyeOff]
// Ordre des nœuds du diagramme orbital : Véhicule (haut-g), Photos (bas-g),
// Rapport (haut-d), CRM (bas-d). Le cœur central = l'inspection IA.
const NODE_ICONS = [Car, Camera, FileText, Database]
// Connecteurs bézier (viewBox 1000×720, cœur au centre 500,360) : sortie
// horizontale du cœur puis arrivée verticale au nœud, à la manière du schéma Ravin.
const ORBIT_PATHS = [
  'M415 345 C305 345 215 257 215 150', // Véhicule — entrée
  'M415 375 C305 375 215 463 215 570', // Photos — entrée
  'M585 345 C695 345 785 257 785 150', // Rapport — sortie
  'M585 375 C695 375 785 463 785 570', // CRM — sortie
]
const ORBIT_POS = [
  { left: '21.5%', top: '20.8%', side: 'left' as const },
  { left: '21.5%', top: '79.2%', side: 'left' as const },
  { left: '78.5%', top: '20.8%', side: 'right' as const },
  { left: '78.5%', top: '79.2%', side: 'right' as const },
]

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

        // Diagramme orbital « Comment ça fonctionne » — cœur IA + connecteurs
        // Tracé progressif des courbes au scroll
        gsap.utils.toArray<SVGPathElement>('.fl-orbit-line').forEach((path, i) => {
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: i * 0.12,
            scrollTrigger: { trigger: '.fl-orbit', start: 'top 74%' },
          })
        })
        // Révélation du cœur et des nœuds
        gsap.from('.fl-orbit-core', {
          scale: 0.8,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fl-orbit', start: 'top 74%' },
        })
        gsap.from('.fl-orbit-node', {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: { trigger: '.fl-orbit', start: 'top 74%' },
        })
        // Pulsations de données : entrées (0,1) vers le cœur, sorties (2,3) vers les nœuds
        gsap.utils.toArray<SVGCircleElement>('.fl-orbit-pulse').forEach((dot, i) => {
          const inbound = i < 2
          gsap.fromTo(
            dot,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.25,
              repeat: -1,
              repeatDelay: 1.85,
              yoyo: true,
              delay: 0.6 + i * 0.5,
            },
          )
          gsap.to(dot, {
            duration: 2.1,
            repeat: -1,
            ease: 'power1.inOut',
            delay: 0.6 + i * 0.5,
            motionPath: {
              path: `#fl-orbit-path-${i}`,
              start: inbound ? 1 : 0,
              end: inbound ? 0 : 1,
            },
          })
        })

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
          <a className="fl-logo" href="#top">
            <span className="fl-logo-mark" />
            FleetLive
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
                  <span className="fl-phone-notch" aria-hidden="true" />
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

      {/* ---------- COMMENT ÇA FONCTIONNE — diagramme orbital ---------- */}
      <section className="fl-section">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">03</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.how.title}</h2>
          </div>

          {/* Composition orbitale (desktop / tablette large) */}
          <div className="fl-orbit">
            <svg
              className="fl-orbit-svg"
              viewBox="0 0 1000 720"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="fl-orbit-grad-l" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stopColor="#1455fe" />
                  <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
                <linearGradient id="fl-orbit-grad-r" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#1455fe" />
                  <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
                <radialGradient id="fl-orbit-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="rgba(20,85,254,0.30)" />
                  <stop offset="0.7" stopColor="rgba(124,92,255,0.08)" />
                  <stop offset="1" stopColor="rgba(20,85,254,0)" />
                </radialGradient>
              </defs>
              <circle cx="500" cy="360" r="250" fill="url(#fl-orbit-glow)" />
              {ORBIT_PATHS.map((d, i) => (
                <path
                  key={d}
                  id={`fl-orbit-path-${i}`}
                  className="fl-orbit-line"
                  d={d}
                  stroke={i < 2 ? 'url(#fl-orbit-grad-l)' : 'url(#fl-orbit-grad-r)'}
                />
              ))}
              {ORBIT_PATHS.map((d, i) => (
                <circle key={`p-${d}`} className="fl-orbit-pulse" r="5" />
              ))}
            </svg>

            {/* Cœur IA — élément signature */}
            <div className="fl-orbit-core">
              <span className="fl-orbit-core-orb" aria-hidden="true" />
              <svg className="fl-orbit-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path
                    id="fl-orbit-ring-path"
                    d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                  />
                </defs>
                <text>
                  <textPath href="#fl-orbit-ring-path" startOffset="0">
                    {c.how.core.ring.repeat(2)}
                  </textPath>
                </text>
              </svg>
              <span className="fl-orbit-core-name">{c.how.core.name}</span>
            </div>

            {/* Labels d'axe */}
            <span className="fl-orbit-axis fl-orbit-axis--left">{c.how.captureLabel}</span>
            <span className="fl-orbit-axis fl-orbit-axis--right">{c.how.outputLabel}</span>

            {/* Nœuds */}
            {c.how.nodes.map((n, i) => {
              const Icon = NODE_ICONS[i]
              const pos = ORBIT_POS[i]
              return (
                <div
                  key={n.label}
                  className={`fl-orbit-node fl-orbit-node--${pos.side}`}
                  style={{ left: pos.left, top: pos.top }}
                >
                  <span className="fl-orbit-node-icon"><Icon size={22} /></span>
                  <div className="fl-orbit-node-text">
                    <h4>{n.label}</h4>
                    <p>{n.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="fl-orbit-caption">{c.how.core.caption}</p>

          {/* Repli vertical (mobile) */}
          <ol className="fl-orbit-mobile">
            <li className="fl-orbit-mstep fl-orbit-mstep--core">
              <span className="fl-orbit-micon fl-orbit-micon--core" aria-hidden="true" />
              <div>
                <h4>{c.how.core.name}</h4>
                <p>{c.how.core.caption}</p>
              </div>
            </li>
            {c.how.nodes.map((n, i) => {
              const Icon = NODE_ICONS[i]
              return (
                <li key={n.label} className="fl-orbit-mstep">
                  <span className="fl-orbit-micon"><Icon size={20} /></span>
                  <div>
                    <h4>{n.label}</h4>
                    <p>{n.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
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
            <span className="fl-logo-mark" />
            FleetLive
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
      const cal = await getCalApi()
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
