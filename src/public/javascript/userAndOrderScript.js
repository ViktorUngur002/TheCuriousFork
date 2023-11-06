const usersSection = document.getElementById("users");
const customConfirm = document.getElementById("customConfirm");
const confirmYesButton = document.getElementById("confirmYes");
const confirmNoButton = document.getElementById("confirmNo");
let userId;
let userIds = {};
let userToDeleteId;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/me', {
            method: 'GET',
            credentials: 'same-origin',
        });

        if(response.ok) {
            const data = await response.json();
            userId = data.id
        }
    } catch (error) {
        console.error(error);
        return false;
    }


    try {
        const response = await fetch(`/getUsers/${userId}`);

        if(response.ok) {
            const usersArray = await response.json();

            usersArray.forEach(user => {
                let username = user.name;
                let email = user.email;
                let phoneNumber = user.phoneNumber;
                let address = user.address;
                let addressNumber = user.addressNumber;

                userIds[email] = user._id;

                const userDivElement = UserDiv(username, email, phoneNumber, address, addressNumber);
                const newUserElement = document.createElement('div');
                newUserElement.innerHTML = userDivElement;
                usersSection.appendChild(newUserElement);
            });
        } else {
            console.log('Failed to fetch users!');
        }
    } catch(error) {
        console.error(error);
    }

    usersSection.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("userSave")) {
            event.preventDefault()
            handleSaveUser(target);
        } else if (target.classList.contains("userDeletion")) {
            event.preventDefault()
            handleDeleteUser(target);
            document.body.style.overflow = "hidden";
            customConfirm.style.display = "flex";
        }
    });
});

//UPDATE

async function handleSaveUser(button) {
    const userDiv = button.closest(".container");
    const userDataForm = userDiv.querySelector(".userDataForm");
    const email = userDiv.querySelector(".email");

    clearErrorMessages(userDataForm);

    const formData = new FormData(userDataForm);

    isFormValid = true;

    const requiredFields = ["phoneNumber", "address", "addressNumber"];

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(userDataForm, fieldName, "Field must not be empty");
        }
    });

    if(!isFormValid) {
        return;
    }

    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    console.log(userIds[email.textContent]);

    fetch(`user/update/${userIds[email.textContent]}`, {
        method: 'PUT',
        body: JSON.stringify(formDataJson),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        successMessage = userDiv.querySelector(".successMessage");
        if(data.message === 'User updated') {
            successMessage.style.backgroundColor = "rgb(69, 128, 69)";
            const successText = successMessage.querySelector(".successMessageText");
            successText.textContent = "User successfully updated!";
            successMessage.style.display = "block";
        } else {
            successMessage.style.backgroundColor = "red";
            const successText = successMessage.querySelector(".successMessageText");
            successText.textContent = "Update failed!";
            successMessage.style.display = "block";
        }
    })
    .catch(error => {
        console.log(error);
    })

    setTimeout(function() {
        successMessage.style.display = "none";
    }, 3000);   
}

//END UPDATE

//DELETE

function handleDeleteUser(button) {
    const userDiv = button.closest(".container");
    const email = userDiv.querySelector(".email");

    userToDeleteId = userIds[email.textContent];
}

confirmYesButton.addEventListener("click", async function() {
    customConfirm.style.display = 'none';
    document.body.style.overflow = 'auto';

    try {
        await handleDelete()
    } catch(error) {
        console.error(error);
    }

    location.reload(true);
})

confirmNoButton.addEventListener("click", async function() {
    customConfirm.style.display = "none";
    document.body.style.overflow = "auto";
})

async function handleDelete() {

    fetch(`/user/delete/${userToDeleteId}`, {
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

//END DELETE

function displayValidationError(form, fieldName, message) {
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
  
function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.errorMessage');
    errorMessages.forEach(error => error.remove());
}


function UserDiv(username, email, phoneNumber, address, addressNumber) {
    return `<div class="container">
    <div class="leftSectionUser">
        <h3 class="username">${username}</h3>
        <h3 class="email">${email}</h3>
    </div>
    <div class="rightSectionUser">
        <form action="" class="userDataForm" id="userData">
            <div class="inputBox">
                <label for="">Phone Number</label>
                <input type="text" class="phoneNumber" name="phoneNumber" value="${phoneNumber}"/>
            </div>

            <div class="column">
                <div class="inputBox">
                    <label for="">Address</label>
                    <input type="text" class="address" name="address" value="${address}"/>
                </div>

                <div class="inputBox">
                    <label for="">No.</label>
                    <input type="text" class="addressNumber" name="addressNumber" value="${addressNumber}"/>
                </div>
            </div>

            <div class="buttons">
                <div class="buttonSave">
                    <input type="submit" class="userSave" value="Save">
                </div>       
                <div class="buttonDeleteUser">
                        <input type="submit" class="userDeletion" value="Delete User">
                </div>
            </div>
        </form>

        <div id="successMessage" class="successMessage">
            <p class="successMessageText"></p>
        </div>
    </div>
</div>
    `;
}