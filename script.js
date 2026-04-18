// 1. Curseur personnalisé
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.transform = `translate(${posX - 3}px, ${posY - 3}px)`;
    cursorOutline.style.transform = `translate(${posX - 15}px, ${posY - 15}px)`;
});

// 2. Machine à écrire
const texts = ["Développeur web full-stack", "Créateur d'interfaces élégantes", "Passionnée par le code et le design"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter-text');

function typeEffect() {
    const currentText = texts[index];
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
    }
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}
if (typewriterElement) typeEffect();

// 3. Animation des compteurs (Intersection Observer)
const stats = document.querySelectorAll('.stat-number');
const animateNumbers = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(el);
        }
    });
};
const observerStats = new IntersectionObserver(animateNumbers, { threshold: 0.5 });
stats.forEach(stat => observerStats.observe(stat));

// 4. Animation au scroll (apparition des cartes)
const fadeElements = document.querySelectorAll('.project-card, .skills-list span, .stat');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

// 5. Bouton retour en haut
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backBtn.style.display = 'flex';
    } else {
        backBtn.style.display = 'none';
    }
});
backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 6. Formulaire avec validation et simulation d'envoi
const form = document.getElementById('contact-form');
const feedback = document.querySelector('.form-feedback');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
        feedback.innerHTML = '<span style="color:#d4af37;">❌ Tous les champs sont obligatoires.</span>';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        feedback.innerHTML = '<span style="color:#d4af37;">❌ Email invalide.</span>';
        return;
    }
    feedback.innerHTML = '<span style="color:#d4af37;">✨ Message envoyé avec succès ! Je vous répondrai rapidement.</span>';
    form.reset();
    setTimeout(() => feedback.innerHTML = '', 4000);
});

// 7. Navigation fluide (déjà présente mais on renforce)
document.querySelectorAll('nav a, .hero .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const hash = this.getAttribute('href');
        if (hash && hash.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});