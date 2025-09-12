// Header couleur au scroll (et à l'initialisation)
(function(){
  const header = document.getElementById('header');
  if(!header) return;
  function onScroll(){
    if(window.scrollY>50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();
  
  // Scroll fluide
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener("click",function(e){
      const target = document.querySelector(this.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth"});
      }
    });
  });
  
  // Animations au scroll
  const sections=document.querySelectorAll('section');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  },{threshold:0.15, rootMargin: '0px 0px -10% 0px'});
  sections.forEach(section=>observer.observe(section));
  
  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.addEventListener('click',()=>{item.classList.toggle('open');});
  });

  // Menu mobile (burger)
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('closeMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const links = document.querySelectorAll('[data-mobile-link]');

  function openMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    if(burger) burger.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(burger) burger.setAttribute('aria-expanded','false');
  }
  if(burger) burger.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  if(backdrop) backdrop.addEventListener('click', closeMenu);
  links.forEach(a=> a.addEventListener('click', ()=> closeMenu()));
  