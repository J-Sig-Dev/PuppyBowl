import * as API from './api.js'
const playerContainer = document.getElementById('all-players-container')
const newPlayerFormContainer = document.getElementById('new-player-form')

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A'

// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
// const fetchAllPlayers = async () => {
//   try {
//     const response = await fetch(`${APIURL}players`)
//     const result = await response.json()
//     console.log(result)
//     return result
//   } catch (err) {
//     console.error('Uh oh, trouble fetching players!', err)
//   }
// }

// const fetchSinglePlayer = async playerId => {
//   try {
//     const response = await fetch(`${APIURL}players/${playerId}`)
//     const result = await response.json()
//     console.log(result)
//     renderSinglePlayer(result)
//     return result
//   } catch (err) {
//     console.error(`Oh no, trouble fetching player #${playerId}!`, err)
//   }
// }

const renderSinglePlayer = async selectedPlayer => {
  console.log('from the render single player', selectedPlayer)
  const selectedObj = selectedPlayer.data.player
  playerContainer.innerHTML = ''
  const playerDiv = document.createElement('div')
  playerDiv.classList.add('card', 'details')

  playerDiv.innerHTML = `
        
      <h2>${selectedObj.name}<h2>
      <img  src= ${selectedObj.imageUrl}>
      <p>Breed: ${selectedObj.breed}<p>
      <p>Dog ID: ${selectedObj.id}<p>
      <p>Team ID:${selectedObj.teamId}<p>
      <p>Cohort ID:${selectedObj.cohortId}<p>
      <p>Status: ${selectedObj.status}<p>

      <button class="close-button">Close</button>
    
   `
  const closeBtn = playerDiv.querySelector('.close-button')
  closeBtn.addEventListener('click', e => {
    init()
  })
  playerContainer.appendChild(playerDiv)
}

const addNewPlayer = async playerObj => {
  try {
    const response = await fetch(`${APIURL}players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    })
    const result = await response.json()
    console.log(result)

    init()
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err)
  }
}

const removePlayer = async playerId => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    console.log(result)
    init()
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    )
  }
}

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerontainerHTML variable.
 */
const renderAllPlayers = async playerList => {
  try {
    const data = playerList.data.players
    playerContainer.innerHTML = ''
    data.forEach(player => {
      const playerDiv = document.createElement('div')
      playerDiv.classList.add('card')
      playerDiv.innerHTML = `<h2>${player.name}<h2>
      <img  src= ${player.imageUrl}>
      <p>${player.breed}<p>
     
      <button class="details-button" data-id="${player.id}">See Details</button>
      <button class="delete-button" data-id="${player.id}">Delete</button>`

      playerContainer.appendChild(playerDiv)
      const detailBtn = playerDiv.querySelector('.details-button')
      detailBtn.addEventListener('click', async e => {
        const selectedDog = e.target.dataset.id
        const fetchDog = await API.fetchSinglePlayer(selectedDog)
        renderSinglePlayer(fetchDog)
      })
      const deleteBtn = playerDiv.querySelector('.delete-button')
      deleteBtn.addEventListener('click', async e => {
        const selectedDog = e.target.dataset.id
        removePlayer(selectedDog)
      })
    })
  } catch (err) {
    console.log('Uh oh, trouble rendering players!', err)
  }
}

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const formDiv = document.createElement('div')
    newPlayerFormContainer.innerHTML = ''
    formDiv.innerHTML = `
    <form>
    <h1>Puppy Bowl</h1>
    <label for="dogName">Dog Name</label>
    <input type="text"  id="dogName">
    <label for="dogBreed">Dog Breed</label>
    <input type="text"  id="dogBreed">
    <label for="dogImage">Dog Image</label>
    <input type="text"  id="dogImage">


    <button type="submit" id="submitBtn">Submit</button>

    <form>`

    const submitBtn = formDiv.querySelector('#submitBtn')

    submitBtn.addEventListener('click', e => {
      e.preventDefault()
      const newDog = {
        name: formDiv.querySelector('#dogName').value,
        breed: formDiv.querySelector('#dogBreed').value,
        imageUrl: formDiv.querySelector('#dogImage').value,
      }
      console.log(newDog)
      addNewPlayer(newDog)
    })
    newPlayerFormContainer.appendChild(formDiv)
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err)
  }
}

const init = async () => {
  const players = await API.fetchAllPlayers()
  //   console.log(players)
  renderAllPlayers(players)

  renderNewPlayerForm()
}

init()
