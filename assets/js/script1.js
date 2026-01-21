// ============================================================
// PORTFOLIO ELVIS M'BOLLO - JAVASCRIPT UNIQUE
// ============================================================

// ============================================================
// 1. VARIABLES GLOBALES
// ============================================================
let currentThemeMode = 0;
let currentColorTheme = 0;

const themeModes = [
    { name: 'Mode Sombre', icon: 'dark_mode', color: '#64748b' },
    { name: 'Glass Clair', icon: 'water_drop', color: '#3b82f6' }
];

const colorThemes = [
    { name: 'Vert Émeraude', primary: '#10b981', primaryDark: '#059669' },
    { name: 'Violet Mystique', primary: '#8b5cf6', primaryDark: '#7c3aed' }
];

// ============================================================
// 2. PAGE LOADER
// ============================================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 2000);
});

// ============================================================
// 3. STATS ANIMATION (COMPTEUR)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '<span>+</span>';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ============================================================
// 4. NAVIGATION - ACTIVE LINK ON SCROLL
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links-vertical a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current || 
            (link.getAttribute('href').includes('.html') && window.location.pathname.includes(current))) {
            link.classList.add('active');
        }
    });
});

// ============================================================
// 5. SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// 6. TYPING TEXT ANIMATION
// ============================================================
const textArray = [
    "Développeur Web Full-Stack (Python & Front-end)",
    "Spécialisé en Python, MySQL et interfaces modernes",
    "Sensible aux bonnes pratiques de sécurité applicative",
    "Orienté solutions, performance et expérience utilisateur",
    "Ouvert aux collaborations et opportunités professionnelles"
];

let textIndex = 0;
let charIndex = 0;

function type() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;
    
    if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;
    
    if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

if (document.getElementById("typing-text")) {
    document.addEventListener("DOMContentLoaded", type);
}

// ============================================================
// 7. THEME SWITCHER
// ============================================================
const themeModeBtn = document.getElementById('theme-mode-toggle');
const colorThemeBtn = document.getElementById('color-theme-toggle');

if (themeModeBtn) {
    themeModeBtn.addEventListener('click', () => {
        currentThemeMode = (currentThemeMode + 1) % themeModes.length;
        applyThemeMode(currentThemeMode);
    });
}

if (colorThemeBtn) {
    colorThemeBtn.addEventListener('click', () => {
        currentColorTheme = (currentColorTheme + 1) % colorThemes.length;
        applyColorTheme(currentColorTheme);
    });
}

function applyThemeMode(modeIndex) {
    const mode = themeModes[modeIndex];
    document.body.classList.remove('glass-mode');
    if (mode.class) document.body.classList.add(mode.class);
    
    const icon = themeModeBtn.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.textContent = mode.icon;
        icon.style.color = mode.color;
    }
    showNotification(mode.name);
}

function applyColorTheme(themeIndex) {
    const theme = colorThemes[themeIndex];
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dark', theme.primaryDark);
    showNotification(theme.name);
}

function showNotification(text) {
    const oldNotif = document.querySelector('.theme-notification');
    if (oldNotif) oldNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.style.cssText = `
        position: fixed; top: 100px; right: 30px;
        background: var(--glass-bg); backdrop-filter: blur(20px);
        border: 2px solid var(--primary); padding: 15px 25px;
        border-radius: 15px; z-index: 10001;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        color: var(--text-light); font-weight: 600;
    `;
    notification.textContent = text;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// ============================================================
// 8. SCROLL TO TOP BUTTON (FUSÉE)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const rocket = document.getElementById('rocketBtn');
    const footer = document.querySelector('footer');
    
    if (!rocket || !footer) return;
    
    // Créer la flamme
    const rightFlame = document.createElement('div');
    rightFlame.className = 'rocket-flame';
    rocket.appendChild(rightFlame);
    
    function checkFooterVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const footerIsVisible = footerRect.top < windowHeight;
        
        rocket.classList.toggle('visible', footerIsVisible);
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
        scrollTimeout = window.requestAnimationFrame(checkFooterVisibility);
    });
    
    checkFooterVisibility();
    
    rocket.addEventListener('click', () => {
        createFireParticles();
        rocket.classList.add('launching');
        rocket.style.pointerEvents = 'none';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            rocket.classList.remove('launching', 'visible');
            rocket.style.pointerEvents = 'auto';
        }, 1000);
    });
    
    function createFireParticles() {
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'fire-particle';
            const randomOffset = (Math.random() - 0.5) * 40;
            particle.style.setProperty('--x-offset', `${randomOffset}px`);
            particle.style.animationDelay = `${Math.random() * 0.2}s`;
            rocket.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    }
});

// ============================================================
// 9. PROJECTS INFO BOX TOGGLE
// ============================================================
function toggleProjectsInfo() {
    const infoBox = document.getElementById('projectsInfoBox');
    if (infoBox) {
        infoBox.classList.toggle('hidden');
    }
}

// ============================================================
// 10. PROJECTS FILTER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMsg = document.getElementById('noProjectsMessage');
    const projectsGrid = document.getElementById('projectsGrid');

    if (filterBtns.length === 0) return;

    function filterProjects(category) {
        let visibleCount = 0;
        const visibleCards = [];

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'tous' || cardCategory === category) {
                visibleCards.push(card);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });

        visibleCards.forEach((card, index) => {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 80 + 50);
        });

        handleNoProjectsMessage(visibleCount);
    }

    function handleNoProjectsMessage(count) {
        if (!noProjectsMsg) return;
        if (count === 0) {
            noProjectsMsg.style.display = 'block';
            noProjectsMsg.style.opacity = '0';
            setTimeout(() => noProjectsMsg.style.opacity = '1', 300);
        } else {
            noProjectsMsg.style.opacity = '0';
            setTimeout(() => noProjectsMsg.style.display = 'none', 300);
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });
});

// ============================================================
// 11. SKILLS INFINITE SCROLL
// ============================================================
function setupInfiniteScroll() {
    const categories = document.querySelectorAll('.skill-category');
    
    categories.forEach(category => {
        const logos = category.querySelector('.skill-logos');
        if (!logos) return;
        
        const items = Array.from(logos.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            logos.appendChild(clone);
        });
    });
}

function setupScrollAnimation() {
    const categories = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    categories.forEach(category => {
        observer.observe(category);
    });
}

function adjustScrollSpeed() {
    const isMobile = window.innerWidth <= 768;
    const categories = document.querySelectorAll('.skill-category');
    
    categories.forEach((category, index) => {
        const logos = category.querySelector('.skill-logos');
        if (!logos) return;
        
        const duration = isMobile ? '40s' : '30s';
        
        if (index % 2 === 0) {
            logos.style.animation = `scroll-left ${duration} linear infinite`;
        } else {
            logos.style.animation = `scroll-right ${duration} linear infinite`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupInfiniteScroll();
    setupScrollAnimation();
    adjustScrollSpeed();
});

window.addEventListener('load', () => {
    if (document.querySelector('.skill-category .skill-logos')) {
        setupInfiniteScroll();
        setupScrollAnimation();
    }
});

window.addEventListener('resize', adjustScrollSpeed);

// ============================================================
// 12. CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            projectType: document.getElementById('projectType').value,
            message: document.getElementById('message').value.trim()
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submitText');
        const submitLoader = document.getElementById('submitLoader');
        
        submitBtn.disabled = true;
        submitText.textContent = 'Envoi en cours...';
        submitLoader.style.display = 'inline-block';
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/wthomasss06@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    'Type de projet': formData.projectType,
                    message: formData.message,
                    _subject: `🚀 Nouveau contact : ${formData.name}`,
                    _template: 'table',
                    _captcha: 'false'
                })
            });
            
            if (response.ok) {
                alert('✅ Message envoyé ! Je vous réponds sous 24h.');
                contactForm.reset();
            }
        } catch (error) {
            alert('❌ Erreur. Contactez-moi sur WhatsApp : +225 01 42 50 77 50');
        } finally {
            submitBtn.disabled = false;
            submitText.textContent = 'Envoyer le message';
            submitLoader.style.display = 'none';
        }
    });
}

// ============================================================
// 13. INTERSECTION OBSERVER - ANIMATIONS
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.service-card, .project-card, .timeline-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================================
// 14. ANIMATIONS CSS (KEYFRAMES)
// ============================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================================
// FIN DU SCRIPT
// ============================================================
console.log('✅ Portfolio Elvis M\'BOLLO - JavaScript chargé avec succès !');