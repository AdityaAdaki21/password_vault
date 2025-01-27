document.addEventListener('DOMContentLoaded', function() {
    const authSection = document.getElementById('authSection');
    const generatorSection = document.getElementById('generatorSection');
    const logoutButton = document.getElementById('logoutButton');
    const confirmation = document.getElementById('confirmation');
    const generatePasswordField = document.getElementById('generatePassword');
    const copyPasswordButton = document.getElementById('copyPassword');
    const characterLengthSlider = document.getElementById('characterLengthSlider');
    const characterLengthText = document.getElementById('characterLength');
    const includeDigitsCheckbox = document.getElementById('includeDigits');
    const specialCharCheckbox = document.getElementById('specialChar');
    const includeLowHighCheckbox = document.getElementById('includeLowHigh');
    
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        authSection.style.display = 'none';
        generatorSection.style.display = 'block';
    } else {
        authSection.style.display = 'block';
        generatorSection.style.display = 'none';
    }

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });

    // Handle password generation
    function generatePassword() {
        const length = characterLengthSlider.value;
        const includeDigits = includeDigitsCheckbox.checked;
        const includeSpecialChars = specialCharCheckbox.checked;
        const includeLowHigh = includeLowHighCheckbox.checked;

        let characters = 'abcdefghijklmnopqrstuvwxyz';
        if (includeLowHigh) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeDigits) characters += '0123456789';
        if (includeSpecialChars) characters += '!@#$%^&*()_+{}[]|:;<>,.?';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        generatePasswordField.value = password;
        characterLengthText.textContent = length;
    }

    // Copy password to clipboard
    copyPasswordButton.addEventListener('click', function() {
        generatePasswordField.select();
        document.execCommand('copy');
        confirmation.classList.remove('d-none');
        setTimeout(function() {
            confirmation.classList.add('d-none');
        }, 2000);
    });

    // Update password length when slider is moved
    characterLengthSlider.addEventListener('input', function() {
        generatePassword();
    });

    // Initial password generation
    generatePassword();
});
