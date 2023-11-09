let userName;
let email;
let phoneNumber;
let address;
let addressNumber;
let isAdmin;

async function isAuthenticated() {
    try {
        const response = await fetch('/me' , {
            method: 'GET',
            credentials: 'same-origin',
        });

        if(response.ok) {
            const data = await response.json();
            userName = data.name;
            isAdmin = data.isAdmin;
            email = data.email;
            phoneNumber = data.phoneNumber;
            address = data.address;
            addressNumber = data.addressNumber;
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function updateDisplay() {
    const signInButton = document.querySelector('.signIn');
    const usernameTitle = document.querySelector('.username');
    const emailInput = document.querySelector('.email');
    const phoneNumberInput = document.querySelector('.phoneNumber');
    const addressInput = document.querySelector('.address');
    const addressNumberInput = document.querySelector('.addressNumber');

    if(signInButton && usernameTitle && emailInput && phoneNumberInput && addressInput && addressNumberInput) {
        if(await isAuthenticated()) {
            signInButton.textContent = 'Profile';
            signInButton.href = '/profile.html';  
            usernameTitle.textContent = userName; 
            emailInput.value = email;
            phoneNumberInput.value = phoneNumber;
            addressInput.value = address;
            addressNumberInput.value = addressNumber;

            if(isAdmin) {
                const adminButton = document.createElement('a');
                adminButton.className = 'signIn';
                adminButton.href = '/admin.html';
                adminButton.textContent = 'Admin';
                signInButton.parentElement.insertBefore(adminButton, signInButton);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
  });