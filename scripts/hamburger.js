document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const fullscreenMenu = document.getElementById('fullscreen-menu');

    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
    });
});
