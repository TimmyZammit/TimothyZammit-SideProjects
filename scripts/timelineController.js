document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.querySelector('.timeline-cutout-container');
    const bgContainer = document.getElementById('background-container');

    // Function to align the background container based on the timeline container
    function alignBackgrounds() {
        const containerRect = timelineContainer.getBoundingClientRect();
        const offset = containerRect.left;  // Distance from the left of the viewport to the left of the timeline container
        const totalWidth = document.documentElement.clientWidth; // Width of the viewport

        bgContainer.style.left = `${offset}px`;  // Set left position of the background container
        bgContainer.style.width = `${totalWidth - offset}px`; // Set width so that it extends from the timeline container's left to the right edge of the viewport
    }

    // Adjust the alignment initially and on resize
    alignBackgrounds();
    window.addEventListener('resize', alignBackgrounds);

    // Function to adjust the horizontal position of the background container based on scroll progress
    document.addEventListener('scroll', function() {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = window.scrollY / maxScroll;
        // Convert the scroll percentage to a more usable value for transformation
        const translateX = (scrollPercentage - 0.5) * 200; // Move from -100% to +100% of the container's width

        // Apply the transformation to the background container
        bgContainer.style.transform = `translateX(${translateX}%)`;
    });
});
