const openingOverlay = document.getElementById('openingOverlay');
const envelopeButton = document.getElementById('envelopeButton');
const enterBtn = document.getElementById('enterBtn');
const musicDock = document.getElementById('musicDock');
const musicOpen = document.getElementById('musicOpen');
const bgMusic = document.getElementById('bgMusic');
const talkBtn = document.getElementById('talkBtn');
const toast = document.getElementById('toast');

let musicStarted = false;

// Reliable background music: add your own music.mp3 to this folder.
// The browser will allow playback after the user taps the envelope/button.
async function startMusic() {
  if (musicStarted) return;
  try {
    await bgMusic.play();
    musicStarted = true;
    musicDock.classList.add('playing');
    musicOpen.textContent = '❚❚';
    musicOpen.title = 'Pause music';
  } catch (err) {
    // No local music file or playback was blocked.
    musicStarted = false;
    musicDock.classList.remove('playing');
    musicOpen.textContent = '♫';
    musicOpen.title = 'Add music.mp3, then tap to play';
    toast.textContent = 'Add music.mp3 to the website folder, then tap ♫. ♡';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3600);
  }
}

function stopMusic() {
  bgMusic.pause();
  musicStarted = false;
  musicDock.classList.remove('playing');
  musicOpen.textContent = '♫';
  musicOpen.title = 'Play music';
}

function toggleMusic() {
  if (musicStarted) stopMusic();
  else startMusic();
}

function openLetterExperience() {
  if (envelopeButton.classList.contains('is-opening')) return;
  envelopeButton.classList.add('is-opening');

  // This is a real user tap, so it is the correct moment to start local audio.
  startMusic();

  setTimeout(() => {
    openingOverlay.classList.add('opened');
    document.body.classList.remove('opening-locked');
    setTimeout(() => {
      document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  }, 900);
}

envelopeButton.addEventListener('click', openLetterExperience);
enterBtn.addEventListener('click', () => {
  startMusic();
  document.getElementById('home').nextElementSibling.scrollIntoView({ behavior: 'smooth' });
});
musicOpen.addEventListener('click', toggleMusic);

talkBtn.addEventListener('click', () => {
  toast.textContent = 'Replace this button with her contact link or your message. ♡';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

window.addEventListener('load', () => {
  document.body.classList.add('opening-locked');
  document.querySelector('.hero-content').animate([
    { opacity: 0, transform: 'translateY(16px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 1100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
});
