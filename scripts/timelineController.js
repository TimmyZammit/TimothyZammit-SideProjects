window.onload = function() {
    const timelineImages = document.querySelectorAll('.timeline-cutout');
    const markers = document.querySelectorAll('.marker');
    const bgContainer = document.getElementById('background-container');
    const start = document.getElementById('start');
    const backgroundLeft = bgContainer.querySelector('.background-left');
    const backgroundRight = bgContainer.querySelector('.background-right');
    const timelineCutoutContainer = document.querySelector('.timeline-cutout-container');
    const header = document.getElementById('header-timeline-container');

    let initialHorizontalShift = 0;
    let startOffset = start.offsetWidth*0.39;

    function setInitialPosition() {
        console.log("reset")
        const timelineContainerWidth = timelineCutoutContainer.offsetWidth;
        const windowWidth = window.innerWidth;
        startOffset = start.offsetWidth*0.39;

        // Ensure bgContainer is at least double the width of the timelineCutoutContainer
        bgContainer.style.width = `${2 * timelineContainerWidth}px`;
        backgroundLeft.style.width = `${timelineContainerWidth}px`;
        backgroundRight.style.width = `${timelineContainerWidth}px`;

        const firstImageRight = timelineImages[0].getBoundingClientRect().right;
        const initialShift = firstImageRight - backgroundLeft.getBoundingClientRect().right;
        initialHorizontalShift = initialShift;
        bgContainer.style.transform = `translateX(${initialShift - startOffset}px)`;
    }

    function calculateHorizontalShift() {
        let currentScroll = window.scrollY + header.offsetHeight;
        let horizontalShift = -startOffset;

        markers.forEach((marker, index) => {
            if (index < markers.length - 1) {
                const nextMarker = markers[index + 1];
                const currentMarkerTop = marker.offsetTop;
                const nextMarkerTop = nextMarker.offsetTop;
                let verticalDistance = nextMarkerTop - currentMarkerTop;
                let nextImageRight=0;

                if (index < timelineImages.length - 1) {
                    const currentImage = timelineImages[index];
                    const nextImage = timelineImages[index + 1];
                    const currentImageRight = currentImage.getBoundingClientRect().right;

                    if(index==timelineImages.length-2){
                        nextImageRight = nextImage.getBoundingClientRect().right+startOffset;

                        // const markerEndDist = getPositionOfPageEnd()-nextMarkerTop;
                        // console.log(nextMarkerTop);
                        // console.log("Position of the end of the page:", getPositionOfPageEnd(), "px from the top");
                        // console.log(markerEndDist);

                        // if(markerEndDist<-156){
                        //     console.log("run");
                        //     verticalDistance= getPositionOfPageEnd()-getDocumentHeight()*0.56;
                        // }

                    }
                    else{
                        nextImageRight = nextImage.getBoundingClientRect().right;
                    }

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

        bgContainer.style.transform = `translateX(${initialHorizontalShift + horizontalShift}px)`;
    }

    // Set initial position and adjust on resize
    setInitialPosition();

    window.addEventListener('resize', () => {
        if (document.readyState === 'complete') {
            console.log("complete"+document.readyState)
            window.location.reload();
            setInitialPosition();
        } else {
            console.log("not complete"+document.readyState)
            window.onload = setInitialPosition;
        }
    });

    // This function returns the total height of the document
    function getDocumentHeight() {
        const body = document.body;
        const html = document.documentElement;

        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    }

    // This function calculates the position of the end of the page from the top
    function getPositionOfPageEnd() {
        return getDocumentHeight() - window.innerHeight;
    }

    // Attach scroll event listener
    window.addEventListener('scroll', calculateHorizontalShift);
};
