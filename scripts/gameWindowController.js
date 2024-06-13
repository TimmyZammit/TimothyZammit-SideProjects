document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    iframe.onload = function() {
        // Get references to both the body and the canvas inside the iframe
        const gameBody = iframe.contentDocument.body; 
        const unityCanvas = iframe.contentDocument.querySelector('canvas'); // Access the canvas

        adjustGameBodyAndCanvas(gameBody, unityCanvas, iframe);
    };

    function adjustGameBodyAndCanvas(body, canvas, iframe) {
        // Attach resize handler and perform initial resize
        const container = document.querySelector('.game-container');
        window.addEventListener('resize', () => resizeElements(body, canvas, iframe, container));
        resizeElements(body, canvas, iframe, container);
    }

    function resizeElements(body, canvas, iframe, container) {
        const aspectRatio = 1920 / 1080;  // Maintain this aspect ratio
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        let newWidth, newHeight;

        // Calculate the maximum size while maintaining the aspect ratio
        if (containerWidth / containerHeight > aspectRatio) {
            // The container is too wide
            newHeight = containerHeight; // Use full container height
            newWidth = newHeight * aspectRatio; // Calculate width based on the aspect ratio
        } else {
            // The container is too tall
            newWidth = containerWidth; // Use full container width
            newHeight = newWidth / aspectRatio; // Calculate height based on the aspect ratio
        }

        // Make sure the calculated dimensions do not exceed the container's dimensions
        newWidth = Math.min(newWidth, containerWidth);
        newHeight = Math.min(newHeight, containerHeight);

        // Apply new dimensions to the body of the game, the iframe, and the canvas
        body.style.width = `${newWidth}px`;
        body.style.height = `${newHeight}px`;
        canvas.style.width = `${newWidth}px`;  // Apply width to canvas
        canvas.style.height = `${newHeight}px`;  // Apply height to canvas
        iframe.style.width = `${newWidth}px`;
        iframe.style.height = `${newHeight}px`;

        console.log("Dimensions set - Width: " + newWidth + ", Height: " + newHeight);
    }
});
