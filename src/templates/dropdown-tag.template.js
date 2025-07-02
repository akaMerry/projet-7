export function dropdownTagTemplate() {
  function dropdownTagDOM(tagName) {
    // Déclaration des éléments
    const tag = document.createElement("div");
    const text = document.createElement("p");
    const crossIcon = document.createElement("div");
    const cross = document.createElement("div");
    const leftCross = document.createElement("div");
    const rightCross = document.createElement("div");

    // Tailwind CSS
    tag.className =
      "filter flex p-4 h-9 mb-1 w-full bg-yellow items-center justify-between";
    text.className = "filter-text font-bold";
    text.textContent = `${tagName}`;
    crossIcon.className =
      "icon icon-cross tag-cross-icon flex cursor-pointer w-4 h-4 ml-3";
    cross.className =
      "bg-black rounded-full w-4 h-4 items-center justify-center flex relative";
    leftCross.className =
      "absolute rotate-45 bg-yellow h-px w-1/2 rounded-full";
    rightCross.className =
      "absolute rotate-135 bg-yellow h-px w-1/2 rounded-full";

    // rattachement des éléments
    cross.appendChild(rightCross);
    cross.appendChild(leftCross);
    crossIcon.appendChild(cross);
    tag.appendChild(text);
    tag.appendChild(crossIcon);
    return tag;
  }
  return { dropdownTagDOM };
}
