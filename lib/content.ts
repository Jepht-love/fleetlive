// Contenu FR/EN de la landing FleetLive.
// RÈGLE : aucun chiffre inventé — tout provient du PowerPoint ou des screenshots.

export type Lang = 'fr' | 'en'

export interface TabItem {
  id: string
  label: string
  img: string
  desc: string
}

export interface Content {
  nav: { cta: string }
  hero: {
    eyebrow: string
    h1a: string
    h1b: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    tags: string[]
  }
  problem: {
    title: string
    cards: { title: string; desc: string }[]
  }
  software: {
    title: string
    sub: string
    tabs: TabItem[]
  }
  how: {
    title: string
    steps: { label: string; desc: string }[]
  }
  roi: {
    title: string
    sub: string
    metrics: string[]
    tiers: { label: string; amount: string }[]
  }
  deploy: {
    title: string
    phases: { phase: string; desc: string }[]
    ctaTitle: string
    ctaButton: string
    form: {
      firstName: string
      email: string
      fleetSize: string
      fleetOptions: string[]
      message: string
      submit: string
    }
  }
  footer: string
}

const fr: Content = {
  nav: { cta: 'Demander un accès' },
  hero: {
    eyebrow: 'GESTION DE FLOTTE & INSPECTION AUTOMATISÉE',
    h1a: 'Chaque inspection manuelle',
    h1b: 'génère un coût invisible récurrent.',
    sub: 'Réduction des coûts opérationnels et des litiges via vision artificielle.',
    ctaPrimary: 'Demander une démonstration',
    ctaSecondary: 'Voir le logiciel',
    tags: ['Inspection automatisée', 'Traçabilité complète', 'Intégration CRM'],
  },
  problem: {
    title: 'Un processus manuel qui coûte cher.',
    cards: [
      { title: 'Inspection manuelle lente', desc: 'Chaque véhicule doit être inspecté à la main.' },
      { title: 'Erreurs humaines', desc: 'Au vu de la quantité de la flotte, risque de négligence accrue.' },
      { title: 'Litiges clients fréquents', desc: 'Des clients mécontents de la lenteur due aux éléments à vérifier manuellement.' },
      { title: 'Manque de traçabilité', desc: 'Pas de suivi sur la façon dont les inspections sont effectuées.' },
    ],
  },
  software: {
    title: 'Le logiciel.',
    sub: 'Tout ce dont votre flotte a besoin, dans un seul outil.',
    tabs: [
      { id: 'dashboard', label: 'Tableau de bord', img: '/dashboard.png', desc: 'Vue d’ensemble de la flotte : véhicules disponibles, en location, tâches du jour, alertes retard.' },
      { id: 'reservations', label: 'Réservations', img: '/reservations.png', desc: 'Liste des réservations avec statuts en temps réel — en cours, en retard, terminée.' },
      { id: 'fleet', label: 'Flotte', img: '/flotte.png', desc: 'Fiche détaillée de chaque véhicule : tarification, kilométrage, dommages, performance commerciale.' },
      { id: 'inspection', label: 'État des lieux', img: '/etat-des-lieux.png', desc: 'Inspection multi-zones sur schéma interactif — comparaison départ / retour avec photos.' },
      { id: 'accounting', label: 'Comptabilité', img: '/comptabilite.png', desc: 'Recettes, dépenses, résultat net, clôtures, export CSV/PDF/Excel.' },
    ],
  },
  how: {
    title: 'Comment ça fonctionne.',
    steps: [
      { label: 'Véhicule', desc: 'Arrive en zone dédiée' },
      { label: 'Capture', desc: 'Multi-angles, horodatée, géolocalisée' },
      { label: 'IA', desc: 'Détecte et compare les dommages avec l’historique' },
      { label: 'Rapport', desc: 'Anomalies, comparatif, export PDF' },
      { label: 'CRM', desc: 'Facturation, litiges, maintenance' },
    ],
  },
  roi: {
    title: 'Retour sur investissement.',
    sub: '200 000 € à 1 000 000 € d’économies par flotte et par an.',
    metrics: [
      '1 000 véhicules = 233h d’inspection/mois supprimées, soit 1,5 ETP économisé',
      'Preuve visuelle = 50 000 € à 500 000 € de pertes évitées (litiges)',
      'Détection précoce = -10% à -25% sur les réparations',
    ],
    tiers: [
      { label: 'Petite flotte (200 véh.)', amount: '80K€ – 200K€/an' },
      { label: 'Flotte moyenne (1 000 véh.)', amount: '200K€ – 600K€/an' },
      { label: 'Grande flotte (5 000+ véh.)', amount: '500K€ – 1M€+/an' },
    ],
  },
  deploy: {
    title: 'Déploiement en 3 phases.',
    phases: [
      { phase: 'Pilote 2–6 semaines', desc: 'Installation sur 1 site · 50 à 200 véhicules testés · Comparaison manuel vs logiciel' },
      { phase: 'Validation KPIs', desc: 'Temps d’inspection · Taux d’erreur détecté · Litiges évités · Satisfaction opérationnelle' },
      { phase: 'Scale multi-sites', desc: 'Déploiement sur plusieurs dépôts · Intégration CRM globale · Centralisation des données flotte' },
    ],
    ctaTitle: 'Prêt à automatiser votre inspection ?',
    ctaButton: 'Demander une démonstration',
    form: {
      firstName: 'Prénom',
      email: 'Email professionnel',
      fleetSize: 'Taille de flotte',
      fleetOptions: ['< 50', '50–200', '200–1000', '1000+'],
      message: 'Message',
      submit: 'Demander une démonstration',
    },
  },
  footer: '© 2026 FleetLive',
}

const en: Content = {
  nav: { cta: 'Request access' },
  hero: {
    eyebrow: 'FLEET MANAGEMENT & AUTOMATED INSPECTION',
    h1a: 'Every manual inspection',
    h1b: 'generates a recurring hidden cost.',
    sub: 'Reducing operational costs and disputes through computer vision.',
    ctaPrimary: 'Request a demonstration',
    ctaSecondary: 'See the software',
    tags: ['Automated inspection', 'Full traceability', 'CRM integration'],
  },
  problem: {
    title: 'A manual process that costs you.',
    cards: [
      { title: 'Slow manual inspection', desc: 'Every vehicle must be inspected by hand.' },
      { title: 'Human error', desc: 'Given fleet size, risk of oversight increases significantly.' },
      { title: 'Frequent client disputes', desc: 'Dissatisfied clients due to the slowness of manual verification.' },
      { title: 'Lack of traceability', desc: 'No monitoring of how inspections are carried out.' },
    ],
  },
  software: {
    title: 'The software.',
    sub: 'Everything your fleet needs, in one platform.',
    tabs: [
      { id: 'dashboard', label: 'Dashboard', img: '/dashboard.png', desc: 'Fleet overview: available vehicles, on rental, daily tasks, late return alerts.' },
      { id: 'reservations', label: 'Reservations', img: '/reservations.png', desc: 'Reservation list with real-time status — active, overdue, completed.' },
      { id: 'fleet', label: 'Fleet', img: '/flotte.png', desc: 'Detailed vehicle card: pricing, mileage, damage records, commercial performance.' },
      { id: 'inspection', label: 'Inspections', img: '/etat-des-lieux.png', desc: 'Multi-zone inspection on interactive diagram — departure/return comparison with photos.' },
      { id: 'accounting', label: 'Accounting', img: '/comptabilite.png', desc: 'Revenue, expenses, net result, closings, CSV/PDF/Excel export.' },
    ],
  },
  how: {
    title: 'How it works.',
    steps: [
      { label: 'Vehicle', desc: 'Arrives at the designated zone' },
      { label: 'Capture', desc: 'Multi-angle, timestamped, geolocated' },
      { label: 'AI', desc: 'Detects and compares damage against history' },
      { label: 'Report', desc: 'Anomalies, comparison, PDF export' },
      { label: 'CRM', desc: 'Billing, disputes, maintenance' },
    ],
  },
  roi: {
    title: 'Return on investment.',
    sub: '€200K to €1M in savings per fleet per year.',
    metrics: [
      '1,000 vehicles = 233 inspection hours/month eliminated, i.e. 1.5 FTE saved',
      'Visual proof = €50K to €500K in avoided losses (disputes)',
      'Early detection = -10% to -25% on repairs',
    ],
    tiers: [
      { label: 'Small fleet (200 veh.)', amount: '€80K – €200K/yr' },
      { label: 'Mid fleet (1,000 veh.)', amount: '€200K – €600K/yr' },
      { label: 'Large fleet (5,000+ veh.)', amount: '€500K – €1M+/yr' },
    ],
  },
  deploy: {
    title: 'Deployment in 3 phases.',
    phases: [
      { phase: 'Pilot 2–6 weeks', desc: '1-site installation · 50 to 200 vehicles tested · Manual vs software comparison' },
      { phase: 'KPI validation', desc: 'Inspection time · Error rate detected · Disputes avoided · Operational satisfaction' },
      { phase: 'Multi-site scale', desc: 'Multi-depot deployment · Global CRM integration · Centralized fleet data' },
    ],
    ctaTitle: 'Ready to automate your inspections?',
    ctaButton: 'Request a demonstration',
    form: {
      firstName: 'First name',
      email: 'Professional email',
      fleetSize: 'Fleet size',
      fleetOptions: ['< 50', '50–200', '200–1000', '1000+'],
      message: 'Message',
      submit: 'Request a demonstration',
    },
  },
  footer: '© 2026 FleetLive',
}

export const content: Record<Lang, Content> = { fr, en }

export function getContent(lang: Lang): Content {
  return content[lang]
}
