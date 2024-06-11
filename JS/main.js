/**
 * !Start variables
 **/

let productsUI = document.querySelector("#productsUI");
let log_reg_btn = document.querySelector("#log_reg_btn");
let cart_name_btn = document.querySelector("#cart_name_btn");
let login_name = document.querySelector("#login_name");
let cart_count = document.querySelector(".cart_count");
let userName = localStorage.getItem("firstName");
let empty = document.querySelector("#empty");
let selectOptionSize = document.querySelector("#selectOptionSize");

/**
 * !End variables
 **/

/**
 * !Start Nav Logic
 **/

if (userName) {
  log_reg_btn.style.display = "none";
  cart_name_btn.style.display = "flex";
  login_name.innerHTML = userName;
} else {
  log_reg_btn.style.display = "flex";
  cart_name_btn.style.display = "none";
}

/**
 * !Start Nav Logic
 **/

/**
 * !Start Function Showing Product In UI
 **/
let products = JSON.parse(localStorage.getItem("products")) || [];
let arrWithQuantityItem =
  JSON.parse(localStorage.getItem("clickedProduct")) || [];
function drawProdutcs(allproducts) {
  let arrWithQuantityItemFav =
    JSON.parse(localStorage.getItem("favorites")) || [];
  let x = allproducts.map((product) => {
    chooosenItem = arrWithQuantityItem.find((d) => d.id === product.id) || [];
    chooosenItemFav =
      arrWithQuantityItemFav.find((g) => g.id === product.id) || [];
    console.log(chooosenItemFav.fav);

    return `
   <div class="col-lg-4 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <img
              src="${product.image}"
              class="card-img-top p-2"
              alt="Product_Image"
            />
            <div class="card-body">
            <div class="d-flex  justify-content-between">
            <div>
            <h5 class="card-title">${product.name}</h5>
            <h5 class="card-title">${product.category}</h5>
            </div>
            <div>
            <p class="card-text fw-bold">Price:${product.price}$</p>
            <p class="card-text fw-bold card_icone"><i id="double" class="fa-solid fa-heart" onclick="addToFav(${
              product.id
            })" ondblclick="doublecl(${product.id})" style ="color:${
      chooosenItemFav.fav == true ? "red" : ""
    }"></i></p>
  
            </div>
            </div>
              <div class="d-flex justify-content-between align-items-center">
                <buttom href="" class="btn btn-primary" id="add_cart_btn" onclick="addToCart(${
                  product.id
                })">Add To Cart</buttom>
                <div class="text-center d-flex align-items-center">
               
                <i class="fa-regular fa-square-minus" onclick="decrement(${
                  product.id
                })"></i>
                <span class="mx-3" id=${product.id}>${
      chooosenItem.quntity == undefined ? 0 : chooosenItem.quntity
    }</span>
                <i class="fa-regular fa-square-plus"  onclick="increment(${
                  product.id
                })"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
   `;
  });
  productsUI.innerHTML = x.join(" ");
}
drawProdutcs(JSON.parse(localStorage.getItem("products")) || []);

/**
 * !End Function Showing Product In UI
 **/

/**
 * !Start Function Add To Cart
 **/
let cartAddedProduct = JSON.parse(localStorage.getItem("clickedProduct")) || [];
function addToCart(id) {
  if (userName) {
    clickedProduct = products.find((p) => p.id === id);
    existProductAdded = cartAddedProduct.find(
      (e) => e.id === clickedProduct.id
    );
    if (!existProductAdded) {
      cartAddedProduct.push(clickedProduct);
    } else {
      existProductAdded.quntity += 1;
    }
    console.log(cartAddedProduct);
    // cartAddedProduct = [...cartAddedProduct, clickedProduct];
    localStorage.setItem("clickedProduct", JSON.stringify(cartAddedProduct));
  } else {
    window.location = "./login.html";
  }
  calc();
  updateQuantity(id);
}

/**
 * !End Function Add To Cart
 **/

/**
 * !Start Incerment Function
 **/

function increment(id) {
  if (userName) {
    clickedProduct = products.find((p) => p.id === id);
    existProductAdded = cartAddedProduct.find(
      (e) => e.id === clickedProduct.id
    );
    if (!existProductAdded) {
      cartAddedProduct.push(clickedProduct);
    } else {
      existProductAdded.quntity += 1;
    }
    console.log(cartAddedProduct);
    // cartAddedProduct = [...cartAddedProduct, clickedProduct];
    localStorage.setItem("clickedProduct", JSON.stringify(cartAddedProduct));
  } else {
    window.location = "./login.html";
  }
  calc();
  updateQuantity(id);
}

/**
 * !End Incerment Function
 **/

/**
 * !Start Decrement Function
 **/

function decrement(id) {
  if (userName) {
    clickedProduct = products.find((p) => p.id === id);
    existProductAdded = cartAddedProduct.find(
      (e) => e.id === clickedProduct.id
    );
    if (existProductAdded.quntity === 0) {
      return;
    } else {
      existProductAdded.quntity -= 1;
    }
    console.log(cartAddedProduct);
    // cartAddedProduct = [...cartAddedProduct, clickedProduct];
    let filteredProduct = cartAddedProduct.filter((f) => f.quntity !== 0);
    localStorage.setItem("clickedProduct", JSON.stringify(filteredProduct));
  } else {
    window.location = "./login.html";
  }
  calc();
  updateQuantity(id);
}

/**
 * !End Decrement Function
 **/

/**
 * !Start Calculation Of Quantity Function
 **/
function calc() {
  let calcResult = cartAddedProduct
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
  let qty_span = document.getElementById(id);
  productUpdate = cartAddedProduct.find((e) => e.id === id);
  qty_span.innerHTML = productUpdate.quntity;
}

/**
 * !End Update Of Quantity Function
 **/

/**
 * !Start Function Search By Name And Category
 **/

let searchBtn = document.querySelector("#searchBtn");
let selectOption = document.querySelector("#selectOption");

selectOption.addEventListener("change", getValueSelected);
function getValueSelected(e) {
  selectedValue = e.target.value;
}

searchBtn.addEventListener("keyup", (e) => {
  searched = e.target.value;

  if (selectedValue === "name") {
    let seachedNameResult = products.filter((i) =>
      i.name.toLowerCase().includes(searched)
    );
    drawProdutcs(seachedNameResult);
    if (seachedNameResult.length === 0) {
      empty.innerHTML = "There Is No Product With This Name";
    } else {
      empty.innerHTML = "";
    }
  } else {
    if (selectedValue === "category") {
      let seachedNameResult = products.filter((i) =>
        i.category.toLowerCase().includes(searched)
      );
      drawProdutcs(seachedNameResult);
      if (seachedNameResult.length === 0) {
        empty.innerHTML = "There Is No Product With This Category";
      } else {
        empty.innerHTML = "";
      }
    }
  }
});
/**
 * !End Function Search By Name And Category
 **/

/**
 * !End Function Search By Size
 **/

selectOptionSize.addEventListener("change", (e) => {
  selValue = e.target.value;
  products = JSON.parse(localStorage.getItem("products"));
  if (selValue === "all") {
    drawProdutcs(products);
  } else {
    let filteredSize = products.filter((f) => f.size === selValue);
    drawProdutcs(filteredSize);
  }
});

/**
 * !End Function Search By Size
 **/

/**
 * !Start Function Add To Favorites
 **/
AllFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
function addToFav(id) {
  let heartedProduct = products.find((p) => p.id === id);
  let favee = AllFavorites.find((f) => f.id === heartedProduct.id);
  heartedProduct.fav = true;
  if (favee) {
    return;
  } else {
    AllFavorites.push(heartedProduct);
    localStorage.setItem("favorites", JSON.stringify(AllFavorites));
  }
  drawProdutcs(products);
}
/**
 * !End Function Add To Favorites
 **/
// let double = document.querySelector("#double");
// double.addEventListener("dblclick", () => {
//   let heartedProduct = products.find((p) => p.id === id);
//   let favee = AllFavorites.find((f) => f.id === heartedProduct.id);
//   heartedProduct.fav = false;
// });

function doublecl(id) {
  AllFavorites = JSON.parse(localStorage.getItem("favorites"));
  let heartedProduct = products.find((p) => p.id === id);
  let favee = AllFavorites.find((f) => f.id === heartedProduct.id);
  heartedProduct.fav = false;
  localStorage.setItem("favorites", JSON.stringify(AllFavorites));
  console.log(AllFavorites);
}
/**
 * !Start Function For Searching By Select From Options
 **/

// let selectOption = document.querySelector("#selectOption");
// selectOption.addEventListener("change", (e) => {
//   let log = products.filter((o) => o.category === e.target.value);
//   drawProdutcs(log);
//   if (e.target.value === "All") {
//     drawProdutcs(products);
//   }
// });

/**
 * !End Function For Searching By Select From Options
 **/
