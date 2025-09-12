'use strict';

// Année dynamique dans le footer
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Smooth focus skip for internal links
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        el.tabIndex = -1;
        el.focus({preventScroll:true});
        setTimeout(()=> el.removeAttribute('tabindex'), 1000);
      }
    });
  });
})();

// Reveal on scroll
(function(){
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry =>{
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));
})();

// Modales (Google Forms)
(function(){
  const openers = document.querySelectorAll('[data-open-modal]');
  const closeSelectors = '[data-close-modal]';
  const forms = (window.LEVELUP_FORMS || {});

  function openModal(key){
    const modal = document.getElementById('modal-'+key);
    if (!modal) return;
    const iframe = modal.querySelector('iframe');
    if (iframe && forms[key]){
      if (iframe.src !== forms[key]) iframe.src = forms[key];
    }
    modal.setAttribute('open', '');
    modal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    // Focus handling
    const closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(modal){
    modal.removeAttribute('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openers.forEach(btn =>{
    btn.addEventListener('click', ()=>{
      const key = btn.getAttribute('data-open-modal');
      openModal(key);
    });
  });

  document.querySelectorAll('.modal').forEach(modal =>{
    modal.addEventListener('click', (e)=>{
      if (e.target.matches(closeSelectors) || e.target.classList.contains('modal')){
        closeModal(modal);
      }
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape' && modal.hasAttribute('open')) closeModal(modal);
    });
  });
})();
