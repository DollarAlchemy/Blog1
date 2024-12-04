// Get all table of contents links
const links = document.querySelectorAll('#table-of-contents a');

// Function to update the active class
function updateActiveLink(event) {
    // Remove active class from all links
    links.forEach(link => link.classList.remove('active'));

    // Add active class to the clicked link
    event.target.classList.add('active');
}

// Add click event listener to all links
links.forEach(link => {
    link.addEventListener('click', updateActiveLink);
});
