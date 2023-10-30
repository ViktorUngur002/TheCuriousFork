const signInButton = document.querySelector('.signIn');

async function isAuthenticated() {
    try {
        const response = await fetch('/me' , {
            method: 'GET',
            credentials: 'same-origin',
        });

        if(response.ok) {
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
    
    if(signInButton) {
        if(await isAuthenticated()) {
            signInButton.style.opacity = 0;
            signInButton.textContent = 'Profile';
            signInButton.href = '/profile.html';
            signInButton.style.opacity = 1;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
  });