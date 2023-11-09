document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const mealType = document.getElementById("mealType");
    const titleFromSearch = document.getElementById("titleFromSearch")
    const inputTitle = document.getElementById("titleField");
    const inputDescription = document.getElementById("description");
    const inputPrice = document.getElementById("price");
    const inputImage = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");
    const snackbarMeal = document.getElementById("snackbar");
    let mealId;
    let mealTitle;
    let mealDescription;
    let mealPrice;
    let mealImage;
    
    form.addEventListener("submit", async function(event) {
      event.preventDefault();
    
      clearErrorMessages();
    
      const action = event.submitter.value;
    
      if (action === "Search") {
        try {
          await handleSearch();
        } catch (error) {
          console.error(error);
        }
      } 
    
      if(action === "Save Product") {
        handleSave(event);
      }
    
    });
    
    
    async function handleSearch() {
       try {
        const response = await fetch(`/getOneProduct?mealType=${mealType.value}&titleFromSearch=${titleFromSearch.value}` , {
            method: 'GET',
            credentials: 'same-origin',
        });
  
        if(response.ok) {
            const data = await response.json();
            mealId = data.id;
            mealTitle = data.title;
            mealDescription = data.description;
            mealPrice = data.price;
            mealImage = data.image;

            if(inputTitle && inputDescription && inputPrice && imagePreview && inputImage) {
              inputTitle.value = mealTitle;
              inputDescription.value = mealDescription;
              inputPrice.value = mealPrice;
              imagePreview.src = mealImage;
              imagePreview.style.display = 'block';
            }
        } else {
          displayValidationError("titleFromSearch", "Meal not found!");
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    
    async function handleSave(event) {
        const formTarget = event.target;
        const formData = new FormData(formTarget);
    
        isFormValid = true;
    
        const requiredFields = ["mealType", "titleField", "description", "price"];
    
        requiredFields.forEach(fieldName => {
            if(!formData.get(fieldName)) {
                isFormValid = false;
                displayValidationError(fieldName, "Field must not be empty");
            }
        });
    
        if(!isFormValid) {
          return;
        }
        
        let typeValue = mealType.value;
    
        fetch(`/product/update/${typeValue}/${mealId}`, {
          method: 'PUT',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          if(data.message === 'Meal updated') {
            snackbarMeal.className = "show";
            snackbarMeal.textContent = "Meal updated!";
          } else {
            snackbarMeal.className = "show";
            snackbarMeal.textContent = "Update failed!";
            snackbarMeal.style.backgroundColor = "red";
          }
        })
        .catch(error => {
          console.log(error);
        })
    
        setTimeout(function(){ 
          snackbar.className = snackbar.className.replace("show", ""); 
        }, 3000);
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