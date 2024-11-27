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

          console.log('side');

        } else {
            dataPlayearArr = dataPlayers.slice(19);
            displayPlayers(dataPlayearArr);

        } 



        updatePlayerFromDom();
        dragDrop();
        searchAoutName();
        filterDropDown();
        


        console.log('get data');
    })
    .catch(error => {
        console.error('fetch Eror:', error);
    });






function saveFataFromDom() {
    localStorage.setItem('dataTeamArr', JSON.stringify(dataTeamArr));
    localStorage.setItem('dataSubArr', JSON.stringify(dataSubArr));
    localStorage.setItem('dataPlayearArr', JSON.stringify(dataPlayearArr));

}




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
  dataTeam.forEach(cardHTML => {
    parTeam.innerHTML += cardHTML;  
  });
}


function displayLocalSub(dataSub) {
    const boxSubstitues = document.getElementById('substitutes-zone');
    dataSub.forEach(cardHTML => {
      boxSubstitues.innerHTML += cardHTML;
    });
}

function displayLocalSid(dataSid) {
  const boxSubstitues = document.getElementById('side-zone');
  dataSid.forEach(cardHTML => {
    boxSubstitues.innerHTML += cardHTML;
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
      if (dragingElement.parentElement.id == 'team-zone' && boxDrop.parentElement.id === 'team-zone') {
    
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




function updatePlayerFromDom() {
  const teamBoxCards = document.querySelectorAll('.team-card');
  const substitutesZone = document.getElementById('substitutes-zone');
  const playersZone = document.getElementById('side-zone');

  dataTeamArr = Array.from(teamBoxCards).map(card => card.outerHTML);
  dataSubArr = Array.from(substitutesZone.children).map(card => card.outerHTML);
  dataPlayearArr = Array.from(playersZone.children).map(card => card.outerHTML);

  saveFataFromDom();
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
  const choiceBtn = document.getElementById('dropdown').querySelectorAll('button')
  choiceBtn.forEach(element => {
    element.addEventListener('click', ()=>{
      const playersZone = document.getElementById('side-zone');
      const cards = playersZone.querySelectorAll('.side-card');
            
      const yourChoice = element.textContent;
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
    });
  });
}



// add players to side bare :
