import { updateTotalPrice, openCheckoutModal } from "./module/helper.js";
import { getData, postData } from "./service/apiService.js";
import { formatPrice } from "./module/helper.js";

// Modal & Checkout Functionality
const modal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
const quantityInput = document.getElementById("quantityInput");
const checkoutBtn = document.getElementById("checkoutBtn");
const successMessage = document.getElementById("successMessage");
const cartBadge = document.getElementById("cartBadge");

let currentProduct = null;
let cartCount = 0;

const renderProduct = async () => {
  const productCard = document.getElementById("product");
  try {
    const getProducts = await getData("/product");
    const products = getProducts.data.data;
    if (products.success == false) return alert("Login dulu bang");

    const productsMap = products
      .map((product) => {
        const price = Math.floor(product.price);
        return `
            <div class="product-card">
              <img src="" alt="product.png" class="product-image" />
              <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">Rp. ${formatPrice(price)}</div>
                <data value=${product.id}></data>
                <button class="buy-button">Beli</button>
              </div>
            </div>`;
      })
      .join("");

    productCard.innerHTML = productsMap;
  } catch (error) {
    alert(error.message);
  }
};

renderProduct();
// Menghasilkan tampilan produk
// function renderProducts() {
//   const productsContainer = document.querySelector(".products");

//   products.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.className = "product-card";

//     productCard.innerHTML = `
//               <img src="${product.image}" alt="${
//       product.name
//     }" class="product-image">
//               <div class="product-info">
//                   <div class="product-name">${product.name}</div>
//                   <div class="product-price">${formatPrice(
//                     product.price
//                   )}</div>
//                   <button class="buy-button" data-id="${
//                     product.id
//                   }">Beli</button>
//               </div>
//           `;

//     productsContainer.appendChild(productCard);
//   });

// Menambahkan event listener untuk tombol Beli
//   document.querySelectorAll(".buy-button").forEach((button) => {
//     button.addEventListener("click", function () {
//       const productId = parseInt(this.getAttribute("data-id"));
//       openCheckoutModal(productId);
//     });
//   });
// }

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("buy-button")) {
    const id = e.target.previousElementSibling.value;
    openCheckoutModal(id);
  }
});

// Membuka modal checkout
// function openCheckoutModal(productId) {
//   document.getElementById("modalProductImage").src = "img";
//   document.getElementById("modalProductName").textContent = "Dummy data";
//   document.getElementById("modalProductPrice").textContent = formatPrice(10000);

//   unitPrice.textContent = formatPrice(10000);
//   updateTotalPrice();

//   // Reset quantity ke 1
//   quantityInput.value = 1;
//   quantitySummary.textContent = 1;

//   // Sembunyikan pesan sukses jika sebelumnya ditampilkan
//   successMessage.style.display = "none";

//   modal.style.display = "flex";
// }

// Update jumlah & total harga
// function updateTotalPrice() {
//   const quantity = parseInt(quantityInput.value);
//   quantitySummary.textContent = quantity;
//   totalPrice.textContent = formatPrice(10000 * quantity);
// }

// Event listeners
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

decreaseBtn.addEventListener("click", function (e) {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    if (e.target.classList.contains("minus")) {
      const price =
        e.target.parentElement.nextElementSibling.firstElementChild
          .lastElementChild.textContent;
      const angkaBersih = parseInt(price.replace(/[^\d]/g, ""), 10);
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue - 1;
      updateTotalPrice(angkaBersih);
    }
  }
});

increaseBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("plus")) {
    const price =
      e.target.parentElement.nextElementSibling.firstElementChild
        .lastElementChild.textContent;
    const angkaBersih = parseInt(price.replace(/[^\d]/g, ""), 10);
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateTotalPrice(angkaBersih);
  }
});

quantityInput.addEventListener("change", function () {
  // Pastikan nilai tidak kurang dari 1
  if (parseInt(this.value) < 1) {
    this.value = 1;
  }
  updateTotalPrice();
});

// checkoutBtn.addEventListener("click", function () {
//   // Tambahkan ke cart badge
//   cartCount += parseInt(quantityInput.value);
//   cartBadge.textContent = cartCount;
//   cartBadge.style.display = "flex";

//   // Tampilkan pesan sukses
//   successMessage.style.display = "block";

//   // Setelah 3 detik, tutup modal
//   setTimeout(function () {
//     modal.style.display = "none";
//   }, 3000);
// });

const btnCheckout = document.getElementById("checkoutBtn");
btnCheckout.addEventListener("click", function (e) {
  Swal.fire({
    title: "Yakin?",
    text: "apakah kamu ingin membelinya?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, beli!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil",
        text: "Item berhasil dibeli",
        icon: "success",
      });

      const product_id = e.target.nextElementSibling.value;
      if (!product_id)
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

      const productPrice =
        e.target.previousElementSibling.firstElementChild.firstElementChild
          .nextElementSibling.textContent;
      const angkaBersih = parseInt(productPrice.replace(/[^\d]/g, ""), 10);

      const quantity =
        e.target.previousElementSibling.firstElementChild.nextElementSibling
          .lastElementChild.textContent;

      await postData("/cart", {
        product_id,
        quantity,
        price: angkaBersih,
      });

      // // Tambahkan ke cart badge
      // cartCount += parseInt(quantityInput.value);
      // cartBadge.textContent = cartCount;
      // cartBadge.style.display = "flex";

      // // Tampilkan pesan sukses
      // successMessage.style.display = "block";

      // // Setelah 3 detik, tutup modal
      // setTimeout(function () {
      //   modal.style.display = "none";
      // }, 3000);
    }
  });
});
