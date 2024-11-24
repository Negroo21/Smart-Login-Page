var username = document.getElementById("signName");
var email = document.getElementById("signEmail");
var password = document.getElementById("signPassword");
var errorMessage = document.getElementById("signup-error-message");

function signup() {
  var username = document.getElementById("signName").value;
  var email = document.getElementById("signEmail").value;
  var password = document.getElementById("signPassword").value;

  if (username === "" || email === "" || password === "") {
    errorMessage.textContent = "All fields are required";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var userExists = users.some(
    (user) => user.username === username || user.email === email
  );
  if (userExists) {
    errorMessage.textContent = "Username or Email already taken";
    return;
  }

  users.push({ username, email, password });

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
}

function login() {
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  var errorMessage = document.getElementById("login-error-message");

  if (username === "" || password === "") {
    errorMessage.textContent = "Both fields are required";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    errorMessage.textContent = "";
    localStorage.setItem("activeUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    errorMessage.textContent = "Invalid username or password";
  }
}

function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

function validateAllData(e) {
  var regex = {
    signName: /^[a-z0-9_-]{3,15}$/,
    signEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    signPassword:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };

  if (regex[e.id].test(e.value) == true) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
  }

  if (
    username.classList.contains("is-invalid") ||
    email.classList.contains("is-invalid") ||
    password.classList.contains("is-invalid")
  ) {
    errorMessage.textContent = "Please fix the errors before submitting";
  }
}
