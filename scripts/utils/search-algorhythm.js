import { recipesData } from "../services/recipes.js";
import { tagTemplate } from "../templates/tag.template.js";
import { dropdownTagTemplate } from "../templates/dropdown-tag.template.js";

export function searchAlgorhythm() {
  const submitBtns = document.querySelectorAll(".search-button");
  let research = [];

  const inputs = document.querySelectorAll(".dropdown-search-container input");

  inputs.forEach((input) => {
    const dropdownMenu = input.closest(".dropdown-search-container");
    const suggestions = dropdownMenu.querySelector(".suggestions");

    if (input.value.length > 3) {
    }
  });

  submitBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".search-container");
      const input = container.querySelector("input");

      const allRecipes = recipesData();

      // la value est une chaîne de caractères en minuscule
      const value = input.value.trim().toLowerCase();

      let valid = false;

      // clear de l'input si c'est un input vide
      if (!value) return;

      // la value est traitée selon l'origine de l'input
      if (input.id === "search-navbar") {
        valid = allRecipes.some(
          (recipe) =>
            recipe.name.toLowerCase().includes(value) ||
            recipe.description.toLowerCase().includes(value)
        );
      } else if (input.id === "search-ingredients") {
        valid = allRecipes.some((recipe) =>
          recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(value)
          )
        );
      } else if (input.id === "search-appliance") {
        valid = allRecipes.some(
          (recipe) => recipe.appliance.toLowerCase() === value
        );
      } else if (input.id === "search-ustensils") {
        valid = allRecipes.some((recipe) =>
          recipe.ustensils.some((u) => u.toLowerCase() === value)
        );
      }

      if (valid) {
        // la data est stockée dans le tableau research
        research.push(value);

        // l'input est cleared
        input.value = "";

        // les filtres s'affichent aux endroits donnés
        const filters = document.querySelector(".recipe-filters");
        filters.appendChild(tagTemplate().tagDOM(value));
        const dropdownMenu = input.closest(".dropdown-search-container");
        const actualInputs = dropdownMenu.querySelector(".actual-inputs");
        actualInputs.appendChild(dropdownTagTemplate().dropdownTagDOM(value));
        const inputCross = dropdownMenu.querySelector(".icon-cross");
        inputCross.classList.add("hidden");
        inputCross.classList.remove("flex");
      }

      // ce console.log est uniquement là pour le flex
      console.log(research);
    });
  });
}
