document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport (more reliable version)
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Check if any part of the element is in the viewport
        return (
            rect.top <= windowHeight * 0.9 && // 90% from top of viewport
            rect.left <= windowWidth &&
            rect.bottom >= windowHeight * 0.1 && // 10% from top of viewport
            rect.right >= 0
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        const gallerySection = document.querySelector('.gallery-section');
        if (!gallerySection) return;
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        const isMobile = window.innerWidth <= 768;
        
        // Check if gallery section is in viewport
        if (isInViewport(gallerySection)) {
            gallerySection.classList.add('visible');
            
            // Add visible class to each item with delay
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, isMobile ? 100 * index : 0);
            });
            
            // Remove event listener after animation is triggered
            window.removeEventListener('scroll', handleScrollAnimations);
        }
    }

    // Add scroll event listener with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScrollAnimations, 50);
    }, { passive: true });
    
    // Initial check in case the section is already in view
    setTimeout(handleScrollAnimations, 500);
    
    // Check again after images load
    window.addEventListener('load', handleScrollAnimations);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleScrollAnimations, 250);
    });

    // Fallback: Make sure gallery is visible after 3 seconds
    setTimeout(function() {
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection && !gallerySection.classList.contains('visible')) {
            gallerySection.classList.add('visible');
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.classList.add('visible');
            });
        }
    }, 3000);
});
