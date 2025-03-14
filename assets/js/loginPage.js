import { postAuth } from "./service/apiService.js";

const email = document.getElementById("email");
const pass = document.getElementById("password");
const btn = document.getElementById("btn");

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    document.getElementById("overlay").classList.toggle("overlay");
    document.getElementById("loader").classList.toggle("loader");
    const login = await postAuth("/auth/login", {
      email: email.value,
      password: pass.value,
    });
    if (login.data.success) {
      document.getElementById("overlay").classList.toggle("overlay");
      document.getElementById("loader").classList.toggle("loader");
      return (window.location.href = "../index.html");
    }
  } catch (error) {
    console.log(error.message);
  }
});
