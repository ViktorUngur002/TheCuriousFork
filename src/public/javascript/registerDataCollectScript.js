const form = document.getElementById("registration");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    clearErrorMessages();

    const formTarget = event.target;
    const formData = new FormData(formTarget);

    isFormValid = true;

    const requiredFields = ["name", "email", "password", "confirmPassword", "phoneNumber", "birthdayDate", "address", "addressNumber"];

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(fieldName, "Field must not be empty");
        }
    });

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if(password !== confirmPassword) {
        isFormValid = false;
        displayValidationError("confirmPassword", "Passwords must match");
    }

    if(!isFormValid) {
        return;
    }

    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(formDataJson),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = '/signin.html';
        } else if (data.error && data.error.includes('User already exists')) {
            displayUserExistsMessage(data.error);
        }
    })
    .catch(error => {
        // Handle errors (e.g., display an error message)
        console.error(error);
    });

});

function displayValidationError(fieldName, message) {
    const field = form.querySelector(`[name=${fieldName}]`);

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('errorMessage');
    errorDiv.textContent = message;

    const existingError = field.parentElement.querySelector('.errorMessage');
    if(existingError) {
        field.parentElement.removeChild(existingError);
    }

    field.parentElement.appendChild(errorDiv);
}

function clearErrorMessages() {
    const errorMessages = form.querySelectorAll('.errorMessage');
    errorMessages.forEach(error => error.remove());
}

function displayUserExistsMessage(errorMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('errorMessageExists');
    messageDiv.textContent = errorMessage;

    const signInLink = document.createElement('a');
    signInLink.classList.add('signInLinnk');
    signInLink.textContent = 'Go to Sign In';
    signInLink.href = 'signin.html';

    messageDiv.appendChild(signInLink);

    form.appendChild(messageDiv);
}