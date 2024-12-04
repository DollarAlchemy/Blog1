// Variables to track history
let pageHistory = [];
let currentIndex = -1;

// Get DOM elements
const backButton = document.getElementById('back-btn');
const forwardButton = document.getElementById('forward-btn');
const clearButton = document.getElementById('clear-btn');
const iframe = document.getElementById('viewer');
const links = document.querySelectorAll('#table-of-contents a');

// Update active link and manage history
function updateActiveLink(event) {
    const href = event.target.getAttribute('href');

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
    links.forEach(link => {
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update navigation button states (enable/disable)
function updateButtonStates() {
    // Disable Back button if no previous history
    backButton.disabled = currentIndex <= 0;

    // Disable Forward button if no forward history
    forwardButton.disabled = currentIndex >= pageHistory.length - 1;

    // Enable or disable Clear button based on history presence
    clearButton.disabled = pageHistory.length === 0;
}

// Add click listeners to links
links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior
        updateActiveLink(event);
    });
});

// Back Button Logic
backButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        const previousPage = pageHistory[currentIndex];
        iframe.src = previousPage;
        highlightActiveLink(previousPage);
        updateButtonStates();
    }
});

// Forward Button Logic
forwardButton.addEventListener('click', () => {
    if (currentIndex < pageHistory.length - 1) {
        currentIndex++;
        const nextPage = pageHistory[currentIndex];
        iframe.src = nextPage;
        highlightActiveLink(nextPage);
        updateButtonStates();
    }
});

// Clear Button Logic
clearButton.addEventListener('click', () => {
    iframe.src = ""; // Clear the iframe content
    pageHistory = []; // Reset the history
    currentIndex = -1; // Reset index
    links.forEach(link => link.classList.remove('active')); // Remove active class from all links
    updateButtonStates();
});

// Initialize button states on page load
updateButtonStates();
