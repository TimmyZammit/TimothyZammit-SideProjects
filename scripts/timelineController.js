window.onload = function() {
    const timelineImages = document.querySelectorAll('.timeline-cutout');
    const markers = document.querySelectorAll('.text-right-widget, .text-left-widget');
    const bgContainer = document.getElementById('background-container');
    const start = document.getElementById('start');
    const backgroundLeft = bgContainer.querySelector('.background-left');
    const backgroundRight = bgContainer.querySelector('.background-right');
    const timelineCutoutContainer = document.querySelector('.timeline-cutout-container');
    const header = document.getElementById('header-timeline-container');

    let initialHorizontalShift = 0;

    function setInitialPosition() {
        const timelineContainerWidth = timelineCutoutContainer.offsetWidth;
        const windowWidth = window.innerWidth;

        // Ensure bgContainer is at least double the width of the timelineCutoutContainer
        bgContainer.style.width = `${Math.max(windowWidth, 2 * timelineContainerWidth)}px`;
        backgroundLeft.style.width = `${timelineContainerWidth}px`;
        backgroundRight.style.width = `${timelineContainerWidth}px`;

        const firstImageRight = timelineImages[0].getBoundingClientRect().right;
        const initialShift = firstImageRight - backgroundLeft.getBoundingClientRect().right;
        initialHorizontalShift = initialShift;
        bgContainer.style.transform = `translateX(${initialShift - start.offsetWidth*0.4}px)`;
    }

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
                        horizontalShift += (progress * horizontalDistance);
                    } else if (currentScroll > nextMarkerTop) {
                        horizontalShift += horizontalDistance;
                    }
                }
            }
        });

        bgContainer.style.transform = `translateX(${initialHorizontalShift + horizontalShift - start.offsetWidth*0.4}px)`;
    }

    // Set initial position and adjust on resize
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);

    // Attach scroll event listener
    window.addEventListener('scroll', calculateHorizontalShift);
};