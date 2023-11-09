const form = document.getElementById("productAdd");
const sectionInput = document.getElementById('section');
const myImage = document.getElementById("image");
const previewImage = document.getElementById("imagePreview");
const snackbarMeal = document.getElementById("snackbar");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    clearErrorMessages();

    const formTarget = event.target;
    const formData = new FormData(formTarget);

    isFormValid = true;
    const requiredFields = ["mealType", "title", "description", "price"];

    if(sectionInput.style.display === 'block') {
        requiredFields.append("section");
    }

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(fieldName, "Field must not be empty");
        }
    });

    const imageInput = document.getElementById('image');
    if(imageInput.files.length === 0) {
        displayValidationError('image', "Field must not be empty");
    }

    if(!isFormValid) {
        return;
    }


    fetch('/addProducts', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            snackbarMeal.className = "show";
            snackbarMeal.textContent = "Meal added!";
        } else if (data.error && data.error.includes('Meal already exists')) {
            displayUserExistsMessage(data.error);
        } else {
            snackbarMeal.className = "show";
            snackbarMeal.textContent = "Adding failed!";
            snackbarMeal.style.backgroundColor = "red";
        }
    })
    .catch(error => {
        console.error(error);
    });

    form.reset();
    previewImage.src = "#";
    previewImage.style.display = 'none';

    setTimeout(function(){ 
        snackbar.className = snackbar.className.replace("show", ""); 
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

    form.appendChild(messageDiv);
}