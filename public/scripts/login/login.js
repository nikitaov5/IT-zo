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

    if (response.ok) {
      alertBox.className =
        "p-4 rounded text-sm bg-green-900 text-green-300 border border-green-700";

      alertBox.innerHTML = "Login gelukt!";

      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } else {
      throw new Error(data.message || "Login mislukt");
    }
  } catch (error) {
    alertBox.className =
      "p-4 rounded text-sm bg-red-900 text-red-300 border border-red-700";

    alertBox.innerHTML = error.message || "Login mislukt";
  }
});
