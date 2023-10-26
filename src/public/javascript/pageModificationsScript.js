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
    const signInButton = document.querySelector('.signIn');
    if(signInButton) {
        if(await isAuthenticated()) {
            signInButton.textContent = 'Profile';
            signInButton.href = '/profile.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
  });