import * as API from './api.js'
const playerContainer = document.getElementById('all-players-container')
const newPlayerFormContainer = document.getElementById('new-player-form')

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
  const closeBtn = playerDiv.querySelector('.close-button')
  closeBtn.addEventListener('click', e => {
    init()
  })
  playerContainer.appendChild(playerDiv)
}

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
        await API.removePlayer(selectedDog)
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

    const submitBtn = formDiv.querySelector('#submitBtn')

    submitBtn.addEventListener('click', async e => {
      e.preventDefault()
      const newDog = {
        name: formDiv.querySelector('#dogName').value,
        breed: formDiv.querySelector('#dogBreed').value,
        imageUrl: formDiv.querySelector('#dogImage').value,
      }

      await API.addNewPlayer(newDog)
      init()
    })
    newPlayerFormContainer.appendChild(formDiv)
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err)
  }
}

const init = async () => {
  const players = await API.fetchAllPlayers()

  renderAllPlayers(players)

  renderNewPlayerForm()
}

init()
