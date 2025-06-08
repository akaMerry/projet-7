export function recipeNumber() {
  const numberText = document.querySelector(".recipe-number-text");
  const gallery = document.querySelector(".recipe-gallery");
  const articles = gallery.querySelectorAll("article");

  const number = articles.length;
  numberText.textContent = `${number} recette${number > 1 ? "s" : ""}`;
}
