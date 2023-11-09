const steakSection = document.getElementById("steak");
const seafoodSection = document.getElementById("seafood");
const chickenSection = document.getElementById("chicken");
const lambSection = document.getElementById("lamb");
let prices = {};

steakSection.style.display = 'none';
seafoodSection.style.display = 'none';
chickenSection.style.display = 'none';
lambSection.style.display = 'none';

document.addEventListener("DOMContentLoaded", async () => {
    const existingPricesJSON = localStorage.getItem('productPrices');
    if (existingPricesJSON) {
        prices = JSON.parse(existingPricesJSON);
    }
    try {
        const response = await fetch('/products/mainCourse');

        if(response.ok) {
            const productsMainCourse = await response.json();
            
            productsMainCourse.forEach(product => {
                let titleServer = product.title;
                let descriptionServer = product.description;
                let priceServer = product.price;
                let imageServer = product.image;
                let sectionServer = product.section;

                prices[titleServer] = priceServer;

                const productDivelement = ProductDiv(titleServer, descriptionServer, priceServer, imageServer);
                const newElement = document.createElement('div');
                newElement.innerHTML = productDivelement;

                if(sectionServer === 'Steaks') {
                    steakSection.appendChild(newElement);
                    steakSection.style.display = 'block';
                } else if(sectionServer === 'Seafood') {
                    seafoodSection.appendChild(newElement);
                    seafoodSection.style.display = 'block';
                } else if(sectionServer === 'Chicken') {
                    chickenSection.appendChild(newElement);
                    chickenSection.style.display = 'block';
                } else if(sectionServer === 'Lamb') {
                    lambSection.appendChild(newElement);
                    lambSection.style.display = 'block';
                }
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