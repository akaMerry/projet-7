import { recipesData } from "../services/recipes.js";
import { recipeLightboxTemplate } from "../templates/recipe-lightbox.template.js";

// gestion de la fiche recette
export function displayLightbox() {
  const modal = document.querySelector("#lightbox-modal");
  const gallery = document.querySelector(".recipe-gallery");
  const articles = gallery.querySelectorAll("article");
  const lightbox = document.querySelector(".recipe-lightbox");
  const recipes = recipesData();

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

  // pour chaque article, un event listener qui ouvre la lightbox
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
