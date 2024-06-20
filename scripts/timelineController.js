document.addEventListener('DOMContentLoaded', function() {
    const timelineImages = document.querySelectorAll('.timeline-cutout');
    const markers = document.querySelectorAll('.text-right-widget, .text-left-widget');
    const bgContainer = document.getElementById('background-container');
    const backgroundLeft = bgContainer.querySelector('.background-left');
    const header = document.getElementById('header-timeline-container');

    let initialHorizontalShift = 0;  // Variable to store the initial horizontal shift

    function calculateHorizontalShift() {
        let currentScroll = window.scrollY + header.offsetHeight;
        let horizontalShift = 0;

        markers.forEach((marker, index) => {
            if (index < markers.length - 1) {
                const nextMarker = markers[index + 1];
                const currentMarkerTop = marker.offsetTop;
                const nextMarkerTop = nextMarker.offsetTop;
                const verticalDistance = nextMarkerTop - currentMarkerTop;

                if (index < timelineImages.length - 1) {
                    const currentImage = timelineImages[index];
                    const nextImage = timelineImages[index + 1];
                    const currentImageRight = currentImage.getBoundingClientRect().right;
                    const nextImageRight = nextImage.getBoundingClientRect().right;
                    const horizontalDistance = nextImageRight - currentImageRight;

                    if (currentScroll > currentMarkerTop && currentScroll <= nextMarkerTop) {
                        const progress = (currentScroll - currentMarkerTop) / verticalDistance;
                        horizontalShift += progress * horizontalDistance;
                    } else if (currentScroll > nextMarkerTop) {
                        horizontalShift += horizontalDistance;
                    }
                }
            }
        });

        // Adjust bgContainer position based on calculated horizontal shift
        // Combine initial shift with the dynamic horizontal shift calculated from scroll
        bgContainer.style.transform = `translateX(${initialHorizontalShift + horizontalShift}px)`;
    }

    function setInitialPosition() {
        const firstImageRight = timelineImages[0].getBoundingClientRect().right;
        const initialShift = firstImageRight - backgroundLeft.getBoundingClientRect().right;
        initialHorizontalShift = initialShift;  // Store the initial position shift
        bgContainer.style.transform = `translateX(${initialShift}px)`;
    }

    // Set the initial position when the page loads
    setInitialPosition();

    // Recalculate the initial position and adjust on resize
    window.addEventListener('resize', setInitialPosition);

    // Attach scroll event listener
    window.addEventListener('scroll', calculateHorizontalShift);
});
