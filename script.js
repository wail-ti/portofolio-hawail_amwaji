const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

document.documentElement.classList.add('js');

const revealTargets = document.querySelectorAll(
    '.intro-inner, .section-heading, .education-card, .skill-card, .project-card, .certificate-card, .contact-inner'
);

revealTargets.forEach((element) => {
    element.classList.add('reveal');
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px',
    });

    revealTargets.forEach((element) => revealObserver.observe(element));
} else {
    revealTargets.forEach((element) => element.classList.add('reveal-visible'));
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.setAttribute('aria-label', isExpanded ? 'Buka menu navigasi' : 'Tutup menu navigasi');
        navLinks.classList.toggle('active', !isExpanded);
    });

    navLinks.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
            navLinks.classList.remove('active');
        }
    });
}