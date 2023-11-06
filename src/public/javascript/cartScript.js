const cartIcon = document.querySelector("#cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cartClose");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

function start() {
  loadCartFromStorage();
  updateTotal();
  addEvents();
}

function update() {
  addEvents();
  updateTotal();
  saveCartToStorage();
}


function addEvents() {

  document.addEventListener("click", function (event) {
    if(event.target.classList.contains("cartRemove")) {
      handle_removeCartItem.call(event.target);
    }
  })

  document.addEventListener("change", function (event) {
    if(event.target.classList.contains("cartQuantity")) {
      handle_changeItemQuantity.call(event.target);
    }
  })

  document.addEventListener("click", function (event) {
    if(event.target.classList.contains("addCart")) {
      handle_addCartItem.call(event.target);
    } 
  })

  document.addEventListener("click", function (event) {
    if(event.target.classList.contains("btnBuy")) {
      handle_buyOrder.call(event.target);
    } 
  })
}

// HANDLE EVENTS FUNCTIONS
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement.parentElement;
  let title = product.querySelector(".dishTitle").innerHTML;
  let price = product.querySelector(".price").innerHTML;
  let imgsrc = product.querySelector(".productImage").src;
 
  let newToAdd = {
    title,
    price,
    imgsrc,
    quantityStored:1,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    console.log(newToAdd.title);
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgsrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cartContent");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) => 
      el.title != this.parentElement.querySelector(".cartProductTitle").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  let inputValue = this.value;
  let itemQuantity = parseInt(inputValue, 10);

  if (isNaN(itemQuantity) || itemQuantity < 1) {
    itemQuantity = 1;
  }

  const productQuantityToChange = this.parentElement.querySelector('.cartProductTitle').innerHTML;
  const itemToUpdate = itemsAdded.find((el) => el.title === productQuantityToChange);
  if(itemToUpdate) {
    itemToUpdate.quantityStored = itemQuantity;
  }

  this.value = itemQuantity;

  update();
}

function handle_buyOrder() {
  if(itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }

  //const cartContent = cart.querySelector(".cartContent");
  //cartContent.innerHTML = "";
  //itemsAdded = [];
  //quantity.textContent = "0";
  //quantity.classList.add("hidden");
  update();
  window.location.href = '/checkout.html';
}

//update and render functions

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cartBox");
  const totalElement = cart.querySelector(".totalPrice");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cartPrice");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let itemName = cartBox.querySelector(".cartProductTitle");

    let quantityProduct = cartBox.querySelector(".cartQuantity").value;
    total += price*quantityProduct;
  });

  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

// HTML components

function CartBoxComponent(title, price, imgsrc) {
  return `
    <div class="cartBox">
        <div>
          <img src=${imgsrc} alt="" class="cartImg">
        </div>
        <div class="detaiBox">
            <div class="cartProductTitle">${title}</div>
            <div class="cartPrice">${price}</div>
            <input type="number" value="1" class="cartQuantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cartRemove'></i>
    </div>`;
}

function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(itemsAdded));
}

function loadCartFromStorage() {
  const storedCart = localStorage.getItem('cart');
  const storedQuantity = localStorage.getItem('spanQuantity');
  if (storedCart) {
    itemsAdded = JSON.parse(storedCart);
    renderCart();
  }
}

function renderCart() {
  const cartContent = cart.querySelector('.cartContent');
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