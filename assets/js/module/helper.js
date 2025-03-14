import { getData } from "../service/apiService.js";
const totalPrice = document.getElementById("totalPrice");
const quantitySummary = document.getElementById("quantitySummary");
const unitPrice = document.getElementById("unitPrice");
const modal = document.getElementById("checkoutModal");

//update total harga
export async function updateTotalPrice(price) {
  const quantity = parseInt(quantityInput.value);
  quantitySummary.textContent = quantity;
  totalPrice.textContent = formatPrice(price * quantity);
}

//open modal checkout
export async function openCheckoutModal(productId) {
  const getProduct = await getData(`/product/${productId}`);
  const price = Math.floor(getProduct.data.data.price);
  const product = (document.getElementById("modalProductImage").src = "img");
  document.getElementById("modalProductName").textContent =
    getProduct.data.data.name;
  document.getElementById("modalProductPrice").textContent = formatPrice(price);
  document.getElementById("productId").value = productId;
  const total = document.getElementById("totalPrice");
  total.textContent = formatPrice(price);
  unitPrice.textContent = formatPrice(price);
  updateTotalPrice(price);

  // Reset quantity ke 1
  quantityInput.value = 1;
  quantitySummary.textContent = 1;

  // Sembunyikan pesan sukses jika sebelumnya ditampilkan
  successMessage.style.display = "none";

  modal.style.display = "flex";
}

//format harga
export function formatPrice(price) {
  return price.toLocaleString("id-ID");
}
