

function render(proArr) {
  var contentHTML = "";

  for (var i = 0; i < proArr.length; i++) {
    var pro = proArr[i];
    // pro là item trong array proList
    var contentTr = `<tr>
        <td>${pro.id}</td>
        <td class="content-product-h3">${pro.name}</td>
        <td class="price">${pro.price}</td>
        <td>${pro.screen}</td>
        <td>${pro.backCamera}</td>
        <td>${pro.frontCamera}</td>
        <td>
        <img src="${pro.img}" class="img-thumbnail img-prd" width = "100"/>
        </td>
        <td>${pro.desc}</td>
        <td>${pro.type}</td>
        <td>
        <button class="btn btn-success btn-add-to-cart" data-product="${pro.id}">Add phone to cart</button>
        </td>
        </tr>`;
    contentHTML = contentHTML + contentTr;
  }
  document.querySelector("#tbodyPrd").innerHTML = contentHTML;

  var addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", function () {
      var productId = this.getAttribute("data-product");
      const productById = proArr.find((item) => item.id === productId);
      renderProductToCart(productById);
      console.log("productById: ", productById);
      document.getElementById("myModal").style.display = "block";
    });
  }
}

// biến global chứa các sản phẩm có trong giỏ hàng
const CART_PRODUCTS = [];

function renderProductToCart(product) {
  // check if the product is already in the cart
  if (CART_PRODUCTS.includes(product.id)) {
    // get the input field element for the product and increase its value by 1
    const inputElement = document.querySelector(
      `.product-${product.id} .cart-quantity-input`
    );
    inputElement.value = parseInt(inputElement.value) + 1;
  } else {
    // add the product to the cart array
    CART_PRODUCTS.push(product.id);
    // Cột Img
    var cartColumn = document.createElement("div");
    cartColumn.classList.add("cart-item", "cart-column", "justify-center");

    var imgProduct = document.createElement("img");
    imgProduct.classList.add("cart-item-image");
    imgProduct.src = product.img;
    imgProduct.width = 100;

    var nameProduct = document.createElement("span");
    nameProduct.classList.add("cart-item-title");
    nameProduct.innerHTML = product.name;

    cartColumn.appendChild(imgProduct);
    cartColumn.appendChild(nameProduct);

    // Cột giá
    var priceProduct = document.createElement("span");
    priceProduct.classList.add("cart-price", "cart-column", "justify-center");
    priceProduct.innerHTML = product.price + "$";

    // Cột số lượng
    var productQuantityColumn = document.createElement("div");
    productQuantityColumn.classList.add(
      "cart-quantity",
      "cart-column",
      "justify-center"
    );

    var productQuantityInput = document.createElement("input");
    productQuantityInput.setAttribute("type", "number");
    productQuantityInput.classList.add("cart-quantity-input");
    productQuantityInput.value = 1;

    // Nút xóa
    var productDeleteButton = document.createElement("button");
    productDeleteButton.classList.add("btn", "btn-danger");
    productDeleteButton.innerHTML = "Delete";

    productQuantityColumn.appendChild(productQuantityInput);
    productQuantityColumn.appendChild(productDeleteButton);

    // Khối html của 1 sản phẩm
    var newCartRow = document.createElement("div");
    newCartRow.classList.add("cart-row", `product-${product.id}`);

    newCartRow.appendChild(cartColumn);
    newCartRow.appendChild(priceProduct);
    newCartRow.appendChild(productQuantityColumn);

    // add the new product row to the cart

    const modalCartItems = document.querySelector(
      "#myModal .modal-body > .cart-items"
    );

    modalCartItems.appendChild(newCartRow);

    updatecart();
  }
  // thay đổi số lượng sản phẩm
  var quantity_input = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
      var input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updatecart();
    });
  }
  clearProduct();

  localStorage.setItem("cart", JSON.stringify(CART_PRODUCTS));
}
// Clear product
function clearProduct() {
  var remove_cart = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i];
    button.addEventListener("click", function (event) {
      var button_remove = event.target;
      button_remove.parentElement.parentElement.remove();
      updatecart();
    });
  }
}
// Clear cart
function clearCart() {
  var clear_cart = document.querySelector(".cart-items");
  clear_cart.innerHTML = "";
  updatecart();
}
// update cart
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i];
    var price_item = cart_row.getElementsByClassName("cart-price ")[0];
    var quantity_item = cart_row.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(price_item.innerText); // chuyển một chuổi string sang number để tính tổng tiền.
    var quantity = quantity_item.value; // lấy giá trị trong thẻ input
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "$";
  // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên sử dụng [0].
}

// search
async function getAllProduct() {
  return await axios
    .get("https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro")
    .then(function (res) {
      return res.data;
    });
}

async function search() {
  batLoading();
  searchName = document.getElementById("txtSearch").value;
  console.log("searchName: ", searchName);
  let prdList = await getAllProduct();
  var newArr = prdList.filter(function (item) {
    return item.name.toLowerCase().includes(searchName.toLowerCase());
  });
  tatLoading();
  render(newArr);
}

function batLoading() {
  document.getElementById("loading").style.display = "flex";
}

function tatLoading() {
  document.getElementById("loading").style.display = "none";
}


function renderCartJSON (cartPrd) {
  var cartPrd = JSON.parse(localStorage.getItem("cart"));
  return cartPrd;
}
renderCartJSON();