const dropdownMenus = document.querySelectorAll(
  ".recipe-search-ingredients, .recipe-search-appliance, .recipe-search-ustensils"
);

// fonctionnement général du menu déroulant
export function dropdownMenuBehaviour() {
  dropdownMenus.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");

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
  });
}

// gestion du comportement de l'input
export function dropdownInputBehaviour() {
  dropdownMenus.forEach((dropdown) => {
    const search = dropdown.querySelector(".search-container");
    const input = search.querySelector("input");
    const cross = search.querySelector(".icon-cross");
    const suggestions = dropdown.querySelector(".suggestions");

    // si l'input est vide la croix disparaît
    input.addEventListener("input", () => {
      const value = input.value.trim().toLowerCase();

      if (value === "" && cross.classList.contains("flex")) {
        cross.classList.add("hidden");
        cross.classList.remove("flex");
      } else {
        cross.classList.remove("hidden");
        cross.classList.add("flex");
      }
    });

    // lorsqu'on clique sur la croix, l'input est cleared et les suggestions masquées
    cross.addEventListener("click", () => {
      input.value = "";
      cross.classList.add("hidden");
      cross.classList.remove("flex");
      suggestions.innerHTML = "";
    });
  });
}

// gestion du comportement du menu déroulant après validation de l'input
export function dropdownAfterSubmit(input) {
  input.value = "";

  const dropdown = input.closest(".group");
  const cross = dropdown.querySelector(".icon-cross");

  cross.classList.add("hidden");
  cross.classList.remove("flex");

  closeAllDropdowns();
}

function closeAllDropdowns() {
  dropdownMenus.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");
    dropdown.setAttribute("aria-expanded", "false");
    button.classList.remove("rounded-t-xl");
    button.classList.add("rounded-xl");

    const suggestions = dropdown.querySelector(".suggestions");
    suggestions.innerHTML = "";
  });
}
