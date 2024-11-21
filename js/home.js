gsap.registerPlugin(ScrollTrigger);

gsap.to(".clock-hand", {
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top", 
    end: "bottom top",
    scrub: true, // Smooth scroll-based animation
  },
  rotate: 180, // Rotate up to 180 degrees as you scroll
});

gsap.to(".hidden-section", {
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top+=300", // Reveal when the clock hand reaches 90 degrees
    end: "bottom top",
    scrub: true,
  },
  opacity: 1,
  pointerEvents: "auto", // Allow interactions once visible
});
// window.addEventListener('scroll', () => {
//   const scrollPosition = window.scrollY;
//   const cutSection = document.querySelector('.cut-section');
//   const image = document.querySelector('.scroll-image img');

//   // Rotate based on scroll position
//   const rotationAngle = scrollPosition * 0.1; // Adjust speed
//   const rotateCutAngle = Math.min(rotationAngle, 360); // Limit rotation to 45 degrees

//   cutSection.style.transform = `rotate(${rotateCutAngle}deg)`;
  
//   // Optional: Apply slight transformation to the image for added effect
//   // image.style.transform = `scale(1.05) rotate(-${rotateCutAngle / 3}deg)`; 
// });

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const clipBox = document.querySelector('.scroll-image img');

  // Calculate rotation based on scroll (map to 0-360 degrees)
  const rotation = scrollPosition % 360;

  // Dynamically create a new clip-path polygon
  const angle = rotation * (Math.PI / 180); // Convert degrees to radians
  const x1 = 50 + 50 * Math.cos(angle); // Calculate X1
  const y1 = 50 - 50 * Math.sin(angle); // Calculate Y1
  const x2 = 50 + 50 * Math.cos(angle + Math.PI / 2); // Calculate X2
  const y2 = 50 - 50 * Math.sin(angle + Math.PI / 2); // Calculate Y2

  // Apply new clip-path
  clipBox.style.clipPath = `polygon(${x1}% ${y1}%, 50% 50%, 50% 50%, ${x2}% ${y2}%)`;
});