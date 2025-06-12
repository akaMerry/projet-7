import { recipesData } from "../services/recipes.js";
import { recipeCardTemplate } from "../templates/recipe-card.template.js";
import { displayLightbox } from "../utils/recipe-lightbox.js";
import { recipeNumber } from "../utils/nav-dynamic-display.js";
import { dropdownMenu } from "../utils/nav-dropdown-menus.js";
import { closeTag } from "../utils/search-module.js";
import { navbarInputListener } from "../utils/search-module.js";
import { searchModule } from "../utils/search-module.js";

// gestion de l'affichage initial de toutes les recettes
export function displayRecipeCards() {
  const gallery = document.querySelector(".recipe-gallery");
  gallery.innerHTML = "";

  recipesData().forEach((recipe) => {
    gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
  });
}

dropdownMenu();
displayRecipeCards();
searchModule();
displayLightbox();
closeTag();
recipeNumber();
navbarInputListener();
