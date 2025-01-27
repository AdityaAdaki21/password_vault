document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Error handling for empty fields
    if (!username || !password) {
        errorElement.textContent = 'Username and password cannot be empty';
        return;
    }

    // Check if the entered credentials match the stored credentials
    if (username === storedUsername && password === storedPassword) {
        // Set a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the main page
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Invalid username or password';
    }
});
