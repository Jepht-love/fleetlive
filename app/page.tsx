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
  Cpu,
  FileText,
  Database,
  ArrowRight,
  ArrowDown,
  Check,
} from 'lucide-react'
import { getContent, type Lang } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CONTACT_EMAIL = 'projobs01@gmail.com'
const PROBLEM_ICONS = [Clock, AlertTriangle, MessageCircle, EyeOff]
const STEP_ICONS = [Car, Camera, Cpu, FileText, Database]

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
        reveal('.fl-flow .fl-step', '.fl-flow')
        reveal('.fl-roi-metric', '.fl-roi-metrics')
        reveal('.fl-grid-3 .fl-tier', '.fl-grid-3')
        reveal('.fl-phases .fl-phase', '.fl-phases')

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
        </div>
      </section>

      {/* ---------- COMMENT ÇA FONCTIONNE ---------- */}
      <section className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">02</span>
            <h2 className="fl-h2" style={{ marginTop: 12 }}>{c.how.title}</h2>
          </div>
          <div className="fl-flow">
            {c.how.steps.map((step, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <div key={step.label} style={{ display: 'contents' }}>
                  <div className="fl-step">
                    <div className="fl-step-icon"><Icon size={24} /></div>
                    <div>
                      <h4>{step.label}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                  {i < c.how.steps.length - 1 && <ArrowRight className="fl-arrow" size={22} />}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- ROI ---------- */}
      <section className="fl-section">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">03</span>
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

          <div className="fl-grid-3">
            {c.roi.tiers.map((tier) => (
              <div key={tier.label} className="fl-tier">
                <div className="fl-tier-label">{tier.label}</div>
                <div className="fl-tier-amount">{tier.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DÉPLOIEMENT + CTA + FORM ---------- */}
      <section id="contact" className="fl-section fl-section--card">
        <div className="fl-container">
          <div className="fl-section-head">
            <span className="fl-eyebrow">04</span>
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

          <div className="fl-cta">
            <h3>{c.deploy.ctaTitle}</h3>
          </div>

          <ContactForm c={c} />
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

/* ---------- Formulaire (mailto, aucun backend) ---------- */
function ContactForm({ c }: { c: ReturnType<typeof getContent> }) {
  const f = c.deploy.form
  const [form, setForm] = useState({ firstName: '', email: '', fleet: '', message: '' })

  const update = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }))

  // On ouvre le client mail de l'utilisateur pré-rempli : c'est lui qui envoie.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `FleetLive — ${f.submit} (${form.firstName || 'Contact'})`
    const body = [
      `${f.firstName}: ${form.firstName}`,
      `${f.email}: ${form.email}`,
      `${f.fleetSize}: ${form.fleet}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="fl-form" onSubmit={handleSubmit}>
      <div className="fl-field">
        <label htmlFor="fl-firstname">{f.firstName}</label>
        <input id="fl-firstname" className="fl-input" type="text" value={form.firstName} onChange={update('firstName')} required />
      </div>
      <div className="fl-field">
        <label htmlFor="fl-email">{f.email}</label>
        <input id="fl-email" className="fl-input" type="email" value={form.email} onChange={update('email')} required />
      </div>
      <div className="fl-field">
        <label htmlFor="fl-fleet">{f.fleetSize}</label>
        <select id="fl-fleet" className="fl-select" value={form.fleet} onChange={update('fleet')} required>
          <option value="" disabled>—</option>
          {f.fleetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="fl-field">
        <label htmlFor="fl-message">{f.message}</label>
        <textarea id="fl-message" className="fl-textarea" value={form.message} onChange={update('message')} />
      </div>
      <button type="submit" className="fl-btn fl-btn--primary fl-form-submit">{f.submit}</button>
    </form>
  )
}
