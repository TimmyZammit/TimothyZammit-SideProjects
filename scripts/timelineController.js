document.addEventListener("DOMContentLoaded", function() {
    // Wait for the header to be fully loaded if it's dynamically injected
    const headerLoadedInterval = setInterval(function() {
        const header = document.querySelector('.header');
        if (header && header.offsetHeight > 0) {
            clearInterval(headerLoadedInterval);
            initializeDynamicElements();
        }
    }, 100); // Check every 100ms if the header is loaded

    function initializeDynamicElements() {
        const sections = document.querySelectorAll('section');
        const circles = document.querySelectorAll('.circle');
        const lines = document.querySelectorAll('.line');

        // Function to manage active sections and timeline highlights
        function manageTimelineAndSections() {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            console.log(current); // Log the current active section

            circles.forEach((circle) => {
                circle.classList.remove('active');
                if (circle.getAttribute('data-link') === current) {
                    circle.classList.add('active');
                }
            });

            lines.forEach((line, index) => {
                if (index < sections.length - 1) { // Ensure we don't go out of bounds
                    const nextSection = sections[index + 1];
                    if (current === sections[index].getAttribute('id') || current === nextSection.getAttribute('id')) {
                        line.style.backgroundColor = 'blue';
                    } else {
                        line.style.backgroundColor = 'grey'; // Reset the line color if needed
                    }
                }
            });
        }

        // Add scroll event listener for managing timeline and sections
        window.addEventListener('scroll', manageTimelineAndSections);
    }
});
