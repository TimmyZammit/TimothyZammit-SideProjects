document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    // Function to initialize the hamburger menu
    function initializeHamburgerMenu() {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const fullscreenMenu = document.getElementById('fullscreen-menu');
        console.log("hamburger start");

        if (hamburgerMenu && fullscreenMenu) {
            hamburgerMenu.addEventListener('click', function() {
                console.log("hamburger run");
                this.classList.toggle('active');
                fullscreenMenu.classList.toggle('active');
            });
        } else {
            console.error("Element not found");
        }
    }

    // Load the header
    fetch('templates/widgets/header.html')
        .then(response => response.text())
        .then(html => {
            headerPlaceholder.innerHTML = html;
            // Initialize the hamburger menu after the header is loaded
            initializeHamburgerMenu();
        })
        .catch(err => console.error('Failed to load header: ', err));
});
