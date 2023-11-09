const signInButton = document.querySelector('.signIn');
signInButton.style.opacity = 0;
let isAdmin;

async function isAuthenticated() {
    try {
        const response = await fetch('/me' , {
            method: 'GET',
            credentials: 'same-origin',
        });

        if(response.ok) {
            const data = await response.json();
            isAdmin = data.isAdmin;
            return true;
        } else {
            signInButton.style.opacity = 1;
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function updateDisplay() {
    
    if(signInButton) {
        if(await isAuthenticated()) {
            signInButton.textContent = 'Profile';
            signInButton.href = '/profile.html';
            signInButton.style.opacity = 1;

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