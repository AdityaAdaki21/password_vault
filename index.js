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

    // Credential management
    const credentialForm = document.getElementById('credentialForm');
    const saveCredentialsBtn = document.getElementById('save-credentials');
    const credentialsList = document.getElementById('credentials-list');

    function saveCredential(e) {
        e.preventDefault();
        const serviceName = document.getElementById('service-name').value.trim();
        const username = document.getElementById('credential-username').value.trim();
        const password = document.getElementById('credential-password').value.trim();

        if (!serviceName || !username || !password) {
            alert('Please fill in all fields');
            return;
        }

        let credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
        credentials.push({
            service: serviceName,
            username: username,
            password: password
        });

        localStorage.setItem('userCredentials', JSON.stringify(credentials));
        displayCredentials();
        clearCredentialForm();
    }

    function displayCredentials() {
        const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
        credentialsList.innerHTML = '';

        credentials.forEach((cred, index) => {
            const item = document.createElement('div');
            item.className = 'list-group-item';
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center credential-item" data-index="${index}">
                    <div class="credential-info" style="cursor: pointer;">
                        <h6 class="mb-0">${cred.service}</h6>
                        <small>Username: ${cred.username}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-danger delete-credential" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            credentialsList.appendChild(item);
        });
    }

    function clearCredentialForm() {
        document.getElementById('service-name').value = '';
        document.getElementById('credential-username').value = '';
        document.getElementById('credential-password').value = '';
    }

    credentialForm.addEventListener('submit', saveCredential);
    saveCredentialsBtn.addEventListener('click', saveCredential);

    credentialsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-credential')) {
            const index = e.target.getAttribute('data-index');
            const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
            credentials.splice(index, 1);
            localStorage.setItem('userCredentials', JSON.stringify(credentials));
            displayCredentials();
        }
    });

    // Initial display of stored credentials
    if (isLoggedIn) {
        displayCredentials();
    }

    // Modal related event listeners
    const modalTogglePassword = document.getElementById('modal-toggle-password');
    const modalPassword = document.getElementById('modal-password');
    const modalCopyPassword = document.getElementById('modal-copy-password');

    if (modalTogglePassword && modalPassword && modalCopyPassword) {
        modalTogglePassword.addEventListener('click', () => {
            const type = modalPassword.type === 'password' ? 'text' : 'password';
            modalPassword.type = type;
            modalTogglePassword.innerHTML = type === 'password' ? 
                '<i class="bi bi-eye"></i>' : 
                '<i class="bi bi-eye-slash"></i>';
        });

        modalCopyPassword.addEventListener('click', () => {
            modalPassword.select();
            document.execCommand('copy');
            modalCopyPassword.textContent = 'Copied!';
            setTimeout(() => {
                modalCopyPassword.textContent = 'Copy';
            }, 2000);
        });
    }

    credentialsList.addEventListener('click', (e) => {
        const credentialInfo = e.target.closest('.credential-info');
        if (credentialInfo) {
            const index = credentialInfo.parentElement.getAttribute('data-index');
            showCredentialDetails(index);
        }
    });
});

function showCredentialDetails(index) {
    const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
    const credential = credentials[index];
    
    document.getElementById('modal-service').textContent = credential.service;
    document.getElementById('modal-username').textContent = credential.username;
    document.getElementById('modal-password').value = credential.password;
    
    const modalEl = document.getElementById('credentialDetailsModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}
