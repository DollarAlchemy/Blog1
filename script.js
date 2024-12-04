// Predefined topics in sequential order
const topics = [
    "topics/mastering-focus.html",
    "topics/breaking-free.html",
    "topics/overcoming-distractions.html",
    "topics/purposeful-life.html",
    "topics/fulfilled-life.html",
    "topics/embrace-exploration.html",
    "topics/life-as-game.html",
    "topics/redefining-work.html",
    "topics/four-hour-workday.html",
    "topics/mastering-mind.html",
    "topics/skill-stacks.html",
    "topics/value-creation.html",
    "topics/personal-projects.html",
];

// Default page for resetting the iframe
const defaultPage = "default.html";

// Variables to track history
let pageHistory = [];
let currentIndex = 0;

// Get DOM elements
const backButton = document.getElementById("back-btn");
const forwardButton = document.getElementById("forward-btn");
const clearButton = document.getElementById("clear-btn");
const iframe = document.getElementById("viewer");
const links = document.querySelectorAll("#table-of-contents a");

// Music Control Elements
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const audio = document.getElementById("background-audio");
const volumeSlider = document.getElementById("volume-slider");

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");

// Initialize music controls
audio.loop = true;
audio.volume = 0.25; // Default volume at 25%
audio.play();
volumeSlider.value = 25; // Default slider position at 25%

// Volume Slider Logic
volumeSlider.addEventListener("input", () => {
    const sliderValue = parseInt(volumeSlider.value, 10); // Get current slider value
    audio.volume = sliderValue / 25; // Scale slider value (0-25) to audio volume (0.0-1.0)
});

// Play Music
playButton.addEventListener("click", () => {
    audio.play();
    playButton.classList.add("active");
    pauseButton.classList.remove("active");
});

// Pause Music
pauseButton.addEventListener("click", () => {
    audio.pause();
    pauseButton.classList.add("active");
    playButton.classList.remove("active");
});

// Dark Mode Toggle Logic
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
        ? "🌙 Dark Mode"
        : "🌞 Light Mode";
});

// Active Link and History Management
function updateActiveLink(event) {
    const href = event.target.getAttribute("href");

    if (pageHistory[currentIndex] !== href) {
        pageHistory = pageHistory.slice(0, currentIndex + 1); // Clear forward history
        pageHistory.push(href);
        currentIndex = pageHistory.length - 1;
    }

    iframe.src = href;
    highlightActiveLink(href);
    updateButtonStates();
}

function highlightActiveLink(href) {
    links.forEach((link) => {
        if (link.getAttribute("href") === href) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Navigation Buttons
function updateButtonStates() {
    backButton.disabled = currentIndex <= 0;
    forwardButton.disabled = currentIndex >= pageHistory.length - 1 && currentIndex >= topics.length - 1;
    clearButton.disabled = pageHistory.length === 0;
}

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        updateActiveLink(event);
    });
});

backButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
        updateButtonStates();
    }
});

forwardButton.addEventListener("click", () => {
    if (currentIndex < pageHistory.length - 1) {
        currentIndex++;
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
    } else if (currentIndex < topics.length - 1) {
        currentIndex++;
        const newTopic = topics[currentIndex];
        iframe.src = newTopic;
        pageHistory.push(newTopic);
        highlightActiveLink(newTopic);
    }
    updateButtonStates();
});

clearButton.addEventListener("click", () => {
    iframe.src = defaultPage;
    pageHistory = [defaultPage];
    currentIndex = 0;
    links.forEach((link) => link.classList.remove("active"));
    updateButtonStates();
});

document.addEventListener("DOMContentLoaded", () => {
    iframe.src = defaultPage;
    pageHistory = [defaultPage];
    updateButtonStates();
});
