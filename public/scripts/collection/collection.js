const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const gameId = button.dataset.id;

    try {
      const response = await fetch(`/collection/remove/${gameId}`, {
        method: "POST",
      });

      if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });
});
