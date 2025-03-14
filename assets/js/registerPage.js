import { postAuth } from "./service/apiService.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const btn = document.getElementById("btn");

btn.addEventListener("click", async function (e) {
  e.preventDefault();

  try {
    document.getElementById("overlay").classList.toggle("overlay");
    document.getElementById("loader").classList.toggle("loader");
    const register = await postAuth("/auth/register", {
      username: username.value,
      email: email.value,
      password: pass.value,
    });

    if (register.data.success) {
      document.getElementById("overlay").classList.toggle("overlay");
      document.getElementById("loader").classList.toggle("loader");
      Swal.fire({
        title: "Register account",
        text: "Register account is successfully",
        icon: "success",
      });

      return setTimeout(() => {
        window.location.href = "../../public/login.html";
      }, 1800);
    }
  } catch (error) {
    // document.getElementById("overlay").classList.toggle("overlay");
    // document.getElementById("loader").classList.toggle("loader");
    console.log(error);
  }
});
