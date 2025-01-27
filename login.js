document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if the entered credentials match the stored credentials
    if (username === storedUsername && password === storedPassword) {
        // Set a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the main page
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});
