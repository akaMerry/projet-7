export function recipeNumber() {
  const numberText = document.querySelector(".recipe-number-text");
  const gallery = document.querySelector(".recipe-gallery");
  const articles = gallery.querySelectorAll("article");

  const number = articles.length;
  // au singulier s'il n'y a aucune ou 1 recette
  numberText.textContent = `${number} recette${number > 1 ? "s" : ""}`;
}
