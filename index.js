document.addEventListener('DOMContentLoaded', function() {
    const authSection = document.getElementById('authSection');
    const generatorSection = document.getElementById('generatorSection');
    const logoutButton = document.getElementById('logoutButton');

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        authSection.style.display = 'none';
        generatorSection.style.display = 'block';
    } else {
        authSection.style.display = 'block';
        generatorSection.style.display = 'none';
    }

    // Handle logout button click
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
});
