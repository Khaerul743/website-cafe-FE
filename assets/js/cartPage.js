import { postData, getData, deleteData } from "./service/apiService.js";
import { formatPrice } from "./module/helper.js";

// postData("/auth/login", { email: "K@gmail.com", password: "12345678" }).then(
//   (res) => console.log(res.data)
// );

const cartItems = document.getElementById("cart-items");
const renderProduct = async () => {
  const getProducts = await getData("/cart");
  if (getProducts.data.success == false)
    return Swal.fire({
      title: "Error",
      text: "Anda harus login terlebih dahulu",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../public/login.html";
      }
    });
  const products = await getProducts.data.data;

  const productsMap = await Promise.all(
    products.map(async (product) => {
      const price = Math.floor(product.price);
      const getProduct = await getData(`/product/${product.product_id}`);
      const productName = getProduct.data.data.name;
      return `
            <div class="cart-item">
              <div class="row g-0">
                <div class="col-md-3">
                  <img
                    src="/api/placeholder/400/320"
                    alt="Product 1"
                    class="cart-item-img"
                  />
                </div>
                <div class="col-md-9">
                  <div class="cart-item-details">
                    <div class="d-flex justify-content-between">
                      <h4 class="cart-item-title">${productName}</h4>
                      <data value="${product.id}"></data>
                      <i class="fas fa-times cart-item-remove"></i>
                    </div>
                    <p class="text-muted">Dark Roast, 250g</p>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="quantity-control">
                        <button class="quantity-btn">
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${product.quantity}</span>
                        <button class="quantity-btn">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="cart-item-price">Rp. ${formatPrice(
                        price
                      )}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
    })
  );
  cartItems.innerHTML = productsMap.join("");
  const totalPrice = products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  document.getElementById("total-price").innerText = `Rp. ${formatPrice(
    totalPrice
  )}`;

  document.getElementById("quantity").innerText = products.length;
  document.getElementById("total").innerText = `Rp. ${formatPrice(totalPrice)}`;
};
renderProduct();

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("cart-item-remove")) {
    const emptyCart = document.getElementById("empty-cart");
    const containerItem =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    containerItem.style.opacity = "0";
    containerItem.style.transform = "translateX(100px)";
    containerItem.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      containerItem.remove();

      // Check if cart is empty
      if (cartItems.children.length === 0) {
        cartItems.style.display = "none";
        emptyCart.style.display = "flex";

        // Animate the empty cart appearance
        emptyCart.style.opacity = "0";
        emptyCart.style.transform = "translateY(20px)";

        setTimeout(() => {
          emptyCart.style.opacity = "1";
          emptyCart.style.transform = "translateY(0)";
          emptyCart.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        }, 10);
      }
    }, 500);
    const orderId = e.target.previousElementSibling.value;
    await deleteData(`/cart/${orderId}`);
  }
});

// Demo functionality for the cart
document.addEventListener("DOMContentLoaded", function () {
  // Remove buttons functionality
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      cartItem.style.opacity = "0";
      cartItem.style.transform = "translateX(100px)";
      cartItem.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        cartItem.remove();

        // Check if cart is empty
        if (cartItems.children.length === 0) {
          cartItems.style.display = "none";
          emptyCart.style.display = "flex";

          // Animate the empty cart appearance
          emptyCart.style.opacity = "0";
          emptyCart.style.transform = "translateY(20px)";

          setTimeout(() => {
            emptyCart.style.opacity = "1";
            emptyCart.style.transform = "translateY(0)";
            emptyCart.style.transition =
              "opacity 0.5s ease, transform 0.5s ease";
          }, 10);
        }
      }, 500);
    });
  });

  // Quantity buttons functionality
  const quantityBtns = document.querySelectorAll(".quantity-btn");

  quantityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const quantityValue = this.parentElement.querySelector(".quantity-value");
      let value = parseInt(quantityValue.textContent);

      if (this.querySelector(".fa-plus")) {
        value++;
      } else if (value > 1) {
        value--;
      }

      quantityValue.textContent = value;

      // Animation for the button
      this.style.transform = "scale(0.8)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });
  });

  // Continue shopping button
  const continueBtn = document.querySelector(".continue-shopping-btn");

  continueBtn.addEventListener("click", function () {
    emptyCart.style.display = "none";
    cartItems.style.display = "block";

    // Re-add demo items
    const demoItems = document.querySelectorAll(".cart-item");
    demoItems.forEach((item) => {
      const clone = item.cloneNode(true);
      cartItems.appendChild(clone);
    });
  });
});

const checkoutBtn = document.getElementById("checkout");
checkoutBtn.addEventListener("click", async function (e) {
  const getProducts = await getData("/cart");
  if (getProducts.data.success == false)
    return Swal.fire({
      title: "Error",
      text: "Anda harus login terlebih dahulu",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../public/login.html";
      }
    });
  const products = await getProducts.data.data;
  if (products.length == 0)
    return Swal.fire({
      title: "Error",
      text: "Cart masih kosong.",
      icon: "error",
    });
  Swal.fire({
    title: "Yakin?",
    text: "Apakah kamu ingin membelinya?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Lakukan pembayaran!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil",
        text: "Tunggu beberapa saat.",
        icon: "success",
      });
      const postOrder = await postData("/order", { items: products });
      if (postOrder.data.success == false)
        return alert("Gagal membeli product");
      const orderId = postOrder.data.data.order_id;
      console.log(orderId);
      const createTransaction = await postData("/payment/transaction", {
        order_id: orderId,
      });
      const paymentUrl = createTransaction.data.payment_url;
      window.location.href = paymentUrl;
    }

    // const products = await getProducts.data.data;
    // if (products.length == 0) return alert("Cart masih kosong");
    // const postOrder = await postData("/order", { items: products });
    // if (postOrder.data.success == false) return alert("Gagal membeli product");
  });
});
