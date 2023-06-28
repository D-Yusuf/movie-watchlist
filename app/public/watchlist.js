import starIcon from "../images/star-icon.svg";
import addIcon from "../images/add-movie-icon.svg";
import addIconDark from "../images/add-movie-icon-dark.svg";
import removeIcon from "../images/remove-movie-icon.svg";
import removeIconDark from "../images/remove-movie-icon-dark.svg";
import { apiKey, setCheckBoxes, saveToLocalStorage, removeFromLocalStorage } from "./utils.js";
import { moviesFromLocalStorage, checkBoxesFromLocalStorage, getLocalStorageItems } from "../main.js";
import { checkedBoxesIdArr, savedMoviesIdArr } from "../main.js";
const savedMovies = document.getElementById("saved-movies");
// setCheckBoxes()
let moviesId = moviesFromLocalStorage;
let checkedBoxes = checkBoxesFromLocalStorage;
async function renderWatchlist() {
    const searchedMovies = await getSearchedMovies()
    let moviesHtml = ``
    searchedMovies.forEach((movie) => {
        const { Title, Genre, Plot, Poster, imdbRating, imdbID, Runtime } = movie;
        moviesHtml += `
          <div data-movie="${imdbID}" class="flex">
          <img src="${Poster}" class="max-w-[6.5rem] max-h-[9.2rem]" alt="poster" />
          <div class="ml-[1.31rem]">
            <div class="flex items-center">
              <h1 class="text-lg font-medium mr-2">${Title}</h1>
              <span class="flex">
                <img
                  class="mr-1 w-[0.9375rem] h-[0.9375rem]"
                  src="${starIcon}"
                  alt="star"
                />
                <p class="text-xs">${imdbRating}</p>
              </span>
            </div>
            <div class="flex mt-[0.69rem]">
              <p class="sm:mr-[1.19rem] mr-3 text-xs">${Runtime}</p>
              <p class="sm:mr-[1.19rem] mr-3 text-xs whitespace-normal"><span class="break-words">${Genre}</span></p>
              <input hidden type="checkbox" data-id="${imdbID}" id="${imdbID}" />
              <label for="${imdbID}" class="cursor-pointer text-xs gap-x-[0.31rem] flex flex-wrap sm:w-fit phone:ml-0 ml-auto justify-center items-center">
                <img class="image-light" src="${addIcon}" alt="add" />
                <img class="image-dark" src="${addIconDark}" alt="add" />
                <p class="phone:block hidden">Watchlist</p>
              </label>
            </div>
            <div class="flex mt-2">
              <p class="text-[#6B7280] dark:text-[#A5A5A5] max-w-xs text-sm">
                ${Plot}
              </p>
            </div>
          </div>
        </div>
        <hr class="bg-[#E5E7EB] w-full my-[1.3rem]" />
          `;
      });
      savedMovies.innerHTML = moviesHtml;
      setCheckBoxes(checkBoxesFromLocalStorage)
}
async function getSearchedMovies() {
    let searchedMovies = [];
    for (let id of moviesFromLocalStorage) {
      await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        .then((res) => res.json())
        .then((data) => searchedMovies.push(data));
    }
    return searchedMovies;
  }

window.onload = ()=>{
    getLocalStorageItems()
    if(moviesFromLocalStorage.length){
        renderWatchlist()
        

    }
}
document.addEventListener("click", (e)=>{
    if (e.target.type === "checkbox") {
        const checkboxId = e.target.id;
        
        if (!e.target.checked) {
          removeFromLocalStorage(checkboxId);
          
        }
      }
})
// console.log(moviesFromLocalStorage)
