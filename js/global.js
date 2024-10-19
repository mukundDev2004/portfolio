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


// all about avatar voice

let isSpeaking = false;
let isQuietMode = false;

const quietModeToggle = document.getElementById('quiet-mode-toggle');
quietModeToggle.addEventListener('click', () => {
    isQuietMode = !isQuietMode;
    if (isQuietMode) {    window.speechSynthesis.cancel(); }
    quietModeToggle.innerText = isQuietMode ? '🔈x' : '🔊';
});

// Avatar interaction based on mouse movement
const avatar = document.getElementById('avatar');

// Change the avatar position based on mouse movement
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    avatar.style.transform = `translate(${mouseX / 20}px, ${mouseY / 20}px)`;
});


const dialogueBox = document.getElementById('avatar-dialogue');

// Get the list of voices available on the device
let voices = [];

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
}

// Ensure voices are loaded when available
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Enhanced speak function with the option to change voice
const speak = (text, rate = 1, voiceName = 'Google US English', pitch = 1) => {

    if (!isQuietMode && 'speechSynthesis' in window) {
        if (!isSpeaking) {
            isSpeaking = true;
            const message = new SpeechSynthesisUtterance(text);
            message.lang = 'en-US'; // Default to US English
            message.pitch = pitch;  // Adjust pitch (1 is normal, 2 is high-pitched)
            message.rate = rate;    // Adjust rate (1 is normal, >1 is faster, <1 is slower)
            // Filter and select the desired voice by name
            const selectedVoice = voices.find(voice => voice.name === voiceName);

            // If a matching voice is found, use it
            if (selectedVoice) {
                message.voice = selectedVoice;
            }
            
            // Display the dialogue box
            dialogueBox.innerText = text;
            dialogueBox.style.display = 'block';

            // Hide the dialogue when speech ends
            message.onend = () => {
                isSpeaking = false;
                dialogueBox.style.display = 'none';
            };

            // Speak the message
            console.log("speak");
            window.speechSynthesis.speak(message);
        }
    } else {
        // Show subtitle without speech in quiet mode
        dialogueBox.innerText = text;
        dialogueBox.style.display = 'block';
        setTimeout(() => {
            dialogueBox.style.display = 'none';
        }, 3000);
    }
};

// Example voice-over when clicking the avatar
avatar.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        avatar.addEventListener('touchstart', () => {
            const dialogue = 'Welcome! This is a new voice speaking!';
            speak(dialogue, 1.2, 'Google UK English Male', 1.2);  // Change to another voice for mobile
        });
    } else {
        avatar.addEventListener('click', () => {
            const dialogue = 'tum kon ho';
            speak(dialogue, 1.2, 'Google UK English Male', 1.3);  // Change to a different voice for desktop
        });
    }
});
window.addEventListener('beforeunload', () => {
    window.speechSynthesis.cancel();  // Stop any ongoing or queued speech
});