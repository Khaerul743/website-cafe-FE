import { api } from "./apiConfig.js";

export const getData = async (endPoint) => {
  try {
    const response = await api({
      url: endPoint,
      method: "GET",
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const postData = async (endPoint, data) => {
  try {
    const response = await api({
      url: endPoint,
      method: "POST",
      data: data,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error.response.data.message === "Invalid token") {
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
    }
  }
};

export const postAuth = async (endPoint, data) => {
  try {
    const response = await api({
      url: endPoint,
      method: "POST",
      data: data,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    document.getElementById("overlay").classList.toggle("overlay");
    document.getElementById("loader").classList.toggle("loader");
    const message = error.response.data.message[0];
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = `<p>${message}</p>`;
  }
};

export const deleteData = async (endPoint) => {
  try {
    const response = await api({
      url: endPoint,
      method: "DELETE",
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return console.log(error.message);
  }
};
