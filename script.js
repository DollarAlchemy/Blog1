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
let currentIndex = 0; // Initialize with the first topic by default

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

// Initialize music controls
audio.loop = true;
audio.volume = 0.25; // Default volume at 25%
audio.play(); // Start music by default
volumeSlider.value = 25; // Default slider position at 25%

// Update volume based on slider input (0% to 25% with 5% intervals)
volumeSlider.addEventListener("input", () => {
    const sliderValue = parseInt(volumeSlider.value, 10); // Get current slider value (0-25)
    audio.volume = sliderValue / 100; // Scale to match slider value
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

// Update active link and manage history
function updateActiveLink(event) {
    const href = event.target.getAttribute("href");

    // Add to history if the link is new
    if (pageHistory[currentIndex] !== href) {
        pageHistory = pageHistory.slice(0, currentIndex + 1); // Clear forward history
        pageHistory.push(href);
        currentIndex = pageHistory.length - 1;
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
    forwardButton.disabled =
        (currentIndex >= pageHistory.length - 1 && currentIndex >= topics.length - 1);
    clearButton.disabled = pageHistory.length === 0;
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
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
        updateButtonStates();
    }
});

// Forward Button Logic
forwardButton.addEventListener("click", () => {
    if (currentIndex < pageHistory.length - 1) {
        // Navigate within history
        currentIndex++;
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
    } else if (currentIndex < topics.length - 1) {
        // Navigate to next topic if not in history
        currentIndex++;
        const newTopic = topics[currentIndex];
        iframe.src = newTopic;
        pageHistory.push(newTopic); // Add to history
        highlightActiveLink(newTopic);
    }
    updateButtonStates();
});

// Clear Button Logic
clearButton.addEventListener("click", () => {
    iframe.src = defaultPage; // Reset the iframe to the default page
    pageHistory = [defaultPage];
    currentIndex = 0;
    links.forEach((link) => link.classList.remove("active"));
    updateButtonStates();
});

// Load the default page and initialize history when the page loads
document.addEventListener("DOMContentLoaded", () => {
    iframe.src = defaultPage;
    pageHistory = [default Page];
    currentIndex = 0;
    updateButtonStates();
});

