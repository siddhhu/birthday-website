// Define global initJourneyTimeline function
window.initJourneyTimeline = function() {
    console.log('Initializing journey timeline');
    
    const journeyItems = document.querySelectorAll('.journey-item');
    const prevButton = document.getElementById('journey-prev');
    const nextButton = document.getElementById('journey-next');
    const continueButton = document.getElementById('journey-continue');
    
    // Initialize with first journey item active
    let currentIndex = 0;
    
    // Only proceed if we have journey items
    if (journeyItems.length === 0) {
        console.error('No journey items found');
        return;
    }
    
    // Show first item initially
    showJourneyItem(0);
    
    // Previous button click
    if (prevButton) {
        // Remove any existing event listeners
        prevButton.replaceWith(prevButton.cloneNode(true));
        const newPrevButton = document.getElementById('journey-prev');
        
        newPrevButton.addEventListener('click', function() {
            console.log('Previous button clicked');
            if (currentIndex > 0) {
                currentIndex--;
                showJourneyItem(currentIndex);
            }
        });
    }
    
    // Next button click
    if (nextButton) {
        // Remove any existing event listeners
        nextButton.replaceWith(nextButton.cloneNode(true));
        const newNextButton = document.getElementById('journey-next');
        
        newNextButton.addEventListener('click', function() {
            console.log('Next button clicked');
            if (currentIndex < journeyItems.length - 1) {
                currentIndex++;
                showJourneyItem(currentIndex);
            }
        });
    }
    
    // Continue to quiz section
    if (continueButton) {
        // Remove any existing event listeners
        continueButton.replaceWith(continueButton.cloneNode(true));
        const newContinueButton = document.getElementById('journey-continue');
        
        newContinueButton.addEventListener('click', function() {
            console.log('Journey continue button clicked');
            // Access the global showSection function from script.js
            if (typeof window.showSection === 'function') {
                window.showSection('quiz');
            } else {
                console.log('Using fallback navigation to quiz');
                // Fallback: try to show the section directly
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                const quizSection = document.getElementById('quiz');
                if (quizSection) {
                    window.scrollTo(0, 0);
                    quizSection.classList.add('active');
                }
            }
        });
    }
    
    // Function to show journey item by index
    function showJourneyItem(index) {
        // Hide all items
        journeyItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show current item
        if (journeyItems[index]) {
            journeyItems[index].classList.add('active');
            
            // Update buttons state
            const prevButton = document.getElementById('journey-prev');
            const nextButton = document.getElementById('journey-next');
            const continueButton = document.getElementById('journey-continue');
            
            if (prevButton) {
                prevButton.disabled = index === 0;
                prevButton.style.opacity = index === 0 ? 0.5 : 1;
            }
            
            if (nextButton) {
                nextButton.disabled = index === journeyItems.length - 1;
                nextButton.style.opacity = index === journeyItems.length - 1 ? 0.5 : 1;
            }
            
            // Show continue button only on the last item
            if (continueButton) {
                continueButton.style.display = index === journeyItems.length - 1 ? 'block' : 'none';
            }
            
            // Add floating hearts when showing the last item
            if (index === journeyItems.length - 1) {
                addFloatingHeartsToJourney();
            }
        }
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only process if we're on the journey section
        if (!document.getElementById('our-journey').classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentIndex > 0) {
                currentIndex--;
                showJourneyItem(currentIndex);
            }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentIndex < journeyItems.length - 1) {
                currentIndex++;
                showJourneyItem(currentIndex);
            }
        }
    });
};

// Function to add floating hearts for the journey section
function addFloatingHeartsToJourney() {
    const journeyContainer = document.querySelector('.journey-container');
    if (!journeyContainer) return;
    
    // Remove existing hearts
    const existingHearts = journeyContainer.querySelectorAll('.floating-heart');
    existingHearts.forEach(heart => heart.remove());
    
    // Add new hearts
    const heartCount = 15;
    const heartColors = ['#ff3366', '#ff6b95', '#ff99cc', '#ff80ab'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        
        journeyContainer.appendChild(heart);
    }
}

// Add floating hearts animation CSS
document.addEventListener('DOMContentLoaded', function() {
    // Create style element
    const style = document.createElement('style');
    
    // Add floating heart animation
    const css = `
        .floating-heart {
            position: absolute;
            opacity: 0;
            animation: floatHeart 15s ease-in-out infinite;
            z-index: 1;
        }
        
        @keyframes floatHeart {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) translateX(20px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    // Append CSS to style element
    style.appendChild(document.createTextNode(css));
    
    // Append style to document head
    document.head.appendChild(style);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize journey timeline
    if (typeof initJourneyTimeline === 'function') {
        initJourneyTimeline();
    }
});
