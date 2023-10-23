const form = document.getElementById("signInForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    clearErrorMessages();

    const formTarget = event.target;
    const formData = new FormData(formTarget);

    isFormValid = true;

    const requiredFields = ["email", "password"];

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(fieldName, "Field must not be empty");
        }
    });

    if(!isFormValid) {
        return;
    }

    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    fetch('/signin', {
        method: 'POST',
        body: JSON.stringify(formDataJson),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            const signInButton = document.querySelector(".signIn");
            if (signInButton) {
                signInButton.style.display = "none";
            }
            window.location.href = '/homepage.html';
            //console.log(data);
        } else if (data.error && data.error.includes('Wrong email or password.')) {
            displayValidationError("signInButton", data.error);
        }
    })
    .catch(error => {
        console.error(error);
    })
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

    field.parentElement.parentElement.appendChild(errorDiv);
}

function clearErrorMessages() {
    const errorMessages = form.querySelectorAll('.errorMessage');
    errorMessages.forEach(error => error.remove());
}