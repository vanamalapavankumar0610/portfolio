
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
const backTop=document.querySelector('#backTop');

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>20);
  backTop.classList.toggle('show',window.scrollY>500);
});

menu?.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightboxImage');
const lightboxTitle=document.querySelector('#lightboxTitle');
const downloadCert=document.querySelector('#downloadCert');

document.querySelectorAll('.certificate-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const src=card.dataset.cert;
    lightboxImage.src=src;
    lightboxImage.alt=card.dataset.title;
    lightboxTitle.textContent=card.dataset.title;
    downloadCert.href=src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('no-scroll');
}
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
document.querySelector('.lightbox-backdrop')?.addEventListener('click',closeLightbox);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

document.querySelector('#contactForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.querySelector('#visitorName').value.trim();
  const email=document.querySelector('#visitorEmail').value.trim();
  const message=document.querySelector('#visitorMessage').value.trim();
  const subject=encodeURIComponent(`Portfolio Contact from ${name}`);
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href=`mailto:vanamalapavankumar2@gmail.com?subject=${subject}&body=${body}`;
});
