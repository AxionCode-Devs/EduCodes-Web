// =========================================================================
// Hamburger Menu Toggle — EduCodes
// =========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const loginContainer = document.getElementById('login-container');
    
    if (!hamburger) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = hamburger.classList.toggle('active');
        
        if (navLinks) {
            navLinks.classList.toggle('active', isActive);
        }
        if (loginContainer) {
            loginContainer.classList.toggle('active', isActive);
        }
    });
    
    // Close menu when clicking a navigation link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
    }
    
    // Close menu when clicking outside the navbar
    document.addEventListener('click', function(e) {
        if (hamburger.classList.contains('active')) {
            const navbar = document.querySelector('.navbar');
            if (navbar && !navbar.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Close menu on scroll (if scrolled more than 50px)
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) > 50 && hamburger.classList.contains('active')) {
            closeMenu();
            lastScroll = currentScroll;
        }
    });
    
    function closeMenu() {
        hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        if (loginContainer) loginContainer.classList.remove('active');
    }
});
