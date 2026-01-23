// ============================================================
// PORTFOLIO ELVIS M'BOLLO - JAVASCRIPT PRINCIPAL CORRIGÉ
// ============================================================

// ============================================================
// 1. CONFIGURATION INITIALE
// ============================================================

let currentThemeMode = 0;
let currentColorTheme = 0;

const themeModes = [
    { name: 'Mode Sombre', class: '', icon: 'dark_mode', color: '#64748b' },
    { name: 'Glass Clair', class: 'glass-mode', icon: 'water_drop', color: '#3b82f6' },
    { name: 'Marron Chaleureux', class: 'glass-marron', icon: 'palette', color: '#d97706' }
];

const colorThemes = [
    { name: 'Violet Mystique', primary: '#8b5cf6', primaryDark: '#7c3aed' }, // ← Sera par défaut
    { name: 'Vert Émeraude', primary: '#10b981', primaryDark: '#059669' }
];

// ============================================================
// 2. LOADER DE PAGE
// ============================================================

window.addEventListener('load', () => {
    // 💾 Charger les préférences de thème IMMÉDIATEMENT
    loadThemePreferences();
    
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 2000);
});


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
        threshold: 0.5 // L'animation se lance quand 50% de l'élément est visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000); // 2000ms = 2 secondes
                observer.unobserve(entry.target); // On arrête d'observer après l'animation
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ============================================================
// 3. NAVBAR - MOBILE MENU
// ============================================================

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active');
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links-vertical a, .nav-links a');

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
        // Retirer l'ancienne classe active avec animation
        if (link.classList.contains('active')) {
            link.style.transform = 'scale(1)';
        }
        link.classList.remove('active');
        
        // Ajouter la nouvelle classe active avec animation
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.transform = 'scale(1.15)';
            
            // Effet de pulse
            link.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
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
            const navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// ============================================================
// 6. INTERSECTION OBSERVER - ANIMATIONS
// ============================================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.service-card, .project-card, .timeline-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================================
// 7. TYPING TEXT ANIMATION
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

document.addEventListener("DOMContentLoaded", type);


// ============================================================
// 7. THEME SWITCHER AVEC PERSISTANCE - VERSION COMPLÈTE
// ============================================================

// 💾 CHARGEMENT DES PRÉFÉRENCES SAUVEGARDÉES
function loadThemePreferences() {
    const savedThemeMode = localStorage.getItem('themeMode');
    const savedColorTheme = localStorage.getItem('colorTheme');
    
    if (savedThemeMode !== null) {
        currentThemeMode = parseInt(savedThemeMode);
    }
    
    if (savedColorTheme !== null) {
        currentColorTheme = parseInt(savedColorTheme);
    }
    
    // Appliquer immédiatement (sans notification)
    applyThemeMode(currentThemeMode, false);
    applyColorTheme(currentColorTheme, false);
}

// 💾 SAUVEGARDE DES PRÉFÉRENCES
function saveThemePreferences() {
    localStorage.setItem('themeMode', currentThemeMode);
    localStorage.setItem('colorTheme', currentColorTheme);
}

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

// 🎨 APPLICATION DU MODE (Sombre/Glass/Glass Marron)
function applyThemeMode(modeIndex, showNotif = true) {
    const mode = themeModes[modeIndex];
    
    // Retirer TOUTES les classes de thème
    document.body.classList.remove('glass-mode', 'glass-marron');
    
    // Ajouter la nouvelle classe si nécessaire
    if (mode.class) document.body.classList.add(mode.class);
    
    // Mettre à jour l'icône du bouton
    const icon = themeModeBtn?.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.textContent = mode.icon;
        icon.style.color = mode.color;
    }
    
    // 💾 Sauvegarder la préférence
    saveThemePreferences();
    
    // Afficher notification seulement si demandé
    if (showNotif) showNotification(mode.name);
    
    // 🔥 Forcer la mise à jour des couleurs après changement de mode
    setTimeout(() => {
        const theme = colorThemes[currentColorTheme];
        updateElementColors(theme.primary, theme.primaryDark);
    }, 100);
}

// 🎨 APPLICATION DU THÈME COULEUR (Vert/Violet/Marron)
function applyColorTheme(themeIndex, showNotif = true) {
    const theme = colorThemes[themeIndex];
    
    // Mettre à jour les variables CSS
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dark', theme.primaryDark);
    
    // 🔥 FORCER LA MISE À JOUR IMMÉDIATE
    updateElementColors(theme.primary, theme.primaryDark);
    
    // 💾 Sauvegarder la préférence
    saveThemePreferences();
    
    // Afficher notification seulement si demandé
    if (showNotif) showNotification(theme.name);
}

// 🔥 FONCTION DE MISE À JOUR FORCÉE DES COULEURS
function updateElementColors(primary, primaryDark) {
    // Convertir hex en rgba pour les ombres
    const primaryRgba = hexToRgba(primary, 0.6);
    const primaryLight = hexToRgba(primary, 0.3);
    
    // ========== BOUTONS ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta, .btn-download, .btn-pricing-popular');
    buttons.forEach(btn => {
        btn.style.background = primary;
        btn.style.borderColor = primary;
    });
    
    const btnHover = `
        .btn-primary:hover,
        .btn-cta:hover,
        .btn-download:hover {
            background: ${primaryDark} !important;
            box-shadow: 0 15px 40px ${primaryLight} !important;
        }
    `;
    addDynamicStyle('btn-hover', btnHover);
    
    // ========== FUSÉE ==========
    const rocket = document.getElementById('rocketBtn');
    if (rocket) {
        rocket.style.background = primary;
        rocket.style.boxShadow = `0 0 20px ${primaryRgba}`;
    }
    
    const rocketHover = `
        .scroll-top-btn:hover {
            background: ${primaryDark} !important;
            box-shadow: 0 0 30px ${primaryRgba} !important;
        }
    `;
    addDynamicStyle('rocket-hover', rocketHover);
    
    // ========== ICÔNES AVEC DÉGRADÉ ==========
    const icons = document.querySelectorAll('.service-icon, .contact-icon, .pricing-icon, .skill-category-icon, .quote-icon');
    icons.forEach(icon => {
        icon.style.background = `linear-gradient(135deg, ${primary}, #3b82f6)`;
    });
    
    // ========== TIMELINE ==========
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.style.background = primary;
        dot.style.boxShadow = `0 0 20px ${primaryRgba}`;
    });
    
    const timelineLine = document.querySelector('.timeline::before');
    const timelineStyle = `
        .timeline::before {
            background: linear-gradient(180deg, ${primary}, transparent) !important;
        }
    `;
    addDynamicStyle('timeline', timelineStyle);
    
    // ========== PROGRESS BARS ==========
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.background = `linear-gradient(90deg, ${primary}, #3b82f6)`;
    });
    
    // ========== BADGES ET TAGS ==========
    const tagsHover = `
        .skill-tag:hover,
        .tech-tag:hover {
            background: ${primary} !important;
            color: white !important;
        }
    `;
    addDynamicStyle('tags-hover', tagsHover);
    
    // ========== BORDURES ACTIVES ==========
    const activeStyle = `
        .filter-btn.active,
        .nav-links a.active::after,
        .nav-links-vertical a.active::after {
            background: ${primary} !important;
            border-color: ${primary} !important;
        }
        
        .filter-btn:hover,
        .service-card:hover,
        .project-card:hover,
        .contact-item:hover,
        .timeline-content:hover {
            border-color: ${primary} !important;
        }
    `;
    addDynamicStyle('active-borders', activeStyle);
    
    // ========== BADGES SPÉCIAUX ==========
    const liveBadges = document.querySelectorAll('.live-badge');
    liveBadges.forEach(badge => {
        badge.style.background = primary;
    });
    
    const experienceBadges = document.querySelectorAll('.experience-badge');
    experienceBadges.forEach(badge => {
        badge.style.background = primary;
    });
    
    // ========== LIENS PROJECT ==========
    const projectLinks = document.querySelectorAll('.project-link-primary');
    projectLinks.forEach(link => {
        link.style.background = `linear-gradient(135deg, ${primary}, #3b82f6)`;
    });
    
    // ========== QR CODE ==========
    const qrCodeStyle = `
        .qr-code::before {
            background: linear-gradient(135deg, ${primary}, #3b82f6) !important;
        }
    `;
    addDynamicStyle('qr-code', qrCodeStyle);
    
    // ========== SECTION TAGS ==========
    const sectionTags = document.querySelectorAll('.section-tag');
    sectionTags.forEach(tag => {
        tag.style.background = `${primary}1A`; // 10% opacity
        tag.style.color = primary;
    });
    
    // ========== ANIMATED BUBBLE (Hero) ==========
    const bubbles = document.querySelectorAll('.animated-bubble');
    bubbles.forEach(bubble => {
        bubble.style.background = `linear-gradient(135deg, ${primary}, #3b82f6)`;
    });
    
    // ========== SHADOWS DYNAMIQUES ==========
    const shadowStyle = `
        .btn-primary:hover,
        .btn-cta:hover,
        .service-card:hover,
        .project-card:hover {
            box-shadow: 0 20px 60px ${primaryLight} !important;
        }
        
        .premium-badge {
            box-shadow: 0 5px 20px ${primaryLight} !important;
        }
    `;
    addDynamicStyle('shadows', shadowStyle);
}

// 🛠️ HELPER: Convertir HEX en RGBA
function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 🛠️ HELPER: Ajouter/Mettre à jour des styles dynamiques
function addDynamicStyle(id, css) {
    let style = document.getElementById(`dynamic-${id}`);
    if (!style) {
        style = document.createElement('style');
        style.id = `dynamic-${id}`;
        document.head.appendChild(style);
    }
    style.textContent = css;
}

// 📢 NOTIFICATION DE CHANGEMENT
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
        font-size: 0.95rem; white-space: nowrap;
    `;
    notification.innerHTML = `<i class="fas fa-palette" style="margin-right: 8px;"></i>${text}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}
// ============================================================
// 9. FUSÉE AVEC FEU - VERSION AMÉLIORÉE
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const rocket = document.getElementById('rocketBtn');
    const footer = document.querySelector('footer');
    
    if (!rocket || !footer) return;
    
    // Créer la flamme droite
    const rightFlame = document.createElement('div');
    rightFlame.className = 'rocket-flame';
    rocket.appendChild(rightFlame);
    
    // Vérifier si le footer est visible
    function checkFooterVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const footerIsVisible = footerRect.top < windowHeight;
        
        rocket.classList.toggle('visible', footerIsVisible);
    }
    
    // Optimisation avec requestAnimationFrame
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
        scrollTimeout = window.requestAnimationFrame(checkFooterVisibility);
    });
    
    checkFooterVisibility();
    
    // Clic sur la fusée
    rocket.addEventListener('click', () => {
        createFireParticles();
        rocket.classList.add('launching');
        
        // Désactive temporairement le hover pendant le lancement
        rocket.style.pointerEvents = 'none';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            rocket.classList.remove('launching', 'visible');
            rocket.style.pointerEvents = 'auto'; // Réactive le hover
        }, 1000);
    });
    
    // Créer les particules de feu
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
// 10. TOGGLE INFO BOX PROJETS
// ============================================================

function toggleProjectsInfo() {
    const infoBox = document.getElementById('projectsInfoBox');
    if (infoBox) {
        infoBox.classList.toggle('hidden');
    }
}

// ============================================================
// 11. FILTRAGE DES PROJETS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMsg = document.getElementById('noProjectsMessage');
    const projectsGrid = document.getElementById('projectsGrid');

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

        adaptGridLayout(visibleCount);

        visibleCards.forEach((card, index) => {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 80 + 50);
        });

        handleNoProjectsMessage(visibleCount);
    }

    function adaptGridLayout(count) {
        if (!projectsGrid) return;
        projectsGrid.style.gridTemplateColumns = '';
        projectsGrid.style.maxWidth = '';

        if (count === 1) {
            projectsGrid.style.gridTemplateColumns = '1fr';
            projectsGrid.style.maxWidth = '600px';
            projectsGrid.style.margin = '0 auto';
        } else if (count === 2) {
            projectsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(380px, 1fr))';
            projectsGrid.style.maxWidth = '1200px';
        }

        if (window.innerWidth <= 768) {
            projectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            projectsGrid.style.maxWidth = '100%';
        }
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

    function updateFilterCounts() {
        const counts = {
            'tous': projectCards.length,
            'en-ligne': document.querySelectorAll('[data-category="en-ligne"]').length,
            'demo': document.querySelectorAll('[data-category="demo"]').length,
            'en-cours': document.querySelectorAll('[data-category="en-cours"]').length
        };

        filterBtns.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const countSpan = btn.querySelector('.filter-count');
            if (countSpan && counts[filter] !== undefined) {
                countSpan.textContent = counts[filter];
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });

    updateFilterCounts();
    adaptGridLayout(projectCards.length);
});

// ============================================================
// 12. SETUP INFINITE SCROLL SKILLS
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

// Initialisation skills
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
// 13. FORMULAIRE DE CONTACT
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
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
// 14. ANIMATIONS CSS
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
// SYSTÈME DE PARTICULES ANIMÉES - OPTIMISÉ PERFORMANCE
// À ajouter AVANT script.js dans le HTML
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Créer le canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    // Dimensions du canvas
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    
    // Écouteur de souris
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Classe Particule
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        // Dessiner la particule
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        // Mettre à jour la position
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Interaction avec la souris
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }
            
            // Mouvement
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }
    
    // Initialiser les particules
    function init() {
        particlesArray = [];
        
        // Moins de particules sur mobile
        const isMobile = window.innerWidth < 768;
        let numberOfParticles = isMobile ? 30 : 80;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Couleur selon le thème
            const isDarkMode = !document.body.classList.contains('glass-mode');
            let color = isDarkMode ? 'rgba(16, 185, 129, 0.6)' : 'rgba(15, 23, 42, 0.3)';
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    // Connecter les particules proches
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    opacityValue = 1 - (distance / 120);
                    const isDarkMode = !document.body.classList.contains('glass-mode');
                    ctx.strokeStyle = isDarkMode 
                        ? `rgba(16, 185, 129, ${opacityValue * 0.3})` 
                        : `rgba(15, 23, 42, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Boucle d'animation
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    
    // Gérer le redimensionnement
    window.addEventListener('resize', () => {
        setCanvasSize();
        init();
    });
    
    // Observer les changements de thème
    const observer = new MutationObserver(() => {
        init(); // Réinitialiser les couleurs des particules
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Lancer l'animation
    init();
    animate();
});