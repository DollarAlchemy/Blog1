// Get all links in the Table of Contents
const links = document.querySelectorAll('#table-of-contents a');

// Function to update the "active" class
function updateActiveLink(event) {
    // Remove the "active" class from all links
    links.forEach(link => link.classList.remove('active'));

    // Add the "active" class to the clicked link
    event.target.classList.add('active');
}

// Add click event listeners to each link
links.forEach(link => {
    link.addEventListener('click', updateActiveLink);
});
