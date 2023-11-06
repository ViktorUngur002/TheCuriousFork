const menu = document.getElementById("menu");
let prices = {};

document.addEventListener("DOMContentLoaded", async () => {
    const existingPricesJSON = localStorage.getItem('productPrices');
    if (existingPricesJSON) {
        prices = JSON.parse(existingPricesJSON);
    }
    try {
        const response = await fetch('/products/salad');

        if(response.ok) {
            const productsMainCourse = await response.json();
            
            productsMainCourse.forEach(product => {
                let titleServer = product.title;
                let descriptionServer = product.description;
                let priceServer = product.price;
                let imageServer = product.image;

                prices[titleServer] = priceServer;

                const productDivelement = ProductDiv(titleServer, descriptionServer, priceServer, imageServer);
                const newElement = document.createElement('div');
                newElement.innerHTML = productDivelement;
                menu.appendChild(newElement);
            });

            const pricesJSON = JSON.stringify(prices);
            localStorage.setItem('productPrices', pricesJSON);

        } else {
            console.log('Failed to fetch products!');
        }
    } catch(error) {
        console.error(error);
    }
});

function ProductDiv(titleParam, descriptionParam, priceParam, imageParam) {
    return `
    <div class="container">
        <div class="leftSection"><img class="productImage" src=${imageParam} alt=""></div>
        <div class="rightSection">
            <h3 class="dishTitle">${titleParam}</h3>
            <p>${descriptionParam}</p>
        </div>
        <div class="priceAndOrder">
            <h3 class="price">${priceParam}</h3>
            <button class="addCart">Order Now</button>
        </div>
    </div>`;
  }