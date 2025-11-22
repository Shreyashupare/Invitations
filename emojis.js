// Array of appreciation messages
const appreciationMessages = [
    "Wishing you a lifetime of happiness and joy!",
    "May your love grow stronger with each passing day!",
    "Congratulations on your beautiful journey together!",
    "Wishing you a lifetime of love and laughter!",
    "May your marriage be blessed with peace and prosperity!",
    "Here's to a lifetime of happiness and love together!"
];

// Track if a message is currently showing
let isMessageShowing = false;

// Function to create confetti
function createConfetti(event) {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // Get the position of the clicked emoji
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Get emoji type from event (button text)
    let emojiType = event.target.textContent;

    for (let i = 0; i < 40; i++) {
        let confetti;
        if (emojiType === '❤️') {
            // Heart confetti
            confetti = document.createElement('span');
            confetti.className = 'confetti heart-confetti';
            confetti.innerHTML = '❤️';
        } else if (emojiType === '🌹') {
            // Rose confetti
            confetti = document.createElement('span');
            confetti.className = 'confetti rose-confetti';
            confetti.innerHTML = '🌹';
        } else if (emojiType === '🎉') {
            // Party confetti (emoji or colored)
            confetti = document.createElement('span');
            confetti.className = 'confetti party-confetti';
            confetti.innerHTML = Math.random() > 0.5 ? '🎉' : '✨';
        } else {
            // Default fallback
            confetti = document.createElement('div');
            confetti.className = 'confetti';
        }

        // Set initial position at the emoji
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';

        // Set random properties
        let size = Math.random() * 15 + 10;
        confetti.style.fontSize = size + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';

        // Remove background for emoji confetti (span), only set for default
        if (confetti.tagName === 'DIV') {
            // Set random color for fallback confetti
            const colors = ['#ff69b4', '#ffa07a', '#ffff00', '#008000', '#0000ff'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            confetti.style.background = 'none';
        }

        // Set random animation properties
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = (Math.random() * 0.8 + 2) + 's';

        // Set random direction (only to the left)
        const angle = Math.random() * 180 + 180; // Angles between 180 and 360 degrees
        const distance = Math.random() * 1500 + 800;

        // Calculate final position based on angle and distance
        const finalX = x + Math.cos(angle * Math.PI / 180) * distance;
        const finalY = y + Math.sin(angle * Math.PI / 180) * distance;

        // Set the final position in the animation
        confetti.style.setProperty('--final-x', finalX + 'px');
        confetti.style.setProperty('--final-y', finalY + 'px');

        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 3000);
}

// Function to show random appreciation message
function showAppreciationMessage() {
    // If a message is already showing, do nothing
    if (isMessageShowing) {
        return;
    }

    const message = document.createElement('div');
    message.className = 'popup-message';
    message.textContent = appreciationMessages[Math.floor(Math.random() * appreciationMessages.length)];
    document.body.appendChild(message);
    message.style.display = 'block';

    // Set message showing flag
    isMessageShowing = true;

    // Remove message after animation
    setTimeout(() => {
        message.remove();
        isMessageShowing = false;
    }, 2000);
}

// Function to handle emoji click
document.addEventListener('DOMContentLoaded', () => {
    const emojiContainer = document.querySelector('.emoji-container');
    if (!emojiContainer) {
        console.error('Emoji container not found');
        return;
    }
    
    // Create emoji buttons
    const emojis = ['❤️']; // , '🎉', '🌹'
    
    emojis.forEach(emoji => {
        const button = document.createElement('button');
        button.className = 'emoji-button';
        button.textContent = emoji;
        
        // Add click handler
        button.onclick = (event) => {
            // Prevent default behavior
            event.preventDefault();
            event.stopPropagation();
            
            // Create confetti
            createConfetti(event);
            
            // Show appreciation message
            showAppreciationMessage();
            
            // Return false to prevent any other event handling
            return false;
        };
        
        // Add touch handler for mobile
        button.ontouchstart = (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            // Create confetti
            createConfetti(event);
            
            // Show appreciation message
            showAppreciationMessage();
            
            // Return false to prevent any other event handling
            return false;
        };
        
        emojiContainer.appendChild(button);
    });
});
