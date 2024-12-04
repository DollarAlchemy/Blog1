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
let currentIndex = -1;

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

// Initialize audio controls
audio.loop = true;

// Play Music
playButton.addEventListener("click", () => {
    audio.play();
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
});

// Pause Music
pauseButton.addEventListener("click", () => {
    audio.pause();
    pauseButton.classList.add("hidden");
    playButton.classList.remove("hidden");
});

// Update active link and manage history
function updateActiveLink(event) {
    const href = event.target.getAttribute("href");

    // Add to history if the link is new
    if (pageHistory[currentIndex] !== href) {
        pageHistory = pageHistory.slice(0, currentIndex + 1); // Clear forward history
        pageHistory.push(href);
        currentIndex++;
    }

    // Load the new page in the iframe
    iframe.src = href;

    // Highlight the active link
    highlightActiveLink(href);

    // Update button states
    updateButtonStates();
}

// Highlight active link in the table of contents
function highlightActiveLink(href) {
    links.forEach((link) => {
        if (link.getAttribute("href") === href) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Update navigation button states
function updateButtonStates() {
    backButton.disabled = currentIndex <= 0;
    forwardButton.disabled = currentIndex >= topics.length - 1;
    clearButton.disabled = currentIndex === -1 && pageHistory.length === 0;
}

// Add click listeners to links
links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        updateActiveLink(event);
    });
});

// Back Button Logic
backButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        iframe.src = pageHistory[currentIndex] || topics[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
        updateButtonStates();
    }
});

// Forward Button Logic
forwardButton.addEventListener("click", () => {
    if (currentIndex < topics.length - 1) {
        currentIndex++;
        iframe.src = topics[currentIndex];
        pageHistory.push(topics[currentIndex]);
        highlightActiveLink(topics[currentIndex]);
        updateButtonStates();
    }
});

// Clear Button Logic
clearButton.addEventListener("click", () => {
    iframe.src = defaultPage; // Reset the iframe to the default page
    pageHistory = [];
    currentIndex = -1;
    links.forEach((link) => link.classList.remove("active"));
    updateButtonStates();
});

// Load the default page when the index.html is loaded
document.addEventListener("DOMContentLoaded", () => {
    iframe.src = defaultPage;
    updateButtonStates();
});
