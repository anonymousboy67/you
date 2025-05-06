// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('section');
    const photoCards = document.querySelectorAll('.photo-card');
    const photoOverlay = document.getElementById('photo-overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeOverlay = document.getElementById('close-overlay');
    const memoryTitle = document.getElementById('memory-title');
    const wishBtn = document.getElementById('wish-btn');
    const messageContainer = document.getElementById('message-container');
    const closeMessage = document.getElementById('close-message');
    const musicToggle = document.getElementById('music-toggle');
    const fallingPetals = document.getElementById('falling-petals');
    const heartAnimation = document.getElementById('heart-animation');
    const countdownDisplay = document.getElementById('countdown-display');
    
    // Background music element
    let bgMusic = null;
    let isMusicPlaying = false;
    
    // Initialize music
    function initMusic() {
      bgMusic = document.createElement('audio');
      bgMusic.src = 'https://cdnjs.cloudflare.com/ajax/libs/SoundJS/1.0.2/soundjs.min.js'; // Replace with actual music URL when available
      bgMusic.loop = true;
      bgMusic.volume = 0.5;
      document.body.appendChild(bgMusic);
    }
    
    // Set graduation date (adjust as needed)
    const graduationDate = new Date('2025-08-31T00:00:00');
    
    // Update countdown
    function updateCountdown() {
      const now = new Date();
      const diff = graduationDate - now;
      
      if (diff <= 0) {
        countdownDisplay.textContent = "Congratulations on your graduation!";
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      countdownDisplay.textContent = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    }
    
    // Create hearts animation
    function createHearts() {
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.animationDelay = (Math.random() * 3) + 's';
        heart.style.position = 'absolute';
        heart.style.color = '#b30059';
        heart.style.opacity = '0';
        heart.style.animation = 'fadeInOut 3s infinite';
        heart.innerHTML = '❤️';
        heartAnimation.appendChild(heart);
      }
    }
    
    // Create falling petals
    function createFallingPetals() {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const petal = document.createElement('div');
          petal.className = 'petal';
          petal.style.left = Math.random() * 100 + '%';
          petal.style.animationDuration = (Math.random() * 10 + 5) + 's';
          petal.style.opacity = Math.random() * 0.5 + 0.3;
          petal.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
          fallingPetals.appendChild(petal);
          
          // Remove petal after animation ends
          setTimeout(() => {
            petal.remove();
          }, parseFloat(petal.style.animationDuration) * 1000);
        }, i * 300);
      }
    }
    
    // Toggle music function
    function toggleMusic() {
      if (!bgMusic) {
        initMusic();
      }
      
      if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
      } else {
        bgMusic.play().catch(e => {
          console.log('Audio playback was prevented by the browser. User interaction needed.');
        });
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Create music notes animation
        createMusicNotes();
      }
      
      isMusicPlaying = !isMusicPlaying;
    }
    
    // Create music notes animation
    function createMusicNotes() {
      if (!isMusicPlaying) return;
      
      const note = document.createElement('div');
      note.className = 'music-note';
      note.innerHTML = ['♪', '♫', '𝅘𝅥𝅮', '𝅘𝅥𝅯'][Math.floor(Math.random() * 4)];
      note.style.left = (musicToggle.getBoundingClientRect().left - 10 + Math.random() * 20) + 'px';
      note.style.top = (musicToggle.getBoundingClientRect().top - 10) + 'px';
      document.body.appendChild(note);
      
      // Remove note after animation
      setTimeout(() => {
        note.remove();
      }, 2000);
      
      // Continue creating notes while music is playing
      if (isMusicPlaying) {
        setTimeout(createMusicNotes, Math.random() * 1000 + 500);
      }
    }
    
    // Intersection Observer for sections animation
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all sections
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
    
    // Photo cards click event
    photoCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.getAttribute('data-title');
        
        overlayImg.src = imgSrc;
        memoryTitle.textContent = title;
        photoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close overlay event
    closeOverlay.addEventListener('click', () => {
      photoOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close overlay with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && photoOverlay.classList.contains('active')) {
        photoOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (e.key === 'Escape' && messageContainer.classList.contains('active')) {
        messageContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Wish button click event
    wishBtn.addEventListener('click', () => {
      messageContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
      fallingPetals.classList.add('active');
      createFallingPetals();
      
      // Continue falling petals while message is visible
      const petalInterval = setInterval(() => {
        if (messageContainer.classList.contains('active')) {
          createFallingPetals();
        } else {
          clearInterval(petalInterval);
        }
      }, 5000);
    });
    
    // Close message event
    closeMessage.addEventListener('click', () => {
      messageContainer.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        fallingPetals.classList.remove('active');
        fallingPetals.innerHTML = '';
      }, 1000);
    });
    
    // Music toggle click event
    musicToggle.addEventListener('click', toggleMusic);
    
    // Heart burst effect on click
    document.addEventListener('click', (e) => {
      if (e.target.closest('#message-container, #photo-overlay, .music-toggle, .wish-button')) return;
      
      const heart = document.createElement('div');
      heart.style.position = 'absolute';
      heart.style.left = e.pageX + 'px';
      heart.style.top = e.pageY + 'px';
      heart.style.fontSize = '2rem';
      heart.style.color = '#b30059';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '999';
      heart.innerHTML = '❤️';
      heart.style.animation = 'burst 1s forwards';
      heart.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
      heart.style.setProperty('--y', (Math.random() * -100 - 50) + 'px');
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 1000);
    });
    
    // Initialize
    createHearts();
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Preload images for better user experience
    function preloadImages() {
      photoCards.forEach(card => {
        const img = new Image();
        img.src = card.querySelector('img').src;
      });
    }
    
    preloadImages();
    
    // Add scroll animation for elements
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Parallax effect for header
      document.querySelector('header').style.backgroundPositionY = scrollPosition * 0.4 + 'px';
    });
    
    // Add page load complete animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Show falling petals briefly on load
      fallingPetals.classList.add('active');
      createFallingPetals();
      
      setTimeout(() => {
        fallingPetals.classList.remove('active');
      }, 5000);
    });
  });