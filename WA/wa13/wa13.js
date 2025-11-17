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
            let h2 = document.querySelector('#resultTitle');
            h2.style.display = "block";
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
                infoReleased.textContent= `Released:  ${current.released}`;            
            let infoRated = document.querySelector(".rated");
                infoRated.textContent = `Rated:  ${current.rated}`
            let infoPlot = document.querySelector(".plot");
                infoPlot.textContent = `Plot:  ${current.plot}`

            console.log('card updated')

        //make save button appear
            saveBtn.style.display = "block";
        }
    }
    catch(err){
        console.log(err)
        // alert('Failed to fetch movie');
        responseText.textContent = "Movie not found.";
    }
}

/* ADDING MOVIES TO LIBRARY */
let movieLibrary = document.querySelector('.movieLibrary'); // select the section the cards go into
let h3 = document.querySelector('#libraryTitle');
let divElements = []; // store references to cards
let counter = 0; // for unique IDs

saveBtn.addEventListener('click', ()=>{console.log('save clicked')});
saveBtn.addEventListener('click', addCard);

// function addCard(){
//     console.log('entered addCard');
//     h3.style.display="block";
//     movieLibrary.style.display="flex";
//     const newDiv = document.createElement('div');

//     newDiv.id = 'div-'+counter; //unique ID
//     counter+=1;
//     console.log(newDiv.id);
//     newDiv.classList.add('movieCard');
//     newDiv.textContent = current.title;
//     newDiv.style.display="flex";

//     movieLibrary.appendChild(newDiv); //adds it to to html
//     movieArray.push(newDiv) // add movieCard to array for storage

//     movieLibraryData.push({ id: newDiv.id, title: current.title, rated: current.rated, released: current.released, plot: current.plot, poster:current.poster });
//     localStorage.setItem('movieLibraryData', JSON.stringify(movieLibraryData));

// }

function addCard() {
    console.log('entered addCard');
    h3.style.display = "block";
    movieLibrary.style.display = "flex";

    let duplicate = false;
    // run through library and check the movie isn't already saved
    for(let i = 0; i < movieLibraryData.length; i++){
        if (movieLibraryData[i].title == current.title){
            alert('Movie already saved');
            duplicate = true;
            break;
        }
    }

    if(duplicate == false){
        const id = 'div-' + counter;
        counter+=1;

        const movieInfo = {
            id: id,
            title: current.title,
            rated: current.rated,
            released: current.released,
            plot: current.plot,
            poster: current.poster
        };

        const card = createMovieCard(movieInfo);
        movieLibrary.appendChild(card);

        movieLibraryData.push(movieInfo);
        localStorage.setItem('movieLibraryData', JSON.stringify(movieLibraryData));
    }
    return 0;
}


/*LOCAL STORAGE FOR MOVIE LIBRARY */

let movieLibraryData = JSON.parse(localStorage.getItem('movieLibraryData')) || [];
    // if there is data it'll load it, else it makes an empty array
    //this array is updated in addCard()


window.addEventListener('DOMContentLoaded', () => {
   if (movieLibraryData.length > 0) { // run if there is a saved movie
        h3.style.display = "block"; 
        movieLibrary.style.display = "flex";

        movieLibraryData.forEach(movie => {
            const card = createMovieCard(movie);
            movieLibrary.appendChild(card);
        });
    }
});


function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movieCard');
    card.style.display = "grid";
    card.id = movie.id;

    // poster
    const poster = document.createElement('img');
    poster.classList.add('poster');
    poster.src = movie.poster;
    card.appendChild(poster);

    // info
    const info = document.createElement('div');
    info.classList.add('info');
        // title
        const title = document.createElement('p');
        title.classList.add('cardTitle');
        title.innerHTML = `<br>${movie.title}`; // have to use innerHTML to make <br> work
        info.appendChild(title);
        // release date
        const rel = document.createElement('p');
        rel.classList.add('released');
        rel.textContent = `Released: ${movie.released}`;
        info.appendChild(rel);
        // rating
        const rated = document.createElement('p');
        rated.classList.add('rated');
        rated.textContent = `Rated: ${movie.rated}`;
        info.appendChild(rated);
        // plot
        const plot = document.createElement('p');
        plot.classList.add('plot');
        plot.textContent = `Plot: ${movie.plot}`;
        plot.appendChild(document.createElement("br")); // adding line break for padding
        plot.appendChild(document.createElement("br"));
        info.appendChild(plot);
    card.appendChild(info);

    // x button
    const x_button = document.createElement('button');
    x_button.classList.add('x');
    x_button.textContent = ('x');
    card.appendChild(x_button)


    // integration to remove card on click of x-button
    x_button.addEventListener('click', () => {
        card.remove(); //only visual

        // learned that filter is essentially a condensed for loop, yippee!
        movieLibraryData = movieLibraryData.filter(m => m.id !== movie.id); // remove from library array

        localStorage.setItem('movieLibraryData', JSON.stringify(movieLibraryData)); // make the JSON data again with new array
    });

    return card;
}