const form = document.getElementById("userDataForm");
const submitButton = document.getElementById("submitButton");
const allProductsPricesJSON = localStorage.getItem('productPrices');
let itemsToOrder = [];

if(allProductsPricesJSON) {
    allProductsPrices = JSON.parse(allProductsPricesJSON);
}

submitButton.addEventListener("click", function(event) {

    event.preventDefault();

    clearErrorMessages();

    const formData = new FormData(form);

    isFormValid = true;

    const requiredFields = ["customerName", "customerEmail", "customerPhoneNumber", "customerPhoneNumber", "customerAddressNumber"];

    requiredFields.forEach(fieldName => {
        if(!formData.get(fieldName)) {
            isFormValid = false;
            displayValidationError(fieldName, "Field must not be empty");
        }
    });

    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
        itemsToOrder = JSON.parse(storedItems);
    }

    let orderItems = [];

    itemsToOrder.forEach(item => {
        let quantity = item.quantityStored;
        let price = allProductsPrices[item.title];
        let title = item.title;

        let newItemToBeSent = {
            quantity,
            price,
            title
        };

        orderItems.push(newItemToBeSent);
    });

    const combinedData = {
        formData: Object.fromEntries(formData.entries()),
        orderItems: orderItems
    }
    

    fetch('/addOrder', {
        method: 'POST',
        body: JSON.stringify(combinedData),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            snackbar.className = "show";
            snackbar.textContent = "Order placed!";
            setTimeout(function(){ 
                snackbar.className = snackbar.className.replace("show", ""); 
            }, 3000);
            setTimeout(function() {
                window.location.href = '/homepage.html';
            }, 3000);
        } else {
            snackbar.className = "show";
            snackbar.textContent = "Order failed!";
            snackbar.style.backgroundColor = "red";
        }
    })
    .catch(error => {
        console.error(error);
    });

    localStorage.removeItem('cart');
    localStorage.removeItem('spanQuantity');
    localStorage.removeItem('productPrices');

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