let form = document.getElementById("loginForm");

const users = [
  {
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    email: "user1234@gmail.com",
    password: "1234",
  },
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let userLogin;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      userLogin = user;
    }
  });

  if (userLogin) {
    alert("Login succesvol!");
    window.location.href = "./home.html";
  } else {
    alert("Foute login");
  }
});
