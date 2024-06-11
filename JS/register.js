let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let reg_btn = document.querySelector("#reg_btn");
let Allinputs = document.querySelectorAll(".row div input");

// reg_btn.addEventListener("click", (e) => {
//   e.preventDefault();

//   if (!firstName.value || !lastName.value || !email.value || !password.value) {
//     firstName.classList.add("bordered");
//   } else {
//     firstName.classList.add("borderedgreen");
//     localStorage.setItem("firstName", firstName.value);
//     setTimeout(() => {
//       window.location = "../login.html";
//     }, 1500);
//   }
// });

reg_btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!firstName.value.trim()) {
    firstName.classList.add("bordered");
  } else {
    firstName.classList.add("borderedgreen");
    localStorage.setItem("firstName", firstName.value);
  }
  if (!lastName.value.trim()) {
    lastName.classList.add("bordered");
  } else {
    lastName.classList.add("borderedgreen");
    localStorage.setItem("lastName", lastName.value);
  }
  if (!email.value.trim()) {
    email.classList.add("bordered");
  } else {
    email.classList.add("borderedgreen");
    localStorage.setItem("email", email.value);
  }
  if (!password.value) {
    password.classList.add("bordered");
  } else {
    password.classList.add("borderedgreen");
    localStorage.setItem("password", password.value);
  }
  if (
    firstName.value.trim() &&
    lastName.value.trim() &&
    email.value.trim() &&
    password.value
  ) {
    setTimeout(() => {
      window.location = "./login.html";
    }, 1500);
  }
});
