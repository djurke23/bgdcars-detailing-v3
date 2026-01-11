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
});
