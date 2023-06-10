// Import all api calls, using * since export is rather small
import * as API from './api.js'
const playerContainer = document.getElementById('all-players-container')
const newPlayerFormContainer = document.getElementById('new-player-form')

// Render a single player card
const renderSinglePlayer = async selectedPlayer => {
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
  // Add close button
  const closeBtn = playerDiv.querySelector('.close-button')

  // Add event listener to close button
  closeBtn.addEventListener('click', e => {
    // Call init function to refresh page once promise is complete
    init()
  })
  playerContainer.appendChild(playerDiv)
}

// Render all players
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
      // Add details button
      const detailBtn = playerDiv.querySelector('.details-button')
      // Add event listener to details button
      detailBtn.addEventListener('click', async e => {
        const selectedDog = e.target.dataset.id
        // Pass selected dog to api
        const fetchDog = await API.fetchSinglePlayer(selectedDog)
        renderSinglePlayer(fetchDog)
      })
      // Add delete button
      const deleteBtn = playerDiv.querySelector('.delete-button')
      // Add event listener to delete button
      deleteBtn.addEventListener('click', async e => {
        const selectedDog = e.target.dataset.id
        // Pass selected dog to api
        await API.removePlayer(selectedDog)
        // Call init function to refresh page once promise is complete
        init()
      })
    })
  } catch (err) {
    console.error('Uh oh, trouble rendering players!', err)
  }
}

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
    // Add submit button to form
    const submitBtn = formDiv.querySelector('#submitBtn')
    // Add event listener to submit button
    submitBtn.addEventListener('click', async e => {
      e.preventDefault()
      // Build new dog object
      const newDog = {
        name: formDiv.querySelector('#dogName').value,
        breed: formDiv.querySelector('#dogBreed').value,
        imageUrl: formDiv.querySelector('#dogImage').value,
      }
      // Pass new dog object to api
      await API.addNewPlayer(newDog)
      // Call init function to refresh page once promise is complete
      init()
    })
    newPlayerFormContainer.appendChild(formDiv)
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err)
  }
}

const init = async () => {
  // Trigger api to get all player
  const players = await API.fetchAllPlayers()

  // Render all players return from api call
  renderAllPlayers(players)
  // Render new player form
  renderNewPlayerForm()
}

init()
