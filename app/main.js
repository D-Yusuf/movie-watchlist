import starIcon from "./images/star-icon.svg"
import addIcon from "./images/add-movie-icon.svg"
import addIconDark from "./images/add-movie-icon-dark.svg"

const searchForm = document.getElementById("search-form");
const loadingScreen = document.getElementById("loading-screen");
const searchPlaceholder = document.getElementById("search-placeholder");
const apiKey = import.meta.env.VITE_API_KEY;
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedMovie = document.getElementById("movie-search").value;
  loadingScreen.classList.remove("hidden") //add loading screen
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchedMovie}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.Response == "False"){
          searchPlaceholder.innerHTML = `<h1 class="text-[#DFDDDD] dark:text-[#2E2E2F] font-bold text-lg mt-2 max-w-xs text-center">
          Unable to find what you’re looking for. Please try another search.
        </h1>`
        loadingScreen.classList.add("hidden")
        }
        else{renderMovies(data.Search);}
    })
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
  loadingScreen.classList.add("hidden") // remove loading screen
  let moviesHtml = ``;
  movies.forEach((movie) => {
    const { Title, Genre, Plot, Poster, imdbRating, imdbID, Runtime } = movie;
    moviesHtml += `
    <div class="flex">
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
          <img class="dark:hidden phone:w-fit w-5" src=${addIcon} alt="add" />
          <img class="dark:block hidden phone:w-fit w-5" src=${addIconDark} alt="add" />
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
  if(e.target.dataset.id){
    console.log(e.target.dataset.id)
  }
});
// <!-- copy -->
//         <div class="flex">
//           <img src="./images/movie-pic-test.png" alt="movie-pic" />
//           <!-- movie details -->
//           <div class="ml-[1.31rem]">
//             <!-- name-star-rating -->
//             <div class="flex items-center">
//               <h1 class="text-lg font-medium mr-2">Blade Runner</h1>
//               <span class="flex ">
//                 <img
//                   class="mr-1 w-[0.9375rem] h-[0.9375rem]"
//                   src="./images/star-icon.svg"
//                   alt="star"
//                 />
//                 <p class="text-xs">8.1</p>
//               </span>
//             </div>
//             <!-- min-tags-watchlist -->
//             <div class="flex mt-[0.69rem]">
//               <p class="sm:mr-[1.19rem] mr-3 text-xs">117 min</p>
//               <p class="sm:mr-[1.19rem] mr-3 text-xs">Action, Drama, Sci-fi</p>
//               <input hidden type="checkbox" id="MOVIE-ID-HERE" />
//               <label for="MOVIE-ID-HERE" class="text-xs gap-x-[0.31rem] flex">
//                 <img class="dark:hidden" src="./images/add-movie-icon.svg" alt="" />
//                 <img class="dark:block hidden" src="./images/add-movie-icon-dark.svg" alt="" />
//                 Watchlist
//               </label>
//             </div>
//             <!-- description -->
//             <div class="flex mt-2">
//               <p class="text-[#6B7280] dark:text-[#A5A5A5] max-w-xs text-sm">
//                 A blade runner must pursue and terminate four replicants who
//                 stole a ship in space, and have returned to Earth to find
//                 their creator.
//               </p>
//             </div>
//           </div>
//         </div>
//         <hr class="bg-[#E5E7EB] w-full my-[1.3rem]" />
//         <!-- //copy// -->
