/**
 * MIKWEBS PORTFOLIO - MAIN SCRIPT
 * Enhanced UI/UX: Navigation, Unified RAF Scroll Engine, Scope Estimator, FAQ Accordion,
 * Scroll Reveals, Copy-to-Clipboard, and Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollEngine();
  initMobileMenu();
  initPortfolioFilters();
  initActiveNavObserver();
  initScrollReveals();
  initScopeEstimator();
  initFaqAccordion();
  initClipboardCopy();
  initBackToTop();
  initSmoothScroll();
});

/**
 * 1. High-Performance Unified RAF Scroll Engine
 * Consolidates Reading Progress Bar, Sticky Header elevation,
 * and Floating Top Button into a single 60/120fps requestAnimationFrame tick.
 */
function initScrollEngine() {
  const progressBar = document.getElementById('scrollProgressBar');
  const header = document.querySelector('.site-header');
  const floatingBtn = document.querySelector('.floating-top-btn');

  let ticking = false;

  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // A. Reading Progress Bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // B. Sticky Header elevation
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // C. Floating Top Button visibility
    if (floatingBtn) {
      if (scrollTop > 350) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial trigger on load
  updateScroll();
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close drawer when any mobile link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close when clicking outside drawer on backdrop
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * 4. Portfolio Category Filter
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 300ms ease, transform 300ms ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 5. Active Nav Link Spy on Scroll
 */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/**
 * 6. Subtle Scroll Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 7. Interactive Project Scope & Timeline Estimator (Australian Market)
 * Centralized via MIKWEBS_PRICING configuration
 */
function initScopeEstimator() {
  const estimator = document.getElementById('projectEstimator');
  if (!estimator) return;

  const typeChips = estimator.querySelectorAll('[data-step="type"] .estimator-chip');
  const tierCards = estimator.querySelectorAll('.estimator-tier-card');
  const scaleChips = estimator.querySelectorAll('[data-scale]');
  const addonChips = estimator.querySelectorAll('[data-addon]');

  const landingTiersContainer = document.getElementById('landingPageTiersContainer');
  const generalScaleContainer = document.getElementById('generalScaleContainer');
  const step2Title = document.getElementById('step2Title');

  const outBudget = document.getElementById('estimateBudget');
  const outTimeline = document.getElementById('estimateTimeline');
  const outScope = document.getElementById('estimateScope');
  const outType = document.getElementById('estimateType');
  const outDeliveryBadge = document.getElementById('deliveryBadgeFast');
  const outIncludedList = document.getElementById('summaryIncludedList');
  const outDisclaimer = document.getElementById('estimateDisclaimer');
  const applyBtn = document.getElementById('applyEstimateBtn');

  // Estimator state
  let currentType = 'Landing Page';
  let currentTier = 'launch';
  let currentScale = '4-7 Pages';
  const selectedAddons = new Set();

  const calculateEstimate = () => {
    if (typeof MIKWEBS_PRICING === 'undefined') return;

    if (currentType === 'Landing Page') {
      const tierConfig = MIKWEBS_PRICING.landingPage.tiers[currentTier] || MIKWEBS_PRICING.landingPage.tiers.launch;
      let minTotal = tierConfig.minPrice;
      let maxTotal = tierConfig.maxPrice;
      let delivery = tierConfig.delivery;
      let scope = tierConfig.scope;
      let typeName = tierConfig.fullName || tierConfig.name;

      // Addons calculations (lower and upper bounds)
      const activeAddonNames = [];
      selectedAddons.forEach(addonId => {
        const addonConfig = MIKWEBS_PRICING.landingPage.addons[addonId];
        if (addonConfig) {
          minTotal += addonConfig.minAdd;
          maxTotal += addonConfig.maxAdd;
          activeAddonNames.push(addonConfig.name);
        }
      });

      // Update Output Display
      if (outBudget) {
        if (minTotal === maxTotal) {
          outBudget.textContent = MIKWEBS_PRICING.format(minTotal);
        } else {
          outBudget.textContent = MIKWEBS_PRICING.formatRange(minTotal, maxTotal);
        }
        outBudget.classList.remove('pulse-price');
        void outBudget.offsetWidth;
        outBudget.classList.add('pulse-price');
      }
      if (outTimeline) outTimeline.textContent = delivery;
      if (outScope) outScope.textContent = scope;
      if (outType) outType.textContent = typeName;

      if (outDeliveryBadge) {
        outDeliveryBadge.style.display = 'inline-block';
        outDeliveryBadge.textContent = currentTier === 'launch' ? 'Limited launch offer' : '3-Day Delivery';
      }

      if (outDisclaimer) {
        if (currentTier === 'launch') {
          if (selectedAddons.size === 0) {
            outDisclaimer.textContent = 'Limited launch offer. Everything you need to launch a professional single-page website. 3-day delivery for standard projects. Final scope confirmed before work begins.';
          } else {
            outDisclaimer.textContent = 'Base $200 launch offer plus selected add-ons. Additional functionality outside the standard single-page offer increases the final price and timeline.';
          }
        } else {
          outDisclaimer.textContent = 'Fast, responsive and conversion-focused. 3-day delivery for standard projects. Final pricing is confirmed after reviewing your requirements.';
        }
      }

      // Update Included Deliverables List in Summary Card
      if (outIncludedList) {
        const baseItems = ['Responsive Design', '5–6 Sections', 'Contact / CTA Section', 'SEO & Social Meta'];
        const allItems = [...baseItems, ...activeAddonNames];
        outIncludedList.innerHTML = allItems.map(item => `<span class="included-item-pill">${item}</span>`).join('');
      }

    } else {
      // Other Website Types
      const otherConfig = MIKWEBS_PRICING.otherTypes[currentType] || MIKWEBS_PRICING.otherTypes['Business Website'];
      const scaleConfig = otherConfig.scales[currentScale] || otherConfig.scales['4-7 Pages'];

      let minTotal = scaleConfig.min;
      let maxTotal = scaleConfig.max;
      let delivery = scaleConfig.delivery;
      let scope = scaleConfig.scope;

      selectedAddons.forEach(addonId => {
        const addonConfig = MIKWEBS_PRICING.landingPage.addons[addonId];
        if (addonConfig) {
          minTotal += addonConfig.minAdd;
          maxTotal += addonConfig.maxAdd;
        }
      });

      if (outBudget) {
        outBudget.textContent = MIKWEBS_PRICING.formatRange(minTotal, maxTotal);
        outBudget.classList.remove('pulse-price');
        void outBudget.offsetWidth;
        outBudget.classList.add('pulse-price');
      }
      if (outTimeline) outTimeline.textContent = delivery;
      if (outScope) outScope.textContent = scope;
      if (outType) outType.textContent = otherConfig.name;

      if (outDeliveryBadge) {
        outDeliveryBadge.style.display = 'none';
      }

      if (outDisclaimer) {
        outDisclaimer.textContent = `Bespoke multi-page architecture for businesses. Estimated delivery: ${delivery}. Final quotation confirmed after scope discovery.`;
      }

      if (outIncludedList) {
        outIncludedList.innerHTML = `
          <span class="included-item-pill">Bespoke Design</span>
          <span class="included-item-pill">Mobile Optimised</span>
          <span class="included-item-pill">SEO Setup</span>
          <span class="included-item-pill">Enquiry Forms</span>
        `;
      }
    }
  };

  // 1. Website Type Selection
  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentType = chip.getAttribute('data-value');

      if (currentType === 'Landing Page') {
        if (landingTiersContainer) landingTiersContainer.style.display = 'block';
        if (generalScaleContainer) generalScaleContainer.style.display = 'none';
        if (step2Title) step2Title.textContent = 'Select Landing Page Scope';
      } else {
        if (landingTiersContainer) landingTiersContainer.style.display = 'none';
        if (generalScaleContainer) generalScaleContainer.style.display = 'block';
        if (step2Title) step2Title.textContent = 'Estimated Page Count';
      }

      calculateEstimate();
    });
  });

  // 2. Landing Page Tier Cards
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentTier = card.getAttribute('data-tier');
      calculateEstimate();
    });
  });

  // 3. Multi-Page Scale Chips (For Business Websites)
  scaleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scaleChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentScale = chip.getAttribute('data-scale');
      calculateEstimate();
    });
  });

  // 4. Feature Add-on Chips
  addonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const addonKey = chip.getAttribute('data-addon');
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        selectedAddons.delete(addonKey);
      } else {
        chip.classList.add('active');
        selectedAddons.add(addonKey);
      }
      calculateEstimate();
    });
  });

  // Helper: Pre-fill and scroll to contact form with launch offer
  const syncToContactForm = (isDirectLaunchClaim = false) => {
    const formProjectType = document.getElementById('formProjectType');
    if (formProjectType) {
      if (isDirectLaunchClaim || currentType === 'Landing Page') {
        formProjectType.value = 'Landing Page';
      } else if (currentType.includes('Redesign')) {
        formProjectType.value = 'Website Redesign';
      } else if (currentType.includes('E-Commerce')) {
        formProjectType.value = 'E-Commerce';
      } else {
        formProjectType.value = 'New Website';
      }
    }

    const budgetRadios = document.querySelectorAll('input[name="budget"]');
    const budgetText = outBudget ? outBudget.textContent.trim() : '';
    let matched = false;

    budgetRadios.forEach(radio => {
      if (isDirectLaunchClaim || (currentType === 'Landing Page' && currentTier === 'launch' && selectedAddons.size === 0)) {
        if (radio.value.includes('200')) { radio.checked = true; matched = true; }
      } else if (budgetText.includes('200') || budgetText.includes('300') || budgetText.includes('350') || budgetText.includes('400') || budgetText.includes('450') || budgetText.includes('495') || budgetText.includes('695') || budgetText.includes('795') || budgetText.includes('995')) {
        if (radio.value.includes('500') || radio.value.includes('200')) { radio.checked = true; matched = true; }
      } else if (budgetText.includes('1,250') || budgetText.includes('1,450') || budgetText.includes('1,500') || budgetText.includes('1,650') || budgetText.includes('2,450')) {
        if (radio.value.includes('1,000 – $2,500') || radio.value.includes('1,000')) { radio.checked = true; matched = true; }
      } else if (budgetText.includes('2,500') || budgetText.includes('2,850') || budgetText.includes('3,450') || budgetText.includes('4,500') || budgetText.includes('4,950')) {
        if (radio.value.includes('2,500+')) { radio.checked = true; matched = true; }
      }
    });
    if (!matched && budgetRadios.length) budgetRadios[0].checked = true;

    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
      if (isDirectLaunchClaim || (currentType === 'Landing Page' && currentTier === 'launch' && selectedAddons.size === 0)) {
        formMessage.value = "Hi MikWebs,\n\nI'd like to claim the $200 Single-Page Landing Page limited launch offer (3-day delivery for standard projects).\n\nLooking forward to getting started.";
      } else {
        const packageName = currentType === 'Landing Page'
          ? (MIKWEBS_PRICING.landingPage.tiers[currentTier] ? MIKWEBS_PRICING.landingPage.tiers[currentTier].fullName : 'Single-Page Landing Page')
          : `${currentType} (${currentScale})`;

        const deliveryText = outTimeline ? outTimeline.textContent : '3 Days';
        const addonsList = Array.from(selectedAddons).map(id => {
          const cfg = MIKWEBS_PRICING.landingPage.addons[id];
          return cfg ? cfg.name : id;
        }).join(', ');

        formMessage.value = `Hi MikWebs,\n\nI'm interested in the ${packageName}.\nEstimated Price: ${budgetText} (Delivery: ${deliveryText}).\nSelected Add-ons: ${addonsList || 'None (Standard scope)'}.\n\nLooking forward to discussing our requirements.`;
      }
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const formCard = document.querySelector('.contact-form-card');
      if (formCard) {
        formCard.classList.remove('form-highlight-pulse');
        void formCard.offsetWidth;
        formCard.classList.add('form-highlight-pulse');
      }
      const nameInput = document.getElementById('formName');
      if (nameInput) {
        setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
      }
      showToast(isDirectLaunchClaim ? '$200 Launch Offer applied to enquiry form!' : 'Custom estimate applied to enquiry form!');
    }
  };

  // 5. "Start Your Project →" CTA Action
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      syncToContactForm(false);
    });
  }

  // 6. Direct Launch Offer CTAs across the site
  document.querySelectorAll('[data-action="claim-launch-offer"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Ensure landing page + launch tier is active
      currentType = 'Landing Page';
      currentTier = 'launch';
      selectedAddons.clear();
      typeChips.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-value') === 'Landing Page');
      });
      tierCards.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-tier') === 'launch');
      });
      addonChips.forEach(c => c.classList.remove('active'));
      calculateEstimate();
      syncToContactForm(true);
    });
  });

  // Initial calculation on page load
  calculateEstimate();
}

/**
 * 8. FAQ Accordion Logic
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      trigger.setAttribute('aria-expanded', (!isActive).toString());
    });
  });
}

/**
 * 9. One-Click Clipboard Copy with Toast
 */
function initClipboardCopy() {
  const copyElements = document.querySelectorAll('[data-copy]');
  if (!copyElements.length) return;

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      if (el.tagName !== 'A' || el.getAttribute('href') === '#' || !el.getAttribute('href')) {
        e.preventDefault();
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(() => {
        showToast(`${textToCopy}`);
      });
    });
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  let toast = document.getElementById('toastAlert');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastAlert';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/**
 * 10. Back to top buttons (in footer & floating button)
 */
function initBackToTop() {
  const backToTopBtns = document.querySelectorAll('.back-to-top-btn, .floating-top-btn');

  backToTopBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * 11. Smooth scrolling offset adjustment
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 12. Dark Mode / Theme Toggle
 */
function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  if (!themeToggles.length) return;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('mikwebs_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('mikwebs_theme', theme);
    } catch (e) {}

    const isDark = theme === 'dark';
    themeToggles.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  };

  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('mikwebs_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  applyTheme(initialTheme);
}
