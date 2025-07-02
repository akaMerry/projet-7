export function recipeCardTemplate() {
  function recipeCardDOM(recipe) {
    // Déclaration des éléments
    const article = document.createElement("article");
    article.setAttribute("data-id", recipe.id);
    const img = document.createElement("img");
    img.setAttribute("alt", recipe.name);
    img.setAttribute("src", `/assets/recipes/${recipe.image}`);
    const text = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = recipe.name;
    const preview = document.createElement("h2");
    preview.textContent = "recette";
    const instructions = document.createElement("h2");
    instructions.textContent = "ingrédients";
    const description = document.createElement("p");
    description.textContent = recipe.description;
    const grid = document.createElement("grid");
    const tag = document.createElement("div");
    tag.textContent = recipe.time + " min";

    // Placement des ingrédients dans la grille
    recipe.ingredients.forEach((item) => {
      const entry = document.createElement("div");
      const ingredient = document.createElement("p");
      const quantity = document.createElement("p");

      ingredient.textContent = item.ingredient;

      if (item.unit) {
        quantity.textContent = item.quantity + " " + item.unit;
      } else {
        quantity.textContent = item.quantity;
      }
      ingredient.className =
        "recipe-ingredients text-sm text-black font-medium";
      quantity.className = "text-sm text-grey";

      entry.appendChild(ingredient);
      entry.appendChild(quantity);
      grid.appendChild(entry);
    });

    // Tailwind CSS
    article.className =
      "flex flex-col shadow-md bg-white w-95 h-183 rounded-xl cursor-pointer relative";
    tag.className =
      "flex absolute h-6.5 bg-yellow text-black rounded-full p-4 right-5 top-5 items-center text-xs";
    img.className = "h-63.5 w-full object-cover rounded-t-lg";
    text.className = "p-7";
    title.className = "font-primary text-lg mb-8";
    preview.className = "font-bold text-xs text-grey bold uppercase mb-4";
    description.className = "mb-8 h-20 text-sm overflow-hidden text-ellipsis";
    instructions.className = "font-bold text-xs text-grey bold uppercase mb-4";
    grid.className = "grid grid-cols-2 gap-5 self-center";

    // rattachement des éléments
    article.appendChild(img);
    article.appendChild(text);
    article.appendChild(tag);
    text.appendChild(title);
    text.appendChild(preview);
    text.appendChild(description);
    text.appendChild(instructions);
    text.appendChild(grid);
    return article;
  }
  return { recipeCardDOM };
}
