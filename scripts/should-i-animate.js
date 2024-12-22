function checkLastVisit() {
    const EIGHT_HOURS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const lastVisit = localStorage.getItem('lastVisitTime');
    const currentTime = new Date().getTime();
    const titleSpans = document.querySelectorAll('#site_title span');

    if (!lastVisit || (currentTime - lastVisit) > EIGHT_HOURS) {
        titleSpans.forEach(span => {
            span.classList.add('animate__jackInTheBox');
            span.style.opacity = '1.0';
        });
    } else {
        titleSpans.forEach(span => {
            span.style.opacity = '1.0';
        });
    }

    localStorage.setItem('lastVisitTime', currentTime);
    console.log('Last visit time:', new Date(currentTime));
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', checkLastVisit);