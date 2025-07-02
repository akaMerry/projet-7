import { redisplayGallery } from "./gallery.js";

const input = document.querySelector("input#search-navbar");

export function navbarInputListener(state) {
  input.addEventListener("input", () => {
    if (input.value === "" && state.search !== "") {
      state.search = "";

      redisplayGallery();
    }
  });
}
