document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("userData");
const customConfirm = document.getElementById("customConfirm");
const confirmYesButton = document.getElementById("confirmYes");
const confirmNoButton = document.getElementById("confirmNo");
const successMessage = document.getElementById("successMessage");
const snackbar = document.getElementById("snackbar");
let userId;

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  clearErrorMessages();

  const action = event.submitter.value;

  if (action === "Log out") {
    try {
      await handleLogout();
    } catch (error) {
      console.error(error);
    }
  } 

  if(action === "Save") {
    handleSave(event);
  }

  if(action === "Delete User") {
    document.body.style.overflow = "hidden";
    customConfirm.style.display = "flex";
  }

});

confirmYesButton.addEventListener("click", async function() {
  customConfirm.style.display = "none";
  document.body.style.overflow = "auto";
  try {
    await handleDelete();
    await handleLogout();
  } catch(error) {
    console.error(error);
  }
})

confirmNoButton.addEventListener("click", async function() {
  customConfirm.style.display = "none";
  document.body.style.overflow = "auto";
})

async function handleLogout() {

  localStorage.removeItem('cart');
  localStorage.removeItem('spanQuantity');

  const response = await fetch('/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
      const data = await response.json();
      if (data.success) {
      window.location.href = '/homepage.html';
      }
  } else {
    console.error('Log out failed.');
  }
 
}

async function handleSave(event) {
  const formTarget = event.target;
    const formData = new FormData(formTarget);

    isFormValid = true;

    const requiredFields = ["phoneNumber", "address", "addressNumber"];

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

    try {
      const response = await fetch('/me' , {
          method: 'GET',
          credentials: 'same-origin',
      });

      if(response.ok) {
          const data = await response.json();
          userId = data.id;
      }
    } catch (error) {
      console.error(error);
      return false;
    }


    fetch(`/user/update/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(formDataJson),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === 'User updated') {
        snackbar.className = "show";
        snackbar.textContent = "User updated!";
      } else {
        snackbar.className = "show";
        snackbar.textContent = "Update failed!";
        snackbar.style.backgroundColor = "red";
      }
    })
    .catch(error => {
      console.log(error);
    })

    setTimeout(function(){ 
      snackbar.className = snackbar.className.replace("show", ""); 
    }, 3000);
}

async function handleDelete() {
  try {
    const response = await fetch('/me' , {
        method: 'GET',
        credentials: 'same-origin',
    });

    if(response.ok) {
        const data = await response.json();
        userId = data.id;
    }
  } catch (error) {
    console.error(error);
    return false;
  }

  fetch(`/user/delete/${userId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    if(data.message === 'User deleted!') {
      console.log('User successfully deleted!');
    } else {
      console.log('Deletion failed');
    }
  })
  .catch(error => {
    console.log(error);
  })
}


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

});