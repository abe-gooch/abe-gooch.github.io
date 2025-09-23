// Get all filter buttons and photo cards
const filterButtons = document.querySelectorAll('.gallery-nav button'); //querySelectors need the period for the call of a class
const photoCards = document.querySelectorAll('.photo-card');

// Add click event to each button
filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const filterValue = event.target.textContent.toLowerCase(); //pulls the string describing its type (nature or architecture)

    // change visuals of which button is active
    filterButtons.forEach(button => button.classList.remove("active-button")); //must use forEach rather than target, since its multiple buttons
    event.target.classList.add("active-button"); //classList does NOT need the period when calling the class

    filterPhotos(filterValue); //calls the function that will hide the photos that do not match such filter
  });
});

function filterPhotos(category) { //category == filterValue == data-category (nature or architecture)
  photoCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}