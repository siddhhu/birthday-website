document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const birthdayDate = new Date(2025, 7, 18); // Month is 0-indexed, so 7 is August
    const sections = document.querySelectorAll('.section');
    const preloader = document.querySelector('.preloader');
    const passwordProtection = document.getElementById('password-protection');
    const audioButton = document.getElementById('toggle-audio');
    const backgroundMusic = document.getElementById('background-music');
    let currentSection = 0;
    
    // Function to hide preloader after loading is complete
    function hidePreloader() {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Listen for section changes and initialize appropriate functionality
    document.addEventListener('sectionShown', function(event) {
        const sectionIndex = event.detail.sectionIndex;
        const sectionId = sections[sectionIndex].id;
        
        console.log('Section shown event:', sectionId);
        
        // Initialize quiz when quiz section is shown
        if (sectionId === 'quiz') {
            console.log('Initializing quiz from sectionShown event');
            initQuiz();
        }
        
        // Initialize memory game when memory game section is shown
        if (sectionId === 'memory-game') {
            console.log('Initializing memory game from sectionShown event');
            initMemoryGame();
        }
        
        // Initialize cake blowing functionality when cake section is shown
        if (sectionId === 'cake') {
            console.log('Initializing cake blowing from sectionShown event');
            initCakeBlowing();
        }
        
        // Initialize gift box when gift section is shown
        if (sectionId === 'gift') {
            console.log('Initializing gift box from sectionShown event');
            initGiftBox();
        }
    });
    
    // Preloader
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        // Check if birthday and handle password protection
        checkBirthdayAndPassword();
    }, 2000);
    
    // Password Protection and Birthday Check
    function checkBirthdayAndPassword() {
        const currentDate = new Date();
        
        // Check if it's the birthday
        if (currentDate.getDate() === birthdayDate.getDate() && 
            currentDate.getMonth() === birthdayDate.getMonth() && 
            currentDate.getFullYear() === birthdayDate.getFullYear()) {
            // It's the birthday! Skip password and show content
            passwordProtection.style.display = 'none';
            startCountdown();
        } else {
            // Not the birthday, show password protection
            passwordProtection.style.display = 'flex';
            startLockCountdown();
            
            // Password submission handling
            const passwordInput = document.getElementById('password-input');
            const passwordSubmit = document.getElementById('password-submit');
            const passwordError = document.getElementById('password-error');
            
            // Set a password - you can change this to anything you want
            const correctPassword = 'jaishreekrishna'; // New password as requested
            
            // Track wrong password attempts
            let passwordAttempts = 0;
            const maxAttempts = 3;
            
            passwordSubmit.addEventListener('click', checkPassword);
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkPassword();
                }
            });
            
            function checkPassword() {
                if (passwordInput.value === correctPassword) {
                    // Password is correct
                    passwordProtection.style.opacity = '0';
                    setTimeout(() => {
                        passwordProtection.style.display = 'none';
                        startCountdown();
                    }, 800);
                } else {
                    // Password is incorrect
                    passwordAttempts++;
                    
                    if (passwordAttempts >= maxAttempts) {
                        // Lock after 3 attempts
                        passwordError.innerHTML = 'आप अपने प्रयासों को लॉक कर चुके हैं! अब 18 अगस्त को आना!' + 
                            '<br>You have locked your attempts! Come back on August 18th!';
                        passwordError.style.display = 'block';
                        passwordInput.disabled = true;
                        passwordSubmit.disabled = true;
                    } else {
                        // Show error with remaining attempts
                        passwordError.innerHTML = 'गलत पासवर्ड! ' + (maxAttempts - passwordAttempts) + ' प्रयास बचे हैं' +
                            '<br>Incorrect password! ' + (maxAttempts - passwordAttempts) + ' attempts remaining';
                        passwordError.style.display = 'block';
                    }
                }
            }
        }
    }

    // Lock Countdown Timer
    function startLockCountdown() {
        const daysElement = document.getElementById('lock-days');
        const hoursElement = document.getElementById('lock-hours');
        const minutesElement = document.getElementById('lock-minutes');
        const secondsElement = document.getElementById('lock-seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Lock countdown elements not found');
            return;
        }
        
        const updateLockCountdown = () => {
            const currentTime = new Date();
            const timeDifference = birthdayDate - currentTime;
            
            if (timeDifference <= 0) {
                // It's the birthday or past it!
                passwordProtection.style.display = 'none';
                startCountdown();
                return;
            }
            
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        };
        
        // Update immediately
        updateLockCountdown();
        
        // Then update every second
        setInterval(updateLockCountdown, 1000);
    }
    
    // Main Countdown Timer
    function startCountdown() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Countdown elements not found');
            return;
        }
        
        const updateCountdown = () => {
            const currentTime = new Date();
            const timeDifference = birthdayDate - currentTime;
            
            if (timeDifference <= 0) {
                // It's the birthday!
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                
                // Automatically show landing message with confetti
                showLandingMessage();
                return;
            }
            
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        };
        
        // Update immediately
        updateCountdown();
        
        // Then update every second
        setInterval(updateCountdown, 1000);
    }
    
    // Landing message with confetti
    function showLandingMessage() {
        const countdownSection = document.querySelector('.countdown-section');
        const landingMessage = document.querySelector('.landing-message');
        
        if (!countdownSection || !landingMessage) {
            console.error('Landing message elements not found');
            return;
        }
        
        countdownSection.style.display = 'none';
        landingMessage.style.display = 'flex';
        
        // Start confetti
        startConfetti();
        
        // Play background music if available
        if (backgroundMusic && typeof backgroundMusic.play === 'function') {
            backgroundMusic.play().catch(err => {
                console.log('Auto-play prevented: ' + err);
            });
        }
        
        // Set audio button state
        if (audioButton) {
            audioButton.classList.add('playing');
        }
        
        // Automatically continue to the message section after a delay
        setTimeout(() => {
            showSection(1); // Show the message section
        }, 8000);
    }
    
    // Confetti
    function startConfetti() {
        const colors = ['#ff3366', '#ff6b88', '#ff9e80', '#ffac63', '#f48fb1', '#ffafbd'];
        const confettiCount = 200;
        const confettiContainer = document.getElementById('confetti-container');
        
        if (!confettiContainer) {
            console.error('Confetti container not found');
            return;
        }
        
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            confettiContainer.appendChild(confetti);
        }
    }
    
    // Navigation between sections
    // Make showSection available globally
    window.showSection = showSection;
    
    function showSection(index) {
        console.log('showSection called with:', index);
        // If index is a string (section id), convert it to the appropriate index
        if (typeof index === 'string') {
            const sectionId = index;
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].id === sectionId) {
                    index = i;
                    break;
                }
            }
        }
        
        // Remove active class from all sections first
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.classList.remove('active');
            }
        });
        
        // Then add active class to the target section after a small delay
        if (index >= 0 && index < sections.length) {
            setTimeout(() => {
                // Scroll to top of page for better experience
                window.scrollTo(0, 0);
                
                // Show the section
                sections[index].classList.add('active');
                
                // Update current section
                currentSection = index;
                
                // Handle section-specific initialization
                const sectionId = sections[index].id;
                console.log('Showing section:', index, sectionId);
                
                // Direct initialization for specific sections
                if (sectionId === 'quiz') {
                    console.log('Direct quiz initialization');
                    initQuiz();
                } else if (sectionId === 'memory-game') {
                    initMemoryGame();
                } else if (sectionId === 'our-journey') {
                    console.log('Direct our-journey initialization');
                    if (typeof initJourneyTimeline === 'function') {
                        initJourneyTimeline();
                    }
                }
                
                // Dispatch a custom event for section-specific initialization
                const event = new CustomEvent('sectionShown', { detail: { sectionIndex: index, sectionId: sectionId } });
                document.dispatchEvent(event);
            }, 100);
        }
    }
    
    // Landing continue button
    const landingContinueBtn = document.getElementById('continue-button');
    if (landingContinueBtn) {
        landingContinueBtn.addEventListener('click', function() {
            console.log('Landing continue button clicked');
            showSection('message'); // Show message section
        });
    } else {
        console.error('Landing continue button not found');
    }
    
    // Message continue button - using addEventListener for better compatibility
    const messageContinueBtn = document.getElementById('message-continue');
    if (messageContinueBtn) {
        messageContinueBtn.addEventListener('click', function() {
            console.log('Message continue button clicked');
            showSection('gallery'); // Go directly to gallery section
        });
    } else {
        console.error('Message continue button not found');
    }

    // Gallery continue button
    const galleryContinueBtn = document.getElementById('gallery-continue');
    if (galleryContinueBtn) {
        galleryContinueBtn.addEventListener('click', function() {
            console.log('Gallery continue button clicked');
            showSection('memory-game'); // Show memory game section
        });
    } else {
        console.error('Gallery continue button not found');
    }
    
    // Timeline continue button
    const timelineContinueBtn = document.getElementById('timeline-continue');
    if (timelineContinueBtn) {
        timelineContinueBtn.addEventListener('click', function() {
            console.log('Timeline continue button clicked');
            showSection('memory-game'); // Show memory game section
        });
    } else {
        console.error('Timeline continue button not found');
    }
    
    // Memory game continue button
    const memoryContinueBtn = document.getElementById('memory-continue');
    if (memoryContinueBtn) {
        memoryContinueBtn.addEventListener('click', function() {
            console.log('Memory continue button clicked');
            showSection('quiz'); // Move to quiz section after memory game
        });
    } else {
        console.error('Memory continue button not found');
    }

    // Videos continue button
    const videosContinueBtn = document.getElementById('videos-continue');
    if (videosContinueBtn) {
        videosContinueBtn.addEventListener('click', function() {
            console.log('Videos continue button clicked');
            showSection('our-journey'); // Show our journey section
        });
    } else {
        console.error('Videos continue button not found');
    }
    
    // Video continue button
    const videoContinueBtn = document.getElementById('video-continue');
    if (videoContinueBtn) {
        videoContinueBtn.addEventListener('click', function() {
            console.log('Video continue button clicked');
            showSection('quiz'); // Show quiz section
        });
    } else {
        console.error('Video continue button not found');
    }
    
    // Quiz continue button (shown after completing quiz)
    const quizContinueBtn = document.getElementById('quiz-continue');
    if (quizContinueBtn) {
        quizContinueBtn.addEventListener('click', function() {
            console.log('Quiz continue button clicked');
            showSection('cake'); // Show cake section
        });
    } else {
        console.error('Quiz continue button not found');
    }
    
    // Audio control
    if (audioButton) {
        audioButton.addEventListener('click', function() {
            if (backgroundMusic) {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(err => {
                        console.log('Play prevented: ' + err);
                    });
                    audioButton.classList.add('playing');
                } else {
                    backgroundMusic.pause();
                    audioButton.classList.remove('playing');
                }
            }
        });
    }
    
    // Initialize gallery with scratch effect
    initGallery();
    
    // Initialize quiz
    initQuiz();
    
    // Initialize memory game
    initMemoryGame();
    
    // Initialize gift box interaction
    initGiftBox();
    
    // Gallery with scratch-to-reveal effect
    function initGallery() {
        const scratchItems = document.querySelectorAll('.scratch-item');
        
        scratchItems.forEach(item => {
            const overlay = item.querySelector('.scratch-overlay');
            if (!overlay) return;
            
            let isScratching = false;
            let scratchPercentage = 0;
            const totalArea = overlay.offsetWidth * overlay.offsetHeight;
            const revealThreshold = 0.4; // 40% scratched to reveal
            
            overlay.addEventListener('mousedown', startScratching);
            overlay.addEventListener('touchstart', startScratching);
            
            overlay.addEventListener('mousemove', scratch);
            overlay.addEventListener('touchmove', scratch);
            
            window.addEventListener('mouseup', stopScratching);
            window.addEventListener('touchend', stopScratching);
            
            function startScratching(e) {
                isScratching = true;
                e.preventDefault();
            }
            
            function stopScratching() {
                isScratching = false;
                
                // If scratched enough, fully reveal
                if (scratchPercentage > revealThreshold) {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 500);
                }
            }
            
            function scratch(e) {
                if (!isScratching) return;
                
                const rect = overlay.getBoundingClientRect();
                const x = (e.clientX || e.touches[0].clientX) - rect.left;
                const y = (e.clientY || e.touches[0].clientY) - rect.top;
                
                const ctx = overlay.getContext('2d');
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();
                
                // Calculate approximate scratched percentage
                const imageData = ctx.getImageData(0, 0, overlay.width, overlay.height);
                let transparentPixels = 0;
                
                for (let i = 0; i < imageData.data.length; i += 4) {
                    if (imageData.data[i + 3] === 0) {
                        transparentPixels++;
                    }
                }
                
                scratchPercentage = transparentPixels / (imageData.data.length / 4);
                console.log(`Scratched: ${Math.round(scratchPercentage * 100)}%`);
                
                // If scratched enough, fully reveal
                if (scratchPercentage > revealThreshold) {
                    stopScratching();
                }
            }
            
            // Initialize canvas
            overlay.width = overlay.offsetWidth;
            overlay.height = overlay.offsetHeight;
            const ctx = overlay.getContext('2d');
            ctx.fillStyle = '#ff6b88';
            ctx.fillRect(0, 0, overlay.width, overlay.height);
        });
    }
    
    // Quiz functionality
    function initQuiz() {
        console.log('Initializing quiz');
        const quizContainer = document.querySelector('.quiz-container');
        const quizQuestions = document.querySelectorAll('.quiz-question');
        const quizResults = document.querySelector('.quiz-results');
        const quizScore = document.getElementById('quiz-score');
        const quizMessage = document.getElementById('quiz-message');
        const quizContinueBtn = document.getElementById('quiz-continue');
        
        if (!quizContainer || !quizQuestions.length) {
            console.error('Quiz elements not found');
            return;
        }
        
        console.log(`Found ${quizQuestions.length} quiz questions`);
        
        // Clear any previous listeners and reset state
        const newContainer = quizContainer.cloneNode(true);
        quizContainer.parentNode.replaceChild(newContainer, quizContainer);
        
        // Re-select elements after DOM replacement
        const updatedQuizQuestions = document.querySelectorAll('.quiz-question');
        const updatedQuizOptions = document.querySelectorAll('.quiz-option');
        
        // Variables to track quiz state
        let currentQuestion = 0;
        let score = 0;
        let answeredQuestions = 0;
        let totalQuestions = updatedQuizQuestions.length;
        
        // Initialize - show first question
        showQuestion(currentQuestion);
        
        // Add click event to all option buttons
        updatedQuizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const question = this.closest('.quiz-question');
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                console.log('Option clicked:', this.textContent, 'Correct:', isCorrect);
                
                // Disable all options in this question
                question.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.7';
                });
                
                // Highlight selected option
                this.style.opacity = '1';
                this.style.fontWeight = 'bold';
                this.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
                
                // Show appropriate feedback
                if (isCorrect) {
                    question.querySelector('.quiz-feedback.correct').style.display = 'block';
                    score++;
                } else {
                    question.querySelector('.quiz-feedback.incorrect').style.display = 'block';
                }
                
                answeredQuestions++;
                
                // Move to next question after delay
                setTimeout(() => {
                    if (currentQuestion < totalQuestions - 1) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    } else {
                        // All questions answered, show results
                        showResults();
                    }
                }, 1500);
            });
        });
        
        // Add event listener to continue button
        const updatedQuizContinueBtn = document.getElementById('quiz-continue');
        if (updatedQuizContinueBtn) {
            updatedQuizContinueBtn.addEventListener('click', function() {
                console.log('Quiz continue button clicked');
                showSection(7); // Show cake section
            });
        }
        
        function showQuestion(index) {
            console.log(`Showing question ${index + 1} of ${totalQuestions}`);
            // Hide all questions
            updatedQuizQuestions.forEach(q => q.style.display = 'none');
            
            // Show current question
            if (updatedQuizQuestions[index]) {
                updatedQuizQuestions[index].style.display = 'block';
            } else {
                console.error(`Question at index ${index} not found`);
            }
        }
        
        function showResults() {
            console.log(`Quiz completed. Score: ${score}/${totalQuestions}`);
            // Hide all questions
            updatedQuizQuestions.forEach(q => q.style.display = 'none');
            
            // Update score
            const updatedQuizScore = document.getElementById('quiz-score');
            const updatedQuizMessage = document.getElementById('quiz-message');
            const updatedQuizResults = document.querySelector('.quiz-results');
            
            if (updatedQuizScore) updatedQuizScore.textContent = score;
            
            // Show loving message regardless of score with Hindi text
            if (updatedQuizMessage) {
                updatedQuizMessage.innerHTML = `
                    <div class="quiz-message-english">No quiz can measure our love! We are made for each other, no matter what! ❤️</div>
                    <div class="quiz-message-hindi">कोई परीक्षा हमारे प्यार को नहीं माप सकती! हम एक दूसरे के लिए बने हैं, चाहे कुछ भी हो जाए! ❤️</div>
                `;
                updatedQuizMessage.style.fontSize = '1.2em';
                updatedQuizMessage.style.padding = '15px';
                updatedQuizMessage.style.backgroundColor = 'rgba(255, 192, 203, 0.2)';
                updatedQuizMessage.style.borderRadius = '10px';
                updatedQuizMessage.style.animation = 'quizMessageFade 2s ease-in-out';
            }
            
            // Show results and continue button
            if (updatedQuizResults) updatedQuizResults.style.display = 'block';
            if (updatedQuizContinueBtn) updatedQuizContinueBtn.style.display = 'block';
            
            // Always show confetti and loving message at the end of quiz
            startConfetti();
            
            // Show the final loving message with animations and Hindi text
            const finalMessage = document.createElement('div');
            finalMessage.className = 'final-quiz-message animated';
            finalMessage.innerHTML = `
                <h3 class="heart-pulse">❤️ For My Love ❤️</h3>
                <div class="message-content">
                    <p class="fade-in">No quiz can measure our love! We are made for each other, no matter what! ❤️</p>
                    <p class="hindi-text fade-in" style="font-size: 1.2em; margin: 15px 0;">कोई परीक्षा हमारे प्यार को नहीं माप सकती! हम एक दूसरे के लिए बने हैं, चाहे कुछ भी हो जाए! ❤️</p>
                    <p class="fade-in">Every moment with you is special, and I cherish every memory we've created together.</p>
                    <div class="floating-hearts">
                        <span>❤️</span><span>💕</span><span>💖</span><span>💗</span>
                    </div>
                    <p class="fade-in">Here's to many more beautiful moments together! 🥂</p>
                </div>
            `;
            
            // Style the final message
            finalMessage.style.textAlign = 'center';
            finalMessage.style.padding = '20px';
            finalMessage.style.marginTop = '30px';
            finalMessage.style.backgroundColor = 'rgba(255, 192, 203, 0.2)';
            finalMessage.style.borderRadius = '15px';
            finalMessage.style.border = '2px dashed #ff6b88';
            
            // Add animation styles
            const animationStyle = document.createElement('style');
            animationStyle.textContent = `
                @keyframes heartPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                
                @keyframes quizMessageFade {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes floatingHeart {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-40px) rotate(20deg); opacity: 0; }
                }
                
                .heart-pulse {
                    animation: heartPulse 1.5s infinite;
                    display: inline-block;
                }
                
                .fade-in {
                    animation: quizMessageFade 1s ease-out forwards;
                    opacity: 0;
                }
                
                .fade-in:nth-child(2) { animation-delay: 0.3s; }
                .fade-in:nth-child(3) { animation-delay: 0.6s; }
                .fade-in:nth-child(4) { animation-delay: 0.9s; }
                
                .floating-hearts {
                    height: 40px;
                    position: relative;
                    margin: 10px 0;
                }
                
                .floating-hearts span {
                    position: absolute;
                    font-size: 20px;
                    animation: floatingHeart 3s infinite;
                    opacity: 0;
                }
                
                .floating-hearts span:nth-child(1) {
                    left: 30%;
                    animation-delay: 0s;
                }
                
                .floating-hearts span:nth-child(2) {
                    left: 45%;
                    animation-delay: 0.6s;
                }
                
                .floating-hearts span:nth-child(3) {
                    left: 60%;
                    animation-delay: 1.2s;
                }
                
                .floating-hearts span:nth-child(4) {
                    left: 75%;
                    animation-delay: 1.8s;
                }
            `;
            document.head.appendChild(animationStyle);
            
            // Insert the message before the continue button
            if (updatedQuizResults) {
                updatedQuizResults.insertBefore(finalMessage, updatedQuizContinueBtn);
            }
        }
    }
    
    // Memory game functionality
    function initMemoryGame() {
        const memoryGameSection = document.getElementById('memory-game');
        const memoryCardsContainer = memoryGameSection.querySelector('.memory-cards');
        const memoryResult = document.getElementById('memory-result');
        const skipToVideosBtn = document.getElementById('skip-to-videos');
        
        if (!memoryGameSection || !memoryCardsContainer || !skipToVideosBtn) {
            console.error('Memory game elements not found');
            return;
        }
        
        // Add click event for skip/continue button
        skipToVideosBtn.addEventListener('click', function() {
            showSection('videos');
        });
        
        // Memory game card data - pairs of images
        const cards = [
            { id: 1, image: 'images/memory1.jpg' },
            { id: 1, image: 'images/memory1.jpg' },
            { id: 2, image: 'images/memory2.jpg' },
            { id: 2, image: 'images/memory2.jpg' },
            { id: 3, image: 'images/memory3.jpg' },
            { id: 3, image: 'images/memory3.jpg' },
            { id: 4, image: 'images/memory4.jpg' },
            { id: 4, image: 'images/memory4.jpg' },
            { id: 5, image: 'images/memory5.jpg' },
            { id: 5, image: 'images/memory5.jpg' },
            { id: 6, image: 'images/memory6.jpg' },
            { id: 6, image: 'images/memory6.jpg' }
        ];
        
        // Shuffle cards
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        
        // Memory game state
        let flippedCards = [];
        let matchedPairs = 0;
        
        // Create memory game board
        memoryCardsContainer.innerHTML = '';
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.cardId = card.id;
            cardElement.dataset.index = index;
            
            cardElement.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">❤️</div>
                    <div class="memory-card-back">
                        <img src="${card.image}" alt="Memory image" class="memory-card-img">
                    </div>
                </div>
            `;
            
            cardElement.addEventListener('click', flipCard);
            memoryCardsContainer.appendChild(cardElement);
        });
        
        function flipCard() {
            // Ignore if already flipped or matched
            if (this.classList.contains('flipped') || this.classList.contains('matched')) {
                return;
            }
            
            // Ignore if two cards already flipped
            if (flippedCards.length === 2) {
                return;
            }
            
            // Flip card
            this.classList.add('flipped');
            flippedCards.push(this);
            
            // Check for match if two cards flipped
            if (flippedCards.length === 2) {
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];
                
                if (card1.dataset.cardId === card2.dataset.cardId) {
                    // Match found
                    setTimeout(() => {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        flippedCards = [];
                        
                        matchedPairs++;
                        
                        // Check if all pairs found
                        if (matchedPairs === cards.length / 2) {
                            // Game complete
                            if (memoryResult) {
                                memoryResult.textContent = 'You found all the pairs! ��';
                                memoryResult.style.display = 'block';
                            }
                            
                            // Show memory continue button
                            if (memoryContinueBtn) {
                                memoryContinueBtn.style.display = 'block';
                            }
                            
                            // Show confetti
                            startConfetti();
                        }
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
    }
    
    // Gift box interaction
    function initGiftBox() {
        const giftBox = document.getElementById('gift-box');
        const giftMessage = document.getElementById('gift-message');
        const finalButton = document.getElementById('final-button');
        
        if (!giftBox || !giftMessage) {
            console.error('Gift box elements not found');
            return;
        }
        
        console.log('Gift box elements found and initialized');
        
        // Reset box state in case of previous interactions
        giftBox.classList.remove('open', 'opened');
        giftMessage.style.display = 'none';
        giftMessage.style.opacity = '0';
        finalButton.style.display = 'none';
        finalButton.style.opacity = '0';
        
        giftBox.addEventListener('click', function() {
            console.log('Gift box clicked');
            giftBox.classList.add('open', 'opened');
            
            // Show message with delay
            setTimeout(() => {
                giftMessage.style.display = 'block';
                
                // Use another timeout to ensure display:block takes effect before fading in
                setTimeout(() => {
                    giftMessage.style.opacity = '1';
                    
                    // Show continue button with animation
                    setTimeout(() => {
                        finalButton.style.display = 'block';
                        
                        setTimeout(() => {
                            finalButton.style.opacity = '1';
                            finalButton.style.transform = 'translateY(0)';
                        }, 100);
                    }, 1000);
                    
                    // Add floating hearts
                    addFloatingHearts();
                }, 50);
            }, 1000);
        });
        
        finalButton.addEventListener('click', function() {
            showSection('wishes'); // Navigate to wishes section
        });
    }
    
    // Add floating hearts
    function addFloatingHearts() {
        const container = document.querySelector('.gift-section .container');
        if (!container) return;
        
        const heartCount = 50;
        const heartSymbols = ['❤️', '💓', '💕', '💖', '💗', '💘', '💝'];
        
        // Add floating hearts styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .heart-float {
                position: absolute;
                color: #ff3366;
                animation: float-heart-random 5s linear infinite;
                top: -20px;
            }
            
            @keyframes float-heart-random {
                0% {
                    transform: translateY(0) rotate(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(500px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Create floating hearts
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(heart);
        }
    }
    
    // Cake candle blowing functionality
    function initCakeBlowing() {
        console.log('Initializing cake candle blowing');
        
        const candles = document.querySelectorAll('.flame');
        const cakeMessage = document.getElementById('cake-message');
        const manualBlowButton = document.getElementById('manual-blow');
        const letterEnvelope = document.getElementById('letter-envelope');
        const cakeContinueButton = document.getElementById('cake-continue');
        
        if (!candles.length || !cakeMessage || !manualBlowButton) {
            console.error('Cake elements not found');
            return;
        }
        
        // Reset state
        candles.forEach(flame => flame.style.display = 'block');
        cakeMessage.style.display = 'none';
        if (letterEnvelope) letterEnvelope.style.display = 'none';
        
        // Make blowing instruction visible
        const blowInstruction = document.querySelector('.blow-instruction');
        if (blowInstruction) blowInstruction.style.display = 'block';
        
        let candlesBlown = 0;
        let totalCandles = candles.length;
        
        // Microphone blowing detection
        try {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    console.log('Microphone access granted');
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const analyser = audioContext.createAnalyser();
                    const microphone = audioContext.createMediaStreamSource(stream);
                    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                    
                    analyser.smoothingTimeConstant = 0.8;
                    analyser.fftSize = 1024;
                    
                    microphone.connect(analyser);
                    analyser.connect(javascriptNode);
                    javascriptNode.connect(audioContext.destination);
                    
                    javascriptNode.onaudioprocess = function() {
                        const array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);
                        let values = 0;
                        
                        // Get average volume
                        for (let i = 0; i < array.length; i++) {
                            values += array[i];
                        }
                        
                        const average = values / array.length;
                        console.log('Mic volume:', average);
                        
                        // Detect blowing (high volume)
                        if (average > 50 && candlesBlown < totalCandles) {
                            blowOutCandle();
                        }
                    };
                })
                .catch(err => {
                    console.error('Error accessing microphone:', err);
                    blowInstruction.textContent = 'Click the button below to blow candles!';
                });
        } catch (e) {
            console.error('Microphone detection not supported:', e);
            blowInstruction.textContent = 'Click the button below to blow candles!';
        }
        
        // Manual blow button
        manualBlowButton.addEventListener('click', function() {
            // Blow out all candles at once
            const interval = setInterval(() => {
                if (candlesBlown < totalCandles) {
                    blowOutCandle();
                } else {
                    clearInterval(interval);
                }
            }, 200);
        });
        
        // Function to blow out a single candle
        function blowOutCandle() {
            if (candlesBlown < totalCandles) {
                const flame = candles[candlesBlown];
                flame.style.display = 'none';
                
                // Add small smoke effect
                const candle = flame.parentElement;
                const smoke = document.createElement('div');
                smoke.className = 'smoke';
                candle.appendChild(smoke);
                
                // Remove smoke after animation
                setTimeout(() => {
                    smoke.remove();
                }, 2000);
                
                candlesBlown++;
                
                // All candles blown
                if (candlesBlown >= totalCandles) {
                    setTimeout(showCelebration, 1000);
                }
            }
        }
        
        // Show celebration after all candles are blown
        function showCelebration() {
            // Hide blow instructions
            if (blowInstruction) blowInstruction.style.display = 'none';
            
            // Hide manual blow button
            manualBlowButton.style.display = 'none';
            
            // Show celebration message
            cakeMessage.style.display = 'block';
            
            // Add confetti celebration
            startConfetti();
            
            // Show letter after delay
            setTimeout(() => {
                if (letterEnvelope) letterEnvelope.style.display = 'block';
                
                // Add letter opening interaction
                if (letterEnvelope) {
                    letterEnvelope.addEventListener('click', function() {
                        letterEnvelope.classList.add('open');
                    });
                }
                
                // Show continue button
                cakeContinueButton.style.display = 'block';
            }, 2000);
        }
        
        // Continue to next section
        cakeContinueButton.addEventListener('click', function() {
            showSection('wishes'); // Show wishes section
        });
    }
});
