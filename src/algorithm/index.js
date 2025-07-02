/**
 *
 * @param {Array} recipes
 * @param {{ search:string; ingredients:string[]; ustensils:string[]; appliance:string|null }} state
 * @returns {Array}
 */
function algorithm(recipes, state) {
  const searchValue = state.search.toLowerCase();

  return recipes.filter((recipe) => {
    // recherche texte dans nom ou description
    const matchesSearch =
      searchValue.length === 0 ||
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue);

    // tous les ingrédients du state doivent être dans la recette
    const matchesIngredients = state.ingredients.every((ing) =>
      recipe.ingredients.some((rIng) =>
        rIng.ingredient.toLowerCase().includes(ing.toLowerCase())
      )
    );

    // tous les ustensils du state doivent être dans la recette
    const matchesUstensils = state.ustensils.every((ust) =>
      recipe.ustensils.some((rUst) => rUst.toLowerCase() === ust.toLowerCase())
    );

    // l'appareil doit correspondre ou être null dans le state
    const matchesAppliance =
      !state.appliance ||
      recipe.appliance.toLowerCase() === state.appliance.toLowerCase();

    return (
      matchesSearch &&
      matchesIngredients &&
      matchesUstensils &&
      matchesAppliance
    );
  });
}

export default algorithm;
