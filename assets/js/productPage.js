import { updateTotalPrice, openCheckoutModal } from "./module/helper.js";

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
    openCheckoutModal(10);
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

decreaseBtn.addEventListener("click", function () {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
    updateTotalPrice();
  }
});

increaseBtn.addEventListener("click", function () {
  const currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
  updateTotalPrice();
});

quantityInput.addEventListener("change", function () {
  // Pastikan nilai tidak kurang dari 1
  if (parseInt(this.value) < 1) {
    this.value = 1;
  }
  updateTotalPrice();
});

checkoutBtn.addEventListener("click", function () {
  // Tambahkan ke cart badge
  cartCount += parseInt(quantityInput.value);
  cartBadge.textContent = cartCount;
  cartBadge.style.display = "flex";

  // Tampilkan pesan sukses
  successMessage.style.display = "block";

  // Setelah 3 detik, tutup modal
  setTimeout(function () {
    modal.style.display = "none";
  }, 3000);
});

// Initialize
// renderProducts();
