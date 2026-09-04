// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.textContent = isOpen ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item, i) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    const aId = 'faq-answer-' + i;
    a.id = aId;
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', aId);
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => {
        if (open !== item) {
          open.classList.remove('open');
          open.querySelector('.faq-a').style.maxHeight = null;
          open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Audit-context message match: if arriving via the "Get Free SEO Audit" link,
  // pre-select the matching service and show a short confirmation note.
  if (window.location.hash === '#audit') {
    const serviceSelect = document.querySelector('#service');
    const audeNote = document.querySelector('#audit-context-note');
    if (serviceSelect) {
      const auditOption = Array.from(serviceSelect.options).find(o => o.text === 'SEO Audit');
      if (auditOption) serviceSelect.value = auditOption.value;
    }
    if (audeNote) audeNote.style.display = 'flex';
  }

  // Contact form — no backend is connected yet, so this opens the visitor's
  // email client with everything prefilled rather than silently doing nothing.
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('#form-status');
      const name = document.querySelector('#name')?.value.trim();
      const email = document.querySelector('#email')?.value.trim();
      const message = document.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        if (status) {
          status.style.color = 'var(--text-danger, #E24B4A)';
          status.textContent = 'Please fill in your name, email, and message before sending.';
        }
        return;
      }

      const website = document.querySelector('#website')?.value.trim() || 'Not provided';
      const business = document.querySelector('#business')?.value || 'Not specified';
      const service = document.querySelector('#service')?.value || 'Not specified';

      const subject = encodeURIComponent('Project inquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Website: ' + website + '\n' +
        'Business type: ' + business + '\n' +
        'Service needed: ' + service + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:Shohagsheikhe@gmail.com?subject=' + subject + '&body=' + body;

      if (status) {
        status.style.color = 'var(--text-secondary)';
        status.textContent = "Opening your email app with this filled in. If nothing opens, email Shohagsheikhe@gmail.com or use WhatsApp directly.";
      }
    });
  }
});
