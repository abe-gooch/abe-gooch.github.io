// Option 4: Book or Movie Search
const endpoint = "https://www.omdbapi.com/" //OMDb API, for IMDb movie service
// KEY: 88c5e803

let current ={
    title: "",
    rated:"",
    released:"",
    plot:"",
    poster:"",
}
let responseText = document.querySelector('#response-text');
let responseCard = document.querySelector('#responseCard');
let saveBtn = document.querySelector('#saveBtn');

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', async() => {
    // console.log('searchBtn pressed');
    const searchTerm = document.querySelector('#searchBar').value; // value, not textContent, I guess bc it's type input?
    console.log('Search submitted:', searchTerm);
    current.title=searchTerm;
    await fetchMovie(searchTerm);

});

/*FETCHING API REQUEST*/
async function fetchMovie(title){
    try{
        const movieData = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=88c5e803`);
        if(!movieData.ok || title==""){
            responseText.textContent = "Movie not found.";
            throw Error(movieData.statusText) // prints an error statement into console
        }
        const json = await movieData.json();
        console.log('JSON:');
        console.log(json)
        if(json["Response"]=="False"){
            responseText.textContent = "Movie not found.";
        }
        else{
        //make the card visible
            responseCard.style.display = "grid";

            current.title = json["Title"];
            current.rated=json["Rated"];
            current.released=json["Released"];
            current.plot=json["Plot"];
            current.poster=json["Poster"]

            console.log('current updated')
            //update the movie card
            let poster = document.querySelector(".poster");
              poster.src=current.poster;
            let cardTitle = document.querySelector(".cardTitle");
                cardTitle.textContent = current.title;
            let infoReleased = document.querySelector(".released");
                infoReleased.textContent= `Released: ${current.released}`;            
            let infoRated = document.querySelector(".rated");
                infoRated.textContent = `Rated: ${current.rated}`
            let infoPlot = document.querySelector(".plot");
                infoPlot.textContent = `Plot: ${current.plot}`

            console.log('card updated')
        }
    }
    catch(err){
        console.log(err)
        // alert('Failed to fetch movie');
        responseText.textContent = "Movie not found.";
    }
}

/* ADDING MOVIES TO LIBRARY */
let movieList = document.querySelector('#movie-list');
let library = document.querySelector('#library');
saveBtn.addEventListener('click', ()=>{
    library.classList.remove('hide');
    library.classList.add('show');

    if(!movieList.textContent==""){ // this should really be an array using for loops, but I don't want to deal with that rn
                                    // I could check if the title exists much easier if it were an array (I am currently not checking)
        movieList.textContent = `${movieList.textContent}, \n ${current.title}`; // for second and beyond entries
    }
    else if (movieList.textContent ==""){}  // I need to fix this allowing it to save en empty string
    else{
        movieList.textContent = ` ${current.title}`; // for first entry
        localStorage.setItem('library', movieList.textContent);
    }
});

/*LOCAL STORAGE FOR MOVIE LIBRARY */
function applyA11ySettings(settings){ //local storage to save their library between sessions
    movieList.textContent = localStorage.getItem('library');
    if(movieList.textContent !=""){
        library.classList.remove('hide'); /* if a library exists when the page is loaded, make it visible */
        library.classList.add('show');
    }
}
applyA11ySettings(library);