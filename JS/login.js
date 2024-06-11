let email = document.querySelector("#email");
let password = document.querySelector("#password");
let login_btn = document.querySelector("#login_btn");
emailValue = localStorage.getItem("email");
passwordValue = localStorage.getItem("password");
login_btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value === emailValue) {
    email.classList.add("borderedgreen");
  } else {
    email.classList.add("bordered");
  }

  if (password.value === passwordValue) {
    password.classList.add("borderedgreen");
  } else {
    password.classList.add("bordered");
  }
  if (password.value === passwordValue && email.value === emailValue) {
    setTimeout(() => {
      window.location = "./index.html";
    }, 1500);
  }
});
