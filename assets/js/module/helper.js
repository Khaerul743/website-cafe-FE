const totalPrice = document.getElementById("totalPrice");
const quantitySummary = document.getElementById("quantitySummary");
const unitPrice = document.getElementById("unitPrice");
const modal = document.getElementById("checkoutModal");

//update total harga
export function updateTotalPrice() {
  const quantity = parseInt(quantityInput.value);
  quantitySummary.textContent = quantity;
  totalPrice.textContent = formatPrice(10000 * quantity);
}

//open modal checkout
export function openCheckoutModal(productId) {
  document.getElementById("modalProductImage").src = "img";
  document.getElementById("modalProductName").textContent = "Dummy data";
  document.getElementById("modalProductPrice").textContent = formatPrice(10000);

  unitPrice.textContent = formatPrice(10000);
  updateTotalPrice();

  // Reset quantity ke 1
  quantityInput.value = 1;
  quantitySummary.textContent = 1;

  // Sembunyikan pesan sukses jika sebelumnya ditampilkan
  successMessage.style.display = "none";

  modal.style.display = "flex";
}

//format harga
function formatPrice(price) {
  return "Rp " + price.toLocaleString("id-ID");
}
