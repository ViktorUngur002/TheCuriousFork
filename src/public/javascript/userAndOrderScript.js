const usersSection = document.getElementById("users");
const orderSection = document.getElementById("orders");
const customConfirm = document.getElementById("customConfirm");
const confirmYesButton = document.getElementById("confirmYes");
const confirmNoButton = document.getElementById("confirmNo");
const snackbarUserAndOrder = document.getElementById("snackbar");
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
        } else if(target.classList.contains("userOrders")) {
            event.preventDefault();
            handleGetOrders(target);
        }
    });

    orderSection.addEventListener("click", function(event) {
        const target = event.target;
        if(target.classList.contains("deleteOrder")) {
            event.preventDefault();
            handleDeleteOrder(target);
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
            snackbarUserAndOrder.className = "show";
            snackbarUserAndOrder.textContent = "User updated!";
        } else {
            snackbarUserAndOrder.className = "show";
            snackbarUserAndOrder.textContent = "Update failed!";
            snackbarUserAndOrder.style.backgroundColor = "red";
        }
    })
    .catch(error => {
        console.log(error);
    })

    setTimeout(function(){ 
        snackbarUserAndOrder.className = snackbarUserAndOrder.className.replace("show", ""); 
    }, 3000);  
}

//END UPDATE

//DELETE USER

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

//END DELETE USER

//GET ORDERS

async function handleGetOrders(button) {
    const userDiv = button.closest(".container");
    const email = userDiv.querySelector(".email");
    orderSection.innerHTML = "";

    try {
        const response = await fetch(`/userOrders/${email.textContent}`);

        if(response.ok) {
            const orderList = await response.json();
            
            orderList.forEach(order => {
                let orderPhoneNumber = order.customerPhoneNumber;
                let orderId = order._id;
                let orderAddress = order.customerAddress;
                let orderAddressNumber = order.customerAddressNumber;
                let orderDate = order.dateOrdered;
                let orderTotal = order.totalPrice.toFixed(2);

                const date = new Date(orderDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                const formattedDate = date.toLocaleDateString(undefined, options);

                let orderItems = order.orderItems;

                const itemHTMLArray = [];

                orderItems.forEach(item => {
                    let itemTitle = item.title;
                    let itemPrice = item.price;
                    let itemQuantity = item.quantity;

                    const itemDivElement = ItemDiv(itemTitle, itemPrice, itemQuantity);
                    itemHTMLArray.push(itemDivElement);
                });

                const allItems = itemHTMLArray.join('');

                const orderDivElement = OrderDiv(orderPhoneNumber, orderAddress, orderAddressNumber, formattedDate, orderTotal, orderId, allItems);
                const newOrderElement = document.createElement('div');
                newOrderElement.innerHTML = orderDivElement;
                orderSection.appendChild(newOrderElement);

            });
        }
    } catch(error) {
        console.error(error);
    }
}

//END GET ORDERS

//DELETE ORDERS

async function handleDeleteOrder(button) {
    const orderDiv = button.closest(".container");
    const orderId = orderDiv.querySelector(".hiddenId");

    fetch(`/order/delete/${orderId.textContent}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if(data.message === 'Order deleted!') {
          console.log('Order successfully deleted!');
          location.reload(true);
        } else {
          console.log('Deletion failed');
        }
      })
      .catch(error => {
        console.log(error);
      })
}

//END DELETE ORDERS

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
                <div class="buttonShowOrders">
                        <input type="submit" class="userOrders" value="Show Orders">
                </div>
            </div>
        </form>
    </div>
</div>
    `;
}

function OrderDiv(orderPhoneNumber, orderAddress, orderAddressNumber, orderDate, orderTotal, orderId, allItems) {
    return `<div class="container">
    <div class="leftSectionOrder">
        <h3>Order info</h3>
        <span class="hiddenId">${orderId}</span>
        <div class="orderInfo">
            <h3>Phone Number</h3>
            <p class="orderPhoneNumber">${orderPhoneNumber}</p>
            <h3>Address</h3>
            <p class="orderAddress">${orderAddress}</p>
            <p class="orderAddressNumber">${orderAddressNumber}</p>
            <h3>Date</h3>
            <p class="orderDate">${orderDate}</p>
            <h3>Products</h3>
                <div class="items">
                    ${allItems}
                </div>
            <h3>Price</h3>
            <p class="orderTotal">${orderTotal}</p>
        </div>
    </div>
    <div class="rightSectionOrder">
        <div class="buttonDeleteOrder">
            <input type="submit" class="deleteOrder" value="Delete Order">
        </div>
    </div>
    </div>`;
}

function ItemDiv(itemTitle, itemPrice, itemQuantity) {
    return `<div class="itemContainer">
        <p class="itemTitle">${itemTitle}</p>
        <p class="itemPrice">$${itemPrice}</p>
        <p class="itemQuantity">${itemQuantity}</p>
    </div>
    <hr class="delimiter">`;
}