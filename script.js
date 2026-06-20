/* ===== SCRIPT.JS – Hope Hospital Website ===== */

// ── Navbar & Parallax scroll effect ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
const heroImageWrap = document.getElementById('heroImageWrap');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  
  // Parallax effect for hero image
  if (heroImageWrap && scrollY < window.innerHeight) {
    heroImageWrap.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});

// ── Hamburger menu ────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ── Animated counter ──────────────────────────────────────────────────────────
function animateCounter(el) {
  const target   = +el.getAttribute('data-target');
  const duration = 1800;
  const step     = target / (duration / 16);
  let   current  = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.service-card, .doctor-card, .gallery-item, .contact-card, .why-feature');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.getAttribute('data-delay') || 0;
      setTimeout(() => e.target.classList.add('visible'), +delay);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => { el.classList.add('fade-in'); fadeObserver.observe(el); });

// ── Gallery Lightbox ──────────────────────────────────────────────────────────
const lightboxImages = [
  { src: 'images/hospital_exterior1.jpg', caption: 'Reception & Waiting Area — Hope Hospital Vijapur' },
  { src: 'images/hospital_exterior2.jpg', caption: 'Hope Hospital Exterior — Night View, Vijapur' },
  { src: 'images/hospital_interior1.jpg', caption: 'Hope Hospital Signboard — Maternity, IVF, Laparoscopy, Sonography' },
  { src: 'images/hospital_interior2.jpg', caption: "Doctor's Consulting Room — Hope Hospital" },
  { src: 'images/doctor_photo1.jpg',      caption: 'Dr. Mehul Patel – MS OBGY, Gynecologist & Obstetrician' },
  { src: 'images/doctor_photo2.jpg',      caption: 'Advanced Laparoscopy Equipment — Hope Hospital' },
  { src: 'images/hospital_facility2.jpg', caption: 'Hospital Ward Corridor — Hope Hospital Vijapur' },
  { src: 'images/doctor_photo3.jpg',      caption: 'Labour Room — Hope Hospital Vijapur' },
];
let currentLightbox = 0;
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(idx) {
  currentLightbox = idx;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function changeLightbox(dir) {
  currentLightbox = (currentLightbox + dir + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}
function updateLightbox() {
  const item = lightboxImages[currentLightbox];
  lightboxImg.src        = item.src;
  lightboxImg.alt        = item.caption;
  lightboxCaption.textContent = item.caption;
}
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  changeLightbox(1);
  if (e.key === 'ArrowLeft')   changeLightbox(-1);
});

// ── Reviews carousel ──────────────────────────────────────────────────────────
const reviewsData = [
  { name: 'Rakesh Patel',    initial: 'R', color: '#1565c0', date: 'Google Review', text: 'Excellent service, cleaning, staff behaviour all is very good. Dr. Mehul Patel is an excellent doctor and explains everything clearly. Highly recommended hospital!' },
  { name: 'Harshil Patel',   initial: 'H', color: '#c2185b', date: 'Google Review', text: 'Nice ambience, Nice location, Doctor with great knowledge, Good staff. The hospital is very clean and well maintained. Overall great experience!' },
  { name: 'Priya Shah',      initial: 'P', color: '#2e7d32', date: 'Google Review', text: 'Best hospital in Vijapur! The doctors and nursing staff are very caring and professional. My delivery went smoothly and the NICU facility is top-notch. Highly recommended!' },
  { name: 'Ramesh Desai',    initial: 'R', color: '#f57f17', date: 'Google Review', text: 'Very good hospital. Doctor is very knowledgeable and staff is very cooperative. The 3D sonography facility is excellent. Thank you Hope Hospital!' },
  { name: 'Meeta Trivedi',   initial: 'M', color: '#6a1b9a', date: 'Google Review', text: 'We underwent IVF treatment here and it was a great success. Dr. Patel is an expert in infertility. The entire team is very supportive and caring throughout the process.' },
  { name: 'Bharat Solanki',  initial: 'B', color: '#bf360c', date: 'Google Review', text: 'Excellent hospital with modern facilities. The staff is very helpful and the doctors are highly qualified. Emergency services are available 24x7 which gives peace of mind.' },
  { name: 'Kavita Chauhan',  initial: 'K', color: '#006064', date: 'Google Review', text: 'Best gynecologist hospital in Vijapur region. Dr. Mehul Patel treated us with utmost care during our high-risk pregnancy. The hospital facilities are world-class.' },
];

const track = document.getElementById('reviewsTrack');
const dotsEl = document.getElementById('reviewsDots');
let reviewIdx = 0;
let reviewTimer;

function renderReviews() {
  track.innerHTML = reviewsData.map(r => `
    <div class="review-card">
      <div class="review-stars">
        ${Array(5).fill('<svg viewBox="0 0 20 20" fill="#FFB800"><path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z"/></svg>').join('')}
      </div>
      <p class="review-text">${r.text}</p>
      <div class="reviewer">
        <div class="reviewer-avatar" style="background:${r.color}">${r.initial}</div>
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-date">${r.date}</div>
        </div>
      </div>
    </div>
  `).join('');

  dotsEl.innerHTML = reviewsData.map((_, i) =>
    `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></div>`
  ).join('');
}

function getCardWidth() {
  const card = track.querySelector('.review-card');
  if (!card) return 364;
  return card.getBoundingClientRect().width + 24;
}

function goToReview(idx) {
  reviewIdx = Math.max(0, Math.min(idx, reviewsData.length - 1));
  track.style.transform = `translateX(-${reviewIdx * getCardWidth()}px)`;
  dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === reviewIdx));
  resetTimer();
}

function resetTimer() {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => goToReview((reviewIdx + 1) % reviewsData.length), 4000);
}

renderReviews();
resetTimer();

// ── Contact form ──────────────────────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  const msg = document.getElementById('fmsg').value.trim();
  
  let text = `Hello Hope Hospital, I would like to book an appointment.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service || 'General Inquiry'}`;
  if (msg) {
    text += `\n*Message:* ${msg}`;
  }
  
  const whatsappUrl = `https://wa.me/919512189740?text=${encodeURIComponent(text)}`;
  
  // Show success briefly and open WhatsApp
  document.getElementById('formSuccess').classList.add('show');
  window.open(whatsappUrl, '_blank');
  
  e.target.reset();
  setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 4000);
}

// ── Smooth scroll polyfill ────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Show floating call button after scroll ────────────────────────────────────
const floatingCall = document.getElementById('floatingCall');
window.addEventListener('scroll', () => {
  floatingCall.style.opacity = window.scrollY > 300 ? '1' : '0';
  floatingCall.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
});
floatingCall.style.opacity = '0';
