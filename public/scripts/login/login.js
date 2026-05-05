const form = document.getElementById("loginForm");
const alertBox = document.getElementById("alertBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    alertBox.classList.remove("hidden");

    if (response.ok) {
      alertBox.className =
        "p-4 text-green-300 bg-green-900 border border-green-700 rounded";

      alertBox.innerHTML = "Login gelukt!";

      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alertBox.classList.remove("hidden");

    alertBox.className =
      "p-4 text-red-300 bg-red-900 border border-red-700 rounded";

    alertBox.innerHTML = error.message || "Login mislukt";
  }
});
