
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
  localStorage.getItem("checkedBoxes")
);

export const loadingScreen = document.getElementById("loading-screen");
const searchForm = document.getElementById("search-form");
const searchPlaceholder = document.getElementById("search-placeholder");
window.onload = getLocalStorageItems; // onload

export function getLocalStorageItems(){
  if (moviesFromLocalStorage) {
    savedMoviesIdArr = moviesFromLocalStorage;
  }
  if (checkBoxesFromLocalStorage) {
    checkedBoxesIdArr =  checkBoxesFromLocalStorage;
  }
  
  setCheckBoxes(checkedBoxesIdArr);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedMovie = document.getElementById("movie-search").value;
  loadingScreen.classList.remove("hidden"); //add loading screen
  getLocalStorageItems();
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchedMovie}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response == "False") {
        searchPlaceholder.innerHTML = `<h1 class="text-[#DFDDDD] dark:text-[#2E2E2F] font-bold text-lg mt-2 max-w-xs text-center">
      Unable to find what you're looking for. Please try another search.
      </h1>`;
        loadingScreen.classList.add("hidden");
      } else {
        renderMovies(data.Search, checkedBoxesIdArr);
      }
      
    });
});

document.addEventListener("click", addOrRemoveToWatchlist);
function addOrRemoveToWatchlist(e){
  if (e.target.dataset.id) {
    
    const newlyCheckedBoxes = Array.from(
      document.querySelectorAll(`input[type="checkbox"]:checked`)
    ).map((box) => box.id);

    // Merge the newly selected checkboxes with the existing ones
    checkedBoxesIdArr = [...checkedBoxesIdArr, ...newlyCheckedBoxes];

    // Remove duplicates from the checkedBoxesIdArr
    checkedBoxesIdArr = Array.from(new Set(checkedBoxesIdArr));
      console.log(checkedBoxesIdArr)
      savedMoviesIdArr = checkedBoxesIdArr.slice();
    changeCheckBoxIcon();
    saveToLocalStorage("savedMovies", savedMoviesIdArr);
    saveToLocalStorage("checkedBoxes", checkedBoxesIdArr);
  }

}


