import { recipesData } from "../services/recipes.js";
import { recipeCardTemplate } from "../templates/recipe-card-template";
import { displayLightbox } from "../utils/lightbox.js";

// gestion des menus déroulants
function dropdownMenu() {
  const containers = document.querySelectorAll(".recipe-search_container");

  // pour chaque menu déroulant
  containers.forEach((container) => {
    const button = container.querySelector(".dropdown_btn");
    const menu = container.querySelector(".dropdown_menu");
    const search = menu.querySelector(".search");
    const input = search.querySelector("input");
    const erase = search.querySelector(".icon-cross");

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

// gestion de l'affichage initial de toutes les recettes
function displayRecipeCards() {
  const gallery = document.querySelector(".recipe-gallery");
  gallery.innerHTML = "";

  recipesData().forEach((recipe) => {
    gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
  });
}

// initialisation de la page
async function init() {
  dropdownMenu();
  displayRecipeCards();
  displayLightbox();
}

init();

// algorithme de tri :

// saisie dans un input

// BARRE DE RECHERCHE
// si la saisie a minimum 3 caractères
// et correspond à un ou plusieurs termes parmi TITRE, INGREDIENTS, DESCRIPTIONS
// => tri et réaffichage de la gallerie en conséquence
// => affichage du tag parmi les filters
//
// si la saisie ne correspond à rien
// => affichage du message "aucune recette ne contient le terme "blabla". Essayez avec un terme différent comme "tarte aux pommes" ou "poisson"."
// + un bouton pour réinitialiser la recherche
// si la recherche correspond
// mise à jour de la galerie

// NAVBAR
// si la saisie a minimum 2 caractères
// menu d'auto-complétion selon les lettres saisies
// lors de la sélection d'un terme
// terme validé = input.value
// affichage du tag parmi les filters et dans le menu déroulant
// chaque clic sur une croix réinitialise les filtres
// tri selon les input.content
// mise à jour de la galerie
//
//cliquer sur la croix un tag réinitialise la galerie
