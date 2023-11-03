const form = document.getElementById("productAdd");
const sectionInput = document.getElementById('section');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("here i am");

    clearErrorMessages();

    const formTarget = event.target;
    const formData = new FormData(formTarget);

    isFormValid = true;
    const requiredFields = ["mealType", "title", "description", "price", "image"];

    if(sectionInput.style.display === 'block') {
        requiredFields.push("section");
    }

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(fieldName, "Field must not be empty");
        }
    });

    const imageInput = document.getElementById('image');
    console.log(imageInput);
    const imageFile = imageInput.files[0];
    console.log(imageFile);

    if (imageFile) {
        formData.append("image", imageFile);
    } else {
        isFormValid = false;
    }

    if(!isFormValid) {
        return;
    }

    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    fetch('/addProducts', {
        method: 'POST',
        body: formData,
        //headers: {
        //'Content-Type': 'application/json'
        //}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.success);
        if(data.success) {
            window.location.href = '/homepage.html';
        } else if (data.error && data.error.includes('User already exists')) {
            displayUserExistsMessage(data.error);
        }
    })
    .catch(error => {
        console.error(error);
    });

    setTimeout(function() {
        successMessage.style.display = "none";
      }, 3000);

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