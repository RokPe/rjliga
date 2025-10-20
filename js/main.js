document.querySelector('.league_table').innerHTML = "";

let teamPos = 0

  fetch("https://v3.football.api-sports.io/standings?league=39&season=2025", {
    method: "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "0540f07c6e01b51b8d2e429f2304a1fd" //   moj-data key: 727a05b87af36702d9fd3ea32d322792 siol-data key: 0540f07c6e01b51b8d2e429f2304a1fd
    }
  })
  .then(response => 
    response.json())
  .then(data => {
    //console.log(data)
    for (let i = 0; i < data.response[0].league.standings[0].length; i ++) {
      let row = `<div class="data_row row">
                    <div class="position">${data.response[0].league.standings[0][teamPos].rank}</div>
                    <div class="team"><img src="${data.response[0].league.standings[0][teamPos].team.logo}" alt=""></img>${data.response[0].league.standings[0][teamPos].team.name}</div>
                    <div class="matches_played">${data.response[0].league.standings[0][teamPos].all.played}</div>
                    <div class="won">${data.response[0].league.standings[0][teamPos].all.win}</div>
                    <div class="draw">${data.response[0].league.standings[0][teamPos].all.draw}</div>
                    <div class="lost">${data.response[0].league.standings[0][teamPos].all.lose}</div>
                    <div class="goals">${data.response[0].league.standings[0][teamPos].all.goals.for}:${data.response[0].league.standings[0][teamPos].all.goals.against}</div>  
                    <div class=goal_diff>${data.response[0].league.standings[0][teamPos].goalsDiff}</div>
                    <div class="points">${data.response[0].league.standings[0][teamPos].points}</div>
                </div>`

      document.querySelector('.league_table').innerHTML += row
      teamPos += 1
    }

    let plDivs = document.querySelectorAll('.pl > .row')
    let plArray = []

    plDivs.forEach(div => {
      let pozicija = div.children[0].innerText.trim();
      let ekipa = div.children[1].innerText.trim();
  
      let plPair = {
        [ekipa]: pozicija
      }
  
      plArray.push(plPair)
    })

    //console.log(plArray);

    let divs = document.querySelectorAll('.djulo > .league_row')

    //prazen Array
    let djuloArray = []
  
    //iteracijo skozi vse dive, vrednost prvega potomca diva shranimo v spremenljivko firstChildValue, vrednost drugega potomca shranimo v spremenljivko secondChildValue
    divs.forEach(div => {
      let firstChildValue = div.children[0].innerText.trim();
      let secondChildValue = div.children[1].innerText.trim();
  
      //deklariramo spremenljivko pair in vanjo shranimo key:value par z zgornjima vrednostima
      let pair = {
        [secondChildValue]: firstChildValue
      }
  
      //vsak key:value pair shranimo v Array, ko se zanka zaključi imamo array of objects
      djuloArray.push(pair)
  
    });
  
    // console.log(djuloArray)
    // console.log(Object.keys(djuloArray[0])[0])

    let diffInPos = []

    plArray.forEach(obj1 => {
      let key1 = Object.keys(obj1)[0];
      // console.log(key1)
      let value1 = obj1[key1];
      // console.log(value1)

      let obj2 = djuloArray.find(obj => obj.hasOwnProperty(key1));
      // console.log(obj2)

      if (obj2) {
        let value2 = obj2[key1];
        // console.log(value2)

        let difference = {
          [key1] : Math.abs(value1 - value2)
        }
        // console.log('difference is: ' + difference + ' ' + typeof(difference))

        diffInPos.push(difference)
      }
    })

    // console.log(diffInPos)

    let djuloPoints = document.querySelectorAll('.djulo > .league_row')

    diffInPos.forEach(pair => {
      let key = Object.keys(pair)[0];
      // console.log(key)
      let value = pair[key];
      // console.log(value + ' ' + typeof(value))


      djuloPoints.forEach(div => {
        let first = div.children[1]
        // console.log(first.textContent + typeof(first.textContent))
        let second = div.children[2]
        // console.log(second.textContent + ' ' + typeof(second.textContent))

        // console.log(first.textContent == key)
        // console.log(value == 0)

        if (first.textContent == key && value == 0) {
          second.textContent = 4
        } else if (first.textContent == key && value == 1) {
          second.textContent = 3
        } else if (first.textContent == key && value == 2) {
          second.textContent = 2
        } else if (first.textContent == key && value == 3) {
          second.textContent = 1
        } else if (first.textContent == key && value == 4) {
          second.textContent = 0
        } else if (first.textContent == key && value == 5) {
          second.textContent = -1
        } else if (first.textContent == key && value == 6) {
          second.textContent = -2
        } else if (first.textContent == key && value > 6) {
          second.textContent = -4
        }
      })
    })

    let total = 0

    djuloPoints.forEach(div => {
      let point = parseInt(div.children[2].textContent)
      // console.log(point)

      total += point
    })

    // console.log(total)

    document.querySelector('.julijan > .skupne_tocke > p > span').textContent = total



    //////////ROK TABELA//////////

    let divsRok = document.querySelectorAll('.rokson > .league_row')
    let rokArray = []

    divsRok.forEach(div => {
      let firstChildValue = div.children[0].innerText.trim();
      let secondChildValue = div.children[1].innerText.trim();
  
      //deklariramo spremenljivko pair in vanjo shranimo key:value par z zgornjima vrednostima
      let pairRok = {
        [secondChildValue]: firstChildValue
      }
  
      //vsak key:value pair shranimo v Array, ko se zanka zaključi imamo array of objects
      rokArray.push(pairRok)
    });

    // console.log(rokArray)

    let diffInPosRok = []

    plArray.forEach(obj1 => {
      let key1 = Object.keys(obj1)[0];
      // console.log(key1)
      let value1 = obj1[key1];
      // console.log(value1)

      let obj2 = rokArray.find(obj => obj.hasOwnProperty(key1));
      // console.log(obj2)

      if (obj2) {
        let value2 = obj2[key1];
        // console.log(value2)

        let differenceRok = {
          [key1] : Math.abs(value1 - value2)
        }
        // console.log('difference is: ' + difference + ' ' + typeof(difference))

        diffInPosRok.push(differenceRok)
      }
    })

    // console.log(diffInPosRok)


    let rokPoints = document.querySelectorAll('.rokson > .league_row')

    diffInPosRok.forEach(pair => {
      let key = Object.keys(pair)[0];
      //console.log(key)
      let value = pair[key];
      // console.log(value + ' ' + typeof(value))


      rokPoints.forEach(div => {
        let first = div.children[1]
        //console.log(first.textContent + typeof(first.textContent))
        //console.log(first.textContent)
        let second = div.children[2]
        // console.log(second.textContent + ' ' + typeof(second.textContent))

        //console.log(first.textContent == key)
        // console.log(value == 0)

        if (first.textContent == key && value == 0) {
          second.textContent = 4
        } else if (first.textContent == key && value == 1) {
          second.textContent = 3
        } else if (first.textContent == key && value == 2) {
          second.textContent = 2
        } else if (first.textContent == key && value == 3) {
          second.textContent = 1
        } else if (first.textContent == key && value == 4) {
          second.textContent = 0
        } else if (first.textContent == key && value == 5) {
          second.textContent = -1
        } else if (first.textContent == key && value == 6) {
          second.textContent = -2
        } else if (first.textContent == key && value > 6) {
          second.textContent = -4
        }
      })
    })

    let totalRok = 0

    rokPoints.forEach(div => {
      let point = parseInt(div.children[2].textContent)
      // console.log(point)

      totalRok += point
    })

    document.querySelector('.roky > p > span').innerText = totalRok

    //////////ROK TABELA//////////


    document.querySelector('.pl .data_row .team')

    let parentDivs = document.querySelectorAll('.pl .data_row')

    parentDivs.forEach(function(parentDiv)  {
      let secondChild = parentDiv.children[1];

      if (secondChild) {
        secondChild.addEventListener('click', function() {

          let teamName = secondChild.innerText

          fetch("https://v3.football.api-sports.io/teams?name=" + teamName, {
            method: "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "727a05b87af36702d9fd3ea32d322792"
            }
          })
          .then(response => 
            response.json())
          .then(data => {
            console.log(data)
            let getTeamName = data.response[0].team.name
            console.log(getTeamName)

            

            if(document.getElementById('toptop').style.visibility = "hidden") {
              document.getElementById('toptop').style.visibility = "visible"
              document.querySelector('#player_name').innerText = data.response[0].team.name
            } else {
              document.getElementById('toptop').style.visibility = "hidden"
            }
  
            // console.log('dela')
            // console.log(teamName)

          })
          .catch(err => {
            console.log(err)
          })

        })
      }

      

      // let whichTeam = document.response[0]


    })


    // function showInfo() {

    //   let teamName = document.querySelectorAll('.pl > .data_row > .team').innerText

    //   if(document.getElementById('toptop').style.visibility = "hidden") {
    //     document.getElementById('toptop').style.visibility = "visible"
    //   } else {
    //     document.getElementById('toptop').style.visibility = "hidden"
    //   }

    //   console.log('lolol')
    //   console.log(teamName)
    // }



    


      // plArray.forEach(obj1 => {
      //   let key1 = Object.keys(obj1)[0];
      //   console.log(key1)
      //   let value1 = obj1[key1];
      //   // console.log(value1)
  
      //   let obj2 = djuloArray.find(obj => obj.hasOwnProperty(key1));
      //   // console.log(obj2)
  
      //   if (obj2) {
      //     let value2 = obj2[key1];
      //     // console.log(value2)
  
      //     let difference = Math.abs(value1 - value2);
      //     // console.log('difference is: ' + difference + ' ' + typeof(difference))

      //     let thirdChild = divs.children[2];
  
      //     if (difference == 0) {
      //       thirdChild.innerText == '+3'
      //     } else if (difference == 1) {
      //       thirdChild.innerText == '+1'
      //     } else if (difference == 2) {
      //       thirdChild.innerText == '0'
      //     } else {
      //       thirdChild.innerText == '-2'
      //     }

          
  
      //     // diffInPos.push(difference)
  
        
        



    // console.log(diffInPos)

    // let djuloPoints = document.querySelector('.djulo .points')

    // diffInPos.forEach(div => {
    //   if (div == document.querySelector('.djulo>.league_row>.points')) {
    //     document.querySelector('.djulo .league_row .points').innerText = '+3'
    //   } else if (div == 1) {
    //     document.querySelector('.djulo .league_row .points').innerText = '+1'
    //   } else if (div == 2) {
    //     document.querySelector('.djulo .league_row .points').innerText = '0'
    //   } else {
    //     document.querySelector('.djulo .league_row .points').innerText = '-3'
    //   }
    // })

    // console.log(newPoints)
    // console.log(document.querySelector('.djulo>.league_row>.point'))

  })
  .catch(err => {
    console.log(err)
  })





//izberemo div, ki je neposredni potomec diva z class .djulo
  // let divs = document.querySelectorAll('.djulo > .league_row')

  // //prazen Array
  // let djuloArray = []

  // //iteracijo skozi vse dive, vrednost prvega potomca diva shranimo v spremenljivko firstChildValue, vrednost drugega potomca shranimo v spremenljivko secondChildValue
  // divs.forEach(div => {
  //   let firstChildValue = div.children[0].innerText.trim();
  //   let secondChildValue = div.children[1].innerText.trim();

  //   //deklariramo spremenljivko pair in vanjo shranimo key:value par z zgornjima vrednostima
  //   let pair = {
  //     [secondChildValue]: firstChildValue
  //   }

  //   //vsak key:value pair shranimo v Array, ko se zanka zaključi imamo array of objects
  //   djuloArray.push(pair)

  // });

  // console.log(djuloArray)


  // djuloArray.forEach(obj1 => {
  //   let obj2 = plArray.find(obj => obj1.ekipa = obj2.ekipa);

  //   if(obj2) {
  //     let difference = djuloArray.firstChildValue - plArray.pozicija
  //     console.log(difference)
  //   }
  // })