const cartIcon = document.querySelector("#cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cartClose");
const quantity = document.querySelector(".quantity");

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
  addEvents();
}

function update() {
  addEvents();
  updateTotal();
}

//remove items from cart
function addEvents() {
  let cartRemove_btns = document.querySelectorAll(".cartRemove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });


//change item quantity
let cartQuantity_inputs = document.querySelectorAll(".cartQuantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

//add item to cart
let addCart_btns = document.querySelectorAll(".addCart");
addCart_btns.forEach((btn) => {
  btn.addEventListener("click", handle_addCartItem);
});

//buy order
const buy_btn = document.querySelector(".btnBuy");
buy_btn.addEventListener("click", handle_buyOrder);

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
    quantityStored: 1
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    console.log(newToAdd.title);
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  quantity.classList.remove("hidden");
  let currentCount = parseInt(quantity.textContent);
  let newCount = currentCount + 1;
  quantity.textContent = newCount;
  let cartBoxElement = CartBoxComponent(title, price, imgsrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cartContent");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  let currentCount = parseInt(quantity.textContent);
  let newCount = currentCount - 1;
  quantity.textContent = newCount;
  itemsAdded = itemsAdded.filter(
    (el) => 
      el.title != this.parentElement.querySelector(".cartProductTitle").innerHTML
  );
  if(itemsAdded.length === 0) {
    quantity.innerHTML = "0";
    quantity.classList.add("hidden");
  }

  update();
}

function handle_changeItemQuantity() {
  let inputValue = this.value;
  let quantity = parseInt(inputValue, 10);

  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  this.value = quantity;

  update();
}

function handle_buyOrder() {
  if(itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }

  const cartContent = cart.querySelector(".cartContent");
  cartContent.innerHTML = "";
  itemsAdded = [];
  quantity.textContent = "0";
  quantity.classList.add("hidden");
  update();
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

    let cartItem = itemsAdded.find((item) => item.title === itemName);

    let quantityProduct = cartBox.querySelector(".cartQuantity").value;
    cartItem.quantityStored = quantityProduct
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

