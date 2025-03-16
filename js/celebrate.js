document.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5; // volume
  bgMusic.play().catch(error => console.error("Autoplay failed:", error));
}, { once: true }); // Ensures it only triggers once

const jsConfetti = new JSConfetti();

jsConfetti.addConfetti();
const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);