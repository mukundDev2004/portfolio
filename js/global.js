// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Detect system default and set theme accordingly
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.body.setAttribute("data-theme", currentTheme);
} else if (prefersDarkScheme.matches) {
    document.body.setAttribute("data-theme", "dark");
}

// Toggle between light and dark themes
themeToggle.addEventListener("click", function () {
    let theme = document.body.getAttribute("data-theme");
    if (theme === "dark") {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});
// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

// Start the smooth scrolling animation
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Animate sections on scroll
const sections = document.querySelectorAll('section');

sections.forEach((section) => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 60%",
                scrub: true
            }
        }
    );
});
// Avatar interaction based on mouse movement
const avatar = document.getElementById('avatar');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate the movement based on mouse position
    avatar.style.transform = `translate(-50%, -50%) translate(${(x / window.innerWidth) * 10 - 5}px, ${(y / window.innerHeight) * 10 - 5}px)`;
});
