// Wish Fountain Functionality
document.addEventListener('DOMContentLoaded', function() {
    initWishFountain();
});

function initWishFountain() {
    const wishCoin = document.getElementById('wish-coin');
    const wishMessage = document.querySelector('.wish-message');
    const wishContinue = document.getElementById('wish-continue');
    
    if (!wishCoin || !wishMessage || !wishContinue) {
        console.error('Wish fountain elements not found');
        return;
    }
    
    // Reset state
    wishMessage.classList.add('hidden');
    wishMessage.classList.remove('visible');
    wishContinue.classList.remove('visible');
    
    // Add coin toss animation on click
    wishCoin.addEventListener('click', function() {
        if (!wishCoin.classList.contains('toss')) {
            wishCoin.classList.add('toss');
            
            // Play coin sound if available
            const coinSound = document.getElementById('coin-sound');
            if (coinSound) {
                coinSound.currentTime = 0;
                coinSound.play().catch(err => console.log('Sound play prevented:', err));
            }
            
            // Show message after coin animation
            setTimeout(function() {
                wishMessage.classList.remove('hidden');
                wishMessage.classList.add('visible');
                
                // Show continue button after message is shown
                setTimeout(function() {
                    wishContinue.classList.add('visible');
                }, 3000);
                
                // Create water splash effect in the fountain base
                createWaterSplash();
            }, 1500);
        }
    });
    
    // Continue to Gift section
    wishContinue.addEventListener('click', function() {
        console.log('Continuing to gift section');
        if (typeof window.showSection === 'function') {
            window.showSection('gift');
        } else {
            // Fallback if global showSection is not available
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById('gift').classList.add('active');
            
            // Dispatch custom event to notify that gift section is now active
            const event = new CustomEvent('sectionchange', {
                detail: { section: 'gift' }
            });
            document.dispatchEvent(event);
        }
    });
    
    // Creates a water splash effect
    function createWaterSplash() {
        const fountain = document.querySelector('.fountain');
        if (!fountain) return;
        
        const splash = document.createElement('div');
        splash.className = 'water-splash';
        
        // Add some randomness to the splash
        for (let i = 0; i < 8; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'splash-droplet';
            droplet.style.left = `${10 + i * 10}%`;
            splash.appendChild(droplet);
        }
        
        fountain.appendChild(splash);
        
        // Remove splash after animation completes
        setTimeout(function() {
            splash.remove();
        }, 2000);
    }
}

// Add water ripple effect on click
document.addEventListener('DOMContentLoaded', function() {
    const fountainContainer = document.querySelector('.fountain-container');
    
    if (fountainContainer) {
        fountainContainer.addEventListener('click', function(e) {
            // Don't add ripple if clicking directly on the coin
            if (e.target.closest('.coin')) return;
            
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple';
            
            // Position the ripple at click point
            const rect = fountainContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            fountainContainer.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(function() {
                ripple.remove();
            }, 2000);
        });
    }
});
