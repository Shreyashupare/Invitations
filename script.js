// Wedding date: 08/05/2025 1:34:00 PM
const weddingDate = new Date('2025-12-05T12:25:00+05:30');

function updateCountdown() {
    const now = new Date();
    const timeRemaining = weddingDate - now;

    if (timeRemaining <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();

// Business Entities Toggle
const businessToggle = document.getElementById('businessToggle');
const businessEntities = document.getElementById('businessEntities');

businessToggle.addEventListener('click', () => {
    businessEntities.classList.toggle('show');
    businessToggle.classList.toggle('active');
    
    // Adjust height of footer to show/hide entities
    const footer = businessToggle.closest('.footer');
    if (businessEntities.classList.contains('show')) {
        footer.style.height = 'auto';
    } else {
        footer.style.height = 'auto';
    }
});

// Image fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.fade-in');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('loaded');
        }, 500 * index);
    });
});
