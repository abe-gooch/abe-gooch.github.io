/*HOME*/
const calendarInteract = document.querySelector('#calendar');

calendarInteract.addEventListener('click', calendarInteraction);
calendarInteract.addEventListener('keydown', calendarInteraction)
function calendarInteraction(event){
    if(event.type==='click' || event.key === 'Enter'){
        alert("This is definitely a functioning calendar ;)");
    }
}

// Option C: Accessibility Preferences
// Save accessibility settings

function saveA11ySettings(settings) {
  localStorage.setItem('fontSize', settings);
  applyA11ySettings(settings);
}

let btn = document.querySelector('#fontBtn');
btn.addEventListener('click', changeFontSize);

function changeFontSize(){
  let size = btn.className; 
  setFont(size);
}

function setFont(size){
  btn.classList.remove(size); 
  if(size === 'medium'){ 
    size = 'larger';
  } else {
    size = 'medium';
  }
  btn.classList.add(size); 
  saveA11ySettings(size); 
}

function applyA11ySettings(settings){
  document.querySelectorAll('p, ul, li, h1, h2, h3')
    .forEach(el => el.style.fontSize = settings);
  // update button class
  btn.classList.remove("medium","larger");
  btn.classList.add(settings);
}

const fontSize = localStorage.getItem('fontSize') || 'medium';
applyA11ySettings(fontSize);
