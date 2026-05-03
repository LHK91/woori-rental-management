/**
 * Main JavaScript for Woori Rental Management
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        });
    });

    // --- 3. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close other open faqs
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current faq
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // --- 4. Number Counter Animation (Intersection Observer) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                // Get the text, remove non-numeric characters (like + or %) for parsing
                const originalText = counter.innerText;
                const target = +counter.getAttribute('data-target') || parseInt(originalText.replace(/\D/g, ''));
                const hasPlus = originalText.includes('+');
                const hasPercent = originalText.includes('%');
                
                // Store the target on first run
                if (!counter.getAttribute('data-target')) {
                    counter.setAttribute('data-target', target);
                    counter.innerText = '0';
                }
                
                const count = +parseInt(counter.innerText.replace(/\D/g, ''));
                const inc = target / speed;

                if (count < target) {
                    const nextVal = Math.ceil(count + inc);
                    counter.innerText = nextVal + (hasPlus ? '+' : (hasPercent ? '%' : ''));
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + (hasPlus ? '+' : (hasPercent ? '%' : ''));
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger counter animation when visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // --- 5. Form Submission (Mock) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            contactForm.reset();
        });
    }
});
