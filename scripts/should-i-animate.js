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

// Clear localStorage and reload
function clearLastVisitTime() {
    localStorage.removeItem('lastVisitTime');
    console.log('Last visit time cleared');
}

// Add keyboard shortcut listener
document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.shiftKey && e.key === '.') {
        clearLastVisitTime();
    }
});

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', checkLastVisit);