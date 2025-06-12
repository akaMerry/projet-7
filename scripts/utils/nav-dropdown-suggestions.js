import { recipesData } from "../services/recipes.js";

export function suggestions() {
  const dropdowns = document.querySelectorAll(
    ".recipe-search-ingredients, .recipe-search-appliance, .recipe-search-ustensils"
  );

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");
    const search = dropdown.querySelector(".search-container");
    const input = search.querySelector("input");
    const suggestionSection = search.querySelector(".suggestions");
    const cross = search.querySelector(".icon-cross");
    let suggestions = [];
    // la value est une chaîne de caractères en minuscule

    input.addEventListener("change", () => {
      const value = input.value.trim().toLowerCase();
      if (input.length > 2) {
        switch (input.id) {
          case "search-ingredients":
            allRecipes.some((recipe) =>
              recipe.ingredients.some((ing) =>
                ing.ingredient.toLowerCase().match(value)
              )
            );
            break;

          case "search-appliance":
            allRecipes.some((recipe) =>
              recipe.appliance.toLowerCase().match(value)
            );
            break;

          case "search-ustensils":
            allRecipes.some((recipe) =>
              recipe.ustensils.some((u) => u.toLowerCase().match(value))
            );
            break;
        }
      }
    });
  });
}
