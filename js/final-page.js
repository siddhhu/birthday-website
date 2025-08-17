document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the final page
    const finalSection = document.getElementById('final-section');
    if (!finalSection) return;

    // Create balloons container
    const balloonsContainer = document.createElement('div');
    balloonsContainer.className = 'balloons-container';
    document.body.appendChild(balloonsContainer);

    // Balloon colors and emojis
    const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd166', '#ff9a8b'];
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '💝', '💖', '💕'];

    // Create balloons
    function createBalloons() {
        const numBalloons = 15;
        
        for (let i = 0; i < numBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random position
            const posX = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 15;
            const size = 30 + Math.random() * 30;
            const emoji = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            
            // Style the balloon
            balloon.innerHTML = emoji;
            balloon.style.left = `${posX}%`;
            balloon.style.bottom = `-50px`;
            balloon.style.fontSize = `${size}px`;
            balloon.style.animation = `float-up ${duration}s ease-in-out ${delay}s infinite`;
            
            balloonsContainer.appendChild(balloon);
        }
    }

    // Add styles for balloons
    const style = document.createElement('style');
    style.textContent = `
        .balloons-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .balloon {
            position: absolute;
            width: 60px;
            height: 80px;
            text-align: center;
            line-height: 60px;
            will-change: transform;
            user-select: none;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
        
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Final section styles */
        #final-section {
            position: relative;
            z-index: 2;
        }
        
        .final-message {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
            animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .love-signal {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 0, 85, 0.9);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 18px;
            box-shadow: 0 5px 15px rgba(255, 0, 85, 0.3);
            z-index: 100;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.05); }
            100% { transform: translateX(-50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Create love signal
    const loveSignal = document.createElement('div');
    loveSignal.className = 'love-signal';
    loveSignal.textContent = '❤️ Made with love for you! ❤️';
    document.body.appendChild(loveSignal);
    
    // Initialize balloons
    createBalloons();
    
    // Add some floating hearts for extra effect
    const hearts = ['❤️', '💖', '💝', '💓', '💗', '💕'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-20px';
        heart.style.fontSize = (20 + Math.random() * 20) + 'px';
        heart.style.animation = `float-up ${5 + Math.random() * 10}s linear`;
        heart.style.opacity = '0';
        document.body.appendChild(heart);
        
        // Fade in
        setTimeout(() => {
            heart.style.opacity = '0.8';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 500);
});
