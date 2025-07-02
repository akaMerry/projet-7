import { tagTemplate } from "../templates/tag.template.js";
import { dropdownTagTemplate } from "../templates/dropdown-tag.template.js";
import { redisplayGallery } from "./gallery.js";
import { dropdownAfterSubmit } from "./dropdown-menus.js";

const filters = document.querySelector(".recipe-filters");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");

export const state = {
  search: "",
  ingredients: [],
  ustensils: [],
  appliance: null,
};

export function searchModule(onSubmit) {
  const searchForm = document.querySelectorAll("form.search");

  searchForm.forEach((form) => {
    const input = form.querySelector("input");

    // écoute le formulaire
    form.addEventListener("submit", (event) => {
      // pas de rechargement de la page
      event.preventDefault();
      // la recherche est un formdata
      const searchData = new FormData(event.target);
      // la valeur est associée à l'ID de l'input
      searchData.append("id", input.id);

      onSubmit(searchData, input);
      console.log(Object.fromEntries(searchData));
      console.log(state);
    });
  });
}

searchModule((searchData, input) => {
  const id = searchData.get("id");
  const value = searchData.get("research");
  const standardValue = value.toLowerCase();
  const tagName = standardValue;

  switch (id) {
    case "search-navbar":
      state.search = standardValue;
      break;

    case "search-ingredients":
      if (!state.ingredients.includes(standardValue)) {
        state.ingredients.push(standardValue);
        createTag(tagName, id);
        dropdownAfterSubmit(input);
      }
      break;

    case "search-ustensils":
      if (!state.ustensils.includes(standardValue)) {
        state.ustensils.push(standardValue);
        createTag(tagName, id);
        dropdownAfterSubmit(input);
      }
      break;

    case "search-appliance":
      state.appliance = standardValue;
      createTag(tagName, id);
      dropdownAfterSubmit(input);
      break;
  }

  redisplayGallery();
});

// gestion de la création des tags
function createTag(tagName, id) {
  filters.appendChild(tagTemplate().tagDOM(tagName));

  dropdownMenus.forEach((menu) => {
    const tagSection = menu.querySelector(".actual-inputs");
    const group = menu.closest(".group");

    if (group.classList.contains(`recipe-${id}`)) {
      tagSection.appendChild(dropdownTagTemplate().dropdownTagDOM(tagName));
    }
  });
}

// gestion de la suppression des tags
export function closeTag() {
  document.getElementById("navbar").addEventListener("click", (event) => {
    const cross = event.target.closest(".tag-cross-icon");
    if (!cross) return;

    const tag = cross.closest(".filter");
    const keyword = tag.querySelector("p")?.textContent;
    if (!keyword) return;

    tag.remove();

    // supprime également le tag dans l'autre emplacement
    document.querySelectorAll(".filter").forEach((pairedTag) => {
      const pairedTagText = pairedTag.querySelector("p").textContent;
      if (pairedTagText === keyword) {
        pairedTag.remove();
      }
    });

    if (state.ingredients.includes(keyword)) {
      state.ingredients = state.ingredients.filter((item) => item !== keyword);
    } else if (state.ustensils.includes(keyword)) {
      state.ustensils = state.ustensils.filter((item) => item !== keyword);
    } else if (state.appliance === keyword) {
      state.appliance = null;
    }

    redisplayGallery();
    console.log(state);
  });
}
