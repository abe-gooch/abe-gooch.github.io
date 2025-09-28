/*HOME*/
const calendarInteract = document.querySelector('#calendar');

calendarInteract.addEventListener('click', calendarInteraction);
calendarInteract.addEventListener('keydown', calendarInteraction)
function calendarInteraction(event){
    if(event.type==='click' || event.key === 'Enter'){
        alert("This is definitely a functioning calendar ;)");
    }
}
