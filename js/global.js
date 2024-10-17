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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Detect system color scheme preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (prefersDarkScheme) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️'; // Sun icon for light mode
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙'; // Moon icon for dark mode
    }

    // Allow user to toggle manually as well
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
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

// Change the avatar position based on mouse movement
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    avatar.style.transform = `translate(${mouseX / 20}px, ${mouseY / 20}px)`;
});

// Add a click event to the avatar
avatar.addEventListener('click', () => {
    alert('Hello! I am your guide through this portfolio.');
    // Add more complex interaction or dialogue here later
});
const dialogueBox = document.getElementById('avatar-dialogue');

// Click to show dialogue message
avatar.addEventListener('click', () => {
    dialogueBox.innerText = 'Hello! I will guide you through this portfolio.';
    dialogueBox.style.display = 'block';

    // Hide dialogue after 3 seconds
    setTimeout(() => {
        dialogueBox.style.display = 'none';
    }, 3000);
});
