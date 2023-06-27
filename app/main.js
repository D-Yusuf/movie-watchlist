const apiKey = import.meta.env.VITE_API_KEY;
import starIcon from "./images/star-icon.svg";
import addIcon from "./images/add-movie-icon.svg";
import addIconDark from "./images/add-movie-icon-dark.svg";
import removeIcon from "./images/remove-movie-icon.svg";
import removeIconDark from "./images/remove-movie-icon-dark.svg";
import {getImdb, getSearchedImdb, renderMovies ,changeCheckBoxIcon} from "./public/utils.js"
export let movieCheckboxesId = [];
export const moviesFromLocalStorage = JSON.parse(
  localStorage.getItem("movieCheckBoxes")
);

const searchForm = document.getElementById("search-form");
const loadingScreen = document.getElementById("loading-screen");
const searchPlaceholder = document.getElementById("search-placeholder");
if (moviesFromLocalStorage) {
  movieCheckboxesId = moviesFromLocalStorage
  console.log(movieCheckboxesId);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedMovie = document.getElementById("movie-search").value;
  loadingScreen.classList.remove("hidden"); //add loading screen
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchedMovie}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response == "False") {
        searchPlaceholder.innerHTML = `<h1 class="text-[#DFDDDD] dark:text-[#2E2E2F] font-bold text-lg mt-2 max-w-xs text-center">
          Unable to find what you're looking for. Please try another search.
        </h1>`;
        loadingScreen.classList.add("hidden");
      } else {
        renderMovies(data.Search);
      }
    });
  searchForm.reset();
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    changeCheckBoxIcon()
    movieCheckboxesId = Array.from(
      document.querySelectorAll(`input[type="checkbox"]:checked`)
    ).map((box) => {return box.id}); //gets id of checkboxes
    saveToLocalStorage("movieCheckBoxes", movieCheckboxesId);
  }
});
function saveToLocalStorage(key, arr) {
  // save to local storage
  localStorage.setItem(key, JSON.stringify(arr));
}
fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=hello`)
  .then((res) => res.json())
  .then(async (data) => {
    await renderMovies(data.Search);
  });

