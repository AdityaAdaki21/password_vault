document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    // Error handling for empty fields
    if (!username || !password) {
        errorElement.textContent = 'Both fields are required';
        return;
    }

    // Store user credentials in localStorage (for demo purposes)
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect to login page after signup
    window.location.href = 'login.html';
});
