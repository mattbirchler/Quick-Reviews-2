const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds

function checkLastVisit() {
    const lastVisit = localStorage.getItem('lastVisitTime');
    const currentTime = new Date().getTime();
    const titleSpans = document.querySelectorAll('#site_title span');

    if (!lastVisit || (currentTime - lastVisit) > THIRTY_MINUTES) {
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