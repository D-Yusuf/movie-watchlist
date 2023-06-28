import {
  apiKey,
  getImdb,
  getSearchedImdb,
  renderMovies,
  changeCheckBoxIcon,
  setCheckBoxes,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "./public/utils.js";

export let savedMoviesIdArr = [];
export let checkedBoxesIdArr = [];
let count = 0
export const moviesFromLocalStorage = JSON.parse(
  localStorage.getItem("savedMovies")
);
export const checkBoxesFromLocalStorage = JSON.parse(
  localStorage.getItem("checkedBoxes")
);
const countFromLocalStorage = JSON.parse(
  localStorage.getItem("themeCount")
);
const changeThemeBtn = document.getElementById("change-theme")

export const loadingScreen = document.getElementById("loading-screen");
const searchForm = document.getElementById("search-form");
const searchPlaceholder = document.getElementById("search-placeholder");
window.onload = getLocalStorageItems; // onload

export function getLocalStorageItems() {
  if (moviesFromLocalStorage) {
    savedMoviesIdArr = moviesFromLocalStorage;
  }
  if (checkBoxesFromLocalStorage) {
    checkedBoxesIdArr = checkBoxesFromLocalStorage;
  }
  if (countFromLocalStorage) {
    count = countFromLocalStorage;
    getCurrentTheme()
  }

  setCheckBoxes(checkedBoxesIdArr);
}
function getCurrentTheme(){
  const symbol = changeThemeBtn.querySelector("span")
  if(count % 2 === 0){
    document.documentElement.classList.add("dark")
    symbol.innerHTML = "&#127769;"
  }else{
    document.documentElement.classList.remove("dark")
    symbol.innerHTML = "&#9728;"
    
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedMovie = document.getElementById("movie-search").value;
  loadingScreen.classList.remove("hidden"); //add loading screen
  // getLocalStorageItems();
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
export function addOrRemoveToWatchlist(e) {
  if (e.target.dataset.id && e.target.type == "checkbox") {
    const checkboxId = e.target.id;

    if (!e.target.checked) {
      removeFromLocalStorage(checkboxId);
      checkedBoxesIdArr = checkedBoxesIdArr.filter(id => id !== checkboxId);
      savedMoviesIdArr = checkedBoxesIdArr;
      changeCheckBoxIcon();
      saveToLocalStorage("savedMovies", savedMoviesIdArr);
      saveToLocalStorage("checkedBoxes", checkedBoxesIdArr);
    } else {
      const newlyCheckedBoxes = Array.from(
        document.querySelectorAll(`[data-id="${e.target.dataset.id}"]`)
      ).map((box) => box.id);

      // Merge the newly selected checkboxes with the existing ones
      checkedBoxesIdArr = [...checkedBoxesIdArr, ...newlyCheckedBoxes];

      // Remove duplicates from the checkedBoxesIdArr
      checkedBoxesIdArr = Array.from(new Set(checkedBoxesIdArr));
      savedMoviesIdArr = checkedBoxesIdArr;
      changeCheckBoxIcon();
      saveToLocalStorage("savedMovies", savedMoviesIdArr);
      saveToLocalStorage("checkedBoxes", checkedBoxesIdArr);
    }
  }
}

changeThemeBtn.addEventListener("click", changeTheme)
function changeTheme(){
  count += 1
  getCurrentTheme()
  if(count == 2){count = 0}
  saveToLocalStorage("themeCount", count)
}
