// players card :
export function playerSideCard(data) {

  if(data.position === 'GK'){

    return `
        <!-- card in side -->
        <div class="players-card p-card" data-players="${data.position}" draggable="true">

          <img src="assets/images/card/badg_bg_champions.png" alt="" class="players-image" draggable="false">
          
          <!-- inside card info -->

            <!-- player-img-players -->
            <img src="${data.photo}" alt="" class="player-img-players" draggable="false">

            <!-- rating -->
            <div class="rating-players">
              <p>${data.rating}</p>
              <span>${data.position}</span>
            </div>

            <div class="info-down-players">
              <!-- name -->
              <h3 class="name-players">
                ${data.name}
              </h3>
              <!-- stats -->
              <div class="power-stats-players">
                <div class="stats-players pac">
                  <span>DIV</span>
                  <p>${data.diving}</p>
                </div>

                <div class="stats-players sho">
                  <span>HAN</span>
                  <p>${data.handling}</p>
                </div>

                <div class="stats-players pas">
                  <span>KIC</span>
                  <p>${data.kicking}</p>
                </div>

                <div class="stats-players dri">
                  <span>REF</span>
                  <p>${data.reflexes}</p>
                </div>

                <div class="stats-players def">
                  <span>SPD</span>
                  <p>${data.speed}</p>
                </div>

                <div class="stats-players phy">
                  <span>POS</span>
                  <p>${data.positioning}</p>
                </div>
              </div>

              <!-- country -->
              <div class="countr-team-players">
                <img src="${data.flag}" alt="">
                <img src="${data.logo}" alt="">
              </div>

            </div>


        </div>
    ` 

  }else{

    return `
         <!-- card in side -->
          <div class="players-card players-card-1" data-players="${data.position}">
  
            <img src="assets/images/card/badg_bg_champions.png" alt="" class="players-image">
            
            <!-- inside card info -->
  
              <!-- player-img-players -->
              <img src="${data.photo}" alt="" class="player-img-players">
  
              <!-- rating -->
              <div class="rating-players">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>
  
              <div class="info-down-players">
                <!-- name -->
                <h3 class="name-players">
                  ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-players">
                  <div class="stats-players pac">
                    <span>PAC</span>
                    <p>${data.pace}</p>
                  </div>
  
                  <div class="stats-players sho">
                    <span>SHO</span>
                    <p>${data.shooting}</p>
                  </div>
  
                  <div class="stats-players pas">
                    <span>PAS</span>
                    <p>${data.passing}</p>
                  </div>
  
                  <div class="stats-players dri">
                    <span>DRI</span>
                    <p>${data.dribbling}</p>
                  </div>
  
                  <div class="stats-players def">
                    <span>DEF</span>
                    <p>${data.defending}</p>
                  </div>
  
                  <div class="stats-players phy">
                    <span>PHY</span>
                    <p>${data.physical}</p>
                  </div>
                </div>
  
                <!-- country -->
                <div class="countr-team-players">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>
  
              </div>
  
  
          </div>
    ` 
  }
}
