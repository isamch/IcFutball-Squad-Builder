import { playerSideCard } from './htmlComponent.js';

let dataPlayers = [];

// fetch from json
fetch('/Data/players.json')
  .then(response => {
    return response.json();
})
.then(data => {
    
    // console.log(data);
    dataPlayers = data.players;


    // show cards:
    const sideCardContaine = document.getElementById('card-side-data');


    // dataPlayers.forEach(singleData => {
      
    //   sideCardContaine.innerHTML += playerSideCard(singleData);
      
    // });

    

  // funs
  dragDrop();

})
.catch(error => {
    console.error('fetch er :', error);
});








// drag and drop :

function dragDrop(){

  const playerCard = document.querySelectorAll('.p-card');
  const dropzon = document.querySelectorAll('.drop-zone');


  playerCard.forEach(singleCard => {

    singleCard.addEventListener('dragstart', ()=>{
      console.log(singleCard);
      singleCard.classList.add('dragin-now')
    })

    singleCard.addEventListener('dragend', ()=>{
      singleCard.classList.remove('dragin-now');

    });

  });



  


}






