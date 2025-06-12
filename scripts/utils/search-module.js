import { recipesData } from "../services/recipes.js";
import { displayLightbox } from "../utils/lightbox.js";
import { tagTemplate } from "../templates/tag.template.js";
import { dropdownTagTemplate } from "../templates/dropdown-tag.template.js";
import { recipeCardTemplate } from "../templates/recipe-card.template.js";
import { recipeNumber } from "../utils/nav-dynamic-display.js";

// le tableau dans lequel sont stockées toutes les données de recherche actives
let research = [];

const gallery = document.querySelector(".recipe-gallery");
const noRecipeMessage = document.querySelector(".no-recipe-message");
const allRecipes = recipesData();

export function searchModule() {
  closeTag();
  navbarInputListener();

  const submitBtns = document.querySelectorAll(".search-button");
  // boucle à travers les boutons pour traiter la validation de l'input
  submitBtns.forEach((btn) => {
    // gestion de la validation au clic
    btn.addEventListener("click", () => {
      const input = btn
        .closest(".search")
        .querySelector("input[name='research']");
      search(input);
    });
  });

  // gestion de la validation avec la touché entrée
  const allInputs = document.querySelectorAll("input[name='research']");
  allInputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        // pas de rechargement de la page
        e.preventDefault();
        search(input);
      }
    });
  });
}

// mon algorithme de recherche
function search(input) {
  // la value est une chaîne de caractères en minuscule
  const value = input.value.trim().toLowerCase();

  // clear de l'input si c'est un input vide
  if (!value) return;

  let valid = false;

  // validation de l'input
  // la value est traitée selon l'origine de l'input
  if (input.id === "search-navbar") {
    // pour la navbar, elle est comparée avec tout
    valid = allRecipes.some(
      (recipe) =>
        recipe.name.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(value)
        ) ||
        recipe.appliance.toLowerCase().includes(value) ||
        recipe.ustensils.some((ust) => ust.toLowerCase().includes(value))
    );
  } else if (input.id === "search-ingredients") {
    // pour les ingrédients, elle est comparée avec les ingrédients
    valid = allRecipes.some((recipe) =>
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(value)
      )
    );
  } else if (input.id === "search-appliance") {
    // pour les appareils, elle est comparée avec les appareils
    valid = allRecipes.some((recipe) =>
      recipe.appliance.toLowerCase().includes(value)
    );
  } else if (input.id === "search-ustensils") {
    // pour les ustensiles, elle est comparée avec des ustensiles
    valid = allRecipes.some((recipe) =>
      recipe.ustensils.some((u) => u.toLowerCase().includes(value))
    );
  }

  // en cas de mot-clé invalide dans la barre supérieure, un message est affiché dans la galerie
  if (!valid && input.id === "search-navbar") {
    gallery.classList.add("hidden");
    noRecipeMessage.classList.remove("hidden");
    noRecipeMessage.classList.add("flex");
    gallery.innerHTML = "";
    recipeNumber();
  }

  // si la value a au moins une entrée commune avec le tableau allRecipes et qu'elle n'existe pas déjà dans le tableau
  if (valid && !research.includes(value)) {
    // elle est stockée dans le tableau research
    research.push(value);

    // le terme recherché s'affiche dans un tag sous les menus déroulants
    const filters = document.querySelector(".recipe-filters");
    filters.appendChild(tagTemplate().tagDOM(value));

    if (
      // si l'origine de l'input est un menu déroulant
      ["search-ingredients", "search-appliance", "search-ustensils"].includes(
        input.id
      )
    ) {
      const dropdownMenu = input.closest(".dropdown-menu");
      // le tag est aussi affiché dans le menu déroulant en question
      dropdownMenu
        .querySelector(".actual-inputs")
        .appendChild(dropdownTagTemplate().dropdownTagDOM(value));
    }
    // l'input est cleared
    redisplayGallery();
    displayLightbox();
    input.value = "";
  }
  // ce console.log est uniquement là pour le flex
  console.log(research);
}

// gestion de l'affichage dynamique de la galerie
function redisplayGallery() {
  // filtrage des recettes pour ne garder que celles qui contiennent tous les mots-clés stockés dans research[] dans n'importe quelle propriété
  const filteredRecipes = allRecipes.filter((recipe) => {
    return research.every((keyword) => {
      const keywordLower = keyword.toLowerCase();

      // créer un switch pour gérer les différents inputs selon leur provenance et affiner la recherche
      if (
        recipe.name
          .toLowerCase()
          .includes(recipe.name.toLowerCase().includes(keywordLower))
      ) {
        return true;
      }
      if (recipe.description.toLowerCase().includes(keywordLower)) {
        return true;
      }
      if (
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(keywordLower)
        )
      ) {
        return true;
      }
      if (recipe.appliance.toLowerCase().includes(keywordLower)) {
        return true;
      }
      if (
        recipe.ustensils.some((ust) => ust.toLowerCase().includes(keywordLower))
      ) {
        return true;
      }

      return false;
    });
  });

  gallery.innerHTML = "";

  // si aucune entrée ne correspond, affichage du message
  if (filteredRecipes.length === 0) {
    gallery.classList.add("hidden");
    noRecipeMessage.classList.remove("hidden");
    noRecipeMessage.classList.add("flex");
    gallery.innerHTML = "";
    recipeNumber();
  } else {
    filteredRecipes.forEach((recipe) => {
      gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
    });
  }

  // mise à jour de la fonction de compteur dynamique des recettes
  recipeNumber(filteredRecipes.length);
}

export function closeTag() {
  // event listener des filtres
  const filters = document.getElementById("navbar");
  filters.addEventListener("click", (e) => {
    const cross = e.target.closest(".tag-cross-icon");

    // récupération du keyword pour le supprimer dans le tableau research[]
    const tag = cross.closest(".filter");
    const keyword = tag.querySelector("p")?.textContent.toLowerCase();

    // supprime le tag cliqué
    tag.remove();

    // supprime le tag correspondant dans l'autre emplacement (menu déroulant ou barre de recherche)
    document.querySelectorAll(".filter").forEach((t) => {
      const tText = t.querySelector("p")?.textContent.toLowerCase();
      if (tText === keyword) {
        t.remove();
      }
    });

    // retire le mot-clé du tableau research[]
    research = research.filter((term) => term !== keyword);

    // cache le message si besoin
    if (noRecipeMessage.classList.contains("flex")) {
      noRecipeMessage.classList.remove("flex");
      noRecipeMessage.classList.add("hidden");
      gallery.classList.remove("hidden");
    }

    // mise à jour la galerie
    redisplayGallery();
    displayLightbox();
  });
}

export function navbarInputListener() {
  const navbarInput = document.querySelector("#search-navbar");
  navbarInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    // lorsque l'input est vide
    if (value === "") {
      if (research.length > 0) {
        // s'il y a des mots-clés actifs on réaffiche la galerie filtrée avec ces mots-clés
        redisplayGallery();
        displayLightbox();

        // et on masque le message "aucune recette trouvée"
        noRecipeMessage.classList.remove("flex");
        noRecipeMessage.classList.add("hidden");
        gallery.classList.remove("hidden");
      } else {
        // sinon on affiche toutes les recettes
        gallery.innerHTML = "";
        allRecipes.forEach((recipe) => {
          gallery.appendChild(recipeCardTemplate().recipeCardDOM(recipe));
        });

        // et on masque le message "aucune recette trouvée"
        noRecipeMessage.classList.remove("flex");
        noRecipeMessage.classList.add("hidden");
        gallery.classList.remove("hidden");

        // mise à jour du compteur dynamique
        recipeNumber(allRecipes.length);
        displayLightbox();
      }
    }
  });
}
