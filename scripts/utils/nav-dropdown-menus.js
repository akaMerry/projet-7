export function dropdownMenu() {
  const dropdowns = document.querySelectorAll(
    ".recipe-search-ingredients, .recipe-search-appliance, .recipe-search-ustensils"
  );

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");
    const search = dropdown.querySelector(".search-container");
    const input = search.querySelector("input");
    const cross = search.querySelector(".icon-cross");

    // ouverture et fermeture des menus déroulants
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

    // si l'input est vide la croix disparaît
    input.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (value === "" && cross.classList.contains("flex")) {
        cross.classList.add("hidden");
        cross.classList.remove("flex");
      } else {
        cross.classList.remove("hidden");
        cross.classList.add("flex");
      }
    });

    // lorsqu'on clique sur la croix, l'input est cleared
    cross.addEventListener("click", () => {
      input.value = "";
      cross.classList.add("hidden");
      cross.classList.remove("flex");
    });
  });
}
