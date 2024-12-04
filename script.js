// Variables to track history
let pageHistory = [];
let currentIndex = -1;

// Get DOM elements
const backButton = document.getElementById('back-btn');
const forwardButton = document.getElementById('forward-btn');
const clearButton = document.getElementById('clear-btn');
const iframe = document.getElementById('viewer');
const links = document.querySelectorAll('#table-of-contents a');

// Update active link and history
function updateActiveLink(event) {
    // Update history
    const href = event.target.getAttribute('href');
    if (pageHistory[currentIndex] !== href) {
        pageHistory = pageHistory.slice(0, currentIndex + 1);
        pageHistory.push(href);
        currentIndex++;
    }

    // Remove active from all links
    links.forEach(link => link.classList.remove('active'));
    // Add active to the clicked link
    event.target.classList.add('active');
}

// Add click listeners to links
links.forEach(link => {
    link.addEventListener('click', event => {
        updateActiveLink(event);
    });
});

// Back Button Logic
backButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
    }
});

// Forward Button Logic
forwardButton.addEventListener('click', () => {
    if (currentIndex < pageHistory.length - 1) {
        currentIndex++;
        iframe.src = pageHistory[currentIndex];
        highlightActiveLink(pageHistory[currentIndex]);
    }
});

// Clear Button Logic
clearButton.addEventListener('click', () => {
    location.reload(); // Reload the entire page
});

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
