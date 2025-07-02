import { recipes } from "../services/recipes.js";
import { recipeCardTemplate } from "../templates/recipe-card.template.js";
import { recipeLightboxTemplate } from "../templates/recipe-lightbox.template.js";
import { state } from "./search-module.js";
import algorithm from "../algorithm/index.js";

const gallery = document.querySelector(".recipe-gallery");
const noRecipeMessage = document.querySelector(".no-recipe-message");

// gestion de l'affichage des recettes
export function displayRecipeCards(recipesToDisplay = recipes) {
  const gallery = document.querySelector(".recipe-gallery");
  gallery.innerHTML = "";

  recipesToDisplay.forEach((recipe) => {
    gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
  });

  updateRecipeNumber(recipesToDisplay.length);
}

// mise à jour du compteur de recettes
function updateRecipeNumber() {
  const numberText = document.querySelector(".recipe-number-text");
  const gallery = document.querySelector(".recipe-gallery");
  const articles = gallery.querySelectorAll("article");

  const number = articles.length;
  // au singulier s'il n'y a aucune ou 1 recette
  numberText.textContent = `${number} recette${number > 1 ? "s" : ""}`;
}

// gestion de la fiche recette
function displayLightbox() {
  const modal = document.querySelector("#lightbox-modal");
  const gallery = document.querySelector(".recipe-gallery");
  const articles = gallery.querySelectorAll("article");
  const lightbox = document.querySelector(".recipe-lightbox");

  // event listener qui ferme la modale au clic hors de l'article
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }
  });

  // event listener qui ferme la modale avec la touche échap si la fiche recette est ouverte
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }
  });

  // pour chaque article, un event listener qui ouvre la fiche recette
  articles.forEach((item) => {
    item.addEventListener("click", () => {
      lightbox.innerHTML = "";

      const currentRecipe = recipes.find(
        (recipe) => recipe.id.toString() === item.getAttribute("data-id")
      );

      lightbox.appendChild(
        recipeLightboxTemplate().recipeLightboxDOM(currentRecipe)
      );

      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // event listener qui ferme la modale au clic sur la croix
      const cross = modal.querySelector(".icon-cross");
      if (cross) {
        cross.addEventListener("click", () => {
          modal.classList.remove("flex");
          modal.classList.add("hidden");
        });
      }
    });
  });
}

// gestion du comportement global de la galerie
export function redisplayGallery() {
  const filteredRecipes = algorithm(recipes, state);
  console.log(filteredRecipes);

  if (filteredRecipes.length === 0) {
    gallery.classList.add("hidden");
    noRecipeMessage.classList.remove("hidden");
    noRecipeMessage.classList.add("flex");
    gallery.innerHTML = "";
    updateRecipeNumber();
    return;
  }

  if (filteredRecipes && noRecipeMessage.classList.contains("flex")) {
    noRecipeMessage.classList.remove("flex");
    noRecipeMessage.classList.add("hidden");
    gallery.classList.add("flex");
    gallery.classList.remove("hidden");
    gallery.innerHTML = "";
  }

  displayRecipeCards(filteredRecipes);
  displayLightbox();
}
