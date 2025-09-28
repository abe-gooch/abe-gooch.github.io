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