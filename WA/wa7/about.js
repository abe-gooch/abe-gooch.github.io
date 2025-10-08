/*NAV BAR */
const navToggle = document.querySelector('.burgerBtn');
const navVert = document.querySelector('.nav-vertical');

navToggle.addEventListener('click',()=>{
    if(navVert.style.display==="flex"){
        navVert.style.display = "none"
    }else{
      navVert.style.display="flex"
    }
});

/*ABOUT*/
const memButtons = document.querySelectorAll('.joining-parent button');
const memberToggle = document.querySelector('.member-toggle');
const btnContents = document.querySelectorAll('.member-content');

function handleMemberButtons(event){
    if(event.type === 'click' || event.key === 'Enter'){
        const targetId = event.target.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        //turn off active button states for all
        memButtons.forEach(btn => btn.classList.remove('active-button'));

        // check if button is already selected, in which case, toggle off everything
        if(targetContent.style.display=='block'){
            targetContent.style.display='none';
            memberToggle.style.display='none';
        }
        else{ // turn on member-toggle (div visual), then the content of the specific button (text)

        /*show background div where text goes*/
        memberToggle.style.display='flex';

        /*turn off all button contents */
        btnContents.forEach(content => {
            content.style.display = 'none';
        });

        //turn on correct button content and enable active-button visuals
           
        targetContent.style.display='block';
        
        event.target.classList.add('active-button');

        }
    }
};

memButtons.forEach(button => {
  button.addEventListener('click', handleMemberButtons);
  button.addEventListener('keydown', handleMemberButtons);
});


// LOCAL STORAGE -----------------------------------------------------------------------------------------------------------------------------------------
// Font Size:
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