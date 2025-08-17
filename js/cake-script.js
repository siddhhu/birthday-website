document.addEventListener('DOMContentLoaded', function() {
    // Virtual Cake Interaction
    const cakeContainer = document.getElementById('cake-container');
    const cakeMessage = document.getElementById('cake-message');
    const manualBlowButton = document.getElementById('manual-blow');
    const flames = document.querySelectorAll('.flame');
    const letterEnvelope = document.getElementById('letter-envelope');
    const cakeContinueButton = document.getElementById('cake-continue');
    
    // Audio context for blow detection
    let audioContext;
    let micStream;
    let analyzer;
    let canBlow = true;
    let candles = 5;
    
    // Initialize microphone for blow detection if supported
    function initMic() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(handleMicSuccess)
                .catch(handleMicError);
        } catch (e) {
            console.log('Web Audio API not supported');
            manualBlowButton.style.display = 'block';
        }
    }
    
    // Handle microphone stream
    function handleMicSuccess(stream) {
        micStream = stream;
        analyzer = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyzer);
        analyzer.fftSize = 256;
        
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Check sound level
        function checkLevel() {
            if (!canBlow) return;
            
            analyzer.getByteFrequencyData(dataArray);
            
            // Calculate average volume
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;
            
            // If volume exceeds threshold, blow out a candle
            if (average > 70) { // Adjust threshold as needed
                blowOutCandle();
            }
            
            requestAnimationFrame(checkLevel);
        }
        
        checkLevel();
    }
    
    // Handle microphone error
    function handleMicError(error) {
        console.log('Error accessing microphone:', error);
        manualBlowButton.style.display = 'block';
    }
    
    // Blow out a candle
    function blowOutCandle() {
        if (candles > 0) {
            flames[candles - 1].style.opacity = 0;
            candles--;
            
            if (candles === 0) {
                // All candles blown out
                setTimeout(() => {
                    cakeMessage.classList.add('active');
                    createBirthdayConfetti();
                }, 500);
                
                canBlow = false;
                
                // Stop microphone if it was started
                if (micStream) {
                    micStream.getTracks().forEach(track => track.stop());
                }
            }
        }
    }
    
    // Manual blow button (for devices without microphone or permission)
    manualBlowButton.addEventListener('click', function() {
        if (canBlow) {
            blowOutCandle();
        }
    });
    
    // Letter envelope click to open
    if (letterEnvelope) {
        letterEnvelope.addEventListener('click', function() {
            this.classList.toggle('opened');
        });
    }
    
    // Create confetti for birthday celebration
    function createBirthdayConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff6b8b', '#f9cdac', '#f5a9b8', '#f0d9e7', '#00d9ff', '#ffeb3b', '#4caf50'];
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 10 + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            
            // Random animation duration and delay
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s ease-in-out forwards`;
            confetti.style.animationDelay = Math.random() * 5 + 's';
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confettiContainer.remove();
        }, 10000);
    }
    
    // Initialize wish fountain
    const wishInput = document.getElementById('wish-input');
    const wishButton = document.getElementById('wish-button');
    const wishFountain = document.getElementById('wish-fountain');
    
    if (wishButton && wishInput && wishFountain) {
        wishButton.addEventListener('click', createWish);
        
        wishInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                createWish();
            }
        });
    }
    
    // Create a floating wish bubble
    function createWish() {
        if (!wishInput.value.trim()) return;
        
        const wish = document.createElement('div');
        wish.className = 'wish-bubble';
        wish.textContent = wishInput.value;
        
        // Random position
        const leftPos = Math.random() * 80 + 10; // 10% to 90% from left
        wish.style.left = leftPos + '%';
        
        // Random animation duration
        const animDuration = Math.random() * 5 + 8; // 8-13 seconds
        wish.style.animationDuration = animDuration + 's';
        
        wishFountain.appendChild(wish);
        wishInput.value = '';
        wishInput.focus();
        
        // Remove wish after animation ends
        setTimeout(() => {
            wish.remove();
        }, animDuration * 1000);
    }
    
    // Section navigation
    if (cakeContinueButton) {
        cakeContinueButton.addEventListener('click', function() {
            showSection('wishes-fountain');
        });
    }
    
    if (fountainContinueButton) {
        fountainContinueButton.addEventListener('click', function() {
            showSection('gift');
        });
    }
    
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    }
    
    // Initialize cake section when it becomes visible
    function initCakeSection() {
        if (document.getElementById('cake').classList.contains('active')) {
            initMic();
            // Add heart decorations
            addHeartDecorations();
        }
    }
    
    // Add floating heart decorations
    function addHeartDecorations() {
        const cakeSection = document.getElementById('cake');
        const hearts = ['❤️', '💕', '💖', '💘', '💓'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart-decoration';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.left = (Math.random() * 90 + 5) + '%';
            heart.style.top = (Math.random() * 90 + 5) + '%';
            heart.style.animationDelay = (Math.random() * 3) + 's';
            
            cakeSection.appendChild(heart);
        }
    }
    
    // Add event listener to quiz continue button to go to cake section
    const quizContinueBtn = document.getElementById('quiz-continue');
    if (quizContinueBtn) {
        quizContinueBtn.addEventListener('click', function() {
            document.getElementById('cake').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                showSection('cake');
                initCakeSection();
            }, 800);
        });
    }
    
    // Add event listener to cake continue button to go to wish fountain section
    if (cakeContinueButton) {
        cakeContinueButton.addEventListener('click', function() {
            console.log('Continuing to wish fountain section');
            if (typeof window.showSection === 'function') {
                window.showSection('wish-fountain');
            } else {
                // Fallback if global showSection is not available
                const sections = document.querySelectorAll('.section');
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById('wish-fountain').classList.add('active');
            }
        });
    }
    
    // Also trigger cake section init if user navigates directly
    document.addEventListener('sectionchange', function(e) {
        if (e.detail && e.detail.section === 'cake') {
            initCakeSection();
        }
    });
});
