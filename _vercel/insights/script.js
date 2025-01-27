document.addEventListener('DOMContentLoaded', () => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const specials = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/'];
    const lower_upper_case = [...Array(26).keys()].map(i => String.fromCharCode(i + 65).toLowerCase());

    const generatePasswordInput = document.getElementById('generatePassword');
    
    const passwordLength = document.getElementById('characterLengthSlider');
    const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');

    const generatePassword = (length) => {
        console.log('Generating Password');
        console.log(length);
        document.getElementById('characterLength').textContent = passwordLength.value;
        
        generatePasswordInput.value = '';
        const includeDigits = document.getElementById('includeDigits').checked;
        const includeSpecials = document.getElementById('specialChar').checked;
        const includeLowHigh = document.getElementById('includeLowHigh').checked;
        console.log(includeDigits, includeSpecials, includeLowHigh);

        let possiblePasswordChars = [];
        if (includeDigits) {digits.forEach(digit => possiblePasswordChars.push(digit));}
        if (includeSpecials) {specials.forEach(special => possiblePasswordChars.push(special));}
        if (includeLowHigh) {
            lower_upper_case.forEach(char => {
                possiblePasswordChars.push(char);
                possiblePasswordChars.push(char.toUpperCase());
            });
        }else{
            lower_upper_case.forEach(char => possiblePasswordChars.push(char));
        }
        // console.log(possiblePasswordChars);

        for (let i = 0; i < length; i++) {
            generatePasswordInput.value += possiblePasswordChars[Math.floor(Math.random() * possiblePasswordChars.length)];
        }

    };

    generatePassword(passwordLength.value);

    passwordLength.addEventListener('change', e => { 
        let value = e.target.value;
        generatePassword(value);
                
    });

    allCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            generatePassword(passwordLength.value);
        });
    });

    const copyPasswordBtn = document.getElementById('copyPassword');
    const confirmation = document.getElementById('confirmation');
    copyPasswordBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(generatePasswordInput.value);
        confirmation.classList.add('active');
        setTimeout(() => {
            confirmation.classList.remove('active');
        }, 2000);
    });
});
function saveCredential() {
    const serviceName = document.getElementById('service-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!serviceName || !username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    credentials.push({ serviceName, username, password });
    localStorage.setItem('credentials', JSON.stringify(credentials));

    displayCredentials();
    clearCredentialForm();
}

function displayCredentials() {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    const listElement = document.getElementById('credentials-list');
    listElement.innerHTML = '';

    credentials.forEach((cred, index) => {
        const item = document.createElement('div');
        item.className = 'credential-item';
        item.innerHTML = `
            <div>
                <strong>${cred.serviceName}</strong><br>
                Username: ${cred.username}
            </div>
            <span class="delete-credential" onclick="deleteCredential(${index})">Delete</span>
        `;
        listElement.appendChild(item);
    });
}

function deleteCredential(index) {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    credentials.splice(index, 1);
    localStorage.setItem('credentials', JSON.stringify(credentials));
    displayCredentials();
}

function clearCredentialForm() {
    document.getElementById('service-name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Add event listeners
document.getElementById('save-credentials').addEventListener('click', saveCredential);

// Initialize credentials display
displayCredentials();
