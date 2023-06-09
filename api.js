const cohortName = '2302-ACC-PT-WEB-PT-A'

const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`

// Fetch all players from DB
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players`)
    const result = await response.json()
    return result
  } catch (err) {
    console.error('Uh oh, trouble fetching players!', err)
  }
}

// Fetch single player from DB
const fetchSinglePlayer = async playerId => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`)
    const result = await response.json()
    return result
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err)
  }
}

// Add new player to DB
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
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err)
  }
}

// Delete player from DB
const removePlayer = async playerId => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    )
  }
}

export { fetchAllPlayers, fetchSinglePlayer, removePlayer, addNewPlayer }
