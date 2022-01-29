/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * Game.js */

// This will store employee object pulled from API. 
let employees = [];

// This function dynamically creates profile cards with the given list of employees and adds it to the main page
function createCards(employees){
    for(let i=0; i < employees.length; i++){
        // creates current user card for employee 
        let currentCard = document.createElement('DIV');
        currentCard.className = "card";
        currentCard.id = i.toString();

        // creates image container for current user card
        let currentCardImageContainer = document.createElement('DIV');
        currentCardImageContainer.className = "card-img-container";
        
        // creates image element to be placed in image container 
        let cardImage = document.createElement('IMG');
        cardImage.src = employees[i]['picture']['large'];
        cardImage.alt = "Profile Picture";
        cardImage.className = "card-img";
        currentCardImageContainer.append(cardImage); // appends image to image container
        currentCard.append(currentCardImageContainer);// appends image container to user card

        // creates information container for user card and appends it to current user card
        let currentCardInfoContainer = document.createElement('DIV');
        currentCardInfoContainer.className = "card-info-container";
        currentCard.append(currentCardInfoContainer);

        // creates header element to display employee name for current card and appends it to information container
        let employeeName = document.createElement("H3");
        employeeName.className = "card-name cap";
        employeeName.insertAdjacentHTML("beforeEnd", `${employees[i]['name']['first']} ${employees[i]['name']['last']}`);
        currentCardInfoContainer.append(employeeName);

        // creates paragraph element to display employee email for current card and appends it to information container
        let employeeEmail = document.createElement('P');
        employeeEmail.className = 'card-text';
        employeeEmail.insertAdjacentHTML("beforeEnd", `${employees[i]['email']}`);
        currentCardInfoContainer.append(employeeEmail);
        
        // creates paragraph element to dispaly employee location for current card and appends it to information container. 
        let employeeLocation = document.createElement('P');
        employeeLocation.className = 'card-text';
        employeeLocation.insertAdjacentHTML('beforeEnd', `${employees[i]['location']['city']}, ${employees[i]['location']['state']}`);
        currentCardInfoContainer.append(employeeLocation);

        // adds current card to user gallery
        document.getElementById('gallery').append(currentCard);

        // adds event listener to current card
        currentCard.addEventListener('click', updateModal);
    }
}

// This is code will create the modal card that will give detailed information of emplyee that is clicked
// The information will be empty upon creation and updated when user clicks on particular employee. 
function createModal(){
    // This creates the modal container DIV and adds it to main page/gallery
    let modalContainer = document.createElement("DIV");
    modalContainer.style.display = 'none';
    modalContainer.className = 'modal-container';
    document.getElementById('gallery').append(modalContainer);

    // This creates the modal DIV and appends it to the modal container
    let modal = document.createElement('DIV');
    modal.className = 'modal';
    modalContainer.append(modal);

    // This creates the close button for the modal window and adds event listener to the button to close modal window
    modal.insertAdjacentHTML('beforeEnd', '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>');
    document.getElementById('modal-close-btn').addEventListener('click', e =>{
        modalContainer.style.display = 'none';
    })

    // This creates an information container for the modal and appends it to modal 
    let modalContainerInfo = document.createElement('DIV');
    modalContainerInfo.className = "modal-info-container";
    modal.append(modalContainerInfo);

    // Adds information tag elements to modal inforamtion container
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<img id="modal-image" class="modal-img" alt="profile picture">`); // adds tag for image
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<h3 id="modal-name" class="modal-name cap">name</h3>`); // adds tag for name
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<p id="modal-email" class="modal-text">email</p>`); // adds tag for email
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<p id="modal-city" class="modal-text cap">city</p>`); // adds tag for city
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<hr>`);
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<p id="modal-phone" class="modal-text">(555) 555-5555</p>`); // adds tag for phone number
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<p id="modal-address" class="modal-text">123 Portland Ave., Portland, OR 97204</p>`); // adds tag for location
    modalContainerInfo.insertAdjacentHTML('beforeEnd', `<p id="modal-DOB" class="modal-text">Birthday: 10/21/2015</p>`); //adds tag for date of birth
}

// This function updates the information displayed in the modal
function updateModal(e){
    let selectedCard = e.currentTarget;
    document.getElementById('modal-image').src = selectedCard.getElementsByTagName('IMG')[0].src; //updates modal image
    document.getElementById('modal-name').innerHTML = selectedCard.getElementsByClassName('card-name')[0].innerHTML; //updates modal employee name
    document.getElementById('modal-email').innerHTML = selectedCard.getElementsByClassName('card-info-container')[0].getElementsByTagName('P')[0].innerHTML; // updates modal email
    document.getElementById('modal-city').innerHTML = selectedCard.getElementsByClassName('card-info-container')[0].getElementsByTagName('P')[1].innerHTML; // updates modal city
    document.getElementById('modal-phone').innerHTML = employees[parseInt(selectedCard.id)]['phone']; //updates modal phone
    let address = employees[parseInt(selectedCard.id)]['location']; 
    document.getElementById('modal-address').innerHTML = `${address['street']['number']}, ${address['street']['name']},  ${address['city']}, ${address['state']}, ${address['postcode']}` //updates modal location
    document.getElementById('modal-DOB').innerHTML = `Birthday: ${employees[parseInt(selectedCard.id)]['dob']['date'].slice(5,10)}-${employees[parseInt(selectedCard.id)]['dob']['date'].slice(0,4)}`; //updates modal DOB
    document.getElementsByClassName('modal-container')[0].style.display = 'block'; // displays modal
}

// This is where the fetch method is used to request 12 random users from the Random User Generator API  
// If successfull, It will trigger the createCards function with a list of 12 random users as its parameter
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(data=> data.json())
    .then(json =>{
        employees = json['results'];
        return employees;
    })
    .then(createCards)
    .then(createModal)
    .catch(Error("Could Not Get Users"))