export function recipeLightboxTemplate() {
  function recipeLightboxDOM(recipe) {
    // Déclaration des éléments
    const article = document.createElement("article");
    article.setAttribute("data-id", recipe.id);
    const img = document.createElement("img");
    img.setAttribute("alt", recipe.name);
    img.setAttribute("src", recipe.picture);
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
    const crossIcon = document.createElement("div");
    const cross = document.createElement("div");
    const leftCross = document.createElement("div");
    const rightCross = document.createElement("div");

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
      ingredient.className = "text-sm text-black font-medium";
      quantity.className = "text-sm text-grey";

      entry.appendChild(ingredient);
      entry.appendChild(quantity);
      grid.appendChild(entry);
    });

    // Tailwind CSS
    article.className =
      "flex flex-col shadow-md bg-white w-95 h-fit max-h-screen rounded-xl relative";
    tag.className =
      "flex absolute h-6.5 bg-yellow text-black font-medium rounded-full p-4 left-5 top-5 items-center text-xs shadow-sm";
    img.className = "h-63.5 w-full object-cover rounded-t-lg";
    text.className = "p-7 overflow-y-scroll";
    title.className = "font-primary text-lg mb-8";
    preview.className = "font-bold text-xs text-grey bold uppercase mb-4";
    description.className = "mb-8 text-sm";
    instructions.className = "font-bold text-xs text-grey bold uppercase mb-4";
    grid.className = "grid flex grid-cols-2 gap-5 self-center";
    crossIcon.className =
      "icon icon-cross cursor-pointer items-center w-6.5 h-6.5 absolute right-5 top-5";
    cross.className =
      "relative flex w-6.5 h-6.5 items-center justify-center bg-yellow rounded-full shadow-sm";
    leftCross.className =
      "absolute flex rotate-45 bg-black h-0.5 w-1/2 rounded-full";
    rightCross.className =
      "absolute flex rotate-135 bg-black h-0.5 w-1/2 rounded-full";
    // rattachement des éléments
    article.appendChild(img);
    article.appendChild(text);
    article.appendChild(tag);
    cross.appendChild(leftCross);
    cross.appendChild(rightCross);
    crossIcon.appendChild(cross);
    article.appendChild(crossIcon);
    text.appendChild(title);
    text.appendChild(preview);
    text.appendChild(description);
    text.appendChild(instructions);
    text.appendChild(grid);
    return article;
  }
  return { recipeLightboxDOM };
}
