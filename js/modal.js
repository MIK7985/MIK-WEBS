/**
 * MIKWEBS PORTFOLIO - PROJECT MODAL & CONTACT FORM HANDLER
 * Enhanced UI/UX: Next/Previous Carousel Navigation, Arrow Keys,
 * Smooth Transitions, and Enhanced Form Feedback
 */

const projectOrder = [
  'shoedrop',
  'decore-website',
  'decore-app',
  'techno-panels'
];

let currentProjectIndex = 0;

const projectData = {
  'shoedrop': {
    title: 'ShoeDrop',
    category: 'E-Commerce Store',
    badge: 'Live Client Store',
    image: 'assets/projects/shoedrop.png',
    domain: 'shoedrop.online',
    url: 'https://shoedrop.online/',
    subtitle: 'High-conversion e-commerce footwear storefront engineered for streetwear sneakers and athletic footwear drops.',
    overview: 'ShoeDrop required a sleek, performance-driven digital storefront to showcase trending sneakers, new season drops, and lifestyle athletic footwear. The objective was creating an immersive brand experience with seamless mobile discovery and frictionless checkout.',
    solution: 'Designed and built a bold, high-contrast e-commerce storefront featuring dynamic new-season drop hero banners, curated gender taxonomies (Men, Women, Kids), instant shopping bag interactions, wishlist capabilities, and reassuring trust guarantees (100% verified authentic, hassle-free returns, free worldwide delivery).',
    deliverables: ['E-Commerce UX/UI Design', 'Responsive Storefront Development', 'Product Discovery & Filter Engine', 'Cart & Wishlist Architecture', 'Mobile Shopping Optimization', 'Speed & Conversion Tuning'],
    industry: 'Footwear Retail & Modern E-Commerce',
    timeline: 'Custom E-Commerce Store',
    tech: ['Modern E-Commerce Architecture', 'Responsive CSS3 Layouts', 'Cart State Management', 'Fast Media Optimization']
  },
  'decore-website': {
    title: 'Decore Developers',
    category: 'Business Website',
    badge: 'Live Client Website',
    image: 'assets/projects/decore-website.png',
    domain: 'decoredevelopers.in',
    url: 'https://decoredevelopers.in',
    subtitle: "Kerala's #1 Plaster of Paris & interior design specialists high-performance marketing website.",
    overview: 'Decore Developers required a digital identity reflecting their premier craftsmanship in bespoke Plaster of Paris designs, luxury gypsum false ceilings, cornices, and architectural wall finishes across Kerala.',
    solution: 'Engineered an ultra-fast, responsive static web experience highlighting high-resolution project galleries, client testimonials, service breakdowns, and instant WhatsApp & phone inquiry channels.',
    deliverables: ['Custom UI/UX Design', 'Static Frontend Engineering', 'High-Res Project Gallery', 'Mobile-First Responsive Layout', 'WhatsApp & Direct Call Lead Capture', 'Fast Performance & Local SEO'],
    industry: 'Interior Architecture & Construction',
    timeline: '3 Days Fast Delivery',
    tech: ['Semantic HTML5', 'Custom Modern CSS', 'Responsive Grid Engine', 'Lightweight Vanilla JS']
  },
  'decore-app': {
    title: 'Decore Developers Portal',
    category: 'Web Application',
    badge: 'Live Client Web App',
    image: 'assets/projects/decore-app.png',
    domain: 'decoredevelopers.co.in',
    url: 'https://decoredevelopers.co.in',
    subtitle: 'Cloud-based workforce & operations management portal for tracking 54+ employees and active job sites.',
    overview: 'With multiple interior and ceiling execution projects operating concurrently across Kerala, Decore Developers needed a centralized internal platform to eliminate manual paperwork, track employee attendance, and monitor material requisitions across active job sites.',
    solution: 'Designed and built an intuitive, responsive web application featuring real-time site dashboards, employee directory, daily attendance logging, materials requisition workflows, and administrative role management.',
    deliverables: ['Single Page App Architecture', 'Admin Dashboard UX', 'Workforce Attendance Tracker', 'Site Material Request Flow', 'Role-Based Access Control', 'Mobile-Optimized Worker Portal'],
    industry: 'Enterprise Operations / Workforce Software',
    timeline: 'Custom Web Application',
    tech: ['Single Page App Architecture', 'REST APIs', 'Role Authentication', 'Responsive Dashboard CSS']
  },
  'techno-panels': {
    title: 'Techno Panels',
    category: 'Corporate Website',
    badge: 'Live Client Website',
    image: 'assets/projects/techno-panels.png',
    domain: 'technopanels.in',
    url: 'https://technopanels.in',
    subtitle: 'Authoritative corporate website for CPRI-certified electrical panel board manufacturers.',
    overview: 'Techno Panels is a manufacturer of custom electrical control panels, power distribution switchboards, and automation systems. They needed an industrial web presence to present their engineering capabilities, test certifications, and product catalog to consultants and contractors.',
    solution: 'Engineered a corporate industrial platform showcasing technical product specifications (APFC, MCC, PCC, PLC panels), facility machinery, compliance accreditations, and streamlined RFQ quote request touchpoints.',
    deliverables: ['Corporate Information Architecture', 'Technical Product Catalog', 'Industrial UI/UX Design', 'RFQ & Lead Generation System', 'Fast-Loading Performance'],
    industry: 'Industrial Manufacturing & Electrical Engineering',
    timeline: '3 Days Fast Delivery',
    tech: ['Semantic HTML5', 'Custom Modern CSS', 'Responsive Layout Engine', 'Structured SEO Schema']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initProjectModal();
  initContactForm();
});

/**
 * Enhanced Project Details Modal with Carousel Navigation
 */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.querySelector('.modal-backdrop');
  const viewTriggers = document.querySelectorAll('[data-project-trigger]');

  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const counterEl = document.getElementById('modalCounter');

  if (!modal || !closeBtn) return;

  const renderProjectByIndex = (index) => {
    currentProjectIndex = (index + projectOrder.length) % projectOrder.length;
    const projectId = projectOrder[currentProjectIndex];
    const data = projectData[projectId];
    if (!data) return;

    const modalImg = document.getElementById('modalImage');
    modalImg.style.opacity = '0.3';
    setTimeout(() => {
      modalImg.src = data.image;
      modalImg.alt = `${data.title} website preview`;
      modalImg.style.opacity = '1';
    }, 120);

    document.getElementById('modalCategory').textContent = data.category;
    const badgeEl = document.getElementById('modalBadge');
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.className = 'badge badge-live';
    }
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalSolution').textContent = data.solution;
    document.getElementById('modalIndustry').textContent = data.industry;
    document.getElementById('modalTimeline').textContent = data.timeline;

    if (counterEl) {
      counterEl.textContent = `Project ${String(currentProjectIndex + 1).padStart(2, '0')} / ${String(projectOrder.length).padStart(2, '0')}`;
    }

    const liveBtn = document.getElementById('modalLiveUrl');
    if (liveBtn) {
      if (data.url) {
        liveBtn.href = data.url;
        liveBtn.style.display = 'inline-flex';
        liveBtn.innerHTML = `<span>Visit Live (${data.domain})</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
      } else {
        liveBtn.style.display = 'none';
      }
    }

    // Deliverables list
    const deliverablesList = document.getElementById('modalDeliverables');
    deliverablesList.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `• ${item}`;
      deliverablesList.appendChild(li);
    });

    // Tech stack tags
    const techWrap = document.getElementById('modalTech');
    techWrap.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'service-tag';
      span.textContent = t;
      techWrap.appendChild(span);
    });
  };

  const openModal = (projectId) => {
    const idx = projectOrder.indexOf(projectId);
    renderProjectByIndex(idx !== -1 ? idx : 0);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  viewTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-trigger');
      openModal(projectId);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-project-trigger');
        openModal(projectId);
      }
    });
  });

  // Carousel Next / Prev Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderProjectByIndex(currentProjectIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderProjectByIndex(currentProjectIndex + 1);
    });
  }

  closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard Navigation: Escape to close, Left/Right arrow keys to cycle
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      renderProjectByIndex(currentProjectIndex - 1);
    } else if (e.key === 'ArrowRight') {
      renderProjectByIndex(currentProjectIndex + 1);
    }
  });

  // Modal CTA button jumps to contact
  const modalCta = document.getElementById('modalStartCta');
  if (modalCta) {
    modalCta.addEventListener('click', () => {
      closeModal();
    });
  }
}

/**
 * Interactive Contact Form
 */
function initContactForm() {
  const form = document.getElementById('projectContactForm');
  const statusBox = document.getElementById('formStatus');

  if (!form || !statusBox) return;

  // Real-time error clearing
  [form.name, form.email, form.message].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        if (statusBox.classList.contains('error')) {
          statusBox.style.display = 'none';
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = form.name;
    const emailEl = form.email;
    const messageEl = form.message;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    const projectType = form.projectType ? form.projectType.value : 'General';
    const budget = form.budget ? form.budget.value : 'Not specified';

    let hasError = false;
    let errorMessage = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      nameEl.classList.add('invalid');
      hasError = true;
      errorMessage = 'Please enter your name.';
    } else {
      nameEl.classList.remove('invalid');
    }

    if (!email || !emailRegex.test(email)) {
      emailEl.classList.add('invalid');
      hasError = true;
      errorMessage = !email ? 'Please enter your email address.' : 'Please enter a valid email address.';
    } else {
      emailEl.classList.remove('invalid');
    }

    if (!message) {
      messageEl.classList.add('invalid');
      hasError = true;
      if (!errorMessage) errorMessage = 'Please tell us a little about your project.';
    } else {
      messageEl.classList.remove('invalid');
    }

    if (hasError) {
      statusBox.className = 'form-status error';
      statusBox.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span>${errorMessage}</span>
      `;
      statusBox.style.display = 'flex';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      <span>Sending enquiry...</span>
    `;

    const company = form.company ? form.company.value.trim() : '';
    const waText = encodeURIComponent(`Hi MikWebs, I'm ${name}${company ? ' from ' + company : ''}. I just sent an enquiry for a ${projectType} (${budget}): "${message}"`);
    const waUrl = `https://wa.me/917306012799?text=${waText}`;

    // Option C: Both (Email submission to mikwebsites@gmail.com + WhatsApp quick button)
    fetch('https://formsubmit.co/ajax/mikwebsites@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        company: company || 'Not provided',
        projectType: projectType,
        budget: budget,
        message: message,
        _subject: `New MikWebs Project Enquiry from ${name}`
      })
    }).catch(() => {
      // Continue gracefully even if network is restricted
    }).finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      // Reset to default budget
      const defaultBudget = form.querySelector('input[name="budget"][value="$200 (Launch Offer)"]');
      if (defaultBudget) defaultBudget.checked = true;

      statusBox.className = 'form-status success';
      statusBox.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; margin-top:2px; color:#10B981;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <strong style="color:var(--text-primary); font-size:1rem;">Thank you, ${name}!</strong>
              <p style="margin-top:3px; color:var(--text-secondary); font-size:0.875rem;">Your enquiry for <em>${projectType} (${budget})</em> has been sent to <strong>mikwebsites@gmail.com</strong>. Muhammed Irfan K will get in touch within 24 hours.</p>
            </div>
          </div>
          <div style="padding-top:10px; border-top:1px solid rgba(16, 185, 129, 0.25); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <span style="font-size:0.8125rem; color:var(--text-secondary);">Want an immediate response?</span>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="background:#25D366; color:#FFFFFF; border:none; display:inline-flex; align-items:center; gap:6px; font-weight:700; padding:6px 14px; border-radius:20px; text-decoration:none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>Continue on WhatsApp 💬</span>
            </a>
          </div>
        </div>
      `;
      statusBox.style.display = 'flex';
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}
