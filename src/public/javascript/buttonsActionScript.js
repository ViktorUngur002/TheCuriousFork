const form = document.getElementById("userData");

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  console.log("Clicked");

  const action = event.submitter.value;

  if (action === "Log out") {
    console.log("heeej");
    try {
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
      } catch (error) {
        console.error(error);
      }
  }
});
