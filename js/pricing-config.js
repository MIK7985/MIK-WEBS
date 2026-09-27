/**
 * MIKWEBS PRICING & SERVICE CONFIGURATION
 * Centralized configuration object for all pricing tiers, turnaround targets, and add-ons.
 * All pricing is formatted in Dollars: $
 */

const MIKWEBS_PRICING = {
  currency: '$',
  market: 'Global',
  format(amount) {
    return `${this.currency}${amount.toLocaleString('en-US')}`;
  },
  formatRange(min, max) {
    return `${this.format(min)} – ${this.format(max)}`;
  },

  // Primary Promotional Offer: Single-Page Landing Page
  launchOffer: {
    name: 'Single-Page Landing Page',
    price: 200,
    priceDisplay: '$200',
    priceDisplayWithAud: '$200',
    introText: 'One-time introductory price',
    delivery: '3 Days',
    standardDeliveryText: '3-day delivery for standard projects.',
    scope: 'Single Landing Page',
    badge: 'Limited launch offer',
    description: 'Everything you need to launch a professional single-page website.',
    note: 'Limited launch offer. Final scope confirmed before work begins.',
    includedItems: [
      'Custom landing-page design',
      'Responsive desktop & mobile development',
      'Up to 5–6 content sections',
      'Contact / CTA section',
      'Basic SEO setup',
      'Social sharing metadata',
      'Website deployment assistance',
      '1 revision round'
    ],
    notIncludedDisclaimer: 'The $200 launch offer is designed for a standard single-page landing page. E-commerce, CMS/blogs, advanced booking systems, custom web applications, extensive animations and additional pages are quoted separately.'
  },

  landingPage: {
    badge: '3-Day Delivery',
    standardDeliveryText: '3-day delivery for standard projects.',
    defaultTier: 'launch',
    tiers: {
      launch: {
        id: 'launch',
        name: 'Single Page',
        fullName: 'Single-Page Landing Page',
        priceRange: '$200',
        minPrice: 200,
        maxPrice: 200,
        delivery: '3 Days',
        scope: 'Single Landing Page',
        badge: 'Limited launch offer',
        tagline: 'Limited launch offer · $200 introductory price',
        description: 'Everything you need to launch a professional single-page website.'
      },
      business: {
        id: 'business',
        name: 'Multi-Section',
        fullName: 'Business Landing Page',
        priceRange: '$495 – $695',
        minPrice: 495,
        maxPrice: 695,
        delivery: '3 Days',
        scope: 'Single Page (Multi-Section)',
        badge: 'Extended Scope',
        tagline: 'Deep narrative landing page for service businesses',
        description: 'Custom UI/UX, extended narrative sections, social metadata, and CTA optimization.'
      },
      premium: {
        id: 'premium',
        name: 'Advanced',
        fullName: 'Premium Interactive Landing Page',
        priceRange: '$795 – $1,250',
        minPrice: 795,
        maxPrice: 1250,
        delivery: '3–5 Days',
        scope: 'Single Page + Interactive',
        badge: 'Custom Scope',
        tagline: 'High-end custom landing page with custom micro-interactions',
        description: 'Bespoke UI/UX, custom animations, booking setup, and speed tuning.'
      }
    },
    includedFeatures: [
      { id: 'mobile', name: 'Mobile Responsive', badge: 'INCLUDED' },
      { id: 'seo', name: 'SEO & Social Meta', badge: 'INCLUDED' },
      { id: 'leadForm', name: 'Contact / Lead Form', badge: 'INCLUDED' },
      { id: 'ctaOpt', name: 'CTA Optimization', badge: 'INCLUDED' }
    ],
    addons: {
      booking: {
        id: 'booking',
        name: 'Booking Integration',
        label: 'Booking Integration',
        minAdd: 100,
        maxAdd: 200,
        priceDisplay: '+$100–$200'
      },
      animations: {
        id: 'animations',
        name: 'Custom Animations',
        label: 'Custom Animations',
        minAdd: 150,
        maxAdd: 300,
        priceDisplay: '+$150–$300'
      },
      advancedSections: {
        id: 'advancedSections',
        name: 'Advanced Sections',
        label: 'Advanced Sections',
        minAdd: 100,
        maxAdd: 250,
        priceDisplay: '+$100–$250'
      },
      cmsBlog: {
        id: 'cmsBlog',
        name: 'CMS / Blog Setup',
        label: 'CMS / Blog',
        minAdd: 200,
        maxAdd: 400,
        priceDisplay: '+$200–$400'
      }
    }
  },

  // Other Project Types (For Australian Businesses)
  otherTypes: {
    'Business Website': {
      id: 'businessWebsite',
      name: 'Business Website',
      scope: '4–7 Pages',
      minPrice: 1450,
      maxPrice: 2850,
      delivery: '2–3 Weeks',
      scales: {
        '1-3 Pages': { min: 995, max: 1650, delivery: '1–2 Weeks', scope: '1–3 Pages' },
        '4-7 Pages': { min: 1450, max: 2850, delivery: '2–3 Weeks', scope: '4–7 Pages' },
        '8+ Pages': { min: 2850, max: 4500, delivery: '3–4 Weeks', scope: '8+ Pages' }
      }
    },
    'Website Redesign': {
      id: 'websiteRedesign',
      name: 'Website Redesign',
      scope: 'Full Overhaul',
      minPrice: 1250,
      maxPrice: 2450,
      delivery: '2 Weeks',
      scales: {
        '1-3 Pages': { min: 895, max: 1450, delivery: '1–2 Weeks', scope: '1–3 Pages' },
        '4-7 Pages': { min: 1250, max: 2450, delivery: '2 Weeks', scope: '4–7 Pages' },
        '8+ Pages': { min: 2450, max: 3950, delivery: '3 Weeks', scope: '8+ Pages' }
      }
    },
    'E-Commerce Store': {
      id: 'ecommerce',
      name: 'E-Commerce Store',
      scope: 'Store & Checkout',
      minPrice: 2850,
      maxPrice: 4950,
      delivery: '3–4 Weeks',
      scales: {
        '1-3 Pages': { min: 2250, max: 3450, delivery: '2–3 Weeks', scope: 'Starter Catalog' },
        '4-7 Pages': { min: 2850, max: 4950, delivery: '3–4 Weeks', scope: 'Standard Store' },
        '8+ Pages': { min: 4950, max: 7500, delivery: '4–6 Weeks', scope: 'Enterprise Catalog' }
      }
    }
  }
};
