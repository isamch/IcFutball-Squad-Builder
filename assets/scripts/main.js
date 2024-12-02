import { playerSideCard } from './htmlComponent.js';
import { playerTeamCard } from './htmlComponent.js';

let dataPlayers = [];

let dataSubArr = [];
let dataTeamArr = [];
let dataPlayearArr = [];

// check and get data fromlocal :
let localDataTeamArr = JSON.parse(localStorage.getItem('dataTeamArr')) || [];
let localDataSubArr = JSON.parse(localStorage.getItem('dataSubArr')) || [];
let localDataPlayearArr = JSON.parse(localStorage.getItem('dataPlayearArr')) || [];


fetch('/Data/players.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataPlayers = data.players;

        if (localDataTeamArr.length > 0) {
          dataTeamArr = localDataTeamArr;
          displayLocaTeam(dataTeamArr);

        } else {
          dataTeamArr = dataPlayers.slice(0, 11);
          displayTeam(dataTeamArr);

        }


        if (localDataSubArr.length > 0) {
          dataSubArr = localDataSubArr;
          displayLocalSub(dataSubArr)
        
        } else {
          dataSubArr = dataPlayers.slice(11, 19);
          displaySubstitues(dataSubArr);

        }

       



        if (localDataPlayearArr.length > 0) {
          dataPlayearArr = localDataPlayearArr;

          displayLocalSid(dataPlayearArr);


        } else {
            dataPlayearArr = dataPlayers.slice(19);
            displayPlayers(dataPlayearArr);

        } 



        updatePlayerFromDom();
        dragDrop();
        searchAoutName();
        filterDropDown();
      
        // call some fun:
        ifGoolKeper();
        changeFormation();


        console.log('get data');
    })
    .catch(error => {
        console.error('fetch Eror:', error);
    });








// display from json for first time:
function displayTeam(data) {
    const boxTeam = document.getElementById('team-zone');
    for (let i = 0; i < data.length; i++) {
        boxTeam.innerHTML += playerTeamCard(data[i]);
    }
}

function displaySubstitues(data) {
    const boxSubstitues = document.getElementById('substitutes-zone');
    for (let i = 0; i < data.length; i++) {
        boxSubstitues.innerHTML += playerSideCard(data[i]);
    }
}

function displayPlayers(data) {
    const boxPlayers = document.getElementById('side-zone');
    for (let i = 0; i < data.length; i++) {
        boxPlayers.innerHTML += playerSideCard(data[i]);
    }
}



// display from localStorage:
function displayLocaTeam(dataTeam) {
  const parTeam = document.getElementById('team-zone');
  dataTeam.forEach(cardSingleHtml => {
    parTeam.innerHTML += cardSingleHtml;  
  });
}


function displayLocalSub(dataSub) {
    const boxSubstitues = document.getElementById('substitutes-zone');
    dataSub.forEach(cardSingleHtml => {
      boxSubstitues.innerHTML += cardSingleHtml;
    });
}

function displayLocalSid(dataSid) {
  const boxSubstitues = document.getElementById('side-zone');
  dataSid.forEach(cardSingleHtml => {
    boxSubstitues.innerHTML += cardSingleHtml;
  });
}






// drag and drop :
function dragDrop(){
  const playerCard = document.querySelectorAll('.p-card');
  const dropZon = document.querySelectorAll('.drop-zone');

  playerCard.forEach(singleCard => {
    singleCard.addEventListener('dragstart', ()=>{
      singleCard.classList.add('dragin-now')
    });
    singleCard.addEventListener('dragend', ()=>{
      singleCard.classList.remove('dragin-now');
    });
  });

  dropZon.forEach(boxDrop=>{
    boxDrop.addEventListener('dragover', (e)=>{
      e.preventDefault();
      const dragingElement = document.querySelector('.dragin-now');

      if (boxDrop.dataset.pos == dragingElement.dataset.pos) {
        boxDrop.classList.add('box-green');
      }else{
        boxDrop.classList.add('box-dropin');
      }    

    });

    boxDrop.addEventListener('dragleave', (e)=>{
      e.preventDefault();
      boxDrop.classList.remove('box-green');
      boxDrop.classList.remove('box-dropin');

    });
    
    
    boxDrop.addEventListener('drop', (e)=>{
      e.preventDefault();
      const dragingElement = document.querySelector('.dragin-now');

      // change just in team:
      if (dragingElement.parentElement.id == 'team-zone' && boxDrop.id === 'team-zone') {
    
        if (boxDrop.dataset.pos == dragingElement.dataset.pos) {
            
          [boxDrop.className , dragingElement.className ] = [dragingElement.className , boxDrop.className];

        }
   
      }else{
      
        const parSub = dragingElement.parentElement;

        if (boxDrop.dataset.pos == dragingElement.dataset.pos) {

          [boxDrop.className , dragingElement.className ] = [dragingElement.className , boxDrop.className];
  
          boxDrop.parentElement.appendChild(dragingElement);
  
          parSub.appendChild(boxDrop);
  
        }

        if (boxDrop.id == "drop-delet" && parSub.id == "side-zone") {
          dragingElement.remove();
        }


      }




      boxDrop.classList.remove('box-green');
      dragingElement.classList.remove('box-green');
                
      boxDrop.classList.remove('box-dropin');
      dragingElement.classList.remove('box-dropin');

      boxDrop.classList.remove('dragin-now');
      dragingElement.classList.remove('dragin-now');
      
      
      updatePlayerFromDom();
      
    });

  });

}


// update data to loacl:
function updatePlayerFromDom() {
  const teamBoxCards = document.querySelectorAll('.team-card');
  const substitutesZone = document.getElementById('substitutes-zone');
  const playersZone = document.getElementById('side-zone');

  dataTeamArr = Array.from(teamBoxCards).map(card => card.outerHTML);
  dataSubArr = Array.from(substitutesZone.children).map(card => card.outerHTML);
  dataPlayearArr = Array.from(playersZone.children).map(card => card.outerHTML);

  saveFataFromDom();
}

// save data to local:
function saveFataFromDom() {
  localStorage.setItem('dataTeamArr', JSON.stringify(dataTeamArr));
  localStorage.setItem('dataSubArr', JSON.stringify(dataSubArr));
  localStorage.setItem('dataPlayearArr', JSON.stringify(dataPlayearArr));

}



// search about player :
function searchAoutName() {
  const inputSearch = document.getElementById('search-dropdown');
  
  inputSearch.addEventListener('input', ()=>{
    const playersZone = document.getElementById('side-zone');
    const cards = playersZone.querySelectorAll('.side-card');
    
    cards.forEach(element => {
      const cardPlayerName = element.querySelector('.name-empty').textContent.trim().toLowerCase();

      if ( cardPlayerName.includes(inputSearch.value.toLowerCase()) ) {        
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      
      }
    });
  });
}



// dropdown filter : 
function filterDropDown() {
  const filterBtnChoice = document.getElementById('dropdown-button');
  const choiceBtn = document.getElementById('dropdown').querySelectorAll('button');
  choiceBtn.forEach(element => {
    element.addEventListener('click', ()=>{
      const playersZone = document.getElementById('side-zone');
      const cards = playersZone.querySelectorAll('.side-card');
            
      const yourChoice = element.textContent;
      
      filterBtnChoice.firstChild.textContent = yourChoice;
      

      cards.forEach(element => {

        const cardPlayerName = element.dataset.pos;
        if (yourChoice == 'ALL') {
          element.style.display = 'block';
        }else if (yourChoice == cardPlayerName) {
          
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        
        }
      });

      filterBtnChoice.click();

    });
  });
}




// add players to side bare :

// regex :
const nameFormRegex = /^[a-zA-Z]{2,10}( [a-zA-Z]{2,10})?$/;
const numberFormRegex = /^(1[0-9]|[2-9][0-9])$/;
const imgUrlRegex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)/i;
  

// inputs call :
const addNewPlayearBtn = document.getElementById('submit-new-player');

const nameForm = document.getElementById('namefrom');
const imgForm = document.getElementById('imgform');

const ratingForm = document.getElementById('ratingform');
const posForm = document.getElementById('posform');

const pacForm = document.getElementById('pacform');
const shoForm = document.getElementById('shoform');
const pasForm = document.getElementById('pasform');
const driForm = document.getElementById('driform');
const defForm = document.getElementById('defform');
const phyForm = document.getElementById('phyform');


// validation : 
function validationInputs() {
  let inputsValide = true;

  // name:
  if (!nameFormRegex.test(nameForm.value)) {
    inputsValide = false;
    nameForm.classList.add('input-not-valide');
  }else{
    nameForm.classList.remove('input-not-valide');
  }

  // img Form:
  if (!imgUrlRegex.test(imgForm.value) && imgForm.value != "") {
    inputsValide = false;
    imgForm.classList.add('input-not-valide');
  }else{
    imgForm.classList.remove('input-not-valide');
  }

  // rating:
  if (!numberFormRegex.test(ratingForm.value)) {
    inputsValide = false;
    ratingForm.classList.add('input-not-valide');
  }else{
    ratingForm.classList.remove('input-not-valide');
  }

  // pac:
  if (!numberFormRegex.test(pacForm.value)) {
    inputsValide = false;
    pacForm.classList.add('input-not-valide');
  }else{
    pacForm.classList.remove('input-not-valide');
  }

  // sho:
  if (!numberFormRegex.test(shoForm.value)) {
    inputsValide = false;
    shoForm.classList.add('input-not-valide');
  }else{
    shoForm.classList.remove('input-not-valide');
  }

  // pas:
  if (!numberFormRegex.test(pasForm.value)) {
    inputsValide = false;
    pasForm.classList.add('input-not-valide');
  }else{
    pasForm.classList.remove('input-not-valide');
  }

  // dri:
  if (!numberFormRegex.test(driForm.value)) {
    inputsValide = false;
    driForm.classList.add('input-not-valide');
  }else{
    driForm.classList.remove('input-not-valide');
  }

  // def:
  if (!numberFormRegex.test(defForm.value)) {
    inputsValide = false;
    defForm.classList.add('input-not-valide');
  }else{
    defForm.classList.remove('input-not-valide');
  }

  // phy:
  if (!numberFormRegex.test(phyForm.value)) {
    inputsValide = false;
    phyForm.classList.add('input-not-valide');
  }else{
    phyForm.classList.remove('input-not-valide');
  }

  
  return inputsValide;
}


// function change to Goolkepr:
function ifGoolKeper() {

  posForm.addEventListener('change', ()=>{
    if (posForm.value === "GK") {
      
      console.log(posForm.value);
      console.log("non");
      
      // change text content if gk:
      pacForm.parentElement.querySelector(`label[for="${pacForm.id}"]`).textContent = "DIV";
      shoForm.parentElement.querySelector(`label[for="${shoForm.id}"]`).textContent = "HAN";
      pasForm.parentElement.querySelector(`label[for="${pasForm.id}"]`).textContent = "KIC";
      driForm.parentElement.querySelector(`label[for="${driForm.id}"]`).textContent = "REF";
      defForm.parentElement.querySelector(`label[for="${defForm.id}"]`).textContent = "SPD";
      phyForm.parentElement.querySelector(`label[for="${phyForm.id}"]`).textContent = "POS";

    }else{

      // change text content if not gk:
      pacForm.parentElement.querySelector(`label[for="${pacForm.id}"]`).textContent = "PAC";
      shoForm.parentElement.querySelector(`label[for="${shoForm.id}"]`).textContent = "SHO";
      pasForm.parentElement.querySelector(`label[for="${pasForm.id}"]`).textContent = "PAS";
      driForm.parentElement.querySelector(`label[for="${driForm.id}"]`).textContent = "DRI";
      defForm.parentElement.querySelector(`label[for="${defForm.id}"]`).textContent = "DEF";
      phyForm.parentElement.querySelector(`label[for="${phyForm.id}"]`).textContent = "PHY";

    }
  });

}



// get data from inputs from to object :
function getPlayerDataToArray() {
  let dataAddNew = {};
  if (posForm.value === "GK") {

    dataAddNew = {
      "name": nameForm.value,
      "photo": imgForm.value? imgForm.value : "https://cdn.sofifa.net/players/231/410/25_120.png",
      "position": posForm.value,
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": ratingForm.value,
      "diving": pacForm.value,
      "handling": shoForm.value,
      "kicking": pasForm.value,
      "reflexes": driForm.value,
      "speed": defForm.value,
      "positioning": phyForm.value
    };
  }else{
    dataAddNew = {
      "name": nameForm.value,
      "photo": imgForm.value? imgForm.value : "https://cdn.sofifa.net/players/231/410/25_120.png",
      "position": posForm.value,
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": ratingForm.value,
      "pace": pacForm.value,
      "shooting": shoForm.value,
      "passing": pasForm.value,
      "dribbling": driForm.value,
      "defending": defForm.value,
      "physical": phyForm.value
    };
  }


  return dataAddNew;
}



// add to dom function :
function addToDomSide() {
  const playersZone = document.getElementById('side-zone');
  playersZone.innerHTML = playerSideCard(getPlayerDataToArray()) + playersZone.innerHTML;

 
}




addNewPlayearBtn.addEventListener('click', ()=>{
  if (validationInputs()) {
    addToDomSide();

    const closeModal = document.getElementById('close-modal');

    closeModal.click();
    clearInputs();

    updatePlayerFromDom();
    dragDrop();
    searchAoutName();
    filterDropDown();
  }else{
    console.log('nvalid');
  }
});




// function clear inputs :
function clearInputs() {

  nameForm.value = "";
  imgForm.value = "";
  ratingForm.value = "";
  
  pacForm.value = "";
  shoForm.value = "";
  pasForm.value = "";
  driForm.value = "";
  defForm.value = "";
  phyForm.value = "";

}





// change formation team:


// choose options :

function changeFormation() {
  const optionFormation = document.getElementById('teamformation');
  
  optionFormation.addEventListener('change', () => {
    
    if (optionFormation.value == "442") {
      const parTeam = document.getElementById('team-zone');
      const allCardTeamFormation = parTeam.querySelectorAll('.empty-card');

      allCardTeamFormation.forEach(element => {
        element.classList.add('second-plan');
        
      });

    }
    
    if (optionFormation.value == "433") {
      
      const parTeam = document.getElementById('team-zone');
      const allCardTeamFormation = parTeam.querySelectorAll('.empty-card');

      allCardTeamFormation.forEach(element => {
        element.classList.remove('second-plan');
        
      });

    }
      

  });
  
};

