// Option 4: Book or Movie Search
const endpoint = "http://www.omdbapi.com/" //OMDb API, for IMDb movie service
// KEY: 88c5e803

let current ={
    title: "",
    rated:"",
    released:"",
    plot:"",
}
let responseText = document.querySelector('#response-text');
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
        const movieData = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=88c5e803`);
        if(!movieData.ok || title==""){
            responseText.textContent = "";
            throw Error(movieData.statusText) // prints an error statement into console
        }
        const json = await movieData.json();
        let responseDiv = document.querySelector('#responseDiv');
            responseDiv.classList.remove('hide');
            responseDiv.classList.add('show');
        console.log('JSON:');
        console.log(json)
        if(json["Response"]=="False"){
            responseText.textContent = "Movie not found.";
        }
        else{
            current.title = json["Title"];
            current.rated=json["Rated"];
            current.released=json["Released"];
            current.plot=json["Plot"];
            responseText.textContent = `Title: ${current.title} \nReleased: ${current.released} \nRated: ${current.rated} \nPlot: ${current.plot}`;
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