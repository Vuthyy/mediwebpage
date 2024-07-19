const productList = document.querySelector(".product-list");
const cartCountElement = document.querySelector(".cart span");

let cartData = JSON.parse(localStorage.getItem("cartData")) || { count: 0 };
cartCountElement.textContent = cartData.count;

const jsonFile = "http://localhost:3000/products";

fetch(jsonFile)
  .then((response) => response.json())
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
        return index < rating
          ? '<span><i class="fa-solid fa-star"></i></span>'
          : '<span><i class="fa-solid fa-star regular"></i></span>';
      }).join("");

      const discountLabel = discount
        ? `<p class="discount">${discount}</p>`
        : "";

      productList.innerHTML += `
        <div class="product-card" data-product-id="${id}">
            ${discountLabel}
            <img src="${imgSrc}" alt="${productName}" />
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
        cartData.count++;
        cartCountElement.textContent = cartData.count;

        localStorage.setItem("cartData", JSON.stringify(cartData));

        if (!button.classList.contains("active")) {
          button.classList.add("active");
        }
      });
    });
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });
