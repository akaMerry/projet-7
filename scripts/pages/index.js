import { recipesData } from "../services/recipes.js";
import { recipeCardTemplate } from "../templates/recipe-card.template.js";
import { displayLightbox } from "../utils/lightbox.js";
import { recipeNumber } from "../utils/nav-dynamic-display.js";
import { dropdownMenu } from "../utils/nav-dropdown-menus.js";
import { searchAlgorhythm } from "../utils/search-algorhythm.js";

// gestion de l'affichage initial de toutes les recettes
function displayRecipeCards() {
  const gallery = document.querySelector(".recipe-gallery");
  gallery.innerHTML = "";

  recipesData().forEach((recipe) => {
    gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
  });
}
dropdownMenu();
displayRecipeCards();
searchAlgorhythm();
displayLightbox();
recipeNumber();
