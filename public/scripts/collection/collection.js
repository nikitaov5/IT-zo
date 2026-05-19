const deleteButtons = document.querySelectorAll(".deleteBtn");
const alertBox = document.getElementById("alertBox");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const gameId = button.dataset.id;

    try {
      const response = await fetch(`/collection/remove/${gameId}`, {
        method: "POST",
      });

      if (response.ok) {
        alertBox.classList.remove("hidden");

        alertBox.innerHTML = "Game verwijderd uit collectie";

        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
