import starIcon from "../images/star-icon.svg";
import addIcon from "../images/add-movie-icon.svg";
import addIconDark from "../images/add-movie-icon-dark.svg";
import removeIcon from "../images/remove-movie-icon.svg";
import removeIconDark from "../images/remove-movie-icon-dark.svg";
import { loadingScreen } from "../main.js";
// import { checkedBoxesIdArr } from "../main.js";
export const apiKey = import.meta.env.VITE_API_KEY;

export function setCheckBoxes(arr) {
  arr.forEach((id) => {
    const checkBox = document.querySelector(`[data-id="${id}"]`);
    if (checkBox) {
      checkBox.checked = true;
      changeCheckBoxIcon(); // Update checkbox icons
    }
  });
}

export function getImdb(movieArr) {
  const allImdbID = movieArr.map((movie) => {
    return movie.imdbID;
  });
  return allImdbID;
}

export async function getSearchedImdb(movieArr) {
  const imdbArr = getImdb(movieArr);
  let searchedMovies = [];
  for (let id of imdbArr) {
    await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then((res) => res.json())
      .then((data) => searchedMovies.push(data));
  }
  return searchedMovies;
}
export async function renderMovies(movieArr, dataArr) {
  const movies = await getSearchedImdb(movieArr);
  loadingScreen.classList.add("hidden"); // remove loading screen
  let moviesHtml = ``;
  movies.forEach((movie) => {
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

  document.getElementById("output-movies").innerHTML = moviesHtml;
  setCheckBoxes(dataArr)
}

export function changeCheckBoxIcon() {
  const checkBoxes = document.querySelectorAll(`input[type="checkbox"]`);
  checkBoxes.forEach((box) => {
    const label = box.nextElementSibling;
    const imageDark = label.querySelector(".image-dark");
    const imageLight = label.querySelector(".image-light");
    if (box.checked) {
      imageDark.src = removeIconDark;
      imageLight.src = removeIcon;
    } else {
      imageDark.src = addIconDark;
      imageLight.src = addIcon;
    }
  });
}

export function saveToLocalStorage(key, arr) {
  // save to local storage
  localStorage.setItem(key, JSON.stringify(arr));
}
export function removeFromLocalStorage(id) {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const checkedBoxes = JSON.parse(localStorage.getItem("checkedBoxes")) || [];
  
    const updatedSavedMovies = savedMovies.filter((movieId) => movieId !== id);
    const updatedCheckedBoxes = checkedBoxes.filter((boxId) => boxId !== id);
  
    saveToLocalStorage("savedMovies", updatedSavedMovies);
    saveToLocalStorage("checkedBoxes", updatedCheckedBoxes);
  }
