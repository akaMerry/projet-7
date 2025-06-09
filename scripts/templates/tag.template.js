export function tagTemplate() {
  function tagDOM(value) {
    // Déclaration des éléments
    const tag = document.createElement("div");
    const text = document.createElement("p");
    const crossIcon = document.createElement("div");
    const leftCross = document.createElement("div");
    const rightCross = document.createElement("div");

    // Tailwind CSS
    tag.className =
      "filter flex mr-4 p-4 h-14 w-fit bg-yellow rounded-xl items-center";
    text.classname = "filter-text flex text-sm";
    text.textContent = `${value}`;
    crossIcon.className =
      "icon icon-cross tag-cross-icon flex cursor-pointer items-center w-5 h-5 ml-3 relative";
    leftCross.className =
      "absolute rotate-45 bg-black h-0.5 w-full rounded-full";
    rightCross.className =
      "absolute rotate-135 bg-black h-0.5 w-full rounded-full";

    // rattachement des éléments
    crossIcon.appendChild(rightCross);
    crossIcon.appendChild(leftCross);
    tag.appendChild(text);
    tag.appendChild(crossIcon);
    return tag;
  }
  return { tagDOM };
}
