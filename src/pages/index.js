import { displayRecipeCards } from "../utils/gallery.js";
import { navbarInputListener } from "../utils/navbar.js";
import {
  dropdownMenuBehaviour,
  dropdownInputBehaviour,
} from "../utils/dropdown-menus.js";
import { closeTag } from "../utils/search-module.js";
import { state } from "../utils/search-module.js";

displayRecipeCards();
navbarInputListener(state);
dropdownMenuBehaviour();
dropdownInputBehaviour();
closeTag();
