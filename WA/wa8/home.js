/*NAV BAR -------------------------------------------------------------------------------------------------------------------------------------------------------*/
const navToggle = document.querySelector('.burgerBtn');
const navVert = document.querySelector('.nav-vertical');

navToggle.addEventListener('click',()=>{
    if(navVert.style.display==="flex"){
        navVert.style.display = "none"
    }else{
      navVert.style.display="flex"
    }
});

//when click, hide .main-nav, show .nav-vertical

//HOME -------------------------------------------------------------------------------------------------------------------------------------------------------

// Privacy Policy - NEED FINISH
const privPopup = document.querySelector('.privacyOverlay');

window.onload = () => {
  if (localStorage.getItem('cookiePref') !== 'consented') {
    privPopup.style.display = 'block';
  } else {
    privPopup.style.display = 'none';
  }
};

const privButton = document.querySelector('#privacyButton');
privButton.addEventListener('click', cookie);

function cookie(){
  localStorage.setItem('cookiePref', "consented");
  privPopup.style.display='none';
}


// ACCESSBILITY SETTINGS --------------------------------------------------------------------------------------------------------------------------------------
// Font Size Toggle

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
    size = 'large';
  } else {
    size = 'medium';
  }
  btn.classList.add(size); 
  saveA11ySettings(size); 
}

function applyA11ySettings(settings){
  document.body.classList.remove("medium-font", "large-font");
  document.body.classList.add(`${settings}-font`);
}

btn.classList.add(localStorage.getItem('fontSize') || 'medium');
const fontSize = localStorage.getItem('fontSize') || 'medium';
applyA11ySettings(fontSize);


// Rest of page
const calendarInteract = document.querySelector('#calendar');

calendarInteract.addEventListener('click', calendarInteraction);
calendarInteract.addEventListener('keydown', calendarInteraction)
function calendarInteraction(event){
    if(event.type==='click' || event.key === 'Enter'){
        alert("This is definitely a functioning calendar ;)");
    }
}

// Clear Cache
let cacheBtn = document.querySelector('#clearCacheBtn');
cacheBtn.addEventListener('click', clearCache);

function clearCache(){
  document.body.classList.remove("medium-font", "large-font");
  document.body.classList.add("medium-font");

  localStorage.setItem('cookiePref', "not-consented");
  privPopup.style.display='block';
}