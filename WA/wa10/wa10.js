let newPokeBtn = document.querySelector("#js-new-quote").addEventListener('click', newPokemon);
let answerBtn= document.querySelector('#js-tweet');
answerBtn.addEventListener('click', displayAnswer)

const endpoint = "https://pokeapi.co/api/v2/pokemon";
const totalPokemon = 1000;

let current = {
    pokeName: "Pikachu",
    imageURL: "",
}

async function fetchData(id){ // load pokemon of that id
    try{
        console.log('entered fetchData');
        const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if(!pokeData.ok){
            throw Error(pokeData.statusText) // prints an error statement into console
        }
        const json = await pokeData.json();
        console.log('JSON:');
        console.log(json)
        current.pokeName = json["name"];
        current.imageURL = json.sprites.front_default;
    }
    catch(err){
        console.log(err)
        alert('Failed to fetch Pokemon');
    }
}

function randomIndex(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


async function newPokemon(){
    try{
        await fetchData(randomIndex(1, totalPokemon));
        displayPokemon();
    }
    catch(err){
        console.log(err)
        alert('Failed to get new Pokemon');
    }
}

function displayPokemon(){
    const questionText = document.querySelector("#js-quote-text");
    questionText.src = current.imageURL;

    // reset prior question's answer
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent=" ";
}

function displayAnswer(){ //runs on click of answerBtn
    console.log("displayAnswer Success");
    console.log(current.pokeName);
    const answerText = document.querySelector('#js-answer-text');
    // return the name capitalized and in the full 'It's __!' line.
    answerText.textContent = `It's ${current.pokeName.charAt(0).toUpperCase() + current.pokeName.slice(1)}!`;
    console.log(answerText.textContent);
}
