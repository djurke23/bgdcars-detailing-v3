/**
 * BGD Cars Detailing - Main JavaScript
 * Handles mobile navigation toggle and navbar scroll effect
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== Elements =====
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');

    // ===== Mobile Navigation Toggle =====
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function () {
            navbarToggle.classList.toggle('active');
            navbarNav.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        const navLinks = navbarNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarToggle.classList.remove('active');
                navbarNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbarNav.contains(e.target) && !navbarToggle.contains(e.target)) {
                navbarToggle.classList.remove('active');
                navbarNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== Navbar Scroll Effect =====
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // ===== FAQ Accordion Logic =====
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqContainer.addEventListener('click', function (e) {
            const questionBtn = e.target.closest('.faq-question');
            if (questionBtn) {
                const item = questionBtn.parentElement;

                // Close other items
                const currentActive = faqContainer.querySelector('.faq-item.active');
                if (currentActive && currentActive !== item) {
                    currentActive.classList.remove('active');
                }

                // Toggle current item
                item.classList.toggle('active');
            }
        });
    }

    // ===== Form Submission (Demo) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Show success message (in production, you'd send this to a server)
            alert('Hvala vam na upitu! Kontaktiraćemo vas u najkraćem roku.');
            contactForm.reset();

            console.log('Form submitted:', data);
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Before/After Sliders =====
    document.querySelectorAll('[data-before-after]').forEach(slider => {
        const range = slider.querySelector('.before-after-range');
        if (!range) return;
        const update = () => {
            slider.style.setProperty('--position', `${range.value}%`);
        };
        range.addEventListener('input', update);
        update();
    });

    // ===== Gallery Modal =====
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalGrid = document.getElementById('galleryModalGrid');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryTriggers = document.querySelectorAll('.gallery-category');
    const imageViewer = document.getElementById('imageViewer');
    const imageViewerImg = document.getElementById('imageViewerImg');
    const imagePrevBtn = document.querySelector('[data-image-prev]');
    const imageNextBtn = document.querySelector('[data-image-next]');
    let currentImages = [];
    let currentImageIndex = 0;

    const galleryData = {
        polimerizacija: {
            title: 'Polimerizacija',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?car,detailing&sig=1', title: 'Zaštita laka', desc: 'Polimerizacija za dugotrajni sjaj i barijeru.' },
                { src: 'https://source.unsplash.com/1200x800/?car,polish&sig=2', title: 'Sloj zaštite', desc: 'Ujednačen finiš i dodatna otpornost.' },
                { src: 'https://source.unsplash.com/1200x800/?car,studio&sig=3', title: 'Studio tretman', desc: 'Profesionalni uslovi i precizan proces.' },
                { src: 'https://source.unsplash.com/1200x800/?car,clean&sig=4', title: 'Hidrofobni efekat', desc: 'Voda klizi sa površine, lakše pranje.' }
            ]
        },
        dubinsko: {
            title: 'Dubinsko',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?car,interior&sig=7', title: 'Sedišta i tekstil', desc: 'Dubinsko uklanjanje fleka i mirisa.' },
                { src: 'https://source.unsplash.com/1200x800/?auto,interior&sig=8', title: 'Detaljno čišćenje', desc: 'Svaki detalj enterijera pod kontrolom.' },
                { src: 'https://source.unsplash.com/1200x800/?car,cleaning&sig=9', title: 'Osveženje kabine', desc: 'Dubinsko pranje i dezinfekcija.' },
                { src: 'https://source.unsplash.com/1200x800/?car,seat&sig=10', title: 'Premium završnica', desc: 'Čist i osvežen enterijer bez tragova.' }
            ]
        },
        kocnice: {
            title: 'Farbanje Kočnica',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?brake,caliper&sig=13', title: 'Caliper custom', desc: 'Farbanje kočnica po željenoj boji.' },
                { src: 'https://source.unsplash.com/1200x800/?car,brakes&sig=14', title: 'Sportski izgled', desc: 'Vizuelni boost uz kvalitetan premaz.' },
                { src: 'https://source.unsplash.com/1200x800/?wheel,brake&sig=15', title: 'Detalji koji znače', desc: 'Naglašene kočnice za jači identitet.' },
                { src: 'https://source.unsplash.com/1200x800/?auto,wheel&sig=18', title: 'Završni sjaj', desc: 'Postojan premaz i čist završetak.' }
            ]
        },
        poliranje: {
            title: 'Poliranje',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?car,polishing&sig=19', title: 'Uklanjanje ogrebotina', desc: 'Korekcija laka i dubok sjaj.' },
                { src: 'https://source.unsplash.com/1200x800/?car,shine&sig=20', title: 'Ogledalo efekat', desc: 'Vraćanje fabričkog sjaja.' },
                { src: 'https://source.unsplash.com/1200x800/?auto,polish&sig=21', title: 'Precizan rad', desc: 'Mašinsko poliranje po zonama.' },
                { src: 'https://source.unsplash.com/1200x800/?car,gloss&sig=24', title: 'Finalni završetak', desc: 'Lak koji izgleda kao nov.' }
            ]
        },
        enterijer: {
            title: 'Enterijer',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?luxury,interior&sig=26', title: 'Luksuzna kabina', desc: 'Negovan enterijer bez fleka.' },
                { src: 'https://source.unsplash.com/1200x800/?car,leather&sig=27', title: 'Koža i plastika', desc: 'Čišćenje i zaštita svih površina.' },
                { src: 'https://source.unsplash.com/1200x800/?dashboard,car&sig=28', title: 'Detailing tabla', desc: 'Perfektna instrument tabla.' },
                { src: 'https://source.unsplash.com/1200x800/?car,seat&sig=29', title: 'Sedišta bez tragova', desc: 'Dubinsko pranje sedišta.' }
            ]
        },
        keramika: {
            title: 'Keramika',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?car,coating&sig=31', title: 'Keramička zaštita', desc: 'Dugotrajna barijera za lak.' },
                { src: 'https://source.unsplash.com/1200x800/?auto,shine&sig=33', title: 'Hidrofobni sloj', desc: 'Manje prljanja i lakše održavanje.' },
                { src: 'https://source.unsplash.com/1200x800/?car,paint&sig=34', title: 'Dubok sjaj', desc: 'Vizuelno intenzivniji finiš.' },
                { src: 'https://source.unsplash.com/1200x800/?car,detailing&sig=36', title: 'Profesionalna aplikacija', desc: 'Precizan nanos i kontrola.' }
            ]
        },
        eksterijer: {
            title: 'Eksterijer',
            images: [
                { src: 'https://source.unsplash.com/1200x800/?car,exterior&sig=37', title: 'Spoljni detailing', desc: 'Pranje, zaštita i završnica.' },
                { src: 'https://source.unsplash.com/1200x800/?car,body&sig=38', title: 'Čist bodywork', desc: 'Gladka i sjajna površina.' },
                { src: 'https://source.unsplash.com/1200x800/?auto,exterior&sig=39', title: 'Detalji spolja', desc: 'Felne, gume i spoljne površine.' },
                { src: 'https://source.unsplash.com/1200x800/?car,clean&sig=41', title: 'Svež izgled', desc: 'Auto izgleda kao nov.' }
            ]
        }
    };

    function openGallery(categoryKey) {
        if (!galleryModal || !galleryModalGrid || !galleryModalTitle) return;
        const data = galleryData[categoryKey];
        if (!data) return;

        galleryModalTitle.textContent = data.title;
        currentImages = data.images;
        currentImageIndex = 0;
        galleryModalGrid.innerHTML = data.images.map((img, idx) => (
            `<div class="gallery-modal-item">
                <img src="${img.src}" alt="${data.title} ${idx + 1}" data-full="${img.src}" data-index="${idx}">
                <div>
                    <h4>${img.title}</h4>
                    <p>${img.desc}</p>
                </div>
            </div>`
        )).join('');

        galleryModal.classList.add('open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        if (!galleryModal) return;
        galleryModal.classList.remove('open');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openImageViewer(src, index) {
        if (!imageViewer || !imageViewerImg) return;
        imageViewerImg.src = src;
        if (typeof index === 'number') {
            currentImageIndex = index;
        }
        imageViewer.classList.add('open');
        imageViewer.setAttribute('aria-hidden', 'false');
    }

    function closeImageViewer() {
        if (!imageViewer) return;
        imageViewer.classList.remove('open');
        imageViewer.setAttribute('aria-hidden', 'true');
        if (imageViewerImg) {
            imageViewerImg.src = '';
        }
    }

    function showImageAt(index) {
        if (!currentImages.length) return;
        currentImageIndex = (index + currentImages.length) % currentImages.length;
        const img = currentImages[currentImageIndex];
        if (imageViewerImg) {
            imageViewerImg.src = img.src;
        }
    }

    if (galleryTriggers.length) {
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                galleryTriggers.forEach(t => t.classList.remove('active'));
                trigger.classList.add('active');
                const key = trigger.getAttribute('data-gallery');
                openGallery(key);
            });
        });
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            const image = e.target.closest('.gallery-modal-item img');
            if (image && image.dataset.full) {
                const idx = Number(image.dataset.index || 0);
                openImageViewer(image.dataset.full, idx);
                return;
            }
            if (e.target.matches('[data-modal-close]')) {
                galleryTriggers.forEach(t => t.classList.remove('active'));
                closeGallery();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.classList.contains('open')) {
                galleryTriggers.forEach(t => t.classList.remove('active'));
                closeGallery();
            }
        });
    }

    if (imageViewer) {
        imageViewer.addEventListener('click', (e) => {
            if (e.target.matches('[data-image-prev]')) {
                showImageAt(currentImageIndex - 1);
                return;
            }
            if (e.target.matches('[data-image-next]')) {
                showImageAt(currentImageIndex + 1);
                return;
            }
            if (e.target.matches('[data-image-close]')) {
                closeImageViewer();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageViewer.classList.contains('open')) {
                closeImageViewer();
            }
            if (imageViewer.classList.contains('open') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                if (e.key === 'ArrowLeft') {
                    showImageAt(currentImageIndex - 1);
                } else {
                    showImageAt(currentImageIndex + 1);
                }
            }
        });
    }

    // ===== Stats Counter Animation =====
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        let started = false; // Flag to ensure animation runs only once

        const startCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.innerText.includes('%') ? '%' : (counter.innerText.includes('+') ? '+' : '');

                // Reset to 0 before starting
                counter.innerText = '0' + suffix;

                const updateCounter = () => {
                    // Remove non-numeric chars for calculation
                    const current = +counter.innerText.replace(/\D/g, '');

                    // Determine increment step (adjust divisor for speed)
                    const increment = target / 50;

                    if (current < target) {
                        counter.innerText = `${Math.ceil(current + increment)}${suffix}`;
                        setTimeout(updateCounter, 30); // Adjust timeout for speed
                    } else {
                        counter.innerText = `${target}${suffix}`;
                    }
                };

                updateCounter();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                startCounters();
                started = true;
            }
        }, { threshold: 0.5 }); // Start when 50% of the section is visible

        observer.observe(statsSection);
    }

    // ===== Language Switcher =====
    // ===== Language Switcher (Dropdown) =====
    const langItems = document.querySelectorAll('.lang-item');
    const currentLang = localStorage.getItem('bgdcars_lang') || 'sr';
    const langBtnSpan = document.querySelector('.lang-btn span');

    // Function to update content based on selected language
    function updateLanguage(lang) {
        // Save preference
        localStorage.setItem('bgdcars_lang', lang);

        // Update active class in dropdown
        langItems.forEach(item => {
            if (item.getAttribute('data-lang-select') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Main Button Flag
        const langBtnImg = document.querySelector('.lang-btn .lang-flag');
        if (langBtnImg) {
            langBtnImg.src = lang === 'sr' ? 'https://flagcdn.com/w40/rs.png' : 'https://flagcdn.com/w40/gb.png';
            langBtnImg.alt = lang === 'sr' ? 'SR' : 'EN';
        }

        // Update text content
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
    }

    // Initialize logic
    if (typeof translations !== 'undefined') {
        updateLanguage(currentLang);

        // Dropdown Item Click
        langItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = item.getAttribute('data-lang-select');
                updateLanguage(selectedLang);
            });
        });

        // Mobile Dropdown Toggle
        const langDropdown = document.querySelector('.lang-dropdown');
        const langBtn = document.querySelector('.lang-btn');
        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    langDropdown.classList.toggle('active');
                }
            });
        }
    }
});
