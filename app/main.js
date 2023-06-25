// import 'dotenv/config'

const apiKey = import.meta.env.VITE_API_KEY
fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=stranger things`)
  .then(res => res.json())
  .then(data => console.log(data))


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