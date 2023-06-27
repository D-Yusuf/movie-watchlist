const apiKey = import.meta.env.VITE_API_KEY;
import { data } from "autoprefixer";
import starIcon from "./images/star-icon.svg";
let addRemoveIcon = "./images/add-movie-icon.svg";
let addRemoveIconDark = "./images/add-movie-icon-dark.svg";
let savedMovies = [];
let checkedBoxes = [];
const moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
const checkBoxesFromLocalStorage = JSON.parse(
  localStorage.getItem("checkBoxes")
);
const searchForm = document.getElementById("search-form");
const loadingScreen = document.getElementById("loading-screen");
const searchPlaceholder = document.getElementById("search-placeholder");

if (moviesFromLocalStorage && checkBoxesFromLocalStorage) {
  savedMovies = moviesFromLocalStorage;
  await renderMovies(savedMovies);
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

function getImdb(movieArr) {
  const allImdbID = movieArr.map((movie) => {
    return movie.imdbID;
  });
  return allImdbID;
}

async function getSearchedImdb(movieArr) {
  const imdbArr = getImdb(movieArr);
  let searchedMovies = [];
  for (let id of imdbArr) {
    await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then((res) => res.json())
      .then((data) => searchedMovies.push(data));
  }
  return searchedMovies;
}

async function renderMovies(movieArr) {
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
        <span class="flex ">
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
        <label for="${imdbID}" class="text-xs gap-x-[0.31rem] flex sm:w-fit phone:ml-0 ml-auto text-baseline">
          <img class="dark:hidden phone:w-fit w-5" src=${addRemoveIcon} alt="add" />
          <img class="dark:block hidden phone:w-fit w-5" src=${addRemoveIconDark} alt="add" />
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
}
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    const checkBoxes = document.querySelectorAll(`input[type="checkbox"]`);
    savedMovies.push(e.target.dataset.id);
    console.log(savedMovies);
    checkedBoxes = Array.from(checkBoxes).filter((box) => {
      return box.checked === true;
    });
    saveToLocalStorage();
    console.log(checkedBoxes);
  }
});
function saveToLocalStorage() {
  // remove arr duplicates
  savedMovies = savedMovies.filter(
    (item, index) => savedMovies.indexOf(item) === index
  );
  // save to local storage
  localStorage.setItem("movies", JSON.stringify(savedMovies));
  localStorage.setItem("checkBoxes", JSON.stringify(checkedBoxes));
}
fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=hello`)
  .then((res) => res.json())
  .then(async (data) => {
    await renderMovies(data.Search);
  });
