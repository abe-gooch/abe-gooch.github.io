let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);

let answerBtn= document.querySelector('#js-tweet');
answerBtn.addEventListener('click', newAnswer);

// we need to use the same endpoint call for both question an answer, so store it as a variable. Set it up the same way, as a json. (Updated from newTrivia)
let current = {
    question: "",
    answer: "",
}

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function newTrivia(){ //when using await, you must add async
    // console.log("newTrivia Button Success");
    // query the API endpoint
    try{
        // try to make a new variable, wait for a response from built-in browser based fetch function
        const response = await fetch(endpoint);  // await tells it to finish the fetch command before assigning it to response
        if(!response.ok){
            throw Error(response.statusText) // prints an error statement into console
        }
        const json = await response.json();
        console.log(json);
        displayTrivia(json["question"]);

        //update the tracking variable
        current.question=json["question"];  
        current.answer=json["answer"];   
    }
    catch(err){
        console.log(err)
        alert('Failed to get new trivia');
    }
}

function displayTrivia(question){
    const questionText = document.querySelector("#js-quote-text");
    questionText.textContent = question; //display the question

    // reset prior questions answer
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent="";
}

function newAnswer(){
    console.log("newAnswer Success");
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent=current.answer; // use current from earlier.
}


newTrivia(); // runs newTrivia at the end of JS loading, to populate trivia