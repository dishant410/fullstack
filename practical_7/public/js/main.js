// Client-side JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add a simple animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        setTimeout(() => {
            feature.style.transition = 'all 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Fetch visit logs when the page loads
    fetch('/logs')
        .then(response => response.json())
        .then(data => {
            console.log('Visit logs:', data);
        })
        .catch(error => {
            console.error('Error fetching logs:', error);
        });
}); 