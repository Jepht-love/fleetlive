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
    inspection: {
      intro: string
      viewsLabel: string
      views: { img: string; label: string }[]
      zonesLabel: string
      groups: { zone: string; parts: string[] }[]
    }
  }
  mobile: {
    title: string
    sub: string
    shots: { img: string; label: string; caption: string }[]
  }
  how: {
    title: string
    steps: { label: string; desc: string }[]
    compare: {
      departure: string
      departureNote: string
      return: string
      returnNote: string
      result: string
    }
  }
  roi: {
    title: string
    sub: string
    kpis: { label: string; hint: string }[]
    metrics: string[]
  }
  audience: {
    title: string
    sub: string
    roles: { role: string; desc: string }[]
    chain: string
  }
  deploy: {
    title: string
    phases: { phase: string; desc: string }[]
    pricing: { label: string; text: string; contact: string }
    ctaTitle: string
    ctaButton: string
    bookingFallback: string
    form: {
      firstName: string
      email: string
      fleetSize: string
      fleetOptions: string[]
      message: string
      submit: string
      sending: string
      success: string
      error: string
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
    sub: 'Réduction des coûts opérationnels et des litiges grâce à l’intelligence artificielle.',
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
      { id: 'dashboard', label: 'Tableau de bord', img: '/dashboard.png', desc: 'Vue d’ensemble de la flotte : véhicules disponibles, en service, tâches du jour, alertes retard.' },
      { id: 'fleet', label: 'Flotte', img: '/flotte.png', desc: 'Parc en temps réel : disponibilité, tarif jour, caution, kilométrage et état (dégradé) de chaque véhicule.' },
      { id: 'vehicle', label: 'Suivi & entretien', img: '/suivi-entretien.png', desc: 'Fiche véhicule complète : état mécanique et dégradations localisées, kilométrage depuis entretien, immobilisations et statut du véhicule.' },
      { id: 'inspection', label: 'Inspection', img: '/etat-des-lieux.png', desc: 'Schéma d’inspection multi-angles pour localiser chaque dommage — vues de dessus, de face, de dos et de profil.' },
      { id: 'accounting', label: 'Comptabilité', img: '/comptabilite.png', desc: 'Prévisionnel de trésorerie : échéances non réglées par mois, loyers véhicules et factures à régler.' },
      { id: 'profitability', label: 'Rentabilité', img: '/rentabilite.png', desc: 'Analyse de rentabilité : dépenses par catégorie et par véhicule, recettes comparées aux dépenses.' },
    ],
    inspection: {
      intro: 'Chaque zone du véhicule est un point de contrôle. L’inspection couvre l’avant, l’arrière, les deux côtés et le toit — chaque élément peut recevoir un dommage localisé, catégorisé et suivi jusqu’à résolution.',
      viewsLabel: 'Vues d’inspection',
      views: [
        { img: '/inspection-avant-arriere.png', label: 'Avant & arrière' },
        { img: '/inspection-cotes.png', label: 'Côté gauche & droit' },
      ],
      zonesLabel: 'Faces inspectées',
      groups: [
        { zone: 'Avant', parts: ['Lunette avant', 'Capot', 'Rétroviseur gauche', 'Rétroviseur droit', 'Phare gauche', 'Phare droit', 'Pare-choc avant central', 'Pare-choc avant gauche', 'Pare-choc avant droit'] },
        { zone: 'Arrière', parts: ['Lunette arrière', 'Coffre extérieur', 'Phare arrière gauche', 'Phare arrière droit', 'Pare-choc central arrière', 'Pare-choc arrière gauche', 'Pare-choc arrière droit'] },
        { zone: 'Côté gauche', parts: ['Aile avant gauche', 'Porte avant gauche', 'Porte arrière gauche', 'Aile arrière gauche', 'Bas de caisse gauche', 'Roue avant gauche', 'Roue arrière gauche', 'Vitre avant gauche', 'Vitre arrière gauche', 'Vitre arrière latérale gauche'] },
        { zone: 'Côté droit', parts: ['Aile avant droite', 'Porte avant droite', 'Porte arrière droite', 'Aile arrière droite', 'Bas de caisse droite', 'Roue avant droite', 'Roue arrière droite', 'Vitre avant droite', 'Vitre arrière droite', 'Vitre arrière latérale droite'] },
        { zone: 'Toit', parts: ['Toit'] },
      ],
    },
  },
  mobile: {
    title: 'Aussi dans votre poche.',
    sub: 'La gestion de flotte disponible en format mobile — comptabilité et rentabilité consultables partout.',
    shots: [
      { img: '/mobile-compta.png', label: 'Comptabilité', caption: 'Échéances à venir : mensualités par véhicule, montant payé, reste à régler et prochaine échéance.' },
      { img: '/mobile-rentabilite.png', label: 'Rentabilité', caption: 'Rentabilité par véhicule : chiffre d’affaires, coûts, marge, taux d’utilisation et taux d’immobilisation.' },
    ],
  },
  how: {
    title: 'Comment ça fonctionne.',
    steps: [
      { label: 'Véhicule', desc: 'Départ / retour.' },
      { label: 'Photos', desc: 'Prises via le logiciel au retour du véhicule.' },
      { label: 'Inspection IA', desc: 'Comparaison automatique départ / retour — chaque dommage est détecté, localisé et suivi.' },
      { label: 'Rapport', desc: 'Écarts constatés, export PDF instantané.' },
      { label: 'CRM', desc: 'Fiche véhicule mise à jour — facturation, litiges, maintenance.' },
    ],
    compare: {
      departure: 'Départ',
      departureNote: 'photos de référence',
      return: 'Retour',
      returnNote: 'photos au retour du véhicule',
      result: 'Écarts détectés & localisés',
    },
  },
  roi: {
    title: 'Retour sur investissement.',
    sub: 'Chaque euro dépensé par véhicule devient visible et pilotable. Trois indicateurs financiers, suivis en continu, révèlent où se cache le coût.',
    kpis: [
      { label: 'Taux d’utilisation', hint: 'jours en service ÷ jours disponibles — repérez la sur-flotte et les véhicules sous-exploités.' },
      { label: 'Usage au kilomètre', hint: 'coût réel rapporté aux km parcourus — arbitrez le renouvellement sur des chiffres.' },
      { label: 'Taux de réparation', hint: 'immobilisations et pannes suivies — anticipez la maintenance, réduisez l’indisponibilité.' },
    ],
    metrics: [
      '~14 minutes d’inspection économisées par véhicule et par passage',
      'Preuve visuelle = litiges réduits significativement, coûts de dommages documentés et récupérables',
      'Détection précoce des dommages = -10% à -25% sur les coûts de réparation',
    ],
  },
  audience: {
    title: 'Pensé pour vos décideurs flotte.',
    sub: 'De la douleur terrain à la validation budgétaire et technique — chaque interlocuteur y trouve sa réponse.',
    roles: [
      { role: 'Responsable Flotte', desc: 'État du parc en temps réel et inspections automatisées — moins de terrain, plus de contrôle.' },
      { role: 'Directeur des Opérations', desc: 'KPI d’exploitation centralisés : disponibilité, immobilisations, coûts par véhicule.' },
      { role: 'Directeur Maintenance', desc: 'Détection précoce des dégradations et suivi de l’entretien, véhicule par véhicule.' },
      { role: 'Directeur Logistique', desc: 'Visibilité continue sur la disponibilité et l’affectation des véhicules.' },
      { role: 'Directeur Transformation Digitale', desc: 'Inspection et suivi de flotte digitalisés — fin des process papier.' },
      { role: 'DSI', desc: 'Plateforme unique, intégrable au CRM, avec traçabilité complète des données.' },
    ],
    chain: 'Responsable Flotte identifie la douleur → Directeur des Opérations valide l’intérêt business → DAF valide le budget → DSI valide l’intégration.',
  },
  deploy: {
    title: 'Déploiement en 3 phases.',
    phases: [
      { phase: 'Pilote — 2 à 6 semaines', desc: 'Mise en service sur un site pilote, 50 à 200 véhicules. Vos équipes utilisent la plateforme en conditions réelles et comparent, véhicule par véhicule, le suivi manuel actuel au suivi logiciel. Prise en main accompagnée, sans bouleverser vos process.' },
      { phase: 'Validation des KPI', desc: 'On mesure les gains concrets sur le pilote : temps d’inspection par véhicule, taux d’erreur détecté, litiges évités, taux d’utilisation et d’immobilisation, coût au kilomètre, satisfaction des équipes terrain. Des chiffres factuels qui servent de base à la décision de généralisation.' },
      { phase: 'Déploiement multi-sites', desc: 'Généralisation à l’ensemble des dépôts, intégration au CRM et aux outils existants, centralisation des données de toute la flotte et formation des équipes. Un pilotage unique, du terrain à la direction.' },
    ],
    pricing: {
      label: 'Tarification',
      text: 'Tarification sur mesure selon la taille de la flotte et le périmètre de déploiement.',
      contact: 'Contactez-nous pour une proposition adaptée.',
    },
    ctaTitle: 'Prêt à dématérialiser la gestion de votre flotte ?',
    ctaButton: 'Demander une démonstration',
    bookingFallback: 'Aucun créneau ne convient ? Écrivez-nous à',
    form: {
      firstName: 'Prénom',
      email: 'Email professionnel',
      fleetSize: 'Taille de flotte',
      fleetOptions: ['10–20', '20–50', '50–100', '100–300', '300+'],
      message: 'Message',
      submit: 'Demander une démonstration',
      sending: 'Envoi en cours…',
      success: 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.',
      error: 'L’envoi a échoué. Réessayez, ou écrivez-nous directement à projobs01@gmail.com.',
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
    sub: 'Reducing operational costs and disputes through artificial intelligence.',
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
      { id: 'dashboard', label: 'Dashboard', img: '/dashboard.png', desc: 'Fleet overview: available vehicles, in service, daily tasks, late return alerts.' },
      { id: 'fleet', label: 'Fleet', img: '/flotte.png', desc: 'Real-time fleet: availability, daily rate, deposit, mileage and condition (damaged) per vehicle.' },
      { id: 'vehicle', label: 'Tracking & maintenance', img: '/suivi-entretien.png', desc: 'Full vehicle file: mechanical condition and located damage, mileage since last service, downtime and vehicle status.' },
      { id: 'inspection', label: 'Inspections', img: '/etat-des-lieux.png', desc: 'Multi-angle inspection diagram to pinpoint every damage — top, front/rear and side views.' },
      { id: 'accounting', label: 'Accounting', img: '/comptabilite.png', desc: 'Cash-flow forecast: unpaid installments per month, vehicle leases and invoices due.' },
      { id: 'profitability', label: 'Profitability', img: '/rentabilite.png', desc: 'Profitability analysis: expenses by category and by vehicle, revenue vs expenses.' },
    ],
    inspection: {
      intro: 'Every area of the vehicle is a checkpoint. The inspection covers the front, rear, both sides and the roof — each element can be flagged with a located damage, categorized and tracked until resolved.',
      viewsLabel: 'Inspection views',
      views: [
        { img: '/inspection-avant-arriere.png', label: 'Front & rear' },
        { img: '/inspection-cotes.png', label: 'Left & right side' },
      ],
      zonesLabel: 'Inspected faces',
      groups: [
        { zone: 'Front', parts: ['Windshield', 'Hood', 'Left mirror', 'Right mirror', 'Left headlight', 'Right headlight', 'Front center bumper', 'Front left bumper', 'Front right bumper'] },
        { zone: 'Rear', parts: ['Rear window', 'Trunk lid', 'Left tail light', 'Right tail light', 'Rear center bumper', 'Rear left bumper', 'Rear right bumper'] },
        { zone: 'Left side', parts: ['Front left fender', 'Front left door', 'Rear left door', 'Rear left fender', 'Left rocker panel', 'Front left wheel', 'Rear left wheel', 'Front left window', 'Rear left window', 'Rear left quarter window'] },
        { zone: 'Right side', parts: ['Front right fender', 'Front right door', 'Rear right door', 'Rear right fender', 'Right rocker panel', 'Front right wheel', 'Rear right wheel', 'Front right window', 'Rear right window', 'Rear right quarter window'] },
        { zone: 'Roof', parts: ['Roof'] },
      ],
    },
  },
  mobile: {
    title: 'In your pocket, too.',
    sub: 'Fleet management in a mobile format — accounting and profitability available anywhere.',
    shots: [
      { img: '/mobile-compta.png', label: 'Accounting', caption: 'Upcoming installments: monthly payments per vehicle, amount paid, balance due and next due date.' },
      { img: '/mobile-rentabilite.png', label: 'Profitability', caption: 'Profitability per vehicle: revenue, costs, margin, utilization rate and downtime rate.' },
    ],
  },
  how: {
    title: 'How it works.',
    steps: [
      { label: 'Vehicle', desc: 'Departure / return.' },
      { label: 'Photos', desc: 'Taken via the software upon vehicle return.' },
      { label: 'AI inspection', desc: 'Automatic departure/return comparison — every damage is detected, located and tracked.' },
      { label: 'Report', desc: 'Discrepancies flagged, instant PDF export.' },
      { label: 'CRM', desc: 'Vehicle record updated — billing, disputes, maintenance.' },
    ],
    compare: {
      departure: 'Departure',
      departureNote: 'reference photos',
      return: 'Return',
      returnNote: 'photos on vehicle return',
      result: 'Discrepancies detected & located',
    },
  },
  roi: {
    title: 'Return on investment.',
    sub: 'Every euro spent per vehicle becomes visible and manageable. Three financial indicators, tracked continuously, reveal where the cost hides.',
    kpis: [
      { label: 'Utilization rate', hint: 'days in service ÷ days available — spot over-sizing and under-used vehicles.' },
      { label: 'Cost per kilometer', hint: 'real cost against distance driven — time renewals on hard numbers.' },
      { label: 'Repair rate', hint: 'downtime and breakdowns tracked — anticipate maintenance, cut unavailability.' },
    ],
    metrics: [
      '~14 minutes of inspection time saved per vehicle per pass',
      'Visual proof = significantly reduced disputes, damage costs documented and recoverable',
      'Early damage detection = -10% to -25% on repair costs',
    ],
  },
  audience: {
    title: 'Built for your fleet stakeholders.',
    sub: 'From field pain to budget and technical sign-off — every stakeholder finds their answer.',
    roles: [
      { role: 'Fleet Manager', desc: 'Real-time fleet status and automated inspections — less field work, more control.' },
      { role: 'Operations Director', desc: 'Centralized operational KPIs: availability, downtime, cost per vehicle.' },
      { role: 'Maintenance Director', desc: 'Early damage detection and maintenance tracking, vehicle by vehicle.' },
      { role: 'Logistics Director', desc: 'Continuous visibility on vehicle availability and allocation.' },
      { role: 'Chief Digital Officer', desc: 'Digitalized inspection and fleet tracking — no more paper processes.' },
      { role: 'CIO', desc: 'A single platform, CRM-integrable, with full data traceability.' },
    ],
    chain: 'Fleet Manager spots the pain → Operations Director validates the business case → CFO signs off the budget → CIO validates integration.',
  },
  deploy: {
    title: 'Deployment in 3 phases.',
    phases: [
      { phase: 'Pilot — 2 to 6 weeks', desc: 'Go-live on a pilot site, 50 to 200 vehicles. Your teams use the platform in real conditions and compare, vehicle by vehicle, today’s manual tracking to software tracking. Guided onboarding, without disrupting your processes.' },
      { phase: 'KPI validation', desc: 'We measure the concrete gains on the pilot: inspection time per vehicle, error rate detected, disputes avoided, utilization and downtime rates, cost per kilometer, field-team satisfaction. Factual figures that ground the decision to scale.' },
      { phase: 'Multi-site scale', desc: 'Roll-out across all depots, integration with your CRM and existing tools, centralized data for the whole fleet, and team training. A single control point, from the field to management.' },
    ],
    pricing: {
      label: 'Pricing',
      text: 'Custom pricing based on fleet size and deployment scope.',
      contact: 'Contact us for a tailored proposal.',
    },
    ctaTitle: 'Ready to digitize your fleet management?',
    ctaButton: 'Request a demonstration',
    bookingFallback: 'No slot works for you? Email us at',
    form: {
      firstName: 'First name',
      email: 'Professional email',
      fleetSize: 'Fleet size',
      fleetOptions: ['10–20', '20–50', '50–100', '100–300', '300+'],
      message: 'Message',
      submit: 'Request a demonstration',
      sending: 'Sending…',
      success: 'Thank you! Your request has been sent. We’ll get back to you shortly.',
      error: 'Sending failed. Please try again, or email us at projobs01@gmail.com.',
    },
  },
  footer: '© 2026 FleetLive',
}

export const content: Record<Lang, Content> = { fr, en }

export function getContent(lang: Lang): Content {
  return content[lang]
}
