const form = document.getElementById("registerForm");
const alertBox = document.getElementById("alertBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  console.log(confirmPassword);

  if (password !== confirmPassword) {
    alertBox.classList.remove("hidden");
    alertBox.className =
      "p-4 text-red-300 bg-red-900 border border-red-700 rounded";

    alertBox.innerHTML = "❌ Wachtwoorden komen niet overeen";
    return;
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    alertBox.classList.remove("hidden");

    if (response.ok) {
      alertBox.className =
        "p-4 text-green-300 bg-green-900 border border-green-700 rounded";

      alertBox.innerHTML = "Account aangemaakt!";

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alertBox.classList.remove("hidden");

    alertBox.className =
      "p-4 text-red-300 bg-red-900 border border-red-700 rounded";

    alertBox.innerHTML = error.message || "Registratie mislukt";
  }
});
