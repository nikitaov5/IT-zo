const form = document.getElementById("loginForm");
const alertBox = document.getElementById("alertBox");
const alertText = document.getElementById("alertText");

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

  // reset alert
  alertBox.classList.remove("hidden");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alertBox.classList.remove("hidden");
    alertBox.classList.remove("bg-red-900", "border-red-700", "text-red-300");

    alertBox.classList.add(
      "bg-green-900",
      "border-green-700",
      "text-green-300",
    );

    alertText.innerHTML =
      "<span class='font-medium me-1'>Success!</span> Login gelukt!";

    setTimeout(() => {
      window.location.href = "./home.html";
    }, 1500);
  } else {
    alertBox.classList.remove("hidden");
    alertBox.classList.add(
      "bg-green-900",
      "border-green-700",
      "text-green-300",
    );

    alertBox.classList.add("bg-red-900", "border-red-700", "text-red-300");

    alertText.innerHTML =
      "<span class='font-medium me-1'>Error!</span> Email of wachtwoord is fout.";
  }
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
});
