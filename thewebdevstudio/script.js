// Initialize EmailJS with your public key (replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key)
emailjs.init('U9MM_M0esiPHQmqni');

// ========================================
// REVEAL ANIMATION TRIGGER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initRevealAnimations();
    initParticles();
    initNavToggle();
    initStickyHeader();
    initSmoothScrolling();
    initContactForm();
    
    // Trigger initial animations for elements already in view
    checkReveal();
});

// ========================================
// REVEAL ANIMATION LOGIC
// ========================================
function initRevealAnimations() {
    // Create an Intersection Observer to trigger animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to prevent retriggering
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-item, .reveal-hero-item, .reveal-canvas, .reveal-header, .text-content .tagline, .text-content h2, .text-content p, .contact-header .tagline, .contact-header h2').forEach(el => {
        revealObserver.observe(el);
    });
}

// Check for elements already in view on page load
function checkReveal() {
    document.querySelectorAll('.reveal, .reveal-item, .reveal-hero-item, .reveal-canvas, .reveal-header, .text-content .tagline, .text-content h2, .text-content p, .contact-header .tagline, .contact-header h2').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
            el.classList.add('animate-in');
        }
    });
}

// ========================================
// PARTICLE BACKGROUND
// ========================================
function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(30, 144, 255, ${Math.random() * 0.4 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connecting lines
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(30, 144, 255, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        drawLines();
        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
}

// ========================================
// NAVIGATION TOGGLE
// ========================================
function initNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            navToggle.innerHTML = navList.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close if the menu is actually active (for mobile view)
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// ========================================
// STICKY HEADER
// ========================================
function initStickyHeader() {
    const header = document.getElementById('site-header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all fields before submitting.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                return;
            }
            
            // Send email using EmailJS
            emailjs.send('service_msge6mk', 'template_hebx6in', {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'thewebdevstudio@gmail.com'  // This is for the template if needed; EmailJS sends to the configured email
            })
            .then(function(response) {
                formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`;
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Reset form
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success');
                }, 5000);
            }, function(error) {
                formMessage.textContent = 'There was an error sending your message. Please try again later.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('error');
                }, 5000);
            });
        });
    }
}