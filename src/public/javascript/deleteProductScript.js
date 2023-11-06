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
    const customConfirm = document.getElementById("customConfirm");
    const confirmYesButton = document.getElementById("confirmYes");
    const confirmNoButton = document.getElementById("confirmNo");
    let mealId;
    let mealTitle;
    let mealDescription;
    let mealPrice;
    let mealImage;
    
    form.addEventListener("submit", async function(event) {
      event.preventDefault();
    
      const action = event.submitter.value;
    
      if (action === "Search") {
        try {
          await handleSearch();
        } catch (error) {
          console.error(error);
        }
      } 
    
      if(action === "Delete Product") {
        document.body.style.overflow = "hidden";
        customConfirm.style.display = "flex";
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

    confirmYesButton.addEventListener("click", async function() {
        customConfirm.style.display = "none";
        document.body.style.overflow = "auto";
        try {
          await handleDelete();
        } catch(error) {
          console.error(error);
        }
        form.reset();
        imagePreview.src = "#";
        imagePreview.style.display = 'none';
    });
      
    confirmNoButton.addEventListener("click", async function() {
        customConfirm.style.display = "none";
        document.body.style.overflow = "auto";
    });
    
    async function handleDelete() {

        let typeValue = mealType.value;

        fetch(`/product/delete/${typeValue}/${mealId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === 'Meal deleted!') {
                successMessage.style.backgroundColor = "rgb(69, 128, 69)";
                const successText = successMessage.querySelector(".successMessageText");
                successText.textContent = "Meal successfully deleted!";
                successMessage.style.display = "block";
            } else {
                successMessage.style.backgroundColor = "red";
                const successText = successMessage.querySelector(".successMessageText");
                successText.textContent = "Deletion failed";
                successMessage.style.display = "block";
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    
});