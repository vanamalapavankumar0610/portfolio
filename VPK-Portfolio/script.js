const header = document.querySelector(".site-header");
const backTop = document.getElementById("backTop");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  backTop.classList.toggle("show", window.scrollY > 500);
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

backTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (window.matchMedia("(pointer:fine)").matches) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const downloadCert = document.getElementById("downloadCert");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".certificate-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.cert;
    lightboxImage.src = src;
    lightboxImage.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    downloadCert.href = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
document.querySelector(".lightbox-backdrop")?.addEventListener("click", closeLightbox);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:vanamalapavankumar2@gmail.com?subject=${subject}&body=${body}`;
});
