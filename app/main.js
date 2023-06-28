
import {
  apiKey,
  getImdb,
  getSearchedImdb,
  renderMovies,
  changeCheckBoxIcon,
  setCheckBoxes,
  saveToLocalStorage
} from "./public/utils.js";

export let savedMoviesIdArr = [];
export let checkedBoxesIdArr = [];
export const moviesFromLocalStorage = JSON.parse(
  localStorage.getItem("savedMovies")
);
export const checkBoxesFromLocalStorage = JSON.parse(
  localStorage.getItem("savedMovies")
);

export const loadingScreen = document.getElementById("loading-screen");
const searchForm = document.getElementById("search-form");
const searchPlaceholder = document.getElementById("search-placeholder");
window.onload = getLocalStorageItems();

function getLocalStorageItems(){
  if (moviesFromLocalStorage) {
    savedMoviesIdArr = moviesFromLocalStorage;
  }
  if (checkBoxesFromLocalStorage) {
    checkedBoxesIdArr =  checkBoxesFromLocalStorage;
  }
  setCheckBoxes();
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
});

document.addEventListener("click", addOrRemoveToWatchlist);
function addOrRemoveToWatchlist(e){
  if (e.target.dataset.id) {
    checkedBoxesIdArr = Array.from(
      document.querySelectorAll(`input[type="checkbox"]:checked`)
      ).map((box) => {
        return box.id;
      }); //gets id of checkboxes
    savedMoviesIdArr = checkedBoxesIdArr;
    changeCheckBoxIcon();
    saveToLocalStorage("savedMovies", savedMoviesIdArr);
    saveToLocalStorage("checkedBoxes", checkedBoxesIdArr);
  }

}


