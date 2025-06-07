import { recipesData } from "../services/recipes.js";
import { recipeCardTemplate } from "../templates/recipe-card-template";
function dropdownMenu() {
  const containers = document.querySelectorAll(".recipe-search_container");

  // pour chaque menu déroulant
  containers.forEach((container) => {
    const button = container.querySelector(".dropdown_btn");
    const menu = container.querySelector(".dropdown_menu");
    const search = menu.querySelector(".search");
    const input = search.querySelector("input");
    const erase = search.querySelector(".icon-erase");

    // au clic le menu se déroule ou se referme + style
    button.addEventListener("click", () => {
      if (container.getAttribute("aria-expanded") === "false") {
        container.setAttribute("aria-expanded", "true");
        button.classList.remove("rounded-xl");
        button.classList.add("rounded-t-xl");
      } else {
        container.setAttribute("aria-expanded", "false");
        button.classList.add("rounded-xl");
        button.classList.remove("rounded-t-xl");
      }
    });

    // event lsitener à l'input pour le comportement de l'icone croix "erase"
    input.addEventListener("input", () => {
      if (input.value.length > 0) {
        erase.classList.remove("hidden");
        erase.classList.add("flex");
      } else {
        erase.classList.add("hidden");
        erase.classList.remove("flex");
      }
    });

    // event listener sur l'icone croix
    erase.addEventListener("click", () => {
      input.value = "";
      erase.classList.add("hidden");
      erase.classList.remove("flex");
    });
  });
}

dropdownMenu();

function displayRecipeCards() {
  const gallery = document.querySelector(".recipe-gallery");
  gallery.innerHTML = "";

  recipesData().forEach((recipe) => {
    const recipesCardDom = recipeCardTemplate().recipeCardDOM(recipe);
    gallery.appendChild(recipesCardDom);
  });
}

displayRecipeCards();
