const containerElement = document.querySelector(".container");
const envelopeContainerElement = document.querySelector(".envelope-container");
const letterElement = document.querySelector(".letter");
const lidElement = document.querySelector(".lid");
const quesElement = document.querySelector(".question");

const jsConfetti = new JSConfetti();

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true, // Ensures AOS runs only once
  });
  
  // Wait for AOS animation to complete, then remove AOS attributes
  setTimeout(() => {
    containerElement.removeAttribute("data-aos");
    containerElement.removeAttribute("data-aos-duration");
  }, 2100); // Remove after AOS finishes
});

document.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5; // volume
  bgMusic.play().catch(error => console.error("Autoplay failed:", error));
}, { once: true }); // Ensures it only triggers once

let isEnvelopeOpen = false;
let isDragging = false;
let offsetX, offsetY;

if(!isEnvelopeOpen) {
  envelopeContainerElement.classList.add('envelopeShaking');
}
// Open envelope on click
envelopeContainerElement.addEventListener("click", () => {
  if (!isEnvelopeOpen) {
    jsConfetti.addConfetti({
      emojis: ['❤️', '🌸', '💐', '✨'],
      emojiSize: 32,
      confettiNumber: 80,
    })

    envelopeContainerElement.classList.remove('envelopeShaking');
    envelopeContainerElement.classList.add("open");
    envelopeContainerElement.style.cursor = "default";

    lidElement.style.zIndex = 80;
    letterElement.style.zIndex = 85;

    setTimeout(() => {
      letterElement.style.transition = "transform 2s ease-in-out";
      letterElement.style.transform = "translateY(-90%)";
      isEnvelopeOpen = true;
      letterElement.style.transition = "";
    }, 1200);
    
    setTimeout(() => {
      containerElement.style.transition = "transform 1s ease-in-out";
      containerElement.style.transform = "translateY(-18%)";
      quesElement.style.opacity = 1;
      quesElement.style.transform = "translateY(-90%)";
    }, 3200);
  }
}, { once: true });

// Start dragging the letter
letterElement.addEventListener("mousedown", (event) => {
  if (isEnvelopeOpen) {
    isDragging = true;

    // Calculate offsets relative to the mouse position
    const rect = letterElement.getBoundingClientRect();
    const translateYOffset = rect.height * 0.9; // 60% of the letter's height
    offsetY = event.clientY - (rect.top + translateYOffset);
    offsetX = event.clientX - rect.left; // Horizontal offset

    // Prevent text selection during drag
    document.body.style.userSelect = "none";
  }
});

// Handle dragging movement
document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    // Calculate new position relative to the viewport
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;

    // Apply position using `fixed` positioning for smooth dragging
    letterElement.style.position = "fixed";
    letterElement.style.left = `${newX}px`;
    letterElement.style.top = `${newY}px`;
    letterElement.style.zIndex = 1000; // Ensure it stays on top
    letterElement.classList.add("dragging");
  }
});

// Stop dragging
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    letterElement.classList.remove("dragging");

    // Re-enable text selection after drag ends
    document.body.style.userSelect = "";
  }
});

// ans part 
let times = 1;
const YesBtnElement = document.querySelector('.yes-btn');
const NoBtnElement = document.querySelector('.no-btn');
const GroupBtnElement = document.querySelector('.btn-group');

NoBtnElement.addEventListener('click', () => {
  times++;
  GroupBtnElement.style.gap = `${16 + times*12}px`;
  YesBtnElement.style.transform = `scale(${1+ times/4})`;
  NoBtnElement.style.transform = `scale(${1- times/12})`;
  console.log(`${16 + times}px`)
});

YesBtnElement.addEventListener('click', () => {
  window.location.href = 'page/celebrate.html';
}, { once: true });