// players card :
export function playerSideCard(data) {

  if(data.position === 'GK'){

    return `

          <!-- player for side -->
          <div  class="empty-card p-card side-card drop-zone" data-pos="${data.position}" draggable="true">


            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">
            
            <!-- inside card info -->
            <div class="card-info-empty">

              <!-- player-img-empty -->
              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

              

              <!-- rating -->
              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <!-- name -->
                <h3 class="name-empty">
                  ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>DIV</span>
                    <p>${data.diving}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>HAN</span>
                    <p>${data.handling}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>KIC</span>
                    <p>${data.kicking}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>REF</span>
                    <p>${data.reflexes}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>SPD</span>
                    <p>${data.speed}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>POS</span>
                    <p>${data.positioning}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>




            </div>


          </div>
    ` 

  }else{

    return `

    <!-- player for side -->
    <div  class="empty-card p-card side-card drop-zone" data-pos="${data.position}" draggable="true">


      <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">
      
      <!-- inside card info -->
      <div class="card-info-empty">

        <!-- player-img-empty -->
        <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

        

        <!-- rating -->
        <div class="rating-empty">
          <p>${data.rating}</p>
          <span>${data.position}</span>
        </div>

        <div class="info-down-emprt">
          <!-- name -->
          <h3 class="name-empty">
            ${data.name}
          </h3>
          <!-- stats -->
          <div class="power-stats-empty">
            <div class="stats-empty pac">
              <span>PAC</span>
              <p>${data.pace}</p>
            </div>

            <div class="stats-empty sho">
              <span>SHO</span>
              <p>${data.shooting}</p>
            </div>

            <div class="stats-empty pas">
              <span>PAS</span>
              <p>${data.passing}</p>
            </div>

            <div class="stats-empty dri">
              <span>DRI</span>
              <p>${data.dribbling}</p>
            </div>

            <div class="stats-empty def">
              <span>DEF</span>
              <p>${data.defending}</p>
            </div>

            <div class="stats-empty phy">
              <span>PHY</span>
              <p>${data.physical}</p>
            </div>
          </div>
          <!-- country -->
          <div class="countr-team-empty">
            <img src="${data.flag}" alt="">
            <img src="${data.logo}" alt="">
          </div>

        </div>




      </div>


    </div>
    ` 
  }
}


let existCB = false;
let existCM = 0;

export function playerTeamCard(data) {

  let emptyCardClass = '';
  const position = data.position;

  
  switch (position) {
    case "GK":
      emptyCardClass = "empty-card-1";
      break;
    case "LB":
      emptyCardClass = "empty-card-2";
      break;
    case "RB":
      emptyCardClass = "empty-card-5";
      break;
    case "CB":

      if (!existCB) {
        emptyCardClass = "empty-card-3";
        existCB = true; 
      }else{
        emptyCardClass = "empty-card-4"; 
      }
      
      break;

    case "CM":
      if (existCM == 0) {
        emptyCardClass = "empty-card-6"; 
        existCM++;
      }else if (existCM == 1) {
        emptyCardClass = "empty-card-7";
        existCM++;
      }else{

        emptyCardClass = "empty-card-8";
        existCM++;
      }
      break;


    case "LW":
      emptyCardClass = "empty-card-9";
      break;
    case "ST":
      emptyCardClass = "empty-card-10";
      break;
    case "RW":
      emptyCardClass = "empty-card-11";
      break;    
  }


  if(data.position === 'GK'){

    return `
        <!-- players -->
          <div  class="empty-card ${emptyCardClass} p-card team-card drop-zone" data-pos="${data.position}" draggable="true">

            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">

            <!-- inside card info -->
            <div class="card-info-empty">

              <!-- player-img-empty -->           
              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

              

               <!-- rating -->
              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <!-- name -->
                <h3 class="name-empty">
                  ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>DIV</span>
                    <p>${data.diving}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>HAN</span>
                    <p>${data.handling}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>KIC</span>
                    <p>${data.kicking}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>REF</span>
                    <p>${data.reflexes}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>SPD</span>
                    <p>${data.speed}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>POS</span>
                    <p>${data.positioning}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>

            </div>
          </div>

    `

  }else{


    return `
    <!-- players -->
          <div  class="empty-card ${emptyCardClass}  p-card team-card drop-zone" data-pos="${data.position}" draggable="true">

            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">

            <!-- inside card info -->
            <div class="card-info-empty">

              <!-- player-img-empty -->           
              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

              

              <!-- rating -->
              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <!-- name -->
                <h3 class="name-empty">
                   ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>PAC</span>
                    <p>${data.pace}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>SHO</span>
                    <p>${data.shooting}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>PAS</span>
                    <p>${data.passing}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>DRI</span>
                    <p>${data.dribbling}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>DEF</span>
                    <p>${data.defending}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>PHY</span>
                    <p>${data.physical}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>

            </div>
          </div>

    `


  }


}


