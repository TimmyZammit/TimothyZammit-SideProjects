document.addEventListener("DOMContentLoaded", function() {

    const baseHref = location.hostname === '127.0.0.1' ? 'http://127.0.0.1:5500/' : 'https://timmyzammit.github.io/TimothyZammit-SideProjects/';
    document.querySelector('base').href = baseHref;

    // Check screen size and initialize accordingly
    if (window.innerWidth < 1019) {
        loadHamburgerMenuHeader();
    } else {
        loadStandardHeader();
    }

    window.addEventListener('resize', () => {
        if (document.readyState === 'complete') {
            window.location.reload();
        }
    });
});

function loadHamburgerMenuHeader() {
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
}

function loadStandardHeader() {
    fetch('templates/widgets/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-placeholder').innerHTML = html;
            initializeHeaderFunctions();  // Initialize functions after header is loaded
            initializeScrollBehavior();
        })
        .catch(err => console.error('Failed to load header: ', err));
}

function initializeHeaderFunctions() {
    const header = document.querySelector('.header');
    const underline = document.createElement('div');
    underline.style.position = 'absolute';
    underline.style.height = '5px';
    underline.style.backgroundColor = 'var(--black-blue)';
    underline.style.bottom = '0';
    underline.style.left = '0';
    underline.style.width = '0';
    underline.style.borderRadius = '5px';
    header.appendChild(underline);

    const links = document.querySelectorAll('.left-header > a, .right-head-flex > a');
    console.log(links);
    const currentPage = window.location.pathname;
    let activeLink = null;

    // Initialize underline under the current active link and set activeLink
    links.forEach(link => {
        if (currentPage.endsWith(link.getAttribute('href'))) {
            console.log("offset "+ link.offsetWidth);
            underline.style.width = `${link.offsetWidth}px`;
            console.log("width "+ link.offset);
            underline.style.left = `${link.offsetLeft}px`;
            activeLink = link;  // Store the active link
        }
        link.addEventListener('mouseenter', function() {
            underline.style.width = `${link.offsetWidth}px`;
            underline.style.left = `${link.offsetLeft}px`;
            underline.style.transition = 'left 0.3s ease, width 0.3s ease';
        });
    });

    // Reset underline to active link when leaving the header area
    header.addEventListener('mouseleave', function() {
        if (activeLink) {
            underline.style.width = `${activeLink.offsetWidth}px`;
            underline.style.left = `${activeLink.offsetLeft}px`;
            underline.style.transition = 'left 0.3s ease-out, width 0.3s ease-out';
        }
    });
}

function initializeScrollBehavior() {
    let lastScrollTop = 0; // Last scroll position
    const header = document.querySelector('.header'); // Get the header element
    const container = document.getElementById('header-timeline-container'); // Get the new container

    window.addEventListener("scroll", function() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        let headerHeight = header.offsetHeight; // Dynamically get the height of the header

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            container.style.top = `-${headerHeight-4}px`; // Move the entire container up
        } else {
            // Scrolling up
            container.style.top = "0"; // Reset container position
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
    });
}
