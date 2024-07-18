const productList = document.querySelector(".product-list");
const cartCountElement = document.querySelector(".cart span");

let cartCount = 0;

const jsonFile = "http://localhost:3000/products";

fetch(jsonFile)
  .then((respone) => {
    return respone.json();
  })
  .then((data) => {
    data.map((product) => {
      const {
        id,
        discount,
        imgSrc,
        category,
        productName,
        currentPrice,
        oldPrice,
        rating,
      } = product;

      const starElements = Array.from({ length: 5 }, (_, index) => {
        if (index < rating) {
          return '<span><i class="fa-solid fa-star"></i></span>';
        } else {
          return '<span><i class="fa-solid fa-star regular"></i></span>';
        }
      }).join("");

      const discountLabel = discount
        ? `<p class="discount">${discount}</p>`
        : "";

      productList.innerHTML += `
        <div class="product-card" data-product-id="${id}">
            ${discountLabel}
            <img src="${imgSrc}" alt="" />
            <div class="product-des">
                <div class="product-info">
                <p>${category}</p>
                <h4>${productName}</h4>
                <p class="price">${currentPrice} <s>${oldPrice}</s></p>
                </div>
                <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
            <div class="product-rating">
              ${starElements}
            </div>
        </div>
      `;
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        cartCount++;
        cartCountElement.textContent = cartCount;

        if (!button.classList.contains("active")) {
          button.classList.add("active");
        }
      });
    });
  });
