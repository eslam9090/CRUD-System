let productCartUI = document.querySelector("#productCartUI");
let clear_btn = document.querySelector("#clear_btn");
let NoProduct = document.querySelector("#NoProduct");

/**
 * !Start Drawing Cart Products
 **/
let productsdCart = JSON.parse(localStorage.getItem("clickedProduct")) || [];
function cartProductsUI(productsCart = []) {
  let productsdCart =
    JSON.parse(localStorage.getItem("clickedProduct")) || productsCart;

  let y = productsdCart.map((p) => {
    return `
        <div class="col-lg-6 col-sm-12 col-md-12">
          <div class="card_cart">
            <div class="cart_image">
              <img src="${p.image}" />
            </div>
            <div class="cart_content">
              <div class="cart_content_text">
                <h5>Name : ${p.name}</h5>
                <h5>Category : ${p.category}</h5>
                <h5>Price : ${p.price}$</h5>
                <h5>Quantity : <span id=${p.id}>${p.quntity}</span></h5>
              </div>
              <div class="cart_operation mt-3">
                <i class="fa-regular fa-square-minus"  onclick="decrement(${p.id})"></i>
                <span class="mx-3"></span>
                <i class="fa-regular fa-square-plus" onclick="increment(${p.id})"></i>
              </div>
              <i class="fa-regular fa-circle-xmark close" onclick = "removeFromCart(${p.id})"></i>
            </div>
          </div>
        </div>
        `;
  });
  productCartUI.innerHTML = y.join("");
}

cartProductsUI();
/**
 * !End Drawing Cart Products
 **/

/**
 * !Start Incerment Function
 **/

function increment(id) {
  let cartProducts = JSON.parse(localStorage.getItem("clickedProduct"));

  if (userName) {
    clickedProduct = products.find((p) => p.id === id);
    existProductAdded = cartProducts.find((e) => e.id === clickedProduct.id);
    if (!existProductAdded) {
      cartProducts.push(clickedProduct);
    } else {
      existProductAdded.quntity += 1;
    }

    localStorage.setItem("clickedProduct", JSON.stringify(cartProducts));
  } else {
    window.location = "../login.html";
  }
  calc();
  updateQuantity(id);
  calcBill();
}

/**
 * !End Incerment Function
 **/
/**
 * !Start Decrement Function
 **/

function decrement(id) {
  let cartProducts = JSON.parse(localStorage.getItem("clickedProduct"));

  if (userName) {
    clickedProduct = products.find((p) => p.id === id);
    existProductAdded = cartProducts.find((e) => e.id === clickedProduct.id);
    if (!existProductAdded) {
      cartProducts.push(clickedProduct);
    } else {
      existProductAdded.quntity -= 1;
    }

    localStorage.setItem("clickedProduct", JSON.stringify(cartProducts));
  } else {
    window.location = "../login.html";
  }
  calc();
  updateQuantity(id);
  calcBill();
}

/**
 * !End Decrement Function
 **/
/**
 * !Start Calculation Of Quantity Function
 **/

function calc() {
  let cartProducts = JSON.parse(localStorage.getItem("clickedProduct")) || [];

  let calcResult = cartProducts
    .map((e) => e.quntity)
    .reduce((acc, cu) => {
      return acc + cu;
    }, 0);
  cart_count.innerHTML = calcResult;
}
calc();

/**
 * !End Calculation Of Quantity Function
 **/

/**
 * !Start Update Of Quantity Function
 **/

function updateQuantity(id) {
  let cartProducts = JSON.parse(localStorage.getItem("clickedProduct"));
  let qty_span = document.getElementById(id);
  productUpdate = cartProducts.find((e) => e.id === id);
  qty_span.innerHTML = productUpdate.quntity;
}

/**
 * !End Update Of Quantity Function
 **/

/**
 * !Start Remove From Cart Function
 **/

function removeFromCart(id) {
  let cartProducts = JSON.parse(localStorage.getItem("clickedProduct"));

  let foundedItems = cartProducts.find((t) => t.id === id);
  let removedItem = cartProducts.filter((f) => f.id !== foundedItems.id);
  localStorage.setItem("clickedProduct", JSON.stringify(removedItem));
  cartProductsUI(removedItem);
  calc();
}
/**
 * !End Remove From Cart Function
 **/

clear_btn.addEventListener("click", () => {
  let productsdCart = JSON.parse(localStorage.getItem("clickedProduct"));

  localStorage.removeItem("clickedProduct");
  productsdCart.splice(0);
  cart_count.innerHTML = 0;
  totalBill.innerHTML = 0 + "$";
  cartProductsUI();
  calcBill();
});

let totalBill = document.querySelector("#totalBill");

function calcBill() {
  let productsdCart = JSON.parse(localStorage.getItem("clickedProduct"));
  let Tbill = productsdCart
    .map((c) => {
      return c.quntity * c.price;
      // let f = products.find((d) => d.id === c.id);

      // return c.quntity * f.price;
    })
    .reduce((acc, cu) => {
      return acc + cu;
    }, 0);
  totalBill.innerHTML = Tbill + "$";
}
calcBill();
