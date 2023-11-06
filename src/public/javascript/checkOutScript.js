const quantity = document.querySelector(".quantity");

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

function start() {
    addEvents();
    loadCartFromStorage();
}

function update() {
    addEvents();
    updateTotal();
    saveCartToStorage()
}

let itemsAdded = [];

function CartBoxComponent(title, price, imgsrc) {
    return `
    <div class="containerProducts">
        <div class="leftSection"><img class="productImage" src=${imgsrc} alt=""></div>
        <div class="rightSection">
            <h3 id="productName" class="dishTitle">${title}</h3>
        </div>
        <div class="priceAndOrder">
            <h3 class="price">$${price}</h3>
            <input type="number" value="1" class="cartQuantity">
            <button class="cartRemove">Remove</button>
        </div>
    </div>`;
  }

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      itemsAdded = JSON.parse(storedCart);
      renderCart();
      update();
    }
}

function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(itemsAdded));
}

function renderCart() {
    const cartContent = document.querySelector('.cartContent');
    cartContent.innerHTML = '';
    itemsAdded.forEach(function(item) {
      const cartBoxElement = CartBoxComponent(item.title, item.price, item.imgsrc);
      const newNode = document.createElement('div');
      newNode.innerHTML = cartBoxElement;
      const inputElement = newNode.querySelector(".cartQuantity");
      if (inputElement) {
        inputElement.value = item.quantityStored;
      }
      cartContent.appendChild(newNode);
    });
}

function addEvents() {
    let cartContent = document.querySelector('.cartContent');

    cartContent.addEventListener("click", function (event) {
        if (event.target.classList.contains("cartRemove")) {
            console.log("Button clicked");
            handle_removeCartItem.call(event.target); 
        }
    });

    cartContent.addEventListener("change", function (event) {
        if (event.target.classList.contains("cartQuantity")) {
            console.log("Quantity changed");
            handle_changeItemQuantity.call(event.target); 
        }
    });
}

function handle_removeCartItem() {
  const dishTitleElement = this.parentElement.parentElement.querySelector(".dishTitle");
  if (dishTitleElement) {
      this.parentElement.parentElement.remove();
      itemsAdded = itemsAdded.filter(
          (el) => el.title != dishTitleElement.innerHTML
      );

      update();
  }
}
  
function handle_changeItemQuantity() {
  let inputValue = this.value;
  let itemQuantity = parseInt(inputValue, 10);


  if (isNaN(this.value) || this.value < 1) {
      this.value = 1;
  }

  const productQuantityToChange = this.parentElement.parentElement.querySelector('.dishTitle').innerHTML;
  console.log(productQuantityToChange);
  const itemToUpdate = itemsAdded.find((el) => el.title === productQuantityToChange);
  if(itemToUpdate) {
    itemToUpdate.quantityStored = itemQuantity;
  }

  this.value = itemQuantity;
    
    //this.value = Math.floor(this.value);

  update();
}

  function updateTotal() {
    let cartBoxes = document.querySelectorAll(".containerProducts");
    const totalElement = document.querySelector(".totalPrice");
    let total = 0;
  
    cartBoxes.forEach((cartBox) => {
      let priceElement = cartBox.querySelector(".price");
      let price = parseFloat(priceElement.innerHTML.replace("$", ""));
  
      let quantityProduct = cartBox.querySelector(".cartQuantity").value;
      total += price*quantityProduct;
    });
  
    total = total.toFixed(2);
  
    totalElement.innerHTML = "$" + total;
  }