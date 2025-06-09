export function dropdownMenu() {
  // Select each dropdown group
  const dropdowns = document.querySelectorAll(
    ".recipe-search-ingredients, .recipe-search-appliance, .recipe-search-ustensils"
  );

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");
    const menu = dropdown.querySelector(".dropdown-menu");
    const search = dropdown.querySelector(".search-container");
    const input = search.querySelector("input");
    const erase = search.querySelector(".icon-cross");

    // Toggle menu open/close
    button.addEventListener("click", () => {
      const expanded = dropdown.getAttribute("aria-expanded") === "true";
      dropdown.setAttribute("aria-expanded", expanded ? "false" : "true");

      if (expanded) {
        button.classList.add("rounded-xl");
        button.classList.remove("rounded-t-xl");
      } else {
        button.classList.remove("rounded-xl");
        button.classList.add("rounded-t-xl");
      }
    });

    // Show/hide cross icon depending on input content
    input.addEventListener("input", () => {
      if (input.value.length > 0) {
        erase.classList.remove("hidden");
        erase.classList.add("flex");
      } else {
        erase.classList.add("hidden");
        erase.classList.remove("flex");
      }
    });

    // Clear input when cross icon is clicked
    erase.addEventListener("click", () => {
      input.value = "";
      erase.classList.add("hidden");
      erase.classList.remove("flex");
    });
  });
}
