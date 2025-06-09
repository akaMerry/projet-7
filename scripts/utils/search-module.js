import { recipesData } from "../services/recipes.js";
import { tagTemplate } from "../templates/tag.template.js";
import { dropdownTagTemplate } from "../templates/dropdown-tag.template.js";

export function searchModule() {
  const submitBtns = document.querySelectorAll(".search-button");
  const inputs = document.querySelectorAll(".dropdown-search-container input");

  // TO DO boucle à travers les menus déroulants pour gérer la suggestion
  inputs.forEach((input) => {
    const dropdownMenu = input.closest(".dropdown-search-container");
    const suggestions = dropdownMenu.querySelector(".suggestions");

    if (input.value.length > 3) {
    }
  });

  // boucle à travers les boutons pour traiter la validation de l'input
  submitBtns.forEach((btn) => {
    // gestion de la validation au clic
    btn.addEventListener("click", () => {
      const container = btn.closest(".search-container");
      const input = container.querySelector("input[name='research']");
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

  // TO DO gestion
}

// mon algorythme de recherche
function search(input) {
  const allRecipes = recipesData();
  // la value est une chaîne de caractères en minuscule
  const value = input.value.trim().toLowerCase();
  // le tableau dans lequel sont stockées toutes les données de recherche actives
  let research = [];

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
    valid = allRecipes.some(
      (recipe) => recipe.appliance.toLowerCase() === value
    );
  } else if (input.id === "search-ustensils") {
    // pour les ustensiles, elle est comparée avec des ustensiles
    valid = allRecipes.some((recipe) =>
      recipe.ustensils.some((u) => u.toLowerCase() === value)
    );
  }

  // si la data a au moins une entrée commune avec le tableau allRecipes, elle est valide
  if (valid) {
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
      const dropdownMenu = input.closest(".dropdown-search-container");
      const actualInputs = dropdownMenu.querySelector(".actual-inputs");
      // les tags sont aussi affichés dans le menu déroulant en question
      actualInputs.appendChild(dropdownTagTemplate().dropdownTagDOM(value));
    }
    // l'input est cleared
    input.value = "";
  }
  // ce console.log est uniquement là pour le flex
  console.log(research);
}
