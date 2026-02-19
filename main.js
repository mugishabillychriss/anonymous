// Password Scrambler Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animate stats numbers on scroll
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const value = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
                
                if (!isNaN(value) && current < value) {
                    const increment = Math.ceil(value / 50);
                    const newValue = Math.min(current + increment, value);
                    stat.innerText = newValue + (stat.innerText.includes('+') ? '+' : '');
                }
            });
        };

        // Intersection Observer for stats
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const interval = setInterval(() => {
                            let allDone = true;
                            stats.forEach(stat => {
                                const value = parseInt(stat.getAttribute('data-target'));
                                const current = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
                                if (current < value) allDone = false;
                            });
                            
                            if (allDone) {
                                clearInterval(interval);
                            } else {
                                animateStats();
                            }
                        }, 30);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
            successMessage.style.cssText = `
                background: var(--success);
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                text-align: center;
            `;
            
            contactForm.appendChild(successMessage);
            
            // Clear form
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Copy email to clipboard
    const emailElement = document.querySelector('.copy-email');
    
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--success);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                `;
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    }

    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
    }

    // Download counter
    const downloadButtons = document.querySelectorAll('.download-btn-card, .download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track download in analytics (if you have GA)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'extension',
                    'event_label': this.getAttribute('data-browser') || 'chrome'
                });
            }
            
            // You could also update a download counter via API
            console.log('Download clicked:', this.getAttribute('data-browser'));
        });
    });

    // Browser detection for download page
    const downloadCards = document.querySelectorAll('.download-card');
    
    if (downloadCards.length > 0) {
        const userAgent = navigator.userAgent;
        let detectedBrowser = 'chrome'; // default
        
        if (userAgent.includes('Firefox')) {
            detectedBrowser = 'firefox';
        } else if (userAgent.includes('Edg/')) {
            detectedBrowser = 'edge';
        } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
            detectedBrowser = 'opera';
        }
        
        // Highlight recommended browser
        downloadCards.forEach(card => {
            const browser = card.getAttribute('data-browser');
            if (browser === detectedBrowser) {
                card.style.transform = 'scale(1.05)';
                card.style.border = '3px solid var(--accent)';
                
                // Add recommended badge
                const badge = document.createElement('span');
                badge.textContent = '✓ Recommended for you';
                badge.style.cssText = `
                    background: var(--success);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    margin-top: 10px;
                    display: inline-block;
                `;
                card.appendChild(badge);
            }
        });
    }
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Newsletter signup (if you add one)
function signupNewsletter(email) {
    // Here you would integrate with your email service provider
    console.log('Newsletter signup:', email);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

// Share functionality
function shareExtension(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Password Scrambler - Defeat Keyloggers');
    
    let shareUrl;
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Rate extension
function rateExtension(platform) {
    const urls = {
        chrome: 'https://chrome.google.com/webstore/detail/your-extension-id',
        firefox: 'https://addons.mozilla.org/firefox/addon/your-extension/',
        edge: 'https://microsoftedge.microsoft.com/addons/detail/your-extension-id'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Export for use in HTML
window.passwordScrambler = {
    share: shareExtension,
    rate: rateExtension,
    signup: signupNewsletter
};
