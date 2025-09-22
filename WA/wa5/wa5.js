

// let toggle = false
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
// const navBurger = document.querySelector('.nav-burger-menu');

// const classes = navBurger.classList();

// navToggle.addEventListener('click', (e)=>{
//     if(toggle==false){
//         navBurger.style.display = "flex"; /* or block*/
//         navBurger.arialabel = "nav bar";
//         toggle = true;
//     }
//     else{
//         navBurger.style.display = "none";
//         toggle = false;
//     }
// })
let shown = false;

navToggle.addEventListener('click',()=>{
    if(shown==false){
        navMenu.classList.toggle("show");
        navMenu.arialabel = "nav bar";
        // navMenu.show();
        shown = true;
    }
    else{
        navMenu.classList.toggle("hide");
        // navMenu.hide();
        navMenu.arialabel = "";
        shown = false;
    }
    // navMenu.style.display = "flex";
    // navToggle.style.display="flex";
});