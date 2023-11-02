document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const successMessage = document.getElementById("successMessage");
    const mealType = document.getElementById("mealType");
    const titleFromSearch = document.getElementById("titleFromSearch")
    const inputTitle = document.getElementById("titleField");
    const inputDescription = document.getElementById("description");
    const inputPrice = document.getElementById("price");
    const inputImage = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");
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

        if(inputTitle && inputDescription && inputPrice && imagePreview && inputImage) {
            inputTitle.value = mealTitle;
            inputDescription.value = mealDescription;
            inputPrice.value = mealPrice;
            //inputImage.value = mealImage;
            //console.log(mealImage);
            const base64Image = mealImage.toString('base64');
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;
            imagePreview.src = dataUrl;
            imagePreview.style.display = 'block';
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

        const imageInput = document.getElementById('image');
        const imageFile = imageInput.files[0];

        if (imageFile) {
            formData.append("image", imageFile);
        }
    
        const requiredFields = ["titleField", "description", "price", "image"];
    
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

        console.log(mealType.value);
        let aux = mealType.value;
    
        fetch(`/product/update/${aux}/${mealId}`, {
          method: 'PUT',
          body: JSON.stringify(formDataJson),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if(data.message === 'Meal updated') {
            successMessage.style.backgroundColor = "rgb(69, 128, 69)";
            const successText = successMessage.querySelector(".successMessageText");
            successText.textContent = "Meal successfully updated!";
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